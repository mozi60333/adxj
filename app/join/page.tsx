"use client";

import React from "react";
import Link from "next/link";
import { motion } from "motion/react";
import {
  ArrowRight,
  BadgeCheck,
  Building2,
  CheckCircle2,
  Mail,
  MapPin,
  Rocket,
  Send,
  Share2,
  Sparkles,
} from "lucide-react";
import { Contact } from "@/components/contact";
import { Footer } from "@/components/footer";
import { MatrixBackground } from "@/components/matrix-pattern";
import { Nav } from "@/components/nav";

type Job = {
  title: string;
  department: string;
  level: string;
  baseCities: string[];
  summary: string;
  responsibilities: string[];
  requirements: string[];
  tags: string[];
};

const baseCities = ["北京", "西安", "重庆", "成都", "武汉", "长沙", "广州", "深圳"];

const jobs: Job[] = [
  {
    title: "新媒体运营",
    department: "内容与品牌",
    level: "运营专员 / 高级运营",
    baseCities,
    summary: "负责蓝鲸出海、ADXJ 相关品牌内容建设，面向企业宣传、行业案例、业务动态与出海观点输出。",
    responsibilities: [
      "策划并执行企业宣传内容，包括公众号、视频号、小红书、短视频平台与官网内容。",
      "包装客户案例、投放战报、行业观察和团队动态，形成稳定的品牌内容资产。",
      "协同商务、投放和技术团队提炼业务卖点，提升内容转化与线索质量。",
    ],
    requirements: [
      "具备企业宣传、新媒体运营、品牌内容或 B2B 内容经验。",
      "文字表达清晰，能把复杂的出海业务转化为易传播的内容。",
      "熟悉数据复盘，能根据阅读、转化、咨询线索持续优化选题。",
    ],
    tags: ["企业宣传", "品牌内容", "案例包装", "数据复盘"],
  },
  {
    title: "社群运营",
    department: "社群运营",
    level: "运营专员 / 运营主管",
    baseCities,
    summary: "负责 Telegram 社群与企业微信社群的日常管理、话题运营、成员分层和资源撮合。",
    responsibilities: [
      "维护 Telegram 与企业微信社群秩序，处理入群审核、内容管理、风险预警与成员反馈。",
      "策划行业话题、线上活动、资源对接和社群转化路径，提升活跃与留存。",
      "沉淀社群用户画像，协同商务和投放团队识别项目方、开发者、流量主等关键角色。",
    ],
    requirements: [
      "有社群运营、私域运营、海外社群或行业社区管理经验。",
      "沟通响应快，能处理复杂成员关系和高频信息流。",
      "了解 Telegram、企业微信和跨境行业基本生态优先。",
    ],
    tags: ["Telegram", "企业微信", "私域运营", "资源撮合"],
  },
  {
    title: "iOS 开发者",
    department: "开发与技术",
    level: "开发工程师 / 高级开发",
    baseCities,
    summary: "参与 iOS 应用研发、上架支持、包体合规和线上问题排查，服务出海应用矩阵。",
    responsibilities: [
      "负责 iOS 应用功能开发、性能优化、SDK 接入和版本迭代。",
      "协助处理 App Store 上架、审核反馈、包体合规和线上异常。",
      "与产品、后端、投放团队协同完成落地页、订阅、支付和数据埋点需求。",
    ],
    requirements: [
      "熟悉 Swift / Objective-C、iOS 工程化和 App Store 发布流程。",
      "具备独立排查崩溃、审核问题、网络与性能问题的能力。",
      "有出海应用、订阅类产品、工具类或 AI 应用经验优先。",
    ],
    tags: ["Swift", "App Store", "上架支持", "应用矩阵"],
  },
  {
    title: "Google Play 开发者",
    department: "开发与技术",
    level: "开发工程师 / 高级开发",
    baseCities,
    summary: "负责 Android 应用研发、Google Play 上架支持、版本管理和商店问题处理。",
    responsibilities: [
      "开发和维护 Android 应用功能，推进版本发布、包体优化和稳定性提升。",
      "配合处理 Google Play 审核、政策适配、账号与应用异常问题。",
      "接入广告、支付、归因、数据埋点等出海应用常用能力。",
    ],
    requirements: [
      "熟悉 Kotlin / Java、Android 工程化和 Google Play 发布流程。",
      "理解 Google Play 政策、权限、隐私合规和常见审核问题。",
      "有多应用矩阵、工具类、金融类、游戏类或 AI 应用经验优先。",
    ],
    tags: ["Android", "Google Play", "包体合规", "SDK 接入"],
  },
  {
    title: "后端开发工程师",
    department: "开发与技术",
    level: "开发工程师 / 高级开发",
    baseCities,
    summary: "负责业务系统、数据接口、投放工具、应用服务端能力和内部运营平台建设。",
    responsibilities: [
      "设计并开发业务系统、API 服务、数据看板、权限体系和自动化工具。",
      "支持广告投放、网盟发行、开发者服务和社群运营的数据流转需求。",
      "保障系统稳定性、接口性能、安全策略和日志监控能力。",
    ],
    requirements: [
      "熟悉至少一种后端语言和主流数据库、缓存、队列等基础组件。",
      "具备接口设计、数据建模、性能优化和线上问题排查能力。",
      "有广告系统、CRM、数据平台、支付或出海业务经验优先。",
    ],
    tags: ["API", "数据看板", "业务系统", "自动化工具"],
  },
  {
    title: "前端开发工程师",
    department: "开发与技术",
    level: "开发工程师 / 高级开发",
    baseCities,
    summary: "负责官网、投放落地页、运营后台、数据看板和增长工具前端体验建设。",
    responsibilities: [
      "开发企业官网、活动页、广告落地页、运营后台和可视化看板。",
      "与设计、投放、后端协作，快速交付可用于获客和业务运营的页面与工具。",
      "持续优化页面性能、移动端适配、交互细节和组件复用。",
    ],
    requirements: [
      "熟悉 React / Next.js / TypeScript 和现代前端工程化。",
      "具备响应式布局、组件设计、接口联调和性能优化经验。",
      "有营销页、SaaS 后台、数据可视化或广告落地页经验优先。",
    ],
    tags: ["React", "Next.js", "落地页", "数据可视化"],
  },
  {
    title: "Facebook 投放运营",
    department: "广告投放",
    level: "运营专员 / 总监",
    baseCities,
    summary: "负责 Facebook 广告账户搭建、素材测试、预算控制和 CPA / ROAS 优化。",
    responsibilities: [
      "制定 Facebook 投放计划，完成账户结构、受众策略、素材测试和预算分配。",
      "跟踪 CPA、ROAS、留存、付费等指标，持续优化跑量模型。",
      "总监方向需搭建投放方法论、团队复盘机制和跨项目投放策略。",
    ],
    requirements: [
      "熟悉 Facebook 广告后台、账户风控、归因逻辑和素材测试方法。",
      "具备数据分析能力，能独立定位成本、转化和放量问题。",
      "有游戏、金融、社交、AI 工具或订阅产品投放经验优先。",
    ],
    tags: ["Facebook", "CPA", "ROAS", "团队管理"],
  },
  {
    title: "TikTok 投放运营",
    department: "广告投放",
    level: "运营专员 / 总监",
    baseCities,
    summary: "负责 TikTok 广告投放、素材方向验证、账户放量和跨区域增长优化。",
    responsibilities: [
      "搭建 TikTok 投放账户和 Campaign 结构，推进素材测试、兴趣人群和出价策略。",
      "协同剪辑、美工和商务团队完成素材迭代与落地页优化。",
      "总监方向需负责预算规划、团队协作、项目复盘和高潜市场放量策略。",
    ],
    requirements: [
      "熟悉 TikTok Ads 投放逻辑、素材节奏、归因数据和账户优化方法。",
      "对短视频素材有判断力，能从数据中反推创意方向。",
      "有海外多区域投放、应用下载或订阅产品经验优先。",
    ],
    tags: ["TikTok Ads", "短视频素材", "海外增长", "预算管理"],
  },
  {
    title: "Google Ads 投放运营",
    department: "广告投放",
    level: "运营专员 / 总监",
    baseCities,
    summary: "负责 Google Ads 投放、搜索与应用广告优化、关键词策略和 ROAS 提升。",
    responsibilities: [
      "执行 Google Ads 账户搭建、关键词规划、广告组结构、预算控制和转化追踪。",
      "分析搜索词、素材、地域、设备和转化路径，提升 CPA 与 ROAS 表现。",
      "总监方向需建立跨项目投放策略、复盘标准和团队培养机制。",
    ],
    requirements: [
      "熟悉 Google Ads、应用广告、搜索广告、转化追踪和数据分析。",
      "具备关键词策略、账户结构优化和落地页协同能力。",
      "有金融、工具、游戏、AI 应用或订阅类产品投放经验优先。",
    ],
    tags: ["Google Ads", "搜索广告", "应用广告", "ROAS"],
  },
  {
    title: "广告媒介",
    department: "广告媒介",
    level: "媒介专员 / 媒介经理",
    baseCities,
    summary: "负责媒体资源、流量渠道、网盟合作和广告主资源的对接与维护。",
    responsibilities: [
      "拓展和维护 Facebook、Google、TikTok、Telegram Ads、X 及网盟流量资源。",
      "协同投放团队完成资源评估、排期沟通、价格谈判和合作落地。",
      "沉淀媒体资源库，跟进合作效果、回款节奏和复投机会。",
    ],
    requirements: [
      "有广告媒介、渠道合作、网盟商务或海外流量资源经验。",
      "具备商务沟通、资源判断和项目推进能力。",
      "熟悉应用下载、CPA、CPI、ROAS、网盟发行模式优先。",
    ],
    tags: ["媒体资源", "网盟合作", "流量渠道", "资源谈判"],
  },
  {
    title: "广告素材剪辑",
    department: "广告素材",
    level: "剪辑师 / 高级剪辑",
    baseCities,
    summary: "负责广告短视频素材剪辑、版本迭代、脚本节奏和投放素材复盘。",
    responsibilities: [
      "根据投放需求制作短视频广告素材，包括开头钩子、节奏、字幕、转场和多版本测试。",
      "围绕 Facebook、TikTok、Google 等平台要求快速产出不同规格素材。",
      "结合投放数据复盘素材表现，持续优化创意结构和剪辑模板。",
    ],
    requirements: [
      "熟悉短视频剪辑工具和广告素材制作流程。",
      "理解投放素材的前 3 秒、卖点表达、用户痛点和转化引导。",
      "有游戏、工具、AI、金融、社交产品广告素材经验优先。",
    ],
    tags: ["短视频剪辑", "广告素材", "素材复盘", "多版本测试"],
  },
  {
    title: "广告素材美工",
    department: "广告素材",
    level: "设计师 / 高级设计",
    baseCities,
    summary: "负责广告平面素材、落地页视觉、应用商店素材和品牌营销视觉设计。",
    responsibilities: [
      "设计广告图、信息流素材、商店截图、落地页视觉和活动宣传图。",
      "根据不同平台、地域和产品卖点输出多风格设计方案。",
      "与投放、剪辑和运营团队协作，持续提升素材点击率与转化表现。",
    ],
    requirements: [
      "熟悉 Photoshop、Illustrator、Figma 等设计工具。",
      "具备广告视觉、信息层级、色彩风格和商业转化意识。",
      "有海外广告素材、应用商店素材或 AI 工具类视觉经验优先。",
    ],
    tags: ["平面设计", "落地页视觉", "商店素材", "转化设计"],
  },
  {
    title: "商务经理",
    department: "商务增长",
    level: "商务经理 / 高级商务",
    baseCities,
    summary: "负责广告主、项目方、开发者服务客户和出海资源合作的开发与维护。",
    responsibilities: [
      "挖掘并跟进出海企业、项目方、广告主、开发者和服务商合作机会。",
      "理解客户业务目标，协同内部团队输出投放、开发者服务或流量合作方案。",
      "维护客户关系，推进合同、回款、复购和长期合作。",
    ],
    requirements: [
      "具备 B2B 商务拓展、广告销售、出海服务或互联网客户开发经验。",
      "目标感强，能推进复杂合作链路和跨团队沟通。",
      "有海外广告、网盟、开发者服务、支付或游戏社交金融行业资源优先。",
    ],
    tags: ["客户开发", "方案推进", "出海资源", "长期合作"],
  },
  {
    title: "渠道经理",
    department: "商务增长",
    level: "渠道经理 / 高级渠道",
    baseCities,
    summary: "负责渠道资源拓展、代理合作、区域市场合作和生态伙伴关系建设。",
    responsibilities: [
      "拓展行业渠道、代理商、服务商、社区、展会和区域合作伙伴。",
      "建立渠道合作机制，推动线索获取、项目转化和资源互换。",
      "沉淀渠道数据，评估渠道质量、合作效率和复购潜力。",
    ],
    requirements: [
      "有渠道拓展、生态合作、代理管理或区域市场经验。",
      "具备资源整合、商务谈判和合作推进能力。",
      "熟悉出海行业、广告投放、社群资源或开发者生态优先。",
    ],
    tags: ["渠道拓展", "代理合作", "生态伙伴", "资源整合"],
  },
  {
    title: "市场运营经理",
    department: "市场运营",
    level: "市场运营经理 / 高级经理",
    baseCities,
    summary: "负责市场活动、行业内容、线索增长、品牌合作和跨城市市场运营。",
    responsibilities: [
      "策划线上线下市场活动、行业专题、沙龙、联合传播和线索增长项目。",
      "协同新媒体、社群、商务和投放团队形成市场获客闭环。",
      "管理市场预算、活动节奏、线索质量和转化复盘。",
    ],
    requirements: [
      "有市场运营、活动策划、增长运营、品牌合作或 B2B 市场经验。",
      "能独立完成从策划、执行到数据复盘的完整流程。",
      "有出海、广告、SaaS、开发者服务或互联网行业经验优先。",
    ],
    tags: ["市场活动", "线索增长", "品牌合作", "跨城运营"],
  },
];

