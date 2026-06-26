import React from "react";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { CodeFlowBackground } from "@/components/code-flow-bg";
import { DeveloperFloatWidget } from "@/components/developer-float";
import { 
  Store, 
  KeySquare, 
  ShieldCheck, 
  Cpu, 
  ExternalLink,
  Code2,
  Terminal,
  Server,
  Zap,
  CheckCircle2,
  Settings2,
  Search,
  Globe2,
  BriefcaseBusiness,
  ActivitySquare,
  Network,
  Users,
  MonitorPlay
} from "lucide-react";

import { Contact } from "@/components/contact";
import { SeoCaseLinks } from "@/components/seo-case-links";
import { SeoFaqSection } from "@/components/seo-faq-section";
import { serviceCaseSlugs, serviceFaqs } from "@/lib/seo-content";

export default function DeveloperPage() {
  return (
    <div className="min-h-screen bg-[#0F172A] text-slate-300 font-sans overflow-x-hidden selection:bg-blue-500/30 selection:text-white flex flex-col">
      <Nav />
      {/* Set Nav to dark mode if we can, but since Nav is global, maybe let it be. Actually Nav might look weird if it's white? Nav is absolute? No Nav is block. We can just keep the page content dark. */}
      
      {/* Hero Section */}
      <section className="relative pt-24 pb-20 px-10 border-b border-blue-900/50 shadow-2xl shadow-blue-900/20 overflow-hidden">
        <CodeFlowBackground />
        
        <div className="max-w-7xl mx-auto relative z-10 text-center flex flex-col items-center">
          <div className="flex items-center gap-3 mb-6">
            <span className="inline-flex items-center gap-2 py-1.5 px-4 bg-blue-950/50 border border-blue-800/50 text-blue-400 rounded-full text-[10px] font-bold uppercase tracking-widest backdrop-blur-sm">
              <Terminal className="w-3 h-3" />
              02 — DEVELOPER SERVICES
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tighter mb-8 font-[family-name:var(--font-display)] text-balance max-w-4xl leading-tight">
            百人研发团队，扫清产品研发与<br className="hidden md:block"/>商店上架的
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">每一道障碍</span>
          </h1>
          
          <p className="text-blue-100/70 text-[15px] leading-relaxed max-w-3xl mb-12">
            ADXJ 开发者中心隶属于蓝鲸网络，始于 2016 年。我们不只是代码的编写者，更是全球应用商店生态的专家。我们拥有 <strong className="text-white">100+</strong> 资深研发工程师，在武汉、深圳等 8 城设有技术交付中心。我们通过“自研技术+商店合规策略+高权重账号矩阵”三位一体，助力出海企业在最短时间内实现产品的稳定上线与高效迭代。
          </p>

          {/* Dynamic Stats Banner */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full max-w-4xl">
            <div className="bg-[#1E293B]/80 backdrop-blur border border-blue-900/50 rounded-2xl p-5 flex flex-col items-center justify-center text-center">
              <div className="text-cyan-400 text-3xl font-black mb-1 font-mono">98%</div>
              <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">综合上架成功率</div>
            </div>
            <div className="bg-[#1E293B]/80 backdrop-blur border border-blue-900/50 rounded-2xl p-5 flex flex-col items-center justify-center text-center">
              <div className="text-blue-400 text-3xl font-black mb-1 font-mono">10K+</div>
              <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">高权重账号库存</div>
            </div>
             <div className="bg-[#1E293B]/80 backdrop-blur border border-blue-900/50 rounded-2xl p-5 flex flex-col items-center justify-center text-center">
              <div className="text-emerald-400 text-3xl font-black mb-1 font-mono">100+</div>
              <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">核心研发工程师</div>
            </div>
            <div className="bg-[#1E293B]/80 backdrop-blur border border-blue-900/50 rounded-2xl p-5 flex flex-col items-center justify-center text-center">
              <div className="text-indigo-400 text-3xl font-black mb-1 font-mono">8城</div>
              <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">技术交付中心联动</div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-10 py-20 z-10 relative">
        
        {/* Core Business 1: 深度研发与全品类上架 */}
        <section className="mb-24">
          <div className="flex flex-col md:flex-row gap-12 mb-10 w-full items-start md:items-end">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-blue-900/40 border border-blue-800 flex items-center justify-center">
                  <Code2 className="w-5 h-5 text-blue-400" />
                </div>
                <h2 className="text-3xl font-black text-white font-[family-name:var(--font-display)] tracking-tight">深度研发与全品类上架</h2>
              </div>
              <p className="text-slate-400 text-sm">不仅研发产品，更保证“下包”与“在线”。针对不同品类提供从代码架构到商店发布的定制化方案。</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-[#162032] border border-slate-800 hover:border-blue-900/80 p-8 rounded-3xl transition-colors">
              <h3 className="text-xl font-bold text-white mb-3">iGaming & Slots</h3>
              <p className="text-slate-400 text-xs leading-relaxed">针对复杂图形渲染与合规化检测，提供独家混淆技术。深度伪装代码逻辑，突破机审壁垒，确保高价值产品顺利入驻商店。</p>
            </div>
            <div className="bg-[#162032] border border-slate-800 hover:border-blue-900/80 p-8 rounded-3xl transition-colors">
              <h3 className="text-xl font-bold text-white mb-3">社交直播 & IM</h3>
              <p className="text-slate-400 text-xs leading-relaxed">高并发实时通讯架构（IM），结合全球化的 CDN 分发节点。社交 App 快速开发与多国语言适配，确保跨国交流无延迟。</p>
            </div>
             <div className="bg-[#162032] border border-slate-800 hover:border-blue-900/80 p-8 rounded-3xl transition-colors">
              <h3 className="text-xl font-bold text-white mb-3">Fintech & 现金贷</h3>
              <p className="text-slate-400 text-xs leading-relaxed">彻底解决金融类产品上架门槛高、审核严的痛点，提供分期商城、白牌钱包等全套合规化技术架构与外壳伪装方案。</p>
            </div>
            <div className="bg-[#162032] border border-slate-800 hover:border-blue-900/80 p-8 rounded-3xl transition-colors">
              <h3 className="text-xl font-bold text-white mb-3">AI 创新应用</h3>
              <p className="text-slate-400 text-xs leading-relaxed">紧跟时代风口，涵盖 AI 伴侣（Character AI 架构）、AI 图生视频、订阅类工具等最新趋势产品的快速功能集成与发布交付。</p>
            </div>
          </div>
        </section>

        {/* Process Flow */}
        <section className="mb-24 bg-[#1E293B] border border-slate-700/50 rounded-3xl p-10 md:p-14 relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 p-10 opacity-5">
            <Server className="w-64 h-64 text-blue-300" />
          </div>
          <div className="relative z-10 text-center mb-10">
            <h2 className="text-2xl font-black text-white font-[family-name:var(--font-display)]">全栈自研·上架闭环 (The Loop)</h2>
            <p className="text-slate-400 text-xs mt-2">打通从第一行代码到应用商店第一名的全链路节点</p>
          </div>
          
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 relative z-10">
            {[ 
              { icon: Search, label: "需求分析" },
              { icon: Code2, label: "代码研发" },
              { icon: Settings2, label: "混淆处理" },
              { icon: KeySquare, label: "权重号匹配" },
              { icon: Store, label: "商店发布" }
            ].map((step, idx, arr) => (
              <React.Fragment key={idx}>
                <div className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 bg-blue-900/50 border border-blue-700/50 rounded-2xl flex items-center justify-center text-blue-400 shadow-inner mb-3 shadow-blue-900/50">
                    <step.icon className="w-6 h-6" />
                  </div>
                  <span className="text-[11px] font-bold text-slate-300 tracking-wider">{step.label}</span>
                </div>
                {idx < arr.length - 1 && (
                  <div className="hidden md:block flex-1 h-[1px] bg-slate-700 mx-2 relative top-[-10px]">
                     <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 border-r border-t border-slate-500 rotate-45 transform"></div>
                  </div>
                )}
                {/* Mobile connector */}
                {idx < arr.length - 1 && (
                  <div className="md:hidden w-[1px] h-6 bg-slate-700 my-1 relative">
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-2 h-2 border-r border-b border-slate-500 rotate-45 transform"></div>
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>
        </section>

        {/* Core Business 2 & Expert Consulting */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-24">
          
          <section>
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 rounded-xl bg-blue-900/40 border border-blue-800 flex items-center justify-center">
                <KeySquare className="w-5 h-5 text-blue-400" />
              </div>
              <h2 className="text-2xl font-black text-white font-[family-name:var(--font-display)]">全球高权重开发者账号中枢</h2>
            </div>
            
             <p className="text-slate-400 text-sm mb-6 pb-6 border-b border-slate-800">
              买卖、回收、培育——您的产品需要更稳固的“地基”。我们提供业内最稳定的开发者账号资源网络。
            </p>

             <div className="space-y-4">
              <div className="bg-[#162032] p-5 rounded-2xl border border-slate-800">
                <h4 className="text-sm font-bold text-white mb-2 flex items-center gap-2"><Globe2 className="w-4 h-4 text-blue-500" /> GP/苹果老号交易</h4>
                <p className="text-xs text-slate-400 leading-relaxed">长期供应美国、欧洲、东南亚等本土资料的高权重老号，注册时长 1-3 年，抗封禁能力极强。</p>
              </div>
              <div className="bg-[#162032] p-5 rounded-2xl border border-slate-800">
                <h4 className="text-sm font-bold text-white mb-2 flex items-center gap-2"><BriefcaseBusiness className="w-4 h-4 text-blue-500" /> 企业级资源</h4>
                <p className="text-xs text-slate-400 leading-relaxed">提供核心级企业背书资源，包括 Apple $299 企代账号、邓白氏码 (D-U-N-S) 代申请服务。</p>
              </div>
              <div className="bg-[#162032] p-5 rounded-2xl border border-slate-800">
                <h4 className="text-sm font-bold text-white mb-2 flex items-center gap-2"><Network className="w-4 h-4 text-blue-500" /> 防关联技术</h4>
                <p className="text-xs text-slate-400 leading-relaxed">每一组账号均经过独家指纹参数修改、硬件隔离与原生海外 IP 环境处理，确保多号矩阵绝对隔离。</p>
              </div>
               <div className="bg-[#162032] p-5 rounded-2xl border border-slate-800">
                <h4 className="text-sm font-bold text-white mb-2 flex items-center gap-2"><ActivitySquare className="w-4 h-4 text-blue-500" /> 闲置账号回收</h4>
                <p className="text-xs text-slate-400 leading-relaxed">长期高价现金回收闲置、优质的 Google Play / App Store 老账号，为开发者拓宽变现渠道。</p>
              </div>
            </div>
          </section>

          <section>
             <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 rounded-xl bg-blue-900/40 border border-blue-800 flex items-center justify-center">
                <ShieldCheck className="w-5 h-5 text-blue-400" />
              </div>
              <h2 className="text-2xl font-black text-white font-[family-name:var(--font-display)]">专家级商店对抗与咨询</h2>
            </div>
            
            <p className="text-slate-400 text-sm mb-6 pb-6 border-b border-slate-800">
              10 年实战沉淀，专治各类商店疑难杂症，从底层代码到外部申诉，提供专业诊断方案。
            </p>

            <div className="space-y-6">
              <div className="pl-6 border-l-2 border-blue-600 relative">
                <div className="absolute top-0 left-[-5px] w-2 h-2 rounded-full bg-blue-400"></div>
                <h4 className="font-bold text-white mb-2">关联封号救治</h4>
                <p className="text-xs text-slate-400 leading-relaxed">出具深度体检报告，诊断 Google Play / App Store 封号的底层因素，构建合规话术协助提交申诉工单，尽可能挽回数字资产。</p>
              </div>
               <div className="pl-6 border-l-2 border-blue-600 relative">
                <div className="absolute top-0 left-[-5px] w-2 h-2 rounded-full bg-blue-400"></div>
                <h4 className="font-bold text-white mb-2">代码混淆与加固</h4>
                <p className="text-xs text-slate-400 leading-relaxed">针对被商店标记为“重复包”、“马甲包”、“关联违规”的代码，提供字节码级的合规化重构与架构混淆防护。</p>
              </div>
               <div className="pl-6 border-l-2 border-blue-600 relative">
                <div className="absolute top-0 left-[-5px] w-2 h-2 rounded-full bg-blue-400"></div>
                <h4 className="font-bold text-white mb-2">ASO 性能优化</h4>
                <p className="text-xs text-slate-400 leading-relaxed">通过极限技术手段优化包体大小、冷启动速度与内存加载性能，配合基础 ASO 手段提升商店内的自然搜索与展示权重。</p>
              </div>
            </div>
          </section>

        </div>

        {/* Why Choose Us */}
        <section className="bg-gradient-to-br from-blue-950/20 to-transparent border border-blue-900/50 rounded-3xl p-10 md:p-14">
          <h2 className="text-3xl font-black text-white font-[family-name:var(--font-display)] text-center mb-12">
            为什么选择 ADXJ 开发者服务？
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-[#0F172A] p-6 rounded-2xl border border-slate-800 shadow-lg text-center flex flex-col items-center">
              <div className="w-12 h-12 bg-blue-900/30 rounded-xl flex items-center justify-center mb-4 border border-blue-800/30">
                <Users className="w-6 h-6 text-blue-400" />
              </div>
              <h4 className="font-bold text-sm text-white mb-2">百人团队背书</h4>
              <p className="text-[11px] text-slate-400 leading-snug">非个人作坊，100+ 专业研发人员常驻，确保稳定的交付周期与长期的售后维护。</p>
            </div>
             <div className="bg-[#0F172A] p-6 rounded-2xl border border-slate-800 shadow-lg text-center flex flex-col items-center">
              <div className="w-12 h-12 bg-blue-900/30 rounded-xl flex items-center justify-center mb-4 border border-blue-800/30">
                <Zap className="w-6 h-6 text-blue-400" />
              </div>
              <h4 className="font-bold text-sm text-white mb-2">敏感品类专家</h4>
              <p className="text-[11px] text-slate-400 leading-snug">无惧高压监管，在多类复杂、高危的行业（如 Slots/贷），我们拥有数千起线上案例。</p>
            </div>
             <div className="bg-[#0F172A] p-6 rounded-2xl border border-slate-800 shadow-lg text-center flex flex-col items-center">
              <div className="w-12 h-12 bg-blue-900/30 rounded-xl flex items-center justify-center mb-4 border border-blue-800/30">
                <Network className="w-6 h-6 text-blue-400" />
              </div>
              <h4 className="font-bold text-sm text-white mb-2">技术联动账号</h4>
              <p className="text-[11px] text-slate-400 leading-snug">打破资源孤岛，研发完成后直接内部匹配最高权重的账号矩阵封装上架，实现交钥匙工程。</p>
            </div>
             <div className="bg-[#0F172A] p-6 rounded-2xl border border-slate-800 shadow-lg text-center flex flex-col items-center">
              <div className="w-12 h-12 bg-blue-900/30 rounded-xl flex items-center justify-center mb-4 border border-blue-800/30">
                <MonitorPlay className="w-6 h-6 text-blue-400" />
              </div>
              <h4 className="font-bold text-sm text-white mb-2">10年政策追踪</h4>
              <p className="text-[11px] text-slate-400 leading-snug">自 2016 年组建以来，每日监控 GP / iOS 审核动态风向，提前为存量产品部署防御方案。</p>
            </div>
          </div>
        </section>        

        <div className="mt-10 space-y-8">
          <SeoCaseLinks
            title="开发者服务高意图案例"
            description="围绕 App Store、Google Play、开发者账号和包体合规，优先查看最接近当前问题的案例。"
            slugs={serviceCaseSlugs.developer}
            topicSlugs={["app-store", "google-play", "aso"]}
            theme="dark"
          />
          <SeoFaqSection
            items={serviceFaqs.developer}
            title="开发者服务常见问题"
            description="如果已经出现拒审、下架、账号关联或更新卡点，建议先保留邮件、后台截图、包体信息和账号操作记录。"
            theme="dark"
          />
        </div>

      </main>

      <DeveloperFloatWidget />
      
      {/* Footer can remain same style, but wrap in dark mode context if needed. Let's keep it since its design is light. But this mixes themes. We should constrain Contact and Footer appropriately if we really want full consistency, but standard behavior allows them to be distinct footers. */}
      {/* We can force Contact to look okay, but let's just let it render below. Wait, Contact component uses bg-white, which might clash starkly. */}
      <div className="bg-slate-50 text-slate-900 pt-10 rounded-t-[40px] mt-10 shadow-[0_-20px_50px_rgba(0,0,0,0.5)] relative z-20">
        <Contact />
        <Footer />
      </div>
    </div>
  );
}
