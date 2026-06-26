import React from "react";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { Contact } from "@/components/contact";
import { LiveTicker } from "@/components/live-ticker";
import { SeoCaseLinks } from "@/components/seo-case-links";
import { SeoFaqSection } from "@/components/seo-faq-section";
import { serviceCaseSlugs, serviceFaqs } from "@/lib/seo-content";
import { 
  Globe2, 
  MessageCircle, 
  Users, 
  ShieldCheck,
  Send,
  MessageSquare,
  LayoutGrid,
  MonitorPlay,
  Layers,
  Activity,
  CheckCircle2,
  LockKeyhole,
  HeartHandshake,
  Network,
  Milestone,
  ExternalLink,
  Map
} from "lucide-react";
import Link from 'next/link';

export default function CommunityPage() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans overflow-x-hidden selection:bg-blue-500/30 selection:text-blue-900 flex flex-col">
      <Nav />
      {/* Dynamic Ticker Top Bar */}
      <LiveTicker />
      
      <main className="flex-1 w-full max-w-7xl mx-auto px-10 py-16">
        
        {/* Section I: Brand Positioning */}
        <section className="mb-20 text-center md:text-left flex flex-col md:flex-row gap-12 items-center">
          <div className="flex-1">
            <span className="text-blue-600 font-mono text-xs font-bold tracking-widest mb-4 inline-block bg-white px-3 py-1.5 rounded-full shadow-sm border border-slate-200">
              01 — 品牌定位：出海决策者的“外部智库”
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tighter uppercase mb-6 font-[family-name:var(--font-display)] text-balance">
              链接全球出海精英<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500 drop-shadow-sm">打破双重孤岛</span>
            </h1>
            <p className="text-slate-600 text-[15px] leading-relaxed max-w-2xl text-balance">
              ADXJ 社群矩阵不仅是蓝鲸网络旗下的资源中心，更是出海行业的“动态情报站”。自 2016 年起，我们通过分布于全球的 100K+ 垂直社群，汇聚了 50 万+ 出海从业者。在这里，没有无效的推销，只有关于市场风向、政策解读、资源撮合的干货碰撞。
            </p>
          </div>
          <div className="hidden md:flex flex-1 justify-end relative">
            <div className="w-72 h-72 rounded-full bg-gradient-to-br from-blue-100 to-cyan-50 blur-3xl absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"></div>
            <Network className="w-64 h-64 text-blue-900/5 relative z-10" />
            <Globe2 className="w-32 h-32 text-blue-600 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20" />
          </div>
        </section>

        {/* Section II: Platform Matrix (Grouped Cards) */}
        <section className="mb-24">
          <div className="flex items-center gap-4 mb-10">
            <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center">
              <LayoutGrid className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <h2 className="text-2xl font-black font-[family-name:var(--font-display)] tracking-tight">两大平台矩阵：深度信息渗透</h2>
              <p className="text-sm font-bold text-slate-400 uppercase tracking-widest mt-1">Platform Matrices</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Telegram */}
            <div className="bg-white group overflow-hidden border border-slate-200 hover:border-blue-400 p-8 rounded-3xl shadow-xl shadow-slate-200/40 transition-all hover:shadow-blue-900/10 relative">
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-bl-[100px] -z-0 transition-transform group-hover:scale-110 ease-out duration-500"></div>
              <div className="flex items-center gap-4 mb-6 relative z-10">
                <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white shadow-md shadow-blue-500/30">
                  <Send className="w-6 h-6 -ml-1" />
                </div>
                <h3 className="text-xl font-bold">Telegram | 全球实战情报站</h3>
              </div>
              <div className="space-y-4 relative z-10">
                <p className="text-sm text-slate-700 leading-relaxed border-b border-slate-100 pb-4">
                  <strong className="text-blue-900 font-bold block mb-1">核心内容：</strong>
                  实时同步全球 iGaming 趋势、Web3 项目动态、高净值海外人脉。
                </p>
                <p className="text-sm text-slate-700 leading-relaxed">
                  <strong className="text-blue-900 font-bold block mb-1">特点：</strong>
                  <span className="inline-block px-2 text-[10px] font-bold bg-blue-50 text-blue-600 rounded mr-1">极速</span>
                  <span className="inline-block px-2 text-[10px] font-bold bg-blue-50 text-blue-600 rounded mr-1">高敏感度</span>
                  <span className="inline-block px-2 text-[10px] font-bold bg-blue-50 text-blue-600 rounded">全球化</span><br/>
                  适合寻找第一手海外市场变动与高阶技术交流。
                </p>
              </div>
            </div>

            {/* WeChat */}
            <div className="bg-white group overflow-hidden border border-slate-200 hover:border-green-400 p-8 rounded-3xl shadow-xl shadow-slate-200/40 transition-all hover:shadow-green-900/10 relative">
              <div className="absolute top-0 right-0 w-32 h-32 bg-green-50 rounded-bl-[100px] -z-0 transition-transform group-hover:scale-110 ease-out duration-500"></div>
              <div className="flex items-center gap-4 mb-6 relative z-10">
                <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center text-white shadow-md shadow-green-500/30">
                  <MessageSquare className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold">WeChat | 深度行业私域圈</h3>
              </div>
              <div className="space-y-4 relative z-10">
                <p className="text-sm text-slate-700 leading-relaxed border-b border-slate-100 pb-4">
                  <strong className="text-green-950 font-bold block mb-1">核心内容：</strong>
                  垂直品类（Slots、现金贷、社交直播）的 B2B 深度探讨，技术上架避坑指南。
                </p>
                <p className="text-sm text-slate-700 leading-relaxed">
                  <strong className="text-green-950 font-bold block mb-1">特点：</strong>
                  <span className="inline-block px-2 text-[10px] font-bold bg-green-50 text-green-700 rounded mr-1">高信任度</span>
                  <span className="inline-block px-2 text-[10px] font-bold bg-green-50 text-green-700 rounded mr-1">实名化</span>
                  <span className="inline-block px-2 text-[10px] font-bold bg-green-50 text-green-700 rounded">深度合作</span><br/>
                  适合对接支付通道、研发技术及大厂商务。
                </p>
              </div>
            </div>



          </div>
        </section>

        {/* Section III & IV: Industry Map & Core Values */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-24">
          
          {/* Industry Map */}
          <section>
            <div className="flex items-center gap-4 mb-8">
              <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center">
                <Map className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <h2 className="text-2xl font-black font-[family-name:var(--font-display)] tracking-tight">行业图谱：深耕垂直品类的实战交流</h2>
              </div>
            </div>
            
            <div className="space-y-4">
              {[
                { title: "iGaming & Slots", desc: "全球各地区支付（Local Pay）、买量回收模型、防关联封号对策。" },
                { title: "Fintech & 现金贷", desc: "下沉市场获客策略、分期商城风控模型、东南亚/拉美政策法规研讨。" },
                { title: "Social & AI", desc: "直播公会资源、AI 伴侣模型调优、即时通讯（IM）应用的用户留存方案。" },
                { title: "Web3 & 加密货币", desc: "全球合规牌照讨论、行业垂直流量分发、资产安全交流。" },
                { title: "网赚与兼职", desc: "全球蓝领/白领招聘获客、兼职平台推广逻辑分享。" }
              ].map((item, idx) => (
                <div key={idx} className="bg-white border border-slate-200 p-5 rounded-2xl flex gap-4 items-start shadow-sm hover:shadow-md transition-shadow">
                  <div className="mt-1 w-2 h-2 rounded-full bg-blue-500 shrink-0"></div>
                  <div>
                    <h4 className="text-[15px] font-bold text-slate-900 mb-1">{item.title}</h4>
                    <p className="text-sm text-slate-600 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Core Values */}
          <section>
             <div className="flex items-center gap-4 mb-8">
              <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center">
                <Milestone className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <h2 className="text-2xl font-black font-[family-name:var(--font-display)] tracking-tight">加入 ADXJ 社群的四大价值</h2>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-[#FAF8F5] border border-slate-200 p-6 rounded-2xl">
                <div className="w-8 h-8 rounded-full bg-white shadow flex items-center justify-center mb-4">
                  <Activity className="w-4 h-4 text-blue-600" />
                </div>
                <h4 className="font-bold text-sm mb-2 text-slate-900">信息差优势</h4>
                <p className="text-xs text-slate-600 leading-relaxed">第一时间获取 Google Play、App Store 最新的封包、过审政策变动。</p>
              </div>
              <div className="bg-[#FAF8F5] border border-slate-200 p-6 rounded-2xl">
                <div className="w-8 h-8 rounded-full bg-white shadow flex items-center justify-center mb-4">
                  <Network className="w-4 h-4 text-blue-600" />
                </div>
                <h4 className="font-bold text-sm mb-2 text-slate-900">资源直连</h4>
                <p className="text-xs text-slate-600 leading-relaxed">绕过中介，直接在群内对接全球数以万计的开发者、站长与流量主。</p>
              </div>
              <div className="bg-[#FAF8F5] border border-slate-200 p-6 rounded-2xl">
                <div className="w-8 h-8 rounded-full bg-white shadow flex items-center justify-center mb-4">
                  <ShieldCheck className="w-4 h-4 text-blue-600" />
                </div>
                <h4 className="font-bold text-sm mb-2 text-slate-900">合规互助</h4>
                <p className="text-xs text-slate-600 leading-relaxed">交流不同国家/地区的财税政策、法律合规及第三方支付通道的真实口碑。</p>
              </div>
              <div className="bg-[#FAF8F5] border border-slate-200 p-6 rounded-2xl">
                <div className="w-8 h-8 rounded-full bg-white shadow flex items-center justify-center mb-4">
                  <Users className="w-4 h-4 text-blue-600" />
                </div>
                <h4 className="font-bold text-sm mb-2 text-slate-900">线下联动</h4>
                <p className="text-xs text-slate-600 leading-relaxed">依托蓝鲸网络在武汉、深圳等 8 个城市的实地中心，私密沙龙促进实物合作。</p>
              </div>
            </div>
          </section>

        </div>

        {/* Section V: Exclusivity */}
        <section className="bg-[#0F172A] rounded-3xl p-10 md:p-14 text-white relative overflow-hidden shadow-2xl shadow-blue-900/20 mb-8 flex flex-col md:flex-row items-center gap-10">
          <div className="absolute top-0 right-0 p-8 opacity-10 transform translate-x-4 -translate-y-4">
            <LockKeyhole className="w-64 h-64 text-blue-400" />
          </div>
          
          <div className="flex-1 relative z-10 w-full">
            <span className="text-cyan-400 font-mono text-xs font-bold tracking-widest mb-4 inline-block px-3 py-1 bg-cyan-950/50 border border-cyan-900 rounded-full">EXCLUSIVITY</span>
            <h2 className="text-3xl font-black font-[family-name:var(--font-display)] mb-6 text-white text-balance">入群申请准则，坚守高质量生态</h2>
            <p className="text-blue-100 text-sm leading-relaxed mb-8 max-w-xl">为了保证社群质量，我们执行严格的准入制度。交流环境纯洁极致，只服务于真正的出海决策者。</p>
            
            <div className="space-y-4 mb-8">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-bold text-white">身份审核</h4>
                  <p className="text-xs text-blue-200 mt-1">仅限出海方向开发者、项目方、服务商（支付/物流/推广）加入。</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <ShieldCheck className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-bold text-white">禁言准则</h4>
                  <p className="text-xs text-blue-200 mt-1">严禁发布刷屏广告及诈骗信息，一经发现即永久移出 ADXJ 全域社群。</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <HeartHandshake className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-bold text-white">鼓励分享</h4>
                  <p className="text-xs text-blue-200 mt-1">我们提倡“利他主义”，鼓励在群内分享实战案例，共建出海增长生态。</p>
                </div>
              </div>
            </div>
            
            <Link href="https://community.adxj.com" target="_blank" rel="noopener noreferrer" className="bg-blue-600 hover:bg-blue-500 text-white px-8 py-4 rounded-xl text-sm font-bold shadow-lg shadow-blue-500/20 transition-all flex items-center justify-center gap-2 w-full md:w-auto uppercase tracking-widest inline-flex">
              提交入群申请 <ExternalLink className="w-4 h-4 ml-1" />
            </Link>
          </div>
        </section>

        <div className="space-y-8">
          <SeoCaseLinks
            title="Telegram 私域与社群转化案例"
            description="从 Bot 筛选、客服响应、频道广告和人工咨询承接进入，优化用户从进群到咨询的完整路径。"
            slugs={serviceCaseSlugs.community}
            topicSlugs={["telegram", "cpa-network", "ai-apps"]}
          />
          <SeoFaqSection
            items={serviceFaqs.community}
            title="行业社群常见问题"
            description="咨询社群合作时，建议说明业务品类、目标地区、希望对接的资源类型和当前转化卡点。"
          />
        </div>

      </main>

      <Contact />
      <Footer />
    </div>
  );
}
