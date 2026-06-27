const SITE_URL = "https://adxj.com";
const SNAPSHOT_LATEST_KEY = "geo-seo-daily-snapshot:latest";
const SNAPSHOT_KEY_PREFIX = "geo-seo-daily-snapshot:";
const GOOGLE_SCOPE = "https://www.googleapis.com/auth/webmasters.readonly";
const AI_BOT_PATTERNS = [
  "oai-searchbot",
  "gptbot",
  "chatgpt-user",
  "perplexitybot",
  "perplexity-user",
];
const REPORT_TIME_ZONE = "Asia/Shanghai";

const worker = {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.hostname === "www.adxj.com") {
      url.hostname = "adxj.com";
      url.protocol = "https:";

      return Response.redirect(url.toString(), 301);
    }

    if (url.pathname.startsWith("/internal/geo-seo/")) {
      return handleGeoSeoRequest(request, env);
    }

    return env.ASSETS.fetch(request);
  },

  async scheduled(event, env, ctx) {
    ctx.waitUntil(
      runAndStoreSnapshot(env, {
        trigger: "cron",
        cron: event.cron,
        scheduledTime: new Date(event.scheduledTime).toISOString(),
      }),
    );
  },
};

export default worker;

async function handleGeoSeoRequest(request, env) {
  const url = new URL(request.url);

  if (!isAuthorized(request, env)) {
    return jsonResponse({ error: "unauthorized" }, 401);
  }

  if (url.pathname === "/internal/geo-seo/health" || url.pathname === "/internal/geo-seo/health/") {
    return jsonResponse({
      ok: true,
      configured: getConfigurationStatus(env),
      storage: Boolean(env.GEO_SEO_KV),
    });
  }

  if (url.pathname === "/internal/geo-seo/snapshot/latest" || url.pathname === "/internal/geo-seo/snapshot/latest/") {
    return readSnapshot(env, SNAPSHOT_LATEST_KEY);
  }

  if (url.pathname.startsWith("/internal/geo-seo/snapshot/")) {
    const date = url.pathname.replace("/internal/geo-seo/snapshot/", "").replace(/\/$/, "");
    if (/^\d{4}-\d{2}-\d{2}$/.test(date)) {
      return readSnapshot(env, `${SNAPSHOT_KEY_PREFIX}${date}`);
    }
  }

  if ((url.pathname === "/internal/geo-seo/run" || url.pathname === "/internal/geo-seo/run/") && request.method === "POST") {
    const snapshot = await runAndStoreSnapshot(env, { trigger: "manual" });
    return jsonResponse(snapshot);
  }

  return jsonResponse({ error: "not_found" }, 404);
}

function isAuthorized(request, env) {
  const expected = env.GEO_SEO_INTERNAL_TOKEN;
  if (!expected) return false;
  return request.headers.get("Authorization") === `Bearer ${expected}`;
}

async function readSnapshot(env, key) {
  if (!env.GEO_SEO_KV) {
    return jsonResponse({ error: "missing_GEO_SEO_KV_binding" }, 503);
  }

  const snapshot = await env.GEO_SEO_KV.get(key, "json");
  if (!snapshot) {
    return jsonResponse({ error: "snapshot_not_found", key }, 404);
  }

  return jsonResponse(snapshot);
}

async function runAndStoreSnapshot(env, meta) {
  const snapshot = await buildSnapshot(env, meta);

  if (!env.GEO_SEO_KV) {
    return {
      ...snapshot,
      storageStatus: {
        ok: false,
        reason: "missing_GEO_SEO_KV_binding",
      },
    };
  }

  await Promise.all([
    env.GEO_SEO_KV.put(SNAPSHOT_LATEST_KEY, JSON.stringify(snapshot), {
      metadata: { generatedAt: snapshot.generatedAt },
    }),
    env.GEO_SEO_KV.put(`${SNAPSHOT_KEY_PREFIX}${snapshot.snapshotDate}`, JSON.stringify(snapshot), {
      metadata: { generatedAt: snapshot.generatedAt },
    }),
  ]);

  return {
    ...snapshot,
    storageStatus: {
      ok: true,
      keys: [SNAPSHOT_LATEST_KEY, `${SNAPSHOT_KEY_PREFIX}${snapshot.snapshotDate}`],
    },
  };
}

