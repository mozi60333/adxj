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
const DASHBOARD_PATH = "/internal/geo-seo/dashboard";
const DASHBOARD_SESSION_COOKIE = "adxj_geo_dashboard";
const DASHBOARD_SESSION_SECONDS = 8 * 60 * 60;
const NOINDEX_HEADER = "noindex, nofollow, noarchive";

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

  if (url.pathname === DASHBOARD_PATH || url.pathname.startsWith(`${DASHBOARD_PATH}/`)) {
    return handleDashboardRequest(request, env);
  }

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

async function handleDashboardRequest(request, env) {
  const url = new URL(request.url);
  const isSessionValid = await hasDashboardSession(request, env);

  if ((url.pathname === DASHBOARD_PATH || url.pathname === `${DASHBOARD_PATH}/`) && request.method === "GET") {
    return htmlResponse(isSessionValid ? renderDashboardPage() : renderDashboardLoginPage());
  }

  if (url.pathname === `${DASHBOARD_PATH}/login` && request.method === "POST") {
    return handleDashboardLogin(request, env);
  }

  if (url.pathname === `${DASHBOARD_PATH}/logout` && request.method === "POST") {
    return redirectResponse(DASHBOARD_PATH, {
      "Set-Cookie": clearDashboardCookie(),
    });
  }

  if (!isSessionValid) {
    return jsonResponse({ error: "unauthorized" }, 401);
  }

  if (url.pathname === `${DASHBOARD_PATH}/api/latest` && request.method === "GET") {
    return readSnapshot(env, SNAPSHOT_LATEST_KEY);
  }

  if (url.pathname === `${DASHBOARD_PATH}/api/download` && request.method === "GET") {
    return downloadSnapshot(env, SNAPSHOT_LATEST_KEY);
  }

  if (url.pathname === `${DASHBOARD_PATH}/api/run` && request.method === "POST") {
    const snapshot = await runAndStoreSnapshot(env, { trigger: "dashboard" });
    return jsonResponse(snapshot);
  }

  return jsonResponse({ error: "not_found" }, 404);
}

async function handleDashboardLogin(request, env) {
  if (!env.GEO_SEO_INTERNAL_TOKEN) {
    return htmlResponse(renderDashboardLoginPage("Dashboard token is not configured."), 503);
  }

  const form = await request.formData();
  const token = String(form.get("token") || "");

  if (token !== env.GEO_SEO_INTERNAL_TOKEN) {
    return htmlResponse(renderDashboardLoginPage("Token is incorrect."), 401);
  }

  const session = await createDashboardSession(env);
  return redirectResponse(DASHBOARD_PATH, {
    "Set-Cookie": dashboardCookie(session),
  });
}

async function hasDashboardSession(request, env) {
  if (!env.GEO_SEO_INTERNAL_TOKEN) return false;
  const session = getCookie(request, DASHBOARD_SESSION_COOKIE);
  if (!session) return false;

  const [issuedAtValue, signature] = session.split(".");
  const issuedAt = Number(issuedAtValue);
  if (!issuedAt || !signature) return false;

  const ageSeconds = Math.floor(Date.now() / 1000) - issuedAt;
  if (ageSeconds < 0 || ageSeconds > DASHBOARD_SESSION_SECONDS) return false;

  const expected = await signDashboardValue(issuedAtValue, env);
  return timingSafeEqual(signature, expected);
}

async function createDashboardSession(env) {
  const issuedAt = String(Math.floor(Date.now() / 1000));
  const signature = await signDashboardValue(issuedAt, env);
  return `${issuedAt}.${signature}`;
}

async function signDashboardValue(value, env) {
  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(env.GEO_SEO_INTERNAL_TOKEN),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const signature = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(value));
  return base64UrlBytes(signature);
}

function getCookie(request, name) {
  const cookie = request.headers.get("Cookie") || "";
  for (const part of cookie.split(";")) {
    const [key, ...valueParts] = part.trim().split("=");
    if (key === name) return valueParts.join("=");
  }
  return "";
}

function dashboardCookie(value) {
  return `${DASHBOARD_SESSION_COOKIE}=${value}; Max-Age=${DASHBOARD_SESSION_SECONDS}; Path=${DASHBOARD_PATH}; HttpOnly; Secure; SameSite=Lax`;
}

function clearDashboardCookie() {
  return `${DASHBOARD_SESSION_COOKIE}=; Max-Age=0; Path=${DASHBOARD_PATH}; HttpOnly; Secure; SameSite=Lax`;
}

