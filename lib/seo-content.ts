export type FaqItem = {
  question: string;
  answer: string;
};

export const serviceFaqs = {
  bluewhale: [
    {
      question: "蓝鲸出海和 ADXJ 的关系是什么？",
      answer:
        "蓝鲸出海是香港蓝鲸网络有限公司旗下出海生态母品牌，ADXJ 是面向全球化效果营销、开发者服务、海外投放、网盟发行和咨询线索承接的核心业务入口。",
    },
    {
      question: "适合哪些企业先咨询蓝鲸出海？",
      answer:
        "适合正在做 App 上架、海外买量、AI 应用、SLOTS、现金贷、CPA 网盟、Telegram 私域和跨境增长的团队，尤其适合已经遇到审核、投放、结算或转化问题的项目。",
    },
    {
      question: "咨询前需要准备哪些资料？",
      answer:
        "建议准备产品品类、目标地区、当前投放或上架状态、遇到的问题截图、预算阶段和期望结果，ADXJ 会按上架、投放、风控、转化和资源匹配做初步诊断。",
    },
  ],
  developer: [
    {
      question: "ADXJ 可以处理哪些 App Store 和 Google Play 上架问题？",
      answer:
        "可以协助排查 iOS 审核被拒、Google Play 账号关联、数据安全表单、权限说明、SDK 合规、订阅审核、审核账号、包体更新和敏感品类上架问题。",
    },
    {
      question: "开发者账号服务会关注哪些风险点？",
      answer:
        "会重点检查账号资料、2FA、团队权限、包名签名、隐私政策域名、SDK 配置、登录环境、历史应用和申诉记录，避免账号资产互相拖累。",
    },
    {
      question: "应用被拒后应该先改包还是先申诉？",
      answer:
        "通常先还原审核路径和拒审证据，再判断是元数据、权限、订阅、账号还是包体问题。没有定位前频繁提交，可能扩大审核风险。",
    },
  ],
  media: [
    {
      question: "ADXJ 海外投放主要覆盖哪些媒体？",
      answer:
        "覆盖 Meta Ads、Google Ads、TikTok Ads、Telegram Ads、X、Unity 以及海外网盟流量，重点服务应用下载、订阅转化、CPA、ROAS 和流量变现。",
    },
    {
      question: "广告跑量变差时会优先看什么？",
      answer:
        "会优先看账户结构、素材池、事件回传、落地页、商店页、预算节奏、后端收入和退款数据，避免只根据点击或安装成本做判断。",
    },
    {
      question: "流量主接入 CPA Offer 需要准备什么？",
      answer:
        "建议准备流量来源、地区结构、历史转化、留存或质量数据、API/Postback 能力和结算诉求，ADXJ 会匹配合适广告主并设置 Cap、Pacing 和质量回传。",
    },
  ],
  community: [
    {
      question: "ADXJ 社群适合哪些出海从业者加入？",
      answer:
        "适合出海开发者、项目方、广告投放团队、流量主、媒体资源方、支付服务商、AI 应用团队、SLOTS 和金融科技相关从业者。",
    },
    {
      question: "Telegram 社群和企业微信社群有什么区别？",
      answer:
        "Telegram 更适合全球信息、频道广告、海外资源和高频情报流；企业微信更适合国内团队的深度沟通、资源撮合、项目跟进和可信合作。",
    },
    {
      question: "社群流量如何转化为咨询线索？",
      answer:
        "关键是频道选择、Bot 筛选、群内容、案例沉淀、客服响应和人工跟进形成连续路径，让高意向用户能快速联系到 ADXJ 团队。",
    },
  ],
} satisfies Record<string, FaqItem[]>;

export const serviceCaseSlugs = {
  bluewhale: [
    "ai-app-overseas-market-opportunities",
    "slots-overseas-ua-cost-market-risk",
    "cash-loan-overseas-growth-compliance",
  ],
  developer: [
    "app-store-review-account-login-failure-fix",
    "google-play-old-app-update-target-api-sdk-fix",
    "developer-account-team-permission-2fa-audit-trail-fix",
  ],
  media: [
    "meta-advantage-plus-performance-drop-event-creative-fix",
    "tiktok-smart-performance-campaign-ai-tool-event-fix",
    "cpa-offer-scaling-cap-pacing-quality-feedback-fix",
  ],
  community: [
    "telegram-bot-lead-qualification-dropoff-fix",
    "telegram-community-customer-response-conversion-fix",
    "telegram-private-traffic-no-conversion-consulting-path",
  ],
} satisfies Record<string, string[]>;
