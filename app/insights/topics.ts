const topicDefinitions = [
  {
    slug: "app-store",
    name: "App Store",
    heroTitle: "App Store 审核、订阅与 iOS 上架专题",
    description:
      "围绕 iOS 应用上架、App Store 审核被拒、订阅审核、隐私披露、审核账号和敏感品类合规，整理可直接用于排查和咨询的案例。",
    keywords: ["App Store 审核", "iOS 上架", "苹果审核", "订阅审核", "审核账号"],
    serviceHref: "/developer",
    matchTerms: ["app store", "ios", "苹果", "订阅审核", "审核账号", "自动续订"],
  },
  {
    slug: "google-play",
    name: "Google Play",
    heroTitle: "Google Play 上架、账号风控与 Android 合规专题",
    description:
      "覆盖 Google Play 上架、生产访问、数据安全表单、目标 API、开发者账号关联、权限和 SDK 合规等 Android 出海常见问题。",
    keywords: ["Google Play 上架", "Android 上架", "开发者账号", "数据安全表单", "账号关联"],
    serviceHref: "/developer",
    matchTerms: ["google play", "android", "目标 api", "sdk", "数据安全表单", "开发者账号", "账号关联"],
  },
  {
    slug: "meta-ads",
    name: "Meta Ads",
    heroTitle: "Meta Ads 买量、素材与账户风控专题",
    description:
      "聚焦 Meta Ads、Advantage+、Pixel/CAPI、学习期、广告账户受限、素材审核和 ROAS 复盘，帮助出海团队定位跑量问题。",
    keywords: ["Meta Ads", "Facebook 投放", "Advantage+", "Pixel CAPI", "广告账户风控"],
    serviceHref: "/media",
    matchTerms: ["meta", "facebook", "advantage+", "pixel", "capi", "bm", "学习期"],
  },
  {
    slug: "tiktok-ads",
    name: "TikTok Ads",
    heroTitle: "TikTok Ads 素材测试、自动投放与订阅转化专题",
    description:
      "整理 TikTok Ads、Smart Performance Campaign、达人素材授权、短视频素材疲劳、AI 工具投放和订阅漏斗优化案例。",
    keywords: ["TikTok Ads", "TikTok 自动投放", "短视频素材", "达人素材", "订阅转化"],
    serviceHref: "/media",
    matchTerms: ["tiktok", "smart performance", "达人", "短视频", "素材疲劳"],
  },
  {
    slug: "telegram",
    name: "Telegram",
    heroTitle: "Telegram 私域、社群转化与 Bot 承接专题",
    description:
      "面向 Telegram Ads、Telegram Bot、出海社群、私域客服、频道广告和人工咨询承接，沉淀从点击到咨询的优化路径。",
    keywords: ["Telegram Ads", "Telegram Bot", "Telegram 私域", "社群转化", "咨询转化"],
    serviceHref: "/community",
    matchTerms: ["telegram", "bot", "私域", "社群", "频道广告"],
  },
  {
    slug: "ai-apps",
    name: "AI 应用",
    heroTitle: "AI 应用出海、内容安全与订阅增长专题",
    description:
      "覆盖 AI 伴侣、AI 换脸、AI 图片生成、AI 视频、AI 写作、内容安全、素材审核和订阅增长等高热度出海应用问题。",
    keywords: ["AI 应用出海", "AI 伴侣", "AI 图片生成", "AI 视频", "内容安全"],
    serviceHref: "/developer",
    matchTerms: ["ai", "伴侣", "换脸", "图片生成", "图生视频", "视频", "写作", "内容安全"],
  },
  {
    slug: "slots",
    name: "SLOTS",
    heroTitle: "SLOTS 出海上架、买量回本与支付漏斗专题",
    description:
      "聚焦 SLOTS、iGaming、游戏投放、商店页一致性、支付失败、首充转化、地区选择和买量回本周期。",
    keywords: ["SLOTS 出海", "iGaming", "游戏投放", "买量 ROI", "支付漏斗"],
    serviceHref: "/media",
    matchTerms: ["slots", "igaming", "游戏", "充值", "首充", "day7", "roi"],
  },
  {
    slug: "cash-loan",
    name: "现金贷",
    heroTitle: "现金贷出海、金融广告合规与获客风控专题",
    description:
      "沉淀现金贷、金融 App、费用披露、广告拒审、首还逾期、渠道质量和获客风控相关的出海实战案例。",
    keywords: ["现金贷出海", "金融 App 投放", "费用披露", "广告拒审", "获客风控"],
    serviceHref: "/media",
    matchTerms: ["现金贷", "金融", "费用披露", "首还", "逾期", "风控", "贷款"],
  },
  {
    slug: "cpa-network",
    name: "CPA 网盟",
    heroTitle: "CPA 网盟、流量主变现与结算风控专题",
    description:
      "围绕 CPA Offer、Day0 结算、Postback、Cap、Pacing、反作弊、扣量争议和流量主变现，整理广告主与流量主两端案例。",
    keywords: ["CPA Offer", "海外网盟", "流量主变现", "Day0 结算", "Postback 回传"],
    serviceHref: "/media",
    matchTerms: ["cpa", "offer", "网盟", "postback", "day0", "流量主", "结算", "pacing", "cap"],
  },
  {
    slug: "aso",
    name: "ASO",
    heroTitle: "ASO、本地化关键词与自然量增长专题",
    description:
      "聚焦 ASO 优化、App Store 排名、Google Play 关键词、本地化、自然量冷启动和买量信号协同，帮助应用获得稳定搜索曝光。",
    keywords: ["ASO 优化", "App Store 排名", "Google Play 关键词", "本地化", "自然量增长"],
    serviceHref: "/developer",
    matchTerms: ["aso", "自然量", "关键词", "本地化", "排名", "冷启动"],
  },
] as const;

