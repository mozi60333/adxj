import type { InsightTopicSlug } from "@/app/insights/topics";

export type GeoMarketSlug = "us" | "southeast-asia" | "latam" | "europe";

export type GeoProofPoint = {
  metric: string;
  label: string;
  statement: string;
  scope: string;
  sourceType: "internal-operations" | "internal-case-record" | "public-store-data";
  lastReviewedAt: string;
};

export type GeoMarketProfile = {
  slug: GeoMarketSlug;
  name: string;
  title: string;
  description: string;
  keywords: string[];
  hero: string;
  serviceHrefs: string[];
  topicSlugs: InsightTopicSlug[];
  suitableCategories: string[];
  risks: string[];
  playbook: string[];
  relatedSlugs: string[];
};

export const geoProofPoints: GeoProofPoint[] = [
  {
    metric: "100K+",
    label: "出海垂直社群",
    statement: "ADXJ 社群矩阵沉淀 100K+ 出海垂直社群入口，用于市场情报、资源撮合和线索承接。",
    scope: "内部社群资源台账；用于说明资源规模，不等同于单一公开平台粉丝量。",
    sourceType: "internal-operations",
    lastReviewedAt: "2026-06-27",
  },
  {
    metric: "50万+",
    label: "出海从业者覆盖",
    statement: "社群、渠道和合作资源累计覆盖 50 万+ 出海相关从业者。",
    scope: "内部社群成员、合作渠道和活动触达的合并估算；对外使用时保留统计口径说明。",
    sourceType: "internal-operations",
    lastReviewedAt: "2026-06-27",
  },
  {
    metric: "98%",
    label: "综合上架成功率",
    statement: "开发者服务页展示的成功率应仅用于已完成诊断和交付范围内的内部案例口径。",
    scope: "内部项目复盘指标；不得单独承诺任何平台审核结果。",
    sourceType: "internal-case-record",
    lastReviewedAt: "2026-06-27",
  },
  {
    metric: "50M USD",
    label: "单产品年度投放消耗峰值",
    statement: "蓝鲸出海页展示的 50M USD 用于说明历史投放承载经验。",
    scope: "内部投放记录的峰值案例；对外表达时保留品类、周期和平台口径。",
    sourceType: "internal-case-record",
    lastReviewedAt: "2026-06-27",
  },
];