function timingSafeEqual(left, right) {
  if (left.length !== right.length) return false;
  let mismatch = 0;
  for (let index = 0; index < left.length; index += 1) {
    mismatch |= left.charCodeAt(index) ^ right.charCodeAt(index);
  }
  return mismatch === 0;
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

async function downloadSnapshot(env, key) {
  if (!env.GEO_SEO_KV) {
    return jsonResponse({ error: "missing_GEO_SEO_KV_binding" }, 503);
  }

  const snapshot = await env.GEO_SEO_KV.get(key, "json");
  if (!snapshot) {
    return jsonResponse({ error: "snapshot_not_found", key }, 404);
  }

  const date = snapshot.snapshotDate || "latest";
  return new Response(JSON.stringify(snapshot, null, 2), {
    status: 200,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Content-Disposition": `attachment; filename="geo-seo-snapshot-${date}.json"`,
      "Cache-Control": "no-store",
      "X-Robots-Tag": NOINDEX_HEADER,
    },
  });
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
  if ((!env.CF_API_TOKEN && !env.CF_API_KEY) || !env.CF_ZONE_ID) {
    return {
      status: "skipped",
      reason: "missing_cloudflare_credentials_or_CF_ZONE_ID",
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
            count
            dimensions {
              clientRequestPath
              edgeResponseStatus
              cacheStatus
              clientCountryName
              datetimeHour
            }
          }
        }
      }
    }
  `;

  const data = await fetchJson("https://api.cloudflare.com/client/v4/graphql", {
    method: "POST",
    headers: cloudflareApiHeaders(env),
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
    const requests = group.count || group.sum?.requests || 0;
    const isGoogle = userAgent.toLowerCase().includes("googlebot");
    const aiBot = findAiBot(userAgent);

    pages[url] ??= {
      totalRequests: 0,
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
    page.totalRequests += requests;
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
    if (userAgent) countBy(page.userAgents, userAgent, requests);
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
    cloudflareRequests: cfPage.totalRequests || 0,
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
  const cfStart = new Date(now.getTime() - 86400000);

  return {
    gscStartDate: dateOnly(gscStart),
    gscEndDate: dateOnly(gscEnd),
    cloudflareStartTime: cfStart.toISOString(),
    cloudflareEndTime: now.toISOString(),
  };
}

function getConfigurationStatus(env) {
  return {
    cloudflare: Boolean((env.CF_API_TOKEN || env.CF_API_KEY) && env.CF_ZONE_ID),
    googleSearchConsole: Boolean(((env.GOOGLE_SERVICE_ACCOUNT_JSON || env.GOOGLE_SERVICE_ACCOUNT_JSON_B64) || ((env.GOOGLE_OAUTH_CLIENT_JSON || env.GOOGLE_OAUTH_CLIENT_JSON_B64) && env.GOOGLE_OAUTH_REFRESH_TOKEN)) && env.GSC_SITE_URL),
    internalAuth: Boolean(env.GEO_SEO_INTERNAL_TOKEN),
    kv: Boolean(env.GEO_SEO_KV),
  };
}

function normalizeOrigin(origin) {
  return origin.replace(/\/$/, "");
}

function cloudflareApiHeaders(env) {
  const headers = { "Content-Type": "application/json" };
  const apiKey = env.CF_API_KEY || (env.CF_API_TOKEN?.startsWith("cfk_") ? env.CF_API_TOKEN : null);

  if (apiKey && env.CF_API_EMAIL) {
    headers["X-Auth-Email"] = env.CF_API_EMAIL;
    headers["X-Auth-Key"] = apiKey;
    return headers;
  }

  headers.Authorization = `Bearer ${env.CF_API_TOKEN}`;
  return headers;
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

function renderDashboardLoginPage(error = "") {
  return `<!doctype html>