async function buildSnapshot(env, meta) {
  const now = new Date();
  const generatedAt = now.toISOString();
  const snapshotDate = dateOnly(now);
  const siteOrigin = normalizeOrigin(env.SITE_URL || SITE_URL);
  const dateRange = buildDateRange(Number(env.GEO_SEO_COLLECTION_DAYS || 7));
  const publicIndexes = await fetchPublicIndexes(env, siteOrigin);
  const urls = prioritizeUrls(publicIndexes.urls);

  const [gscResult, cloudflareResult] = await Promise.allSettled([
    fetchGoogleSearchConsoleData(env, siteOrigin, urls, dateRange),
    fetchCloudflareCrawlData(env, siteOrigin, dateRange),
  ]);

  const gsc = resultValue(gscResult, "google_search_console");
  const cloudflare = resultValue(cloudflareResult, "cloudflare");
  const items = urls.map((url) => buildSnapshotItem(url, gsc, cloudflare));

  return {
    schemaVersion: 1,
    generatedAt,
    snapshotDate,
    site: siteOrigin,
    meta,
    dateRange,
    sourceStatus: {
      publicIndexes: publicIndexes.status,
      googleSearchConsole: gsc.status,
      cloudflare: cloudflare.status,
    },
    summary: buildSummary(items),
    items,
    errors: [
      ...publicIndexes.errors,
      ...(gsc.errors || []),
      ...(cloudflare.errors || []),
    ],
  };
}

function resultValue(result, source) {
  if (result.status === "fulfilled") return result.value;

  return {
    status: "error",
    errors: [{ source, message: safeErrorMessage(result.reason) }],
    pages: {},
  };
}

async function fetchPublicIndexes(env, siteOrigin) {
  const errors = [];
  const urls = new Set();
  const status = {
    sitemap: "unknown",
    llmsFull: "unknown",
  };

  for (const [path, parser, key] of [
    ["/sitemap.xml", parseSitemapUrls, "sitemap"],
    ["/llms-full.txt", parseTextUrls, "llmsFull"],
  ]) {
    try {
      const text = await fetchPublicText(env, siteOrigin, path);
      parser(text).forEach((url) => {
        if (url.startsWith(siteOrigin)) urls.add(normalizeUrl(url));
      });
      status[key] = "ok";
    } catch (error) {
      status[key] = "error";
      errors.push({ source: key, message: safeErrorMessage(error) });
    }
  }

  return {
    status,
    errors,
    urls: [...urls],
  };
}

async function fetchPublicText(env, siteOrigin, path) {
  if (env.ASSETS?.fetch) {
    const assetResponse = await env.ASSETS.fetch(new Request(`${siteOrigin}${path}`));
    if (assetResponse.ok) return assetResponse.text();
  }

  const response = await fetch(`${siteOrigin}${path}`);
  if (!response.ok) throw new Error(`${path} returned ${response.status}`);
  return response.text();
}

function parseSitemapUrls(text) {
  return [...text.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]);
}

function parseTextUrls(text) {
  return [...text.matchAll(/https:\/\/adxj\.com\/[^\s)]+/g)].map((match) => match[0]);
}

function prioritizeUrls(urls) {
  return urls
    .map(normalizeUrl)
    .filter((url) => {
      const type = classifyUrl(url).pageType;
      return ["article", "topic", "market", "service", "index"].includes(type);
    })
    .sort((a, b) => {
      const aType = classifyUrl(a).pageType;
      const bType = classifyUrl(b).pageType;
      const order = { article: 0, topic: 1, market: 2, service: 3, index: 4 };
      return (order[aType] ?? 9) - (order[bType] ?? 9) || a.localeCompare(b);
    });
}

