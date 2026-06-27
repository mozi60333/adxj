# GEO/SEO 后台自动化

本项目不做公开看板。Cloudflare Worker 每天生成内部 `geo-seo-daily-snapshot`，Codex 每天读取 snapshot 后只优化内容与内链，并创建 PR。

## Worker 接口

- `GET /internal/geo-seo/health`
- `GET /internal/geo-seo/snapshot/latest`
- `GET /internal/geo-seo/snapshot/YYYY-MM-DD`
- `POST /internal/geo-seo/run`

所有接口都需要：

```txt
Authorization: Bearer <GEO_SEO_INTERNAL_TOKEN>
```

## 必需绑定和 secrets

创建 KV namespace 后，把 binding 命名为 `GEO_SEO_KV`。

```bash
wrangler secret put GEO_SEO_INTERNAL_TOKEN
wrangler secret put CF_API_TOKEN
wrangler secret put CF_ZONE_ID
wrangler secret put GSC_SITE_URL
wrangler secret put GOOGLE_SERVICE_ACCOUNT_JSON_B64
```

`GOOGLE_SERVICE_ACCOUNT_JSON_B64` 是 Google service account JSON 的 base64 编码。服务账号需要加入 Google Search Console 属性用户。

## 数据来源

- Cloudflare GraphQL Analytics: 读取 Googlebot、OAI-SearchBot、GPTBot、ChatGPT-User、PerplexityBot、Perplexity-User 的访问路径、状态码、缓存状态和最近访问时间。
- Google Search Console Search Analytics: 读取 URL/query/date 的展示、点击、CTR、平均排名。
- Google URL Inspection: 抽查重点文章的索引状态、canonical 和最近抓取。
- Google Sitemaps: 读取 sitemap 识别状态。

## 本地验证

没有线上 secrets 时可以用 mock snapshot：

```bash
npm run geo:optimize:mock
```

真实环境读取：

```bash
GEO_SEO_SNAPSHOT_URL=https://adxj.com/internal/geo-seo/snapshot/latest \
GEO_SEO_INTERNAL_TOKEN=... \
npm run geo:optimize
```

每日 Codex 自动化应读取 action plan，只允许更新文章内容、FAQ、直接答案、相关文章和 llms 索引，然后创建 PR。
