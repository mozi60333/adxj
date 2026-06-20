"use client";

import React from "react";
import Link from "next/link";
import { motion } from "motion/react";
import {
  ArrowRight,
  Award,
  BadgeDollarSign,
  Building2,
  CheckCircle2,
  CircleDollarSign,
  Code2,
  ExternalLink,
  Globe2,
  Layers3,
  Megaphone,
  Network,
  Rocket,
  ShieldCheck,
  Sparkles,
  Star,
  Store,
  Trophy,
  Users,
} from "lucide-react";
import { Contact } from "@/components/contact";
import { Footer } from "@/components/footer";
import { MatrixBackground } from "@/components/matrix-pattern";
import { Nav } from "@/components/nav";
import {
  featuredProducts,
  googlePlayApps,
  iosApps,
  type StoreApp,
} from "./app-data";

const brandFacts = [
  { label: "母公司", value: "香港蓝鲸网络有限公司" },
  { label: "母品牌", value: "蓝鲸出海" },
  { label: "子品牌", value: "ADXJ" },
  { label: "官方域名", value: "ADXJ.COM" },
];

const businessFields = [
  { title: "跨境电商与独立站增长", desc: "围绕选品、独立站搭建、转化优化、支付接入与复购链路提供资源支持。", icon: Store },
  { title: "海外广告投放与素材优化", desc: "覆盖 Facebook、Google、TikTok、Telegram Ads、X 等媒体，配合素材策略与投放模型。", icon: Megaphone },
  { title: "跨境软件开发服务", desc: "面向游戏、社交、AI 工具、金融、工具类应用提供产品研发与迭代交付。", icon: Code2 },
  { title: "开发者账号与商店合规", desc: "提供 iOS / Google Play 账号资产管理、上架服务、合规诊断与疑难处理。", icon: ShieldCheck },
  { title: "跨境支付与本地化结算", desc: "链接本地支付、分期、钱包、风控、回款与商业化基础设施。", icon: CircleDollarSign },
  { title: "行业社群与网盟发行", desc: "以社群情报、资源撮合、流量发行、CPA / ROAS 合作构建增长网络。", icon: Network },
];

const growthDirections = [
  "独立站增长",
  "素材与投放优化",
  "应用商店合规",
  "账号资产管理",
  "本地化支付",
  "流量发行",
  "数据增长分析",
  "品牌出海咨询",
];

const applicationAreas = [
  "游戏应用",
  "社交应用",
  "SLOTS 应用",
  "AI 工具应用",
  "AI 伴侣应用",
  "AI 图生视频应用",
  "工具应用",
  "现金贷应用",
  "分期商城应用",
  "网赚任务应用",
  "金融行情应用",
  "区块链钱包应用",
];

const categoryAreas = ["SLOTS", "网赚", "金融", "股票", "区块链", "AI", "现金贷", "分期", "社交直播", "工具订阅", "支付钱包", "广告变现"];

const enterprisePillars = [
  {
    title: "蓝鲸出海行业社群",
    desc: "沉淀 100K+ 出海行业人群，持续聚合项目方、流量主、开发者与服务商。",
    icon: Users,
  },
  {
    title: "iOS & Google Play 开发者账号服务",
    desc: "围绕账号采购、回收、权重评估、防关联与资产安全提供稳定支持。",
    icon: BadgeDollarSign,
  },
  {
    title: "应用商店上架服务",
    desc: "处理 iOS / Google Play 上架、复审、包体合规、申诉与疑难杂症。",
    icon: CheckCircle2,
  },
  {
    title: "出海广告投放代运营",
    desc: "以 CPA、ROAS 和效果结算为核心，提供全行业广告投放与素材策略。",
    icon: Rocket,
  },
  {
    title: "出海网盟流量推广及发行",
    desc: "整合媒体和开发者流量，服务广告主获客与流量主变现双侧需求。",
    icon: Layers3,
  },
];

const partners = [
  { name: "Facebook", color: "text-blue-600" },
  { name: "Google", color: "text-slate-900" },
  { name: "TikTok", color: "text-slate-950" },
  { name: "Telegram Ads", color: "text-sky-600" },
  { name: "X", color: "text-slate-950" },
];

const honors = [
  {
    metric: "50M USD",
    title: "Facebook 单平台单产品年度消耗",
    desc: "单产品年度投放消耗峰值达到 50M USD，验证大规模投放与优化能力。",
  },
  {
    metric: "Top 50",
    title: "金融分类应用榜单表现",
    desc: "自营产品在 App Store 与 Google Play 金融分类取得前五十排名。",
  },
  {
    metric: "100K+",
    title: "跨境出海行业社群",
    desc: "社群覆盖广告主、开发者、流量主、支付与技术服务商等核心角色。",
  },
  {
    metric: "CPA / ROAS",
    title: "ADXJ 创新型网盟",
    desc: "围绕效果结算、结果结算、ROAS 结算，为出海增长提供更确定的合作模式。",
  },
  {
    metric: "1000+",
    title: "商店疑难处理案例",
    desc: "累计解决 iOS、Google Play 上架、封号、审核、账号与合规问题上千起。",
  },
];