async function fetchGoogleSearchConsoleData(env, siteOrigin, urls, dateRange) {
  const googleAccessToken = await getGoogleAccessTokenFromEnv(env);
  const gscSiteUrl = env.GSC_SITE_URL;

  if (!googleAccessToken || !gscSiteUrl) {
    return {
      status: "skipped",
      reason: "missing_google_auth_or_GSC_SITE_URL",
      pages: {},
      inspections: {},
      sitemaps: [],
      errors: [],
    };
  }

  const siteParam = encodeURIComponent(gscSiteUrl);
  const searchAnalytics = await fetchJson(`https://www.googleapis.com/webmasters/v3/sites/${siteParam}/searchAnalytics/query`, {
    method: "POST",
    headers: googleHeaders(googleAccessToken),
    body: JSON.stringify({
      startDate: dateRange.gscStartDate,
      endDate: dateRange.gscEndDate,
      dimensions: ["page", "query"],
      rowLimit: Number(env.GSC_SEARCH_ANALYTICS_ROW_LIMIT || 25000),
    }),
  });

  const pages = aggregateSearchAnalyticsRows(searchAnalytics.rows || []);
  const inspectionLimit = Number(env.GSC_INSPECTION_LIMIT || 25);
  const inspectionUrls = urls.filter((url) => classifyUrl(url).pageType === "article").slice(0, inspectionLimit);
  const inspections = {};

  for (const url of inspectionUrls) {
    try {
      const inspection = await fetchJson("https://searchconsole.googleapis.com/v1/urlInspection/index:inspect", {
        method: "POST",
        headers: googleHeaders(googleAccessToken),
        body: JSON.stringify({
          inspectionUrl: url,
          siteUrl: gscSiteUrl,
        }),
      });
      inspections[normalizeUrl(url)] = normalizeInspection(inspection);
    } catch (error) {
      inspections[normalizeUrl(url)] = {
        status: "error",
        error: safeErrorMessage(error),
      };
    }
  }

  let sitemaps = [];
  try {
    const sitemapData = await fetchJson(`https://www.googleapis.com/webmasters/v3/sites/${siteParam}/sitemaps`, {
      headers: googleHeaders(googleAccessToken),
    });
    sitemaps = sitemapData.sitemap || [];
  } catch (error) {
    sitemaps = [{ error: safeErrorMessage(error) }];
  }

  return {
    status: "ok",
    pages,
    inspections,
    sitemaps,
    errors: [],
  };
}

async function fetchCloudflareCrawlData(env, siteOrigin, dateRange) {
  if (!env.CF_API_TOKEN || !env.CF_ZONE_ID) {
    return {
      status: "skipped",
      reason: "missing_CF_API_TOKEN_or_CF_ZONE_ID",
      pages: {},
      errors: [],
    };
  }

  const query = `
    query GeoSeoCrawlerRequests($zoneTag: string, $start: Time, $end: Time) {
      viewer {
        zones(filter: { zoneTag: $zoneTag }) {
          httpRequestsAdaptiveGroups(
            limit: 10000
            filter: { datetime_geq: $start, datetime_leq: $end }
          ) {
            dimensions {
              clientRequestPath
              clientRequestUserAgent
              edgeResponseStatus
              cacheStatus
              clientCountryName
              datetimeHour
            }
            sum {
              requests
            }
          }
        }
      }
    }
  `;

  const data = await fetchJson("https://api.cloudflare.com/client/v4/graphql", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${env.CF_API_TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query,
      variables: {
        zoneTag: env.CF_ZONE_ID,
        start: dateRange.cloudflareStartTime,
        end: dateRange.cloudflareEndTime,
      },
    }),
  });

  if (data.errors?.length) {
    return {
      status: "error",
      pages: {},
      errors: data.errors.map((error) => ({ source: "cloudflare_graphql", message: error.message })),
    };
  }

  const groups = data.data?.viewer?.zones?.[0]?.httpRequestsAdaptiveGroups || [];
  return {
    status: "ok",
    pages: aggregateCloudflareRows(groups, siteOrigin),
    errors: [],
  };
}