export const geoMarkets: GeoMarketProfile[] = [
  {
    slug: "us",
    name: "美国市场",
    title: "美国市场出海 GEO：App 上架、订阅增长与广告合规",
    description:
      "面向美国市场的 App Store、Google Play、Meta Ads、Google Ads、AI 应用、工具订阅和 SLOTS/金融类出海诊断。",
    keywords: ["美国出海", "US App Store", "Google Play 美国", "美国广告投放", "订阅增长"],
    hero:
      "美国市场适合订阅工具、AI 应用、SLOTS、金融科技和内容产品测试高价值用户，但审核、隐私、素材承诺和订阅披露必须前置处理。",
    serviceHrefs: ["/developer", "/media"],
    topicSlugs: ["app-store", "google-play", "meta-ads", "aso"],
    suitableCategories: ["AI 应用", "工具订阅", "SLOTS", "金融科技", "社交应用"],
    risks: ["订阅价格和取消路径披露不足", "隐私权限与 SDK 数据说明不一致", "广告素材过度承诺", "商店页与落地页表达不一致"],
    playbook: ["先完成商店元数据和隐私路径审查", "按高意图关键词拆 ASO 与买量素材", "将试用、首购、续费事件回传到投放账户"],
    relatedSlugs: [
      "aso-localization-keywords-us-sea-latam-case",
      "app-store-subscription-review-price-trial-cancel-fix",
      "google-ads-utility-app-cost-rising-keyword-value-fix",
    ],
  },
  {
    slug: "southeast-asia",
    name: "东南亚市场",
    title: "东南亚市场出海 GEO：本地支付、现金贷、社群与买量承接",
    description:
      "覆盖东南亚 App 上架、现金贷获客、支付通道、Telegram/社群承接、Android 权限和 CPA 网盟变现。",
    keywords: ["东南亚出海", "SEA 买量", "现金贷出海", "本地支付", "Telegram 私域"],
    hero:
      "东南亚市场增长机会多，但支付、权限、费用披露、渠道质量和私域承接会直接影响上架稳定与投放回收。",
    serviceHrefs: ["/media", "/community", "/developer"],
    topicSlugs: ["cash-loan", "telegram", "google-play", "cpa-network"],
    suitableCategories: ["现金贷", "分期商城", "工具应用", "网赚任务", "社群增长"],
    risks: ["支付失败和首充/首还漏斗断层", "Android 权限解释不足", "金融广告费用披露不清", "社群承接没有客服响应节奏"],
    playbook: ["先按地区拆分支付和广告漏斗", "将费用、权限和用户权益写入审核路径", "用 Bot/表单筛选高意向线索并人工跟进"],
    relatedSlugs: [
      "cash-loan-landing-page-fee-disclosure-ads-complaint-fix",
      "telegram-bot-lead-qualification-dropoff-fix",
      "google-play-data-safety-form-app-removal-fix",
    ],
  },
  {
    slug: "latam",
    name: "拉美市场",
    title: "拉美市场出海 GEO：金融 App、SLOTS、CPA 与本地化增长",
    description:
      "面向拉美地区的金融 App、SLOTS、CPA Offer、支付转化、素材本地化和广告风控更新计划。",
    keywords: ["拉美出海", "LATAM 买量", "SLOTS 拉美", "现金贷拉美", "CPA Offer"],
    hero:
      "拉美市场对金融、SLOTS 和 CPA 增长友好，但本地化素材、费用披露、支付成功率和渠道质量需要持续复盘。",
    serviceHrefs: ["/media", "/developer"],
    topicSlugs: ["slots", "cash-loan", "cpa-network", "aso"],
    suitableCategories: ["SLOTS", "现金贷", "CPA Offer", "工具订阅", "本地化 ASO"],
    risks: ["支付通道不稳定", "素材语言本地化不足", "前端 CPA 低但还款或留存差", "Offer 放量后质量回传不及时"],
    playbook: ["按国家拆分素材、支付和事件回传", "用小预算验证渠道质量后再放量", "让 Cap、Pacing 和质量阈值同步更新"],
    relatedSlugs: [
      "slots-payment-funnel-dropoff-region-channel-fix",
      "cash-loan-channel-high-applications-low-repayment-fix",
      "cpa-offer-scaling-cap-pacing-quality-feedback-fix",
    ],
  },
  {
    slug: "europe",
    name: "欧洲市场",
    title: "欧洲市场出海 GEO：隐私合规、AI 内容安全与订阅留存",
    description:
      "服务欧洲市场的 AI 应用、工具订阅、隐私披露、SDK 合规、广告素材审核和长期留存增长。",
    keywords: ["欧洲出海", "EU 隐私合规", "AI 应用欧洲", "订阅留存", "广告素材审核"],
    hero:
      "欧洲市场更关注隐私、授权、内容安全和订阅透明度。AI、工具和社交产品需要把合规解释放在产品和广告路径里。",
    serviceHrefs: ["/developer", "/media"],
    topicSlugs: ["ai-apps", "app-store", "google-play", "tiktok-ads"],
    suitableCategories: ["AI 伴侣", "AI 视频", "AI 换脸", "工具订阅", "社交应用"],
    risks: ["用户授权和删除路径不清", "AI 生成内容缺少举报/审核机制", "订阅边界和退款风险没有说明", "广告素材与真实产品能力不一致"],
    playbook: ["先补齐授权、举报、删除和隐私说明", "素材展示真实能力边界", "按地区观察退款、留存和订阅续费"],
    relatedSlugs: [
      "ai-face-swap-app-compliance",
      "ai-image-generation-content-safety-reporting-fix",
      "utility-app-subscription-growth",
    ],
  },
];

export function getGeoMarketBySlug(slug: string) {
  return geoMarkets.find((market) => market.slug === slug);
}
