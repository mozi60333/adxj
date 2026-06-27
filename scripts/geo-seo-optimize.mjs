import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const mockSnapshotPath = path.join(root, "data", "geo-seo", "mock-snapshot.json");
const args = new Set(process.argv.slice(2));
const writeIndex = process.argv.indexOf("--write");
const limitIndex = process.argv.indexOf("--limit");
const limit = limitIndex > -1 ? Number(process.argv[limitIndex + 1]) : 12;

function usage() {
  console.log(`Usage:
  node scripts/geo-seo-optimize.mjs --mock
  GEO_SEO_SNAPSHOT_URL=https://adxj.com/internal/geo-seo/snapshot/latest GEO_SEO_INTERNAL_TOKEN=... node scripts/geo-seo-optimize.mjs
  node scripts/geo-seo-optimize.mjs --mock --write tmp/geo-seo-action-plan.json`);
}

async function loadSnapshot() {
  if (args.has("--help")) {
    usage();
    process.exit(0);
  }

  if (args.has("--mock")) {
    return JSON.parse(fs.readFileSync(mockSnapshotPath, "utf8"));
  }

  const snapshotUrl = process.env.GEO_SEO_SNAPSHOT_URL;
  const token = process.env.GEO_SEO_INTERNAL_TOKEN;

  if (!snapshotUrl || !token) {
    throw new Error("Set GEO_SEO_SNAPSHOT_URL and GEO_SEO_INTERNAL_TOKEN, or run with --mock.");
  }

  const response = await fetch(snapshotUrl, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
    },
  });

  if (!response.ok) {
    throw new Error(`Snapshot request failed: ${response.status} ${await response.text()}`);
  }

  return response.json();
}

function rankItem(item) {
  const actionWeight = {
    "investigate-crawl-status-code": 100,
    "refresh-answer-faq-and-internal-links": 90,
    "rewrite-title-excerpt-and-direct-answer": 80,
    "strengthen-llms-topic-and-related-links": 70,
    monitor: 0,
  }[item.recommendedAction] ?? 10;
  const impressionWeight = Math.min(item.gscImpressions || 0, 1000) / 20;
  const staleWeight = item.lastGoogleCrawl ? 0 : 15;
  return actionWeight + impressionWeight + staleWeight;
}

function buildActionPlan(snapshot) {
  const candidates = (snapshot.items || [])
    .filter((item) => item.recommendedAction && item.recommendedAction !== "monitor")
    .map((item) => ({
      ...item,
      priorityScore: Number(rankItem(item).toFixed(2)),
    }))
    .sort((a, b) => b.priorityScore - a.priorityScore)
    .slice(0, limit);

  return {
    generatedAt: new Date().toISOString(),
    snapshotGeneratedAt: snapshot.generatedAt,
    snapshotDate: snapshot.snapshotDate,
    sourceStatus: snapshot.sourceStatus,
    summary: snapshot.summary,
    candidates,
    instructions: [
      "Only update article content, answerSummary, FAQs, relatedSlugs, and llms index entries.",
      "Do not change navigation, service pages, global layout, robots, or sitemap generation unless a crawl-status action explicitly requires it.",
      "Run eslint, next build, and seo:audit before creating the PR.",
    ],
  };
}

const snapshot = await loadSnapshot();
const actionPlan = buildActionPlan(snapshot);

if (writeIndex > -1) {
  const targetPath = path.resolve(root, process.argv[writeIndex + 1]);
  fs.mkdirSync(path.dirname(targetPath), { recursive: true });
  fs.writeFileSync(targetPath, `${JSON.stringify(actionPlan, null, 2)}\n`);
}

console.log(JSON.stringify(actionPlan, null, 2));