function aggregateSearchAnalyticsRows(rows) {
  const pages = {};

  for (const row of rows) {
    const page = normalizeUrl(row.keys?.[0]);
    const query = row.keys?.[1] || "";
    if (!page) continue;

    pages[page] ??= {
      clicks: 0,
      impressions: 0,
      ctrNumerator: 0,
      positionNumerator: 0,
      queries: [],
    };

    const item = pages[page];
    item.clicks += row.clicks || 0;
    item.impressions += row.impressions || 0;
    item.ctrNumerator += (row.ctr || 0) * (row.impressions || 0);
    item.positionNumerator += (row.position || 0) * (row.impressions || 0);
    item.queries.push({
      query,
      clicks: row.clicks || 0,
      impressions: row.impressions || 0,
      ctr: row.ctr || 0,
      position: row.position || null,
    });
  }

  for (const page of Object.values(pages)) {
    page.ctr = page.impressions ? page.ctrNumerator / page.impressions : 0;
    page.position = page.impressions ? page.positionNumerator / page.impressions : null;
    page.queries = page.queries
      .sort((a, b) => b.impressions - a.impressions || b.clicks - a.clicks)
      .slice(0, 8);
    delete page.ctrNumerator;
    delete page.positionNumerator;
  }

  return pages;
}

function aggregateCloudflareRows(groups, siteOrigin) {
  const pages = {};

  for (const group of groups) {
    const dimensions = group.dimensions || {};
    const path = dimensions.clientRequestPath;
    if (!path) continue;

    const url = normalizeUrl(`${siteOrigin}${path}`);
    const userAgent = dimensions.clientRequestUserAgent || "";
    const requests = group.sum?.requests || 0;
    const isGoogle = userAgent.toLowerCase().includes("googlebot");
    const aiBot = findAiBot(userAgent);

    if (!isGoogle && !aiBot) continue;

    pages[url] ??= {
      googlebotRequests: 0,
      aiBotRequests: 0,
      lastGoogleCrawl: null,
      lastAiBotCrawl: null,
      statuses: {},
      cacheStatuses: {},
      countries: {},
      userAgents: {},
    };

    const page = pages[url];
    const seenAt = dimensions.datetimeHour || null;
    if (isGoogle) {
      page.googlebotRequests += requests;
      page.lastGoogleCrawl = latestIso(page.lastGoogleCrawl, seenAt);
    }
    if (aiBot) {
      page.aiBotRequests += requests;
      page.lastAiBotCrawl = latestIso(page.lastAiBotCrawl, seenAt);
    }
    countBy(page.statuses, String(dimensions.edgeResponseStatus || "unknown"), requests);
    countBy(page.cacheStatuses, dimensions.cacheStatus || "unknown", requests);
    countBy(page.countries, dimensions.clientCountryName || "unknown", requests);
    countBy(page.userAgents, userAgent || "unknown", requests);
  }

  return pages;
}