function formatRatingCount(count: StoreApp["ratingCount"]) {
  if (!count) return "暂无评分量";
  if (typeof count === "string") return count.replace(" reviews", " 评分");
  if (count >= 1000000) return `${(count / 1000000).toFixed(1)}M 评分`;
  if (count >= 1000) return `${Math.round(count / 1000)}K 评分`;
  return `${count} 评分`;
}

function AppCard({ app, featured = false }: { app: StoreApp; featured?: boolean }) {
  return (
    <Link
      href={app.url}
      target="_blank"
      rel="noopener noreferrer"
      className={`group flex min-h-[168px] flex-col justify-between rounded-2xl border bg-white p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:border-blue-200 hover:shadow-xl hover:shadow-blue-100/70 ${
        featured ? "border-blue-200" : "border-slate-200"
      }`}
    >
      <div className="flex items-start gap-4">
        <img
          src={app.icon}
          alt={`${app.name} icon`}
          className="h-14 w-14 shrink-0 rounded-2xl border border-slate-100 object-cover shadow-sm"
          loading="lazy"
        />
        <div className="min-w-0">
          <div className="mb-2 flex flex-wrap gap-1.5">
            <span className="rounded-full bg-blue-50 px-2 py-1 text-[10px] font-bold text-blue-700">
              {app.platform}
            </span>
            <span className="rounded-full bg-slate-100 px-2 py-1 text-[10px] font-bold text-slate-600">
              {app.category}
            </span>
          </div>
          <h3 className="line-clamp-2 text-sm font-black leading-snug text-slate-950">{app.name}</h3>
        </div>
      </div>

      <div className="mt-5 grid grid-cols-3 gap-2 border-t border-slate-100 pt-4 text-[11px]">
        <div>
          <div className="mb-1 flex items-center gap-1 font-bold text-amber-500">
            <Star className="h-3.5 w-3.5 fill-amber-400" />
            {app.rating ? app.rating.toFixed(1) : "暂无"}
          </div>
          <div className="text-slate-400">评分</div>
        </div>
        <div>
          <div className="mb-1 font-bold text-slate-800">{formatRatingCount(app.ratingCount)}</div>
          <div className="text-slate-400">样本</div>
        </div>
        <div>
          <div className="mb-1 flex items-center gap-1 font-bold text-emerald-600">
            {app.downloads}
            <ExternalLink className="h-3 w-3 opacity-0 transition-opacity group-hover:opacity-100" />
          </div>
          <div className="text-slate-400">下载量</div>
        </div>
      </div>
    </Link>
  );
}

function SectionTitle({
  eyebrow,
  title,
  desc,
}: {
  eyebrow: string;
  title: string;
  desc?: string;
}) {
  return (
    <div className="mb-10 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
      <div>
        <span className="mb-3 inline-flex rounded-full border border-blue-100 bg-white px-3 py-1 text-[10px] font-bold uppercase text-blue-700 shadow-sm">
          {eyebrow}
        </span>
        <h2 className="text-3xl font-black text-slate-950 md:text-4xl font-[family-name:var(--font-display)]">
          {title}
        </h2>
      </div>
      {desc && <p className="max-w-xl text-sm leading-relaxed text-slate-600">{desc}</p>}
    </div>
  );
}

