import React from "react";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { Contact } from "@/components/contact";
import { GrowthCurve } from "@/components/growth-curve";
import { DayZeroBadge } from "@/components/day-zero-badge";
import { SeoCaseLinks } from "@/components/seo-case-links";
import { SeoFaqSection } from "@/components/seo-faq-section";
import { serviceCaseSlugs, serviceFaqs } from "@/lib/seo-content";
import { 
  ArrowRight, 
  Target, 
  Activity, 
  Zap, 
  Wallet,
  Users, 
  ShieldCheck, 
  MapPin,
  Clock,
  PieChart,
  Megaphone,
  BriefcaseBusiness
} from "lucide-react";
import Link from 'next/link';

export default function MediaPage() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans overflow-x-hidden selection:bg-blue-100 selection:text-blue-900 flex flex-col">
      <Nav />
      {/* We need the Nav to not clash, but it's okay because the dark theme is on the left half below the hero maybe, or maybe we use a standard dark/light hero */}
      
      {/* Hero Section */}
      <section className="pt-24 pb-16 px-10 relative">
        <div className="max-w-7xl mx-auto relative z-10 text-center">
          <span className="inline-block py-1 px-3 bg-blue-100 text-blue-700 rounded-full text-[10px] font-bold uppercase tracking-widest mb-6 border border-blue-200">
            03 — TRAFFIC NETWORK
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tighter mb-6 font-[family-name:var(--font-display)] text-slate-950">
            全球流量价值的<span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500 drop-shadow-sm">“加速器”</span>
          </h1>
          <p className="max-w-3xl mx-auto text-slate-600 text-[15px] leading-relaxed text-balance">
            ADXJ 增长买量中心不仅是蓝鲸网络旗下的流量分发平台，更是一个通过技术驱动、数据对等，实现全球产品与流量极致匹配的生态系统。我们不仅为广告主提供 ROAS 确定性，更通过行业首创的 <strong className="text-emerald-600 font-bold">Day0 极速结算体系</strong>，为全球流量主提供最强劲的现金流支撑。
          </p>
        </div>
      </section>

      <main className="flex-1 w-full max-w-[1400px] mx-auto px-6 md:px-10 pb-20">
        
        {/* Split Section: Advertiser vs Publisher */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-24">
          
          {/* Left: Advertiser */}
          <div className="bg-[#0F172A] rounded-[2rem] p-10 md:p-14 relative overflow-hidden flex flex-col border border-blue-900/50 shadow-2xl shadow-blue-900/20 group">
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2 z-0"></div>
            
            <div className="relative z-10 flex-1">
              <span className="inline-flex items-center gap-1.5 py-1 px-3 bg-blue-950/50 border border-blue-800 text-blue-400 rounded-full text-xs font-bold mb-8">
                <Target className="w-3.5 h-3.5" /> 广告主 (Advertisers)
              </span>
              
              <h2 className="text-3xl font-black text-white font-[family-name:var(--font-display)] mb-4">
                精准获客与 ROAS 交付
              </h2>
              <p className="text-blue-200 text-sm leading-relaxed mb-8 border-b border-blue-900/50 pb-8">
                为出海企业锁定高质量、高转化的全球增量。ADXJ 整合了“顶级公域媒体自运营”与“数万家私域开发者矩阵”，为您提供全链路、按效果付费的获客方案。
              </p>

              <div className="space-y-6">
                <div>
                  <h4 className="text-sm font-bold text-white mb-2 flex items-center gap-2"><BriefcaseBusiness className="w-4 h-4 text-blue-400" /> 全渠道买量经验</h4>
                  <p className="text-xs text-slate-400 leading-relaxed pl-6">10 年深耕 Facebook, TikTok, Google, X, Telegram 及 Unity 平台，优化师团队提供从素材到账户起量的全托管服务。</p>
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white mb-2 flex items-center gap-2"><Activity className="w-4 h-4 text-blue-400" /> 深度擅长行业</h4>
                  <p className="text-xs text-slate-400 leading-relaxed pl-6">在 Slots (高LTV模型)、社交直播、现金贷 (低CPL控制)、AI应用 (订阅优化) 及网赚等领域拥有顶尖跑量模型。</p>
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white mb-2 flex items-center gap-2"><PieChart className="w-4 h-4 text-blue-400" /> 多维结算模式</h4>
                  <p className="text-xs text-slate-400 leading-relaxed pl-6">深度支持 CPA (按行为计费) 与按 ROAS 目标结算。买量风险留给我们，只为您呈现最终的业绩增长。</p>
                </div>
              </div>

              <GrowthCurve />
            </div>

            <a href="https://t.me/M7HHHH" target="_blank" rel="noopener noreferrer" className="relative z-10 w-full mt-6 bg-blue-600 hover:bg-blue-500 text-white py-4 rounded-xl text-sm font-bold shadow-lg shadow-blue-600/30 transition-all flex items-center justify-center gap-2 tracking-widest group">
              获取我的增长方案
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>

          {/* Right: Publisher */}
          <div className="bg-[#022C22] rounded-[2rem] p-10 md:p-14 relative overflow-hidden flex flex-col border border-emerald-900/50 shadow-2xl shadow-emerald-900/20 group">
             <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2 z-0"></div>
            
            <div className="relative z-10 flex-1">
              <span className="inline-flex items-center gap-1.5 py-1 px-3 bg-emerald-950/50 border border-emerald-800 text-emerald-400 rounded-full text-xs font-bold mb-8">
                <Megaphone className="w-3.5 h-3.5" /> 流量主 (Publishers)
              </span>
              
              <h2 className="text-3xl font-black text-white font-[family-name:var(--font-display)] mb-4">
                变现收益 Max 与 Day0 结算
              </h2>
              <p className="text-emerald-100/70 text-sm leading-relaxed mb-8 border-b border-emerald-900/50 pb-8">
                让每一份流量即刻变现，让资金周转零等待。ADXJ 提供海量直签高价广告主资源，保证 100% 填充与行业最首创极速结算周期。
              </p>

              <div className="space-y-6">
                <div>
                  <h4 className="text-sm font-bold text-white mb-2 flex items-center gap-2"><Zap className="w-4 h-4 text-emerald-400 fill-emerald-400" /> Day0 (T+0) 极速结算</h4>
                  <p className="text-xs text-slate-400 leading-relaxed pl-6">流量收益支持当天申请、当天结算。告别传统网盟 15-30 天漫长回款，为您提供最极致的现金流支持。</p>
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white mb-2 flex items-center gap-2"><Wallet className="w-4 h-4 text-emerald-400" /> 海量高单价填充</h4>
                  <p className="text-xs text-slate-400 leading-relaxed pl-6">依托庞大的广告主库 (直签 Slots, 金融, AI等)，确保广告质量高、转化好、单价 (eCPM) 领先行业。</p>
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white mb-2 flex items-center gap-2"><Activity className="w-4 h-4 text-emerald-400" /> 便捷接入与透明后台</h4>
                  <p className="text-xs text-slate-400 leading-relaxed pl-6">支持主流 SDK & API 极速对接。提供分钟级更新的大数据看板，流量价值清晰可见。</p>
                </div>
              </div>

              <DayZeroBadge />
            </div>

            <a href="https://t.me/M7HHHH" target="_blank" rel="noopener noreferrer" className="relative z-10 w-full mt-6 bg-emerald-600 hover:bg-emerald-500 text-white py-4 rounded-xl text-sm font-bold shadow-lg shadow-emerald-600/30 transition-all flex items-center justify-center gap-2 tracking-widest group">
              计算我的变现收益
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>

        </div>

        {/* Core Competitive Barriers */}
        <section className="mb-10">
          <div className="flex flex-col items-center text-center mb-12">
            <h2 className="text-3xl font-black text-slate-900 font-[family-name:var(--font-display)]">竞争壁垒：为什么选择 ADXJ？</h2>
            <div className="w-12 h-1 bg-blue-600 mt-6 rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-xl shadow-slate-200/40 hover:-translate-y-1 transition-transform">
              <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center mb-6">
                <Clock className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-3">十载底蕴</h3>
              <p className="text-sm text-slate-600 leading-relaxed">始于 2016 年的自运营沉淀，让我们比任何人都懂流量背后的真实转化价值。</p>
            </div>
            
            <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-xl shadow-slate-200/40 hover:-translate-y-1 transition-transform">
              <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center mb-6">
                <ShieldCheck className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-3">技术赋能</h3>
              <p className="text-sm text-slate-600 leading-relaxed">配合 ADXJ 开发者中心的应用代发与高权重账号，让产品在最稳健环境下对接。</p>
            </div>

            <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-xl shadow-slate-200/40 hover:-translate-y-1 transition-transform">
              <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center mb-6">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-3">社群背书</h3>
              <p className="text-sm text-slate-600 leading-relaxed">借助 100K+ 出海交流群，第一时间感知市场风向，提供预警和先机。</p>
            </div>

            <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-xl shadow-slate-200/40 hover:-translate-y-1 transition-transform">
              <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center mb-6">
                <MapPin className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-3">八城联动</h3>
              <p className="text-sm text-slate-600 leading-relaxed">武汉、深圳等 8 地团队，全球化业务 24/7 即时响应与面对面信任保障。</p>
            </div>
          </div>
        </section>

        <div className="space-y-8">
          <SeoCaseLinks
            title="海外投放与网盟增长案例"
            description="从 Meta、TikTok、CPA 网盟和自动化投放问题进入，快速定位素材、事件、预算、结算和质量回传卡点。"
            slugs={serviceCaseSlugs.media}
            topicSlugs={["meta-ads", "tiktok-ads", "cpa-network", "cash-loan"]}
          />
          <SeoFaqSection
            items={serviceFaqs.media}
            title="媒体买量常见问题"
            description="咨询时建议准备账户结构、素材列表、事件回传、落地页、商店页和后端收入数据。"
          />
        </div>

      </main>

      <Contact />
      <Footer />
    </div>
  );
}