function buildSnapshotItem(url, gsc, cloudflare) {
  const normalizedUrl = normalizeUrl(url);
  const classification = classifyUrl(normalizedUrl);
  const gscPage = gsc.pages?.[normalizedUrl] || {};
  const inspection = gsc.inspections?.[normalizedUrl] || {};
  const cfPage = cloudflare.pages?.[normalizedUrl] || {};
  const indexStatus = inspection.indexStatus || (gsc.status === "ok" ? "not_inspected" : "unknown");
  const recommended = recommendAction({
    classification,
    gscPage,
    inspection,
    cfPage,
    indexStatus,
  });

  return {
    url: normalizedUrl,
    pageType: classification.pageType,
    topic: classification.topic,
    market: classification.market,
    gscClicks: gscPage.clicks || 0,
    gscImpressions: gscPage.impressions || 0,
    ctr: Number((gscPage.ctr || 0).toFixed(4)),
    position: gscPage.position ? Number(gscPage.position.toFixed(2)) : null,
    topQueries: gscPage.queries || [],
    indexStatus,
    googleCanonical: inspection.googleCanonical || null,
    userCanonical: inspection.userCanonical || null,
    lastGoogleCrawl: inspection.lastCrawlTime || cfPage.lastGoogleCrawl || null,
    googlebotRequests: cfPage.googlebotRequests || 0,
    aiBotCrawled: Boolean(cfPage.aiBotRequests),
    aiBotRequests: cfPage.aiBotRequests || 0,
    lastAiBotCrawl: cfPage.lastAiBotCrawl || null,
    crawlerStatuses: cfPage.statuses || {},
    recommendedAction: recommended.action,
    actionReason: recommended.reason,
  };
}

function recommendAction({ classification, gscPage, inspection, cfPage, indexStatus }) {
  if (classification.pageType === "article" && ["URL is not on Google", "not_indexed", "not_inspected"].includes(indexStatus)) {
    return {
      action: "refresh-answer-faq-and-internal-links",
      reason: "Article is missing or unknown in Google index inspection.",
    };
  }

  if ((gscPage.impressions || 0) >= 100 && (gscPage.ctr || 0) < 0.015) {
    return {
      action: "rewrite-title-excerpt-and-direct-answer",
      reason: "Page has impressions but weak CTR.",
    };
  }

  if (classification.pageType === "article" && !cfPage.aiBotRequests) {
    return {
      action: "strengthen-llms-topic-and-related-links",
      reason: "No AI crawler request was observed in the Cloudflare window.",
    };
  }

  if (cfPage.statuses && Object.keys(cfPage.statuses).some((status) => /^4|^5/.test(status))) {
    return {
      action: "investigate-crawl-status-code",
      reason: "Crawler requests include 4xx or 5xx responses.",
    };
  }

  return {
    action: "monitor",
    reason: "No urgent GEO/SEO action detected.",
  };
}

function buildSummary(items) {
  const summary = {
    totalUrls: items.length,
    articles: items.filter((item) => item.pageType === "article").length,
    topics: items.filter((item) => item.pageType === "topic").length,
    markets: items.filter((item) => item.pageType === "market").length,
    googlebotCrawled: items.filter((item) => item.googlebotRequests > 0).length,
    aiBotCrawled: items.filter((item) => item.aiBotCrawled).length,
    indexedOrInspected: items.filter((item) => !["unknown", "not_inspected"].includes(item.indexStatus)).length,
    actionCounts: {},
  };

  for (const item of items) countBy(summary.actionCounts, item.recommendedAction, 1);
  return summary;
}

function classifyUrl(url) {
  const pathname = new URL(url).pathname.replace(/\/$/, "");
  if (pathname === "") return { pageType: "index", topic: null, market: null };
  if (pathname.startsWith("/insights/topics/")) {
    return { pageType: "topic", topic: pathname.split("/").pop(), market: null };
  }
  if (pathname.startsWith("/insights/")) {
    return { pageType: "article", topic: inferTopicFromSlug(pathname.split("/").pop()), market: null };
  }
  if (pathname.startsWith("/markets/")) {
    return { pageType: "market", topic: null, market: pathname.split("/").pop() };
  }
  if (["/developer", "/media", "/community", "/bluewhale", "/join"].includes(pathname)) {
    return { pageType: "service", topic: null, market: null };
  }
  if (pathname === "/llms.txt" || pathname === "/llms-full.txt") {
    return { pageType: "llms", topic: null, market: null };
  }
  return { pageType: "other", topic: null, market: null };
}