export type InsightTopicSlug = (typeof topicDefinitions)[number]["slug"];

export type InsightTopic = {
  slug: InsightTopicSlug;
  name: string;
  heroTitle: string;
  description: string;
  keywords: string[];
  serviceHref: string;
  matchTerms: string[];
};

export type TopicMatchArticle = {
  title: string;
  slug: string;
  category: string;
  excerpt: string;
  keywords: string[];
};

export const insightTopics = topicDefinitions.map((topic) => ({
  ...topic,
  keywords: [...topic.keywords],
  matchTerms: [...topic.matchTerms],
})) as InsightTopic[];

export const insightTopicMap = Object.fromEntries(
  insightTopics.map((topic) => [topic.slug, topic]),
) as Record<InsightTopicSlug, InsightTopic>;

function normalize(value: string) {
  return value.toLowerCase();
}

function articleHaystack(article: TopicMatchArticle) {
  return normalize(
    `${article.title} ${article.slug} ${article.category} ${article.excerpt} ${article.keywords.join(" ")}`,
  );
}

export function getTopicBySlug(slug: string) {
  return insightTopics.find((topic) => topic.slug === slug);
}

export function topicHref(slug: InsightTopicSlug) {
  return `/insights/topics/${slug}`;
}

export function inferArticleTopicSlug(article: TopicMatchArticle): InsightTopicSlug {
  const haystack = articleHaystack(article);
  const matchedTopic = insightTopics.find((topic) =>
    topic.matchTerms.some((term) => haystack.includes(normalize(term))),
  );

  if (matchedTopic) return matchedTopic.slug;
  if (article.category === "海外投放增长") return "meta-ads";
  if (article.category === "开发者出海") return "app-store";
  return "ai-apps";
}

export function getTopicForKeyword(keyword: string, fallback: InsightTopicSlug): InsightTopicSlug {
  const normalizedKeyword = normalize(keyword);
  const matchedTopic = insightTopics.find((topic) =>
    [...topic.keywords, ...topic.matchTerms].some((term) => normalizedKeyword.includes(normalize(term))),
  );

  return matchedTopic?.slug ?? fallback;
}