export default function BlueWhalePage() {
  const productRows = [
    { title: "核心企业产品", apps: featuredProducts },
    { title: "iOS 企业产品", apps: iosApps },
    { title: "Google Play 企业产品", apps: googlePlayApps },
  ];

  return (
    <div className="min-h-screen overflow-x-hidden bg-slate-50 text-slate-900 selection:bg-blue-200 selection:text-blue-950">
      <Nav />

      <section className="relative overflow-hidden border-b border-slate-200 bg-white px-6 py-20 md:px-10 md:py-24">
        <MatrixBackground />
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="relative z-10"
          >
            <div className="mb-6 flex flex-wrap items-center gap-3">
              <span className="rounded-full border border-blue-100 bg-blue-50 px-3 py-1.5 text-[11px] font-bold text-blue-700">
                香港蓝鲸网络有限公司
              </span>
              <span className="rounded-full border border-emerald-100 bg-emerald-50 px-3 py-1.5 text-[11px] font-bold text-emerald-700">
                Est. 2016
              </span>
              <span className="text-xs font-bold text-slate-400">ADXJ.COM</span>
            </div>
            <h1 className="max-w-5xl text-5xl font-black leading-[1.05] text-slate-950 md:text-7xl font-[family-name:var(--font-display)]">
              蓝鲸出海
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-sky-500 to-emerald-500">
                跨境增长生态母品牌
              </span>
            </h1>
            <p className="mt-8 max-w-3xl text-[15px] leading-relaxed text-slate-600">
              蓝鲸出海创立于 2016 年，是香港蓝鲸网络有限公司旗下出海生态母品牌。我们围绕跨境电商、海外广告投放、软件开发服务、开发者服务、支付、行业社群与网盟发行，持续连接出海企业的产品、流量、技术与商业化。
            </p>
            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <Link
                href="#products"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-8 py-4 text-xs font-bold text-white shadow-lg shadow-blue-200 transition-all hover:-translate-y-0.5 hover:bg-blue-700"
              >
                查看企业产品 <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="#honors"
                className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-8 py-4 text-xs font-bold text-slate-700 shadow-sm transition-all hover:-translate-y-0.5 hover:bg-slate-50"
              >
                企业荣誉墙
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="relative z-10 rounded-[2rem] border border-slate-200 bg-slate-950 p-6 text-white shadow-2xl shadow-blue-900/20"
          >
            <div className="mb-6 flex items-center justify-between border-b border-white/10 pb-5">
              <div>
                <div className="text-xs font-bold text-cyan-300">Brand Stack</div>
                <div className="mt-1 text-2xl font-black font-[family-name:var(--font-display)]">Blue Whale Network</div>
              </div>
              <Globe2 className="h-9 w-9 text-cyan-300" />
            </div>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {brandFacts.map((item) => (
                <div key={item.label} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <div className="text-[10px] font-bold text-slate-400">{item.label}</div>
                  <div className="mt-2 text-sm font-black text-white">{item.value}</div>
                </div>
              ))}
            </div>
            <div className="mt-6 rounded-2xl border border-emerald-400/20 bg-emerald-400/10 p-4">
              <div className="mb-3 flex items-center gap-2 text-sm font-bold text-emerald-300">
                <Sparkles className="h-4 w-4" />
                子品牌 ADXJ
              </div>
              <p className="text-xs leading-relaxed text-emerald-50/80">
                聚焦全球化效果营销、开发者服务、买量与网盟结算，是蓝鲸出海生态里的增长与流量中枢。
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      <main className="mx-auto w-full max-w-7xl px-6 py-16 md:px-10">
        <section className="mb-20">
          <SectionTitle
            eyebrow="Blue Whale Map"
            title="蓝鲸出海行业与应用版图"
            desc="从产品、技术、账号、支付、投放到社群，蓝鲸出海覆盖企业走向全球市场的关键节点，并持续沉淀可复用的行业资源。"
          />
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
            {businessFields.map((field) => (
              <div key={field.title} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                  <field.icon className="h-5 w-5" />
                </div>
                <h3 className="mb-2 text-lg font-black text-slate-950">{field.title}</h3>
                <p className="text-sm leading-relaxed text-slate-600">{field.desc}</p>
              </div>
            ))}
          </div>
          <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-[0.9fr_1.1fr]">
            <div className="rounded-[2rem] border border-blue-100 bg-white p-8 shadow-xl shadow-slate-200/50">
              <div className="mb-5 flex items-center gap-3">
                <Building2 className="h-6 w-6 text-blue-600" />
                <h3 className="text-2xl font-black text-slate-950 font-[family-name:var(--font-display)]">重点增长方向</h3>
              </div>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {growthDirections.map((item) => (
                  <div key={item} className="rounded-2xl border border-slate-100 bg-slate-50 px-4 py-3 text-sm font-bold text-slate-700">
                    {item}
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-[2rem] border border-slate-200 bg-[#0F172A] p-8 text-white shadow-xl shadow-blue-900/20">
              <div className="mb-6 flex items-center gap-3">
                <Layers3 className="h-6 w-6 text-cyan-300" />
                <h3 className="text-2xl font-black font-[family-name:var(--font-display)]">行业应用与类目</h3>
              </div>
              <div className="mb-6">
                <div className="mb-3 text-[10px] font-bold uppercase tracking-widest text-cyan-300">Application Types</div>
                <div className="flex flex-wrap gap-3">
                  {applicationAreas.map((item) => (
                    <span key={item} className="rounded-full border border-white/10 bg-white/10 px-4 py-2 text-sm font-bold text-white">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <div className="mb-3 text-[10px] font-bold uppercase tracking-widest text-emerald-300">Industry Categories</div>
                <div className="flex flex-wrap gap-3">
                  {categoryAreas.map((item) => (
                    <span key={item} className="rounded-full border border-cyan-300/20 bg-cyan-300/10 px-4 py-2 text-sm font-bold text-cyan-100">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mb-20 grid grid-cols-1 gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="rounded-[2rem] border border-blue-100 bg-white p-8 shadow-xl shadow-slate-200/50">
            <span className="mb-4 inline-flex rounded-full bg-blue-50 px-3 py-1 text-[10px] font-bold text-blue-700">
              Enterprise Profile
            </span>
            <h2 className="mb-5 text-3xl font-black text-slate-950 font-[family-name:var(--font-display)]">蓝鲸出海企业介绍</h2>
            <p className="text-sm leading-relaxed text-slate-600">
              蓝鲸出海累计融资 3M USD，长期服务跨境增长、开发者资产、应用商店交付和流量商业化。业务覆盖蓝鲸出海行业社群、iOS & Google Play 开发者账号服务、应用上架服务、出海全行业广告投放代运营，以及以 CPA、ROAS、结果结算为核心的出海网盟流量推广及发行。
            </p>
            <div className="mt-8 grid grid-cols-2 gap-4">
              <div className="rounded-2xl bg-slate-950 p-5 text-white">
                <div className="text-3xl font-black text-cyan-300">3M</div>
                <div className="mt-1 text-[11px] font-bold text-slate-400">USD 总融资</div>
              </div>
              <div className="rounded-2xl bg-emerald-50 p-5">
                <div className="text-3xl font-black text-emerald-600">2016</div>
                <div className="mt-1 text-[11px] font-bold text-emerald-800">创立年份</div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {enterprisePillars.map((pillar) => (
              <div key={pillar.title} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="mb-4 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-slate-700">
                    <pillar.icon className="h-5 w-5" />
                  </div>
                  <h3 className="text-sm font-black text-slate-950">{pillar.title}</h3>
                </div>
                <p className="text-xs leading-relaxed text-slate-600">{pillar.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-20 overflow-hidden rounded-[2rem] border border-slate-200 bg-white py-8 shadow-sm">
          <div className="mb-6 px-8">
            <div className="flex items-center gap-3">
              <Globe2 className="h-5 w-5 text-blue-600" />
              <h2 className="text-2xl font-black text-slate-950 font-[family-name:var(--font-display)]">合作伙伴</h2>
            </div>
            <p className="mt-2 text-sm text-slate-500">覆盖 Facebook、Google、TikTok、Telegram Ads、X 等全球大流量媒体。</p>
          </div>
          <div className="relative overflow-hidden border-y border-slate-100 bg-slate-50 py-5">
            <div className="bluewhale-marquee flex w-max gap-4">
              {[...partners, ...partners, ...partners].map((partner, idx) => (
                <div
                  key={`${partner.name}-${idx}`}
                  className="flex h-16 w-56 items-center justify-center rounded-2xl border border-slate-200 bg-white px-6 shadow-sm"
                >
                  <span className={`text-xl font-black ${partner.color}`}>{partner.name}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="honors" className="mb-20">
          <SectionTitle eyebrow="Honor Wall" title="企业荣誉墙" />
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-5">
            {honors.map((honor, idx) => (
              <div key={honor.title} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="mb-6 flex items-center justify-between">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-50 text-amber-600">
                    {idx === 0 ? <Trophy className="h-5 w-5" /> : <Award className="h-5 w-5" />}
                  </div>
                  <span className="text-[10px] font-bold text-slate-400">0{idx + 1}</span>
                </div>
                <div className="mb-3 text-2xl font-black text-blue-600 font-[family-name:var(--font-display)]">{honor.metric}</div>
                <h3 className="mb-3 text-sm font-black text-slate-950">{honor.title}</h3>
                <p className="text-xs leading-relaxed text-slate-600">{honor.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="products" className="mb-20">
          <SectionTitle
            eyebrow="Product Matrix"
            title="蓝鲸出海及 ADXJ 企业产品矩阵"
            desc="覆盖 AI 伴侣、AI 图生成视频、SLOTS、现金贷、分期商城等产品形态，服务增长投放、应用发行与商业化验证。"
          />
          <div className="space-y-12">
            {productRows.map((row, rowIndex) => (
              <div key={row.title}>
                <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                  <h3 className="text-xl font-black text-slate-950 font-[family-name:var(--font-display)]">{row.title}</h3>
                  <span className="w-fit rounded-full bg-slate-900 px-3 py-1 text-[10px] font-bold text-white">
                    企业产品
                  </span>
                </div>
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
                  {row.apps.map((app) => (
                    <AppCard key={`${app.platform}-${app.id}`} app={app} featured={rowIndex === 0} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      <Contact />
      <Footer />

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes bluewhale-marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-33.333%); }
        }
        .bluewhale-marquee {
          animation: bluewhale-marquee 28s linear infinite;
        }
      ` }} />
    </div>
  );
}