function inferTopicFromSlug(slug) {
  if (!slug) return null;
  if (slug.includes("google-play") || slug.includes("android")) return "google-play";
  if (slug.includes("meta") || slug.includes("facebook") || slug.includes("pixel") || slug.includes("capi")) return "meta-ads";
  if (slug.includes("tiktok")) return "tiktok-ads";
  if (slug.includes("telegram")) return "telegram";
  if (slug.includes("ai-")) return "ai-apps";
  if (slug.includes("slots")) return "slots";
  if (slug.includes("cash-loan")) return "cash-loan";
  if (slug.includes("cpa") || slug.includes("publisher") || slug.includes("postback")) return "cpa-network";
  if (slug.includes("aso") || slug.includes("keyword") || slug.includes("organic")) return "aso";
  if (slug.includes("app-store") || slug.includes("ios")) return "app-store";
  return null;
}

function normalizeInspection(inspection) {
  const result = inspection.inspectionResult?.indexStatusResult || {};
  return {
    status: "ok",
    verdict: result.verdict || null,
    indexStatus: result.coverageState || result.verdict || "unknown",
    robotsTxtState: result.robotsTxtState || null,
    indexingState: result.indexingState || null,
    pageFetchState: result.pageFetchState || null,
    lastCrawlTime: result.lastCrawlTime || null,
    googleCanonical: result.googleCanonical || null,
    userCanonical: result.userCanonical || null,
  };
}

async function getGoogleAccessTokenFromEnv(env) {
  const serviceAccount = getGoogleServiceAccount(env);
  if (serviceAccount) return getGoogleServiceAccountAccessToken(serviceAccount);

  const oauthClient = getGoogleOAuthClient(env);
  if (oauthClient && env.GOOGLE_OAUTH_REFRESH_TOKEN) {
    return getGoogleOAuthAccessToken(oauthClient, env.GOOGLE_OAUTH_REFRESH_TOKEN);
  }

  return null;
}

async function getGoogleServiceAccountAccessToken(serviceAccount) {
  const now = Math.floor(Date.now() / 1000);
  const header = { alg: "RS256", typ: "JWT" };
  const claim = {
    iss: serviceAccount.client_email,
    scope: GOOGLE_SCOPE,
    aud: "https://oauth2.googleapis.com/token",
    iat: now,
    exp: now + 3600,
  };
  const signingInput = `${base64UrlJson(header)}.${base64UrlJson(claim)}`;
  const key = await crypto.subtle.importKey(
    "pkcs8",
    pemToArrayBuffer(serviceAccount.private_key),
    { name: "RSASSA-PKCS1-v1_5", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const signature = await crypto.subtle.sign("RSASSA-PKCS1-v1_5", key, new TextEncoder().encode(signingInput));
  const assertion = `${signingInput}.${base64UrlBytes(signature)}`;
  const body = new URLSearchParams({
    grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
    assertion,
  });
  const tokenData = await fetchJson("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: body.toString(),
  });

  return tokenData.access_token;
}

function getGoogleServiceAccount(env) {
  const json = env.GOOGLE_SERVICE_ACCOUNT_JSON || (env.GOOGLE_SERVICE_ACCOUNT_JSON_B64 ? atob(env.GOOGLE_SERVICE_ACCOUNT_JSON_B64) : null);
  if (!json) return null;
  return JSON.parse(json);
}

function getGoogleOAuthClient(env) {
  const json = env.GOOGLE_OAUTH_CLIENT_JSON || (env.GOOGLE_OAUTH_CLIENT_JSON_B64 ? atob(env.GOOGLE_OAUTH_CLIENT_JSON_B64) : null);
  if (!json) return null;
  const config = JSON.parse(json);
  const client = config.web || config.installed;
  if (!client?.client_id || !client?.client_secret) return null;
  return {
    clientId: client.client_id,
    clientSecret: client.client_secret,
  };
}

async function getGoogleOAuthAccessToken(client, refreshToken) {
  const body = new URLSearchParams({
    client_id: client.clientId,
    client_secret: client.clientSecret,
    refresh_token: refreshToken,
    grant_type: "refresh_token",
  });
  const tokenData = await fetchJson("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: body.toString(),
  });
  return tokenData.access_token;
}