<html lang="zh-CN">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="robots" content="${NOINDEX_HEADER}">
  <title>ADXJ GEO/SEO Internal Login</title>
  <style>
    :root { color-scheme: light; --ink:#14201c; --muted:#5d6a64; --line:#dce4df; --paper:#f7faf8; --panel:#ffffff; --accent:#0f766e; --danger:#b42318; }
    * { box-sizing: border-box; }
    body { margin: 0; min-height: 100vh; display: grid; place-items: center; background: var(--paper); color: var(--ink); font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif; }
    main { width: min(420px, calc(100vw - 32px)); background: var(--panel); border: 1px solid var(--line); border-radius: 8px; padding: 28px; box-shadow: 0 18px 60px rgba(20, 32, 28, .08); }
    h1 { margin: 0 0 8px; font-size: 24px; letter-spacing: 0; }
    p { margin: 0 0 22px; color: var(--muted); line-height: 1.6; }
    label { display: block; margin-bottom: 8px; color: var(--muted); font-size: 13px; font-weight: 700; }
    input { width: 100%; min-height: 44px; border: 1px solid var(--line); border-radius: 6px; padding: 0 12px; color: var(--ink); font: inherit; }
    button { width: 100%; min-height: 44px; margin-top: 14px; border: 0; border-radius: 6px; background: var(--accent); color: white; font-weight: 800; cursor: pointer; }
    .error { margin: 0 0 14px; padding: 10px 12px; border-radius: 6px; background: #fff4f2; border: 1px solid #ffd1cc; color: var(--danger); font-size: 13px; }
    .hint { margin-top: 16px; font-size: 12px; color: var(--muted); }
  </style>
</head>
<body>
  <main>
    <h1>ADXJ GEO/SEO</h1>
    <p>内部可视化观察页。输入内部 token 后查看最新 snapshot、搜索表现和抓取状态。</p>
    ${error ? `<div class="error">${escapeHtml(error)}</div>` : ""}
    <form method="post" action="${DASHBOARD_PATH}/login">
      <label for="token">Internal token</label>
      <input id="token" name="token" type="password" autocomplete="current-password" required autofocus>
      <button type="submit">登录</button>
    </form>
    <div class="hint">页面不会进入导航、sitemap 或 llms 索引。</div>
  </main>
</body>
</html>`;
}

function renderDashboardPage() {
  return `<!doctype html>
<html lang="zh-CN">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="robots" content="${NOINDEX_HEADER}">
  <title>ADXJ GEO/SEO Monitor</title>
  <style>
    :root {
      color-scheme: light;
      --ink:#14201c;
      --muted:#5d6a64;
      --line:#dce4df;
      --paper:#f7faf8;
      --panel:#ffffff;
      --accent:#0f766e;
      --accent-soft:#dff4ef;
      --amber:#b45309;
      --amber-soft:#fff7ed;
      --red:#b42318;
      --red-soft:#fff4f2;
      --blue:#2563eb;
      --blue-soft:#eff6ff;
      --shadow:0 12px 40px rgba(20,32,28,.07);
    }
    * { box-sizing: border-box; }
    body { margin: 0; background: var(--paper); color: var(--ink); font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif; }
    a { color: inherit; }
    button, input, select { font: inherit; }
    .shell { width: min(1500px, calc(100vw - 32px)); margin: 0 auto; padding: 24px 0 40px; }
    header { display: flex; align-items: flex-start; justify-content: space-between; gap: 16px; margin-bottom: 18px; }
    h1 { margin: 0; font-size: clamp(26px, 3vw, 40px); letter-spacing: 0; }
    .subtitle { margin-top: 8px; color: var(--muted); line-height: 1.6; max-width: 780px; }
    .actions { display: flex; flex-wrap: wrap; gap: 8px; justify-content: flex-end; }
    .btn { min-height: 38px; border: 1px solid var(--line); border-radius: 6px; background: var(--panel); color: var(--ink); padding: 0 12px; font-weight: 800; cursor: pointer; }
    .btn.primary { background: var(--accent); border-color: var(--accent); color: white; }
    .btn.warn { background: var(--amber-soft); border-color: #fed7aa; color: var(--amber); }
    .btn:disabled { opacity: .55; cursor: wait; }
    .grid { display: grid; gap: 12px; }
    .metrics { grid-template-columns: repeat(4, minmax(0, 1fr)); margin-bottom: 12px; }
    .panels { grid-template-columns: 1.2fr .8fr; align-items: start; }
    .card { background: var(--panel); border: 1px solid var(--line); border-radius: 8px; box-shadow: var(--shadow); }
    .metric { min-height: 112px; padding: 16px; display: flex; flex-direction: column; justify-content: space-between; }
    .metric span { color: var(--muted); font-size: 13px; font-weight: 800; }
    .metric strong { font-size: clamp(24px, 3vw, 36px); letter-spacing: 0; }
    .metric small { color: var(--muted); line-height: 1.4; }
    .section { padding: 16px; }
    .section h2 { margin: 0 0 14px; font-size: 17px; letter-spacing: 0; }
    .status-grid { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 8px; }
    .status { border: 1px solid var(--line); border-radius: 6px; padding: 10px; background: #fbfdfc; }
    .status b { display: block; margin-bottom: 6px; font-size: 12px; color: var(--muted); }
    .pill { display: inline-flex; align-items: center; min-height: 24px; border-radius: 999px; padding: 0 9px; font-size: 12px; font-weight: 900; background: var(--blue-soft); color: var(--blue); }
    .pill.ok { background: var(--accent-soft); color: var(--accent); }
    .pill.error { background: var(--red-soft); color: var(--red); }
    .pill.warn { background: var(--amber-soft); color: var(--amber); }
    .bar-list { display: grid; gap: 10px; }
    .bar-row { display: grid; grid-template-columns: minmax(120px, 1fr) 4fr 64px; gap: 10px; align-items: center; font-size: 13px; }
    .bar-label { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; color: var(--muted); }
    .bar-track { height: 10px; background: #edf3ef; border-radius: 999px; overflow: hidden; }
    .bar-fill { height: 100%; width: 0; background: var(--accent); border-radius: inherit; }
    .bar-value { text-align: right; font-weight: 900; }
    .notice { margin-top: 12px; padding: 12px; border-radius: 6px; background: var(--blue-soft); color: #1e3a8a; line-height: 1.55; font-size: 13px; }
    .filters { display: grid; grid-template-columns: 1.5fr repeat(5, minmax(130px, 1fr)); gap: 8px; margin-bottom: 12px; }
    input, select { width: 100%; min-height: 38px; border: 1px solid var(--line); border-radius: 6px; background: white; color: var(--ink); padding: 0 10px; }
    .table-wrap { overflow: auto; border: 1px solid var(--line); border-radius: 8px; background: white; }
    table { width: 100%; border-collapse: collapse; min-width: 1180px; }
    th, td { padding: 11px 10px; border-bottom: 1px solid #edf2ef; text-align: left; vertical-align: top; font-size: 13px; }
    th { position: sticky; top: 0; z-index: 1; background: #f8fbf9; color: var(--muted); font-size: 12px; text-transform: uppercase; letter-spacing: 0; }
    tr:last-child td { border-bottom: 0; }
    .url-cell { max-width: 360px; overflow-wrap: anywhere; font-weight: 800; }
    .muted { color: var(--muted); }
    .reason { max-width: 260px; color: var(--muted); line-height: 1.45; }
    .error-box { display: none; margin: 12px 0; padding: 12px; border: 1px solid #ffd1cc; border-radius: 6px; background: var(--red-soft); color: var(--red); line-height: 1.55; }
    .loading { color: var(--muted); padding: 12px 0; }
    .footer-note { margin-top: 14px; color: var(--muted); font-size: 12px; line-height: 1.6; }
    @media (max-width: 1100px) { .metrics, .panels, .status-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); } .filters { grid-template-columns: repeat(2, minmax(0, 1fr)); } }
    @media (max-width: 720px) { .shell { width: min(100vw - 20px, 1500px); padding-top: 16px; } header { display: block; } .actions { justify-content: flex-start; margin-top: 14px; } .metrics, .panels, .status-grid, .filters { grid-template-columns: 1fr; } }
  </style>
</head>
<body>
  <div class="shell">
    <header>
      <div>
        <h1>ADXJ GEO/SEO Monitor</h1>
        <div class="subtitle" id="snapshotMeta">读取内部 snapshot 中...</div>
      </div>
      <div class="actions">
        <button class="btn" id="refreshButton" type="button">刷新 latest</button>
        <button class="btn primary" id="runButton" type="button">手动生成 snapshot</button>
        <button class="btn" id="downloadButton" type="button">下载 JSON</button>
        <form method="post" action="${DASHBOARD_PATH}/logout">
          <button class="btn warn" type="submit">退出</button>
        </form>
      </div>
    </header>

    <div id="errorBox" class="error-box"></div>

    <section class="grid metrics" id="metrics"></section>

    <section class="grid panels">
      <div class="card section">
        <h2>数据源状态</h2>
        <div class="status-grid" id="sourceStatus"></div>
        <div class="notice">AI bot 精准 User-Agent 抓取状态第一版不做精确归因；当前页面使用 Cloudflare GraphQL 聚合请求、状态码和 GSC 数据。后续接入 Logpush/HTTP request logs 后，可精确区分 GPTBot、Googlebot、PerplexityBot。</div>
      </div>
      <div class="card section">
        <h2>推荐动作分布</h2>
        <div class="bar-list" id="actionBars"></div>
      </div>
      <div class="card section">
        <h2>页面类型分布</h2>
        <div class="bar-list" id="typeBars"></div>
      </div>
      <div class="card section">
        <h2>状态码分布</h2>
        <div class="bar-list" id="statusBars"></div>
      </div>
      <div class="card section" style="grid-column: 1 / -1;">
        <h2>Cloudflare 请求 Top URL</h2>
        <div class="bar-list" id="requestBars"></div>
      </div>
    </section>

    <section class="card section" style="margin-top: 12px;">
      <h2>URL 明细</h2>
      <div class="filters">
        <input id="searchInput" type="search" placeholder="搜索 URL、topic、market、query、原因">
        <select id="typeFilter"></select>
        <select id="topicFilter"></select>
        <select id="marketFilter"></select>
        <select id="actionFilter"></select>
        <select id="statusFilter"></select>
      </div>
      <div class="filters" style="grid-template-columns: minmax(180px, 240px) minmax(140px, 180px);">
        <select id="sortSelect">
          <option value="priority">按优先级排序</option>
          <option value="impressions">按展示排序</option>
          <option value="clicks">按点击排序</option>
          <option value="requests">按 Cloudflare 请求排序</option>
          <option value="ctr">按 CTR 排序</option>
          <option value="position">按排名排序</option>
        </select>
        <select id="directionSelect">
          <option value="desc">降序</option>
          <option value="asc">升序</option>
        </select>
      </div>
      <div class="table-wrap">
        <table>
          <thead>
            <tr>
              <th>URL</th>
              <th>类型</th>
              <th>Topic/Market</th>
              <th>展示</th>
              <th>点击</th>
              <th>CTR</th>
              <th>排名</th>
              <th>CF 请求</th>
              <th>状态码</th>
              <th>推荐动作</th>
              <th>原因</th>
            </tr>
          </thead>
          <tbody id="tableBody">
            <tr><td colspan="11" class="loading">正在加载...</td></tr>
          </tbody>
        </table>
      </div>
      <div class="footer-note" id="tableNote"></div>
    </section>
  </div>
  <script>
    const state = {
      snapshot: null,
      filters: { search: "", type: "", topic: "", market: "", action: "", status: "" },
      sort: "priority",
      direction: "desc",
      busy: false,
    };

    const actionPriority = {
      "investigate-crawl-status-code": 5,
      "refresh-answer-faq-and-internal-links": 4,
      "rewrite-title-excerpt-and-direct-answer": 3,
      "strengthen-llms-topic-and-related-links": 2,
      monitor: 1,
    };
    const numberFormatter = new Intl.NumberFormat("en-US");

    const elements = {
      metrics: document.getElementById("metrics"),
      sourceStatus: document.getElementById("sourceStatus"),
      actionBars: document.getElementById("actionBars"),
      typeBars: document.getElementById("typeBars"),
      statusBars: document.getElementById("statusBars"),
      requestBars: document.getElementById("requestBars"),
      tableBody: document.getElementById("tableBody"),
      tableNote: document.getElementById("tableNote"),
      snapshotMeta: document.getElementById("snapshotMeta"),
      errorBox: document.getElementById("errorBox"),
      refreshButton: document.getElementById("refreshButton"),
      runButton: document.getElementById("runButton"),
      downloadButton: document.getElementById("downloadButton"),
      searchInput: document.getElementById("searchInput"),
      typeFilter: document.getElementById("typeFilter"),
      topicFilter: document.getElementById("topicFilter"),
      marketFilter: document.getElementById("marketFilter"),
      actionFilter: document.getElementById("actionFilter"),
      statusFilter: document.getElementById("statusFilter"),
      sortSelect: document.getElementById("sortSelect"),
      directionSelect: document.getElementById("directionSelect"),
    };

    elements.refreshButton.addEventListener("click", () => loadSnapshot());
    elements.runButton.addEventListener("click", () => runSnapshot());
    elements.downloadButton.addEventListener("click", () => downloadSnapshot());
    elements.searchInput.addEventListener("input", (event) => { state.filters.search = event.target.value; render(); });
    for (const [key, element] of [["type", elements.typeFilter], ["topic", elements.topicFilter], ["market", elements.marketFilter], ["action", elements.actionFilter], ["status", elements.statusFilter]]) {
      element.addEventListener("change", (event) => { state.filters[key] = event.target.value; render(); });
    }
    elements.sortSelect.addEventListener("change", (event) => { state.sort = event.target.value; render(); });
    elements.directionSelect.addEventListener("change", (event) => { state.direction = event.target.value; render(); });

    loadSnapshot();

    async function loadSnapshot() {
      return withBusy("读取 latest 中...", async () => {
        state.snapshot = await apiJson("${DASHBOARD_PATH}/api/latest");
        render();
      });
    }

    async function runSnapshot() {
      return withBusy("正在生成新的 snapshot，可能需要几秒...", async () => {
        state.snapshot = await apiJson("${DASHBOARD_PATH}/api/run", { method: "POST" });
        render();
      });
    }

    async function withBusy(message, task) {
      state.busy = true;
      setButtons();
      showError("");
      elements.snapshotMeta.textContent = message;
      try {
        await task();
      } catch (error) {
        showError(error.message || String(error));
      } finally {
        state.busy = false;
        setButtons();
      }
    }

    async function apiJson(url, options = {}) {
      const response = await fetch(url, {
        ...options,
        headers: { Accept: "application/json", ...(options.headers || {}) },
      });
      const text = await response.text();
      const data = text ? JSON.parse(text) : {};
      if (!response.ok) throw new Error(data.error || text || "Request failed");
      return data;
    }

    function render() {
      if (!state.snapshot) return;
      const snapshot = state.snapshot;
      const items = snapshot.items || [];
      const summary = snapshot.summary || {};
      const clicks = sum(items, "gscClicks");
      const impressions = sum(items, "gscImpressions");
      const requests = sum(items, "cloudflareRequests");
      const pending = items.filter((item) => item.recommendedAction && item.recommendedAction !== "monitor").length;

      elements.snapshotMeta.textContent = "Snapshot " + (snapshot.snapshotDate || "-") + " / generated " + formatDateTime(snapshot.generatedAt) + " / GSC " + rangeText(snapshot.dateRange);
      elements.metrics.innerHTML = [
        metric("总 URL", formatNumber(summary.totalUrls ?? items.length), "纳入 sitemap 与 llms 的可优化页面"),
        metric("文章", formatNumber(summary.articles || 0), "专题 " + formatNumber(summary.topics || 0) + " / 市场页 " + formatNumber(summary.markets || 0)),
        metric("GSC 展示", formatNumber(impressions), "点击 " + formatNumber(clicks) + " / CTR " + formatPercent(clicks / Math.max(impressions, 1))),
        metric("Cloudflare 请求", formatNumber(requests), "最近 24 小时聚合请求"),
        metric("待处理动作", formatNumber(pending), "monitor 之外的优化候选"),
        metric("索引/检查", formatNumber(summary.indexedOrInspected || 0), "URL Inspection 当前抽样结果"),
        metric("Googlebot", formatNumber(summary.googlebotCrawled || 0), "精准 UA 需 Logpush 增强"),
        metric("AI Bot", formatNumber(summary.aiBotCrawled || 0), "精准 UA 需 Logpush 增强"),
      ].join("");

      renderSources(snapshot);
      syncFilters(items);
      renderBars(elements.actionBars, objectEntries(summary.actionCounts || countByKey(items, "recommendedAction")));
      renderBars(elements.typeBars, objectEntries(countByKey(items, "pageType")));
      renderBars(elements.statusBars, objectEntries(statusCounts(items)));
      renderBars(elements.requestBars, topRequests(items), { urlLabels: true });
      renderTable(items);
    }

    function renderSources(snapshot) {
      const status = snapshot.sourceStatus || {};
      const publicIndexes = status.publicIndexes || {};
      const entries = [
        ["Google Search Console", status.googleSearchConsole],
        ["Cloudflare", status.cloudflare],
        ["sitemap.xml", publicIndexes.sitemap],
        ["llms-full.txt", publicIndexes.llmsFull],
      ];
      elements.sourceStatus.innerHTML = entries.map(([label, value]) => "<div class=\\"status\\"><b>" + escapeHtml(label) + "</b>" + pill(value || "unknown") + "</div>").join("");
      const errors = snapshot.errors || [];
      if (errors.length) {
        showError(errors.map((error) => (error.source || "source") + ": " + (error.message || "unknown error")).join("\\n"));
      }
    }

    function syncFilters(items) {
      fillSelect(elements.typeFilter, "全部类型", unique(items.map((item) => item.pageType)), state.filters.type);
      fillSelect(elements.topicFilter, "全部 topic", unique(items.map((item) => item.topic).filter(Boolean)), state.filters.topic);
      fillSelect(elements.marketFilter, "全部 market", unique(items.map((item) => item.market).filter(Boolean)), state.filters.market);
      fillSelect(elements.actionFilter, "全部动作", unique(items.map((item) => item.recommendedAction).filter(Boolean)), state.filters.action);
      fillSelect(elements.statusFilter, "全部状态码", unique(items.flatMap((item) => Object.keys(item.crawlerStatuses || {}))), state.filters.status);
    }

    function fillSelect(element, label, values, current) {
      const options = ["<option value=\\"\\">" + escapeHtml(label) + "</option>"].concat(values.map((value) => "<option value=\\"" + escapeHtml(value) + "\\">" + escapeHtml(value) + "</option>"));
      element.innerHTML = options.join("");
      element.value = current;
    }

    function renderBars(target, entries, options = {}) {
      if (!entries.length) {
        target.innerHTML = "<div class=\\"muted\\">暂无数据</div>";
        return;
      }
      const max = Math.max(...entries.map((entry) => entry.value), 1);
      target.innerHTML = entries.slice(0, 10).map((entry) => {
        const width = Math.max(4, Math.round((entry.value / max) * 100));
        const label = options.urlLabels ? shortUrl(entry.label) : entry.label;
        return "<div class=\\"bar-row\\"><div class=\\"bar-label\\" title=\\"" + escapeHtml(entry.label) + "\\">" + escapeHtml(label) + "</div><div class=\\"bar-track\\"><div class=\\"bar-fill\\" style=\\"width:" + width + "%\\"></div></div><div class=\\"bar-value\\">" + formatNumber(entry.value) + "</div></div>";
      }).join("");
    }

    function renderTable(items) {
      const filtered = filteredItems(items);
      const sorted = sortItems(filtered);
      elements.tableNote.textContent = "显示 " + formatNumber(sorted.length) + " / " + formatNumber(items.length) + " 个 URL。";
      if (!sorted.length) {
        elements.tableBody.innerHTML = "<tr><td colspan=\\"11\\" class=\\"loading\\">没有匹配 URL。</td></tr>";
        return;
      }
      elements.tableBody.innerHTML = sorted.map((item) => {
        const statusText = Object.keys(item.crawlerStatuses || {}).join(", ") || "-";
        const topicMarket = [item.topic, item.market].filter(Boolean).join(" / ") || "-";
        return "<tr>"
          + "<td class=\\"url-cell\\"><a href=\\"" + escapeHtml(item.url) + "\\" target=\\"_blank\\" rel=\\"noreferrer\\">" + escapeHtml(stripOrigin(item.url)) + "</a><div class=\\"muted\\">" + escapeHtml(item.indexStatus || "unknown") + "</div></td>"
          + "<td>" + pill(item.pageType || "other") + "</td>"
          + "<td>" + escapeHtml(topicMarket) + "</td>"
          + "<td>" + formatNumber(item.gscImpressions || 0) + "</td>"
          + "<td>" + formatNumber(item.gscClicks || 0) + "</td>"
          + "<td>" + formatPercent(item.ctr || 0) + "</td>"
          + "<td>" + (item.position ? item.position.toFixed(2) : "-") + "</td>"
          + "<td>" + formatNumber(item.cloudflareRequests || 0) + "</td>"
          + "<td>" + escapeHtml(statusText) + "</td>"
          + "<td>" + pill(item.recommendedAction || "monitor") + "</td>"
          + "<td class=\\"reason\\">" + escapeHtml(item.actionReason || "-") + "</td>"
          + "</tr>";
      }).join("");
    }

    function filteredItems(items) {
      const search = state.filters.search.trim().toLowerCase();
      return items.filter((item) => {
        if (state.filters.type && item.pageType !== state.filters.type) return false;
        if (state.filters.topic && item.topic !== state.filters.topic) return false;
        if (state.filters.market && item.market !== state.filters.market) return false;
        if (state.filters.action && item.recommendedAction !== state.filters.action) return false;
        if (state.filters.status && !Object.keys(item.crawlerStatuses || {}).includes(state.filters.status)) return false;
        if (!search) return true;
        const haystack = [
          item.url,
          item.pageType,
          item.topic,
          item.market,
          item.recommendedAction,
          item.actionReason,
          ...(item.topQueries || []).map((query) => query.query),
        ].filter(Boolean).join(" ").toLowerCase();
        return haystack.includes(search);
      });
    }

    function sortItems(items) {
      const copy = [...items];
      const direction = state.direction === "asc" ? 1 : -1;
      copy.sort((a, b) => {
        const left = sortValue(a, state.sort);
        const right = sortValue(b, state.sort);
        if (typeof left === "string" || typeof right === "string") return String(left).localeCompare(String(right)) * direction;
        return (left - right) * direction;
      });
      return copy;
    }

    function sortValue(item, key) {
      if (key === "priority") return actionPriority[item.recommendedAction] || 0;
      if (key === "impressions") return item.gscImpressions || 0;
      if (key === "clicks") return item.gscClicks || 0;
      if (key === "requests") return item.cloudflareRequests || 0;
      if (key === "ctr") return item.ctr || 0;
      if (key === "position") return item.position || 999;
      return item.url || "";
    }

    function downloadSnapshot() {
      window.location.href = "${DASHBOARD_PATH}/api/download";
    }

    function setButtons() {
      for (const button of [elements.refreshButton, elements.runButton, elements.downloadButton]) button.disabled = state.busy;
    }

    function showError(message) {
      elements.errorBox.style.display = message ? "block" : "none";
      elements.errorBox.textContent = message;
    }

    function metric(label, value, hint) {
      return "<div class=\\"card metric\\"><span>" + escapeHtml(label) + "</span><strong>" + escapeHtml(String(value)) + "</strong><small>" + escapeHtml(hint || "") + "</small></div>";
    }

    function pill(value) {
      const normalized = String(value || "unknown");
      let tone = "";
      if (["ok", "monitor", "article", "topic", "market", "service", "index"].includes(normalized)) tone = " ok";
      else if (["error", "unauthorized"].includes(normalized) || normalized.startsWith("investigate")) tone = " error";
      else if (["skipped", "unknown", "not_inspected"].includes(normalized)) tone = " warn";
      return "<span class=\\"pill" + tone + "\\">" + escapeHtml(normalized) + "</span>";
    }

    function objectEntries(object) {
      return Object.entries(object || {}).map(([label, value]) => ({ label, value: Number(value) || 0 })).sort((a, b) => b.value - a.value || a.label.localeCompare(b.label));
    }

    function countByKey(items, key) {
      return items.reduce((accumulator, item) => {
        const value = item[key] || "unknown";
        accumulator[value] = (accumulator[value] || 0) + 1;
        return accumulator;
      }, {});
    }

    function statusCounts(items) {
      return items.reduce((accumulator, item) => {
        for (const [status, count] of Object.entries(item.crawlerStatuses || {})) {
          accumulator[status] = (accumulator[status] || 0) + Number(count || 0);
        }
        return accumulator;
      }, {});
    }

    function topRequests(items) {
      return items
        .filter((item) => (item.cloudflareRequests || 0) > 0)
        .sort((a, b) => (b.cloudflareRequests || 0) - (a.cloudflareRequests || 0))
        .slice(0, 10)
        .map((item) => ({ label: item.url, value: item.cloudflareRequests || 0 }));
    }

    function unique(values) {
      return [...new Set(values)].sort((a, b) => a.localeCompare(b));
    }

    function sum(items, key) {
      return items.reduce((total, item) => total + Number(item[key] || 0), 0);
    }

    function rangeText(range) {
      if (!range) return "-";
      return (range.gscStartDate || "-") + " to " + (range.gscEndDate || "-");
    }

    function formatNumber(value) {
      return numberFormatter.format(Number(value || 0));
    }

    function formatPercent(value) {
      return (Number(value || 0) * 100).toFixed(2) + "%";
    }

    function formatDateTime(value) {
      if (!value) return "-";
      return new Date(value).toLocaleString("zh-CN", { timeZone: "Asia/Shanghai", hour12: false });
    }

    function stripOrigin(url) {
      try { return new URL(url).pathname; } catch { return url; }
    }

    function shortUrl(url) {
      const path = stripOrigin(url);
      return path.length > 72 ? path.slice(0, 69) + "..." : path;
    }

    function escapeHtml(value) {
      return String(value ?? "").replace(/[&<>"']/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[char]));
    }
  </script>
</body>
</html>`;
}

function htmlResponse(body, status = 200) {
  return new Response(body, {
    status,
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      "Cache-Control": "no-store",
      "X-Robots-Tag": NOINDEX_HEADER,
      "Content-Security-Policy": "default-src 'none'; script-src 'unsafe-inline'; style-src 'unsafe-inline'; connect-src 'self'; form-action 'self'; base-uri 'none'; frame-ancestors 'none'",
      "Referrer-Policy": "no-referrer",
    },
  });
}

function redirectResponse(location, extraHeaders = {}) {
  return new Response(null, {
    status: 303,
    headers: {
      Location: location,
      "Cache-Control": "no-store",
      "X-Robots-Tag": NOINDEX_HEADER,
      ...extraHeaders,
    },
  });
}

function escapeHtml(value) {
  return String(value ?? "").replace(/[&<>"']/g, (char) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;",
  })[char]);
}

function jsonResponse(body, status = 200) {
  return new Response(JSON.stringify(body, null, 2), {
    status,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "no-store",
      "X-Robots-Tag": NOINDEX_HEADER,
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
