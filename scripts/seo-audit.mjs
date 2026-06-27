import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const outDir = path.join(root, "out");
const sitemapPath = path.join(outDir, "sitemap.xml");

function fail(message) {
  console.error(`SEO audit failed: ${message}`);
  process.exitCode = 1;
}

function read(filePath) {
  return fs.readFileSync(filePath, "utf8");
}

function uniqueDuplicates(items) {
  const seen = new Set();
  const duplicates = new Set();
  for (const item of items) {
    if (seen.has(item)) duplicates.add(item);
    seen.add(item);
  }
  return [...duplicates];
}

if (!fs.existsSync(sitemapPath)) {
  fail("out/sitemap.xml does not exist. Run npm run build first.");
} else {
  const sitemap = read(sitemapPath);
  const urls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]);
  const duplicates = uniqueDuplicates(urls);
  if (duplicates.length) fail(`duplicate sitemap URLs: ${duplicates.join(", ")}`);
  for (const url of urls) {
    if (!url.startsWith("https://adxj.com/")) fail(`non-canonical sitemap URL: ${url}`);
    if (!/\.[a-z0-9]+$/i.test(url) && !url.endsWith("/")) fail(`missing trailing slash: ${url}`);
  }
  console.log(`sitemap URLs: ${urls.length}`);
}

const insightDir = path.join(root, "app", "insights");
const articleFiles = fs
  .readdirSync(insightDir)
  .filter((file) => file === "articles.ts" || file === "extra-articles.ts" || file === "geo-signal-articles.ts" || file.startsWith("daily-articles"))
  .map((file) => path.join(insightDir, file));
const articleText = articleFiles.map(read).join("\n");
const slugs = [...articleText.matchAll(/slug:\s*"([^"]+)"/g)].map((match) => match[1]);
const covers = [...articleText.matchAll(/coverImage:\s*"\/insights\/([^"]+)"/g)].map((match) => match[1]);
const duplicateSlugs = uniqueDuplicates(slugs);

if (duplicateSlugs.length) fail(`duplicate article slugs: ${duplicateSlugs.join(", ")}`);
for (const cover of covers) {
  const coverPath = path.join(root, "public", "insights", cover);
  if (!fs.existsSync(coverPath)) fail(`missing article cover image: ${cover}`);
}
console.log(`article slugs: ${slugs.length}`);
console.log(`article cover images: ${covers.length}`);

const topicText = read(path.join(insightDir, "topics.ts"));
const topicSlugs = [...topicText.matchAll(/slug:\s*"([^"]+)"/g)].map((match) => match[1]);
const sitemap = fs.existsSync(sitemapPath) ? read(sitemapPath) : "";
for (const topicSlug of topicSlugs) {
  const topicUrl = `https://adxj.com/insights/topics/${topicSlug}/`;
  if (!sitemap.includes(topicUrl)) fail(`missing topic URL in sitemap: ${topicUrl}`);
}
console.log(`topic pages: ${topicSlugs.length}`);

const geoSignalText = read(path.join(insightDir, "geo-signal-articles.ts"));
const geoSignalSlugs = [...geoSignalText.matchAll(/slug:\s*"([^"]+)"/g)].map((match) => match[1]);
const geoSignalTopics = [...geoSignalText.matchAll(/topic:\s*"([^"]+)"/g)].map((match) => match[1]);
const geoTopicCounts = geoSignalTopics.reduce((counts, topic) => {
  counts[topic] = (counts[topic] || 0) + 1;
  return counts;
}, {});
if (geoSignalSlugs.length !== 40) fail(`geo signal articles should be 40, found ${geoSignalSlugs.length}`);
for (const topicSlug of topicSlugs) {
  if (geoTopicCounts[topicSlug] !== 4) fail(`topic ${topicSlug} should have 4 geo signal articles, found ${geoTopicCounts[topicSlug] || 0}`);
}
for (const slug of geoSignalSlugs) {
  const articleUrl = `https://adxj.com/insights/${slug}/`;
  if (!sitemap.includes(articleUrl)) fail(`missing geo article URL in sitemap: ${articleUrl}`);
}
console.log(`geo signal articles: ${geoSignalSlugs.length}`);