function googleHeaders(accessToken) {
  return {
    Authorization: `Bearer ${accessToken}`,
    "Content-Type": "application/json",
  };
}

async function fetchJson(url, init = {}) {
  const response = await fetch(url, init);
  const text = await response.text();
  const json = text ? JSON.parse(text) : {};

  if (!response.ok) {
    throw new Error(`${url} returned ${response.status}: ${json.error?.message || text}`);
  }

  return json;
}

function buildDateRange(days) {
  const now = new Date();
  const gscEnd = new Date(now.getTime() - 2 * 86400000);
  const gscStart = new Date(gscEnd.getTime() - Math.max(days - 1, 1) * 86400000);
  const cfStart = new Date(now.getTime() - Math.max(days, 1) * 86400000);

  return {
    gscStartDate: dateOnly(gscStart),
    gscEndDate: dateOnly(gscEnd),
    cloudflareStartTime: cfStart.toISOString(),
    cloudflareEndTime: now.toISOString(),
  };
}

function getConfigurationStatus(env) {
  return {
    cloudflare: Boolean(env.CF_API_TOKEN && env.CF_ZONE_ID),
    googleSearchConsole: Boolean(((env.GOOGLE_SERVICE_ACCOUNT_JSON || env.GOOGLE_SERVICE_ACCOUNT_JSON_B64) || ((env.GOOGLE_OAUTH_CLIENT_JSON || env.GOOGLE_OAUTH_CLIENT_JSON_B64) && env.GOOGLE_OAUTH_REFRESH_TOKEN)) && env.GSC_SITE_URL),
    internalAuth: Boolean(env.GEO_SEO_INTERNAL_TOKEN),
    kv: Boolean(env.GEO_SEO_KV),
  };
}

function normalizeOrigin(origin) {
  return origin.replace(/\/$/, "");
}

function normalizeUrl(url) {
  if (!url) return "";
  const normalized = new URL(url);
  normalized.hash = "";
  normalized.search = "";
  if (!/\.[a-z0-9]+$/i.test(normalized.pathname) && !normalized.pathname.endsWith("/")) {
    normalized.pathname += "/";
  }
  return normalized.toString();
}

function latestIso(current, candidate) {
  if (!candidate) return current;
  if (!current) return candidate;
  return new Date(candidate) > new Date(current) ? candidate : current;
}

function findAiBot(userAgent) {
  const normalized = userAgent.toLowerCase();
  return AI_BOT_PATTERNS.find((pattern) => normalized.includes(pattern)) || null;
}

function countBy(target, key, value) {
  target[key] = (target[key] || 0) + value;
}

function dateOnly(date) {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: REPORT_TIME_ZONE,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(date);
  const values = Object.fromEntries(parts.map((part) => [part.type, part.value]));
  return `${values.year}-${values.month}-${values.day}`;
}

function jsonResponse(body, status = 200) {
  return new Response(JSON.stringify(body, null, 2), {
    status,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "no-store",
    },
  });
}

function safeErrorMessage(error) {
  return error instanceof Error ? error.message : String(error);
}

function base64UrlJson(value) {
  return base64UrlBytes(new TextEncoder().encode(JSON.stringify(value)));
}

function base64UrlBytes(value) {
  const bytes = value instanceof ArrayBuffer ? new Uint8Array(value) : value;
  let binary = "";
  for (const byte of bytes) binary += String.fromCharCode(byte);
  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

function pemToArrayBuffer(pem) {
  const base64 = pem
    .replace("-----BEGIN PRIVATE KEY-----", "")
    .replace("-----END PRIVATE KEY-----", "")
    .replace(/\s+/g, "");
  const binary = atob(base64);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i += 1) bytes[i] = binary.charCodeAt(i);
  return bytes.buffer;
}