function applyHref(title: string) {
  return `mailto:business@adxj.com?subject=${encodeURIComponent(`加入我们-${title}-姓名`)}`;
}

function JobCard({ job }: { job: Job }) {
  return (
    <article className="flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:-translate-y-0.5 hover:border-blue-200 hover:shadow-xl hover:shadow-blue-100/70">
      <div className="mb-5 flex flex-col gap-3 border-b border-slate-100 pb-5">
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="mb-2 text-[10px] font-bold uppercase tracking-widest text-blue-600">
              {job.department}
            </div>
            <h3 className="text-xl font-black leading-tight text-slate-950 font-[family-name:var(--font-display)]">
              {job.title}
            </h3>
          </div>
          <span className="shrink-0 rounded-full bg-slate-100 px-3 py-1 text-[10px] font-bold text-slate-600">
            {job.level}
          </span>
        </div>
        <p className="text-sm leading-relaxed text-slate-600">{job.summary}</p>
        <div className="flex flex-wrap gap-2">
          {job.tags.map((tag) => (
            <span key={tag} className="rounded-full bg-blue-50 px-3 py-1 text-[10px] font-bold text-blue-700">
              {tag}
            </span>
          ))}
        </div>
      </div>

      <div className="grid flex-1 grid-cols-1 gap-5">
        <div>
          <div className="mb-3 flex items-center gap-2 text-xs font-black text-slate-950">
            <CheckCircle2 className="h-4 w-4 text-emerald-500" />
            岗位职责
          </div>
          <ul className="space-y-2">
            {job.responsibilities.map((item) => (
              <li key={item} className="flex gap-2 text-xs leading-relaxed text-slate-600">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-500" />
                {item}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <div className="mb-3 flex items-center gap-2 text-xs font-black text-slate-950">
            <BadgeCheck className="h-4 w-4 text-blue-500" />
            任职要求
          </div>
          <ul className="space-y-2">
            {job.requirements.map((item) => (
              <li key={item} className="flex gap-2 text-xs leading-relaxed text-slate-600">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-500" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-6 flex flex-col gap-3 border-t border-slate-100 pt-5">
        <div className="flex flex-wrap gap-2">
          {job.baseCities.map((city) => (
            <span key={city} className="rounded-full bg-slate-50 px-2.5 py-1 text-[10px] font-bold text-slate-500">
              {city}
            </span>
          ))}
        </div>
        <Link
          href={applyHref(job.title)}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-xs font-bold text-white shadow-md shadow-blue-100 transition-all hover:bg-blue-700"
        >
          投递该岗位 <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </article>
  );
}

export default function JoinPage() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-slate-50 text-slate-900 selection:bg-blue-200 selection:text-blue-950">
      <Nav />

      <section className="relative overflow-hidden border-b border-slate-200 bg-white px-6 py-20 md:px-10 md:py-24">
        <MatrixBackground />
        <div className="relative z-10 mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="mb-6 flex flex-wrap items-center gap-3">
              <span className="rounded-full border border-blue-100 bg-blue-50 px-3 py-1.5 text-[11px] font-bold text-blue-700">
                Join Blue Whale
              </span>
              <span className="rounded-full border border-emerald-100 bg-emerald-50 px-3 py-1.5 text-[11px] font-bold text-emerald-700">
                8 城招聘
              </span>
              <span className="text-xs font-bold text-slate-400">ADXJ.COM</span>
            </div>
            <h1 className="max-w-5xl text-5xl font-black leading-[1.05] text-slate-950 md:text-7xl font-[family-name:var(--font-display)]">
              加入我们
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-sky-500 to-emerald-500">
                一起搭建全球出海增长网络
              </span>
            </h1>
            <p className="mt-8 max-w-3xl text-[15px] leading-relaxed text-slate-600">
              蓝鲸出海正在寻找市场、运营、投放、开发、商务、渠道与素材方向的人才。这里连接全球广告媒体、开发者生态、行业社群和企业产品矩阵，适合愿意快速学习、独立推进、对结果负责的人。
            </p>
            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <Link
                href={applyHref("意向岗位")}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-8 py-4 text-xs font-bold text-white shadow-lg shadow-blue-200 transition-all hover:-translate-y-0.5 hover:bg-blue-700"
              >
                发送简历 <Mail className="h-4 w-4" />
              </Link>
              <Link
                href="#jobs"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-8 py-4 text-xs font-bold text-slate-700 shadow-sm transition-all hover:-translate-y-0.5 hover:bg-slate-50"
              >
                查看岗位 <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="rounded-[2rem] border border-slate-200 bg-slate-950 p-6 text-white shadow-2xl shadow-blue-900/20"
          >
            <div className="mb-6 flex items-center justify-between border-b border-white/10 pb-5">
              <div>
                <div className="text-xs font-bold text-cyan-300">Recruiting Map</div>
                <div className="mt-1 text-2xl font-black font-[family-name:var(--font-display)]">开放岗位与城市</div>
              </div>
              <Rocket className="h-9 w-9 text-cyan-300" />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <div className="text-3xl font-black text-cyan-300">{jobs.length}</div>
                <div className="mt-1 text-[10px] font-bold text-slate-400">开放岗位</div>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <div className="text-3xl font-black text-emerald-300">{baseCities.length}</div>
                <div className="mt-1 text-[10px] font-bold text-slate-400">Base 城市</div>
              </div>
            </div>
            <div className="mt-6 rounded-2xl border border-emerald-400/20 bg-emerald-400/10 p-4">
              <div className="mb-3 flex items-center gap-2 text-sm font-bold text-emerald-300">
                <MapPin className="h-4 w-4" />
                Base 地址
              </div>
              <div className="flex flex-wrap gap-2">
                {baseCities.map((city) => (
                  <span key={city} className="rounded-full bg-white/10 px-3 py-1 text-xs font-bold text-white">
                    {city}
                  </span>
                ))}
              </div>
            </div>
            <div className="mt-6 flex items-center gap-3 rounded-2xl border border-blue-400/20 bg-blue-400/10 p-4">
              <Mail className="h-5 w-5 text-blue-300" />
              <div>
                <div className="text-xs font-bold text-blue-200">简历投递邮箱</div>
                <div className="mt-1 text-sm font-black text-white">business@adxj.com</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <main className="mx-auto w-full max-w-7xl px-6 py-16 md:px-10">
        <section id="jobs" className="mb-16 scroll-mt-28">
          <div className="mb-10 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <span className="mb-3 inline-flex rounded-full border border-blue-100 bg-white px-3 py-1 text-[10px] font-bold uppercase text-blue-700 shadow-sm">
                Open Roles
              </span>
              <h2 className="text-3xl font-black text-slate-950 md:text-4xl font-[family-name:var(--font-display)]">
                热招岗位
              </h2>
            </div>
            <p className="max-w-xl text-sm leading-relaxed text-slate-600">
              所有岗位均支持北京、西安、重庆、成都、武汉、长沙、广州、深圳 Base，具体安排以面试沟通为准。
            </p>
          </div>
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            {jobs.map((job) => (
              <JobCard key={job.title} job={job} />
            ))}
          </div>
        </section>

        <section className="rounded-[2rem] border border-blue-100 bg-white p-8 shadow-xl shadow-slate-200/50 md:p-10">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_0.8fr] lg:items-center">
            <div>
              <div className="mb-3 flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-blue-700">
                <Sparkles className="h-4 w-4" />
                How To Apply
              </div>
              <h2 className="mb-4 text-3xl font-black text-slate-950 font-[family-name:var(--font-display)]">
                简历投递说明
              </h2>
              <p className="text-sm leading-relaxed text-slate-600">
                邮件建议包含：意向岗位、所在城市、简历附件、作品或案例链接、可到岗时间。投递标题建议使用“加入我们-岗位名称-姓名”。
              </p>
            </div>
            <div className="flex flex-col gap-3">
              <Link
                href={applyHref("意向岗位")}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-8 py-4 text-sm font-bold text-white shadow-lg shadow-blue-200 transition-all hover:bg-blue-700"
              >
                投递 business@adxj.com <Send className="h-4 w-4" />
              </Link>
              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-2xl bg-slate-50 p-4 text-center">
                  <Building2 className="mx-auto mb-2 h-5 w-5 text-blue-600" />
                  <div className="text-xs font-bold text-slate-600">8 城 Base</div>
                </div>
                <div className="rounded-2xl bg-slate-50 p-4 text-center">
                  <Share2 className="mx-auto mb-2 h-5 w-5 text-emerald-600" />
                  <div className="text-xs font-bold text-slate-600">多业务协同</div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Contact />
      <Footer />
    </div>
  );
}