for (const textFile of ["llms.txt", "llms-full.txt", "robots.txt"]) {
  const filePath = path.join(outDir, textFile);
  if (!fs.existsSync(filePath)) fail(`missing built text file: ${textFile}`);
}
if (fs.existsSync(path.join(outDir, "llms-full.txt"))) {
  const llmsFull = read(path.join(outDir, "llms-full.txt"));
  for (const slug of geoSignalSlugs) {
    if (!llmsFull.includes(`https://adxj.com/insights/${slug}/`)) fail(`missing geo article URL in llms-full: ${slug}`);
  }
}
console.log("robots and llms checks passed");

const htmlChecks = [
  "index.html",
  "developer/index.html",
  "media/index.html",
  "insights/index.html",
  "insights/google-play-old-app-update-target-api-sdk-fix/index.html",
];
for (const htmlFile of htmlChecks) {
  const htmlPath = path.join(outDir, htmlFile);
  if (!fs.existsSync(htmlPath)) {
    fail(`missing built HTML: ${htmlFile}`);
    continue;
  }
  const html = read(htmlPath);
  const h1Count = (html.match(/<h1\b/g) ?? []).length;
  if (h1Count !== 1) fail(`${htmlFile} should have exactly one h1, found ${h1Count}`);
  if (!html.includes('type="application/ld+json"')) fail(`${htmlFile} missing JSON-LD`);
  if (!html.includes("https://t.me/M7HHHH")) fail(`${htmlFile} missing Telegram link`);
}
console.log("HTML spot checks passed");

function walkHtml(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  return entries.flatMap((entry) => {
    const entryPath = path.join(dir, entry.name);
    if (entry.isDirectory()) return walkHtml(entryPath);
    return entry.name.endsWith(".html") ? [entryPath] : [];
  });
}

const indexableHtmlFiles = walkHtml(outDir).filter((filePath) => {
  const relativePath = path.relative(outDir, filePath);
  return !relativePath.includes("_not-found") && !relativePath.startsWith("404");
});
const titleByPage = [];
const descriptionByPage = [];

for (const htmlPath of indexableHtmlFiles) {
  const relativePath = path.relative(outDir, htmlPath);
  const html = read(htmlPath);
  const title = html.match(/<title>(.*?)<\/title>/)?.[1];
  const description = html.match(/<meta name="description" content="([^"]*)"/)?.[1];
  const canonical = html.match(/<link rel="canonical" href="([^"]*)"/)?.[1];
  const ogImage = html.match(/<meta property="og:image" content="([^"]*)"/)?.[1];

  if (!title) fail(`${relativePath} missing title`);
  if (!description) fail(`${relativePath} missing meta description`);
  if (!canonical) fail(`${relativePath} missing canonical`);
  if (!ogImage) fail(`${relativePath} missing og:image`);
  if (canonical && !canonical.startsWith("https://adxj.com/")) fail(`${relativePath} has non-canonical URL: ${canonical}`);
  if (canonical && !/\.[a-z0-9]+$/i.test(canonical) && !canonical.endsWith("/")) fail(`${relativePath} canonical missing trailing slash: ${canonical}`);

  if (title) titleByPage.push({ value: title, page: relativePath });
  if (description) descriptionByPage.push({ value: description, page: relativePath });
}

for (const [label, items] of [["title", titleByPage], ["description", descriptionByPage]]) {
  const values = items.map((item) => item.value);
  for (const duplicate of uniqueDuplicates(values)) {
    const pages = items.filter((item) => item.value === duplicate).map((item) => item.page).join(", ");
    fail(`duplicate ${label}: ${duplicate} (${pages})`);
  }
}

console.log(`metadata checks: ${indexableHtmlFiles.length} pages`);
