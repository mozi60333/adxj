"use client";

import React from "react";
import Link from 'next/link';
import { motion } from "motion/react";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { 
  ArrowRight, 
  Users, 
  Code2, 
  Target, 
} from "lucide-react";

import { Contact } from "@/components/contact";
import { MatrixBackground } from "@/components/matrix-pattern";

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans overflow-x-hidden selection:bg-blue-500/30 selection:text-blue-900 flex flex-col">
      <Nav />

      {/* Hero Section */}
      <section className="pt-24 pb-16 px-10 relative border-b border-slate-200 shadow-sm bg-white overflow-hidden">
        <MatrixBackground />
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gradient-to-bl from-blue-50 to-transparent rounded-full blur-3xl opacity-50 transform translate-x-1/2 -translate-y-1/4 pointer-events-none"></div>
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col md:flex-row gap-10 md:items-center justify-between"
          >
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-6">
                <span className="inline-block py-1.5 px-3 bg-slate-50 border border-slate-200 rounded-full text-[10px] text-blue-700 font-bold uppercase tracking-widest shadow-sm">
                  蓝鲸网络 (Blue Whale Network)
                </span>
                <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">ADXJ.COM</span>
              </div>
              
              <h1 className="text-5xl md:text-7xl lg:text-[5.5rem] font-black tracking-tighter leading-[1.05] text-slate-900 mb-6 font-[family-name:var(--font-display)] text-balance">
                全球效果营销中枢<br/>
                按结果付费的<span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500 drop-shadow-sm">增长引擎</span>
              </h1>
              <p className="text-[15px] text-slate-600 leading-relaxed mb-10 max-w-2xl text-balance">
                自 2016 年起，专注于通过社群情报、硬核研发与增长买量，助力出海企业实现极致 ROAS 与业务突破。
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="#modules" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-xs font-bold uppercase tracking-widest transition-all shadow-[0_0_20px_rgba(37,99,235,0.3)] hover:shadow-[0_0_30px_rgba(37,99,235,0.5)] flex items-center justify-center gap-2 rounded-xl group hover:-translate-y-0.5">
                  探索解决方案 <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link href="#about" className="bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 px-8 py-4 text-xs font-bold uppercase tracking-widest transition-all shadow-sm rounded-xl flex items-center justify-center hover:-translate-y-0.5">
                  关于我们
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* About ADXJ */}
      <section id="about" className="py-20 px-10 bg-slate-50 relative">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-12 lg:gap-20">
          <div className="md:w-1/3">
             <span className="inline-block py-1 pr-3 border-l-2 border-blue-600 pl-3 text-[10px] text-slate-500 font-bold uppercase tracking-widest mb-4">
                About ADXJ
             </span>
             <h2 className="text-3xl lg:text-4xl font-black text-slate-900 tracking-tight font-[family-name:var(--font-display)] mb-4 leading-tight">
               深耕海外营销<br/>不只是流量搬运工
             </h2>
          </div>
          <div className="md:w-2/3 grid grid-cols-1 sm:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
               <h4 className="font-bold text-sm text-blue-900 mb-2">发展历程 (10+ 年)</h4>
               <p className="text-xs text-slate-600 leading-relaxed">
                 始于 2016 年，深耕海外营销领域 10+ 年，积累了深厚的全球市场洞察与各品类赛道实战经验。
               </p>
            </div>
             <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
               <h4 className="font-bold text-sm text-blue-900 mb-2">服务全球 & 8城布局</h4>
               <p className="text-xs text-slate-600 leading-relaxed">
                 立足中国，服务全球。我们在武汉、深圳、广州、重庆、成都、长沙、福州、厦门设有 8 大核心运营与技术中心，提供 24/7 即时响应。
               </p>
            </div>
             <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm sm:col-span-2">
               <h4 className="font-bold text-sm text-blue-900 mb-2">企业愿景</h4>
               <p className="text-xs text-slate-600 leading-relaxed">
                 我们不只是流量的搬运工，更是出海全链路的赋能者。通过“技术+流量+资源”的深度闭环，让企业出海变得更简单、更稳健。
               </p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Modules */}
      <section id="modules" className="pt-16 pb-24 w-full overflow-hidden px-6 md:px-10">
        <div className="max-w-7xl mx-auto mb-12 text-center">
          <h2 className="text-3xl lg:text-4xl font-black text-slate-900 font-[family-name:var(--font-display)]">三大核心业务生态</h2>
          <div className="w-12 h-1 bg-blue-600 mx-auto mt-4 rounded-full"></div>
        </div>

        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6 rounded-2xl">
          
          {/* Module 1: Community */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="group bg-white border border-slate-200 shadow-xl shadow-slate-200/50 rounded-[2rem] p-8 lg:p-10 flex flex-col relative overflow-hidden hover:border-blue-300 transition-colors"
          >
            <div className="absolute top-0 right-0 w-48 h-48 bg-blue-50 rounded-bl-[100px] z-0 transition-transform group-hover:scale-110 ease-out duration-500"></div>
            <div className="absolute top-0 right-0 p-8 transform translate-x-4 -translate-y-4 group-hover:scale-110 transition-transform z-0">
              <Users className="w-24 h-24 text-blue-100" />
            </div>
            
            <div className="relative z-10">
              <span className="inline-block px-3 py-1 bg-blue-50 text-blue-600 font-bold text-[10px] uppercase tracking-widest rounded-full mb-6 border border-blue-100">01 — Elite Community</span>
              <h3 className="text-3xl font-black mb-3 text-slate-900 text-balance font-[family-name:var(--font-display)]">出海精英交流社群</h3>
              <p className="text-[13px] font-bold text-slate-500 mb-6 pb-6 border-b border-slate-100">全球出海决策者的“外部智库”与情报中心。</p>
              
              <div className="space-y-4 mb-8">
                <div>
                  <h4 className="text-xs font-bold text-slate-900 mb-1">资源规模</h4>
                  <p className="text-xs text-slate-600">拥有 100K+ 垂直社群，覆盖全球 50 万+ 出海从业者。</p>
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900 mb-1">矩阵分布</h4>
                  <p className="text-[11px] text-slate-600 leading-relaxed">
                    <strong className="text-blue-900">Telegram：</strong>全球 Slots、iGaming、Web3 第一手情报站。<br/>
                    <strong className="text-green-800">WeChat：</strong>深度行业人脉，对接支付、上架、商务资源。<br/>
                    <strong className="text-red-800">小红书 & 抖音：</strong>内容出海、AI 趋势、算法爆破。
                  </p>
                </div>
                 <div>
                  <h4 className="text-xs font-bold text-slate-900 mb-1">核心价值</h4>
                  <p className="text-xs text-slate-600">拒绝信息孤岛。低成本获取情报，实现资源精准对标与互换。</p>
                </div>
              </div>
            </div>

            <div className="mt-auto relative z-10 pt-4">
              <Link href="/community" className="w-full inline-flex items-center justify-center text-blue-600 text-xs font-bold uppercase tracking-widest hover:text-white hover:bg-blue-600 transition-all bg-blue-50 px-4 py-3.5 rounded-xl border border-blue-100 hover:border-transparent group/btn">
                了解详情 <ArrowRight className="w-4 h-4 ml-1.5 group-hover/btn:translate-x-1 transition-transform" />
              </Link>
              <Link href="/insights/topics/telegram" className="mt-3 inline-flex text-[11px] font-bold text-blue-700 hover:text-blue-900">
                查看 Telegram 私域专题
              </Link>
            </div>
          </motion.div>

          {/* Module 2: Developers */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="group bg-white border border-slate-200 shadow-xl shadow-slate-200/50 rounded-[2rem] p-8 lg:p-10 flex flex-col relative overflow-hidden hover:border-blue-300 transition-colors"
          >
            <div className="absolute top-0 right-0 w-48 h-48 bg-slate-50 rounded-bl-[100px] z-0 transition-transform group-hover:scale-110 ease-out duration-500"></div>
             <div className="absolute top-0 right-0 p-8 transform translate-x-4 -translate-y-4 group-hover:scale-110 transition-transform z-0">
              <Code2 className="w-24 h-24 text-slate-200" />
            </div>

            <div className="relative z-10">
              <span className="inline-block px-3 py-1 bg-slate-100 text-slate-600 font-bold text-[10px] uppercase tracking-widest rounded-full mb-6 border border-slate-200">02 — Dev & Tech</span>
              <h3 className="text-3xl font-black mb-3 text-slate-900 text-balance font-[family-name:var(--font-display)]">开发者与技术服务</h3>
              <p className="text-[13px] font-bold text-slate-500 mb-6 pb-6 border-b border-slate-100">百人团队背书，扫清上架与账号权重的障碍。</p>
              
              <div className="space-y-4 mb-8">
                <div>
                  <h4 className="text-xs font-bold text-slate-900 mb-1">研发实力</h4>
                  <p className="text-xs text-slate-600">100+ 研发工程师，精通 Slots、社交、现金贷、AI应用 等底层架构。</p>
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900 mb-1">商店专家</h4>
                  <p className="text-xs text-slate-600">深度解读 GP / App Store 政策，擅长合规化上架与混淆防雷。</p>
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900 mb-1">账号中枢</h4>
                  <div className="grid grid-cols-2 gap-2 mt-1.5">
                    <div className="bg-slate-50 p-2 border border-slate-100 rounded flex flex-col justify-center">
                       <span className="text-[10px] font-bold text-slate-700">买 / 卖</span>
                       <span className="text-[9px] text-slate-500">高权重老号</span>
                    </div>
                     <div className="bg-slate-50 p-2 border border-slate-100 rounded flex flex-col justify-center">
                       <span className="text-[10px] font-bold text-slate-700">回收 & 保障</span>
                       <span className="text-[9px] text-slate-500">高价回收/100%防关联</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-auto relative z-10 pt-4">
              <Link href="/developer" className="w-full inline-flex items-center justify-center text-slate-700 text-xs font-bold uppercase tracking-widest hover:text-white hover:bg-slate-800 transition-all bg-slate-50 px-4 py-3.5 rounded-xl border border-slate-200 hover:border-transparent group/btn">
                了解详情 <ArrowRight className="w-4 h-4 ml-1.5 group-hover/btn:translate-x-1 transition-transform" />
              </Link>
              <div className="mt-3 flex flex-wrap gap-3">
                <Link href="/insights/topics/app-store" className="text-[11px] font-bold text-slate-600 hover:text-blue-700">
                  App Store 专题
                </Link>
                <Link href="/insights/topics/google-play" className="text-[11px] font-bold text-slate-600 hover:text-blue-700">
                  Google Play 专题
                </Link>
              </div>
            </div>
          </motion.div>

          {/* Module 3: Media Buying */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="group bg-[#0F172A] border border-blue-900 shadow-2xl shadow-blue-900/30 rounded-[2rem] p-8 lg:p-10 flex flex-col relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-48 h-48 bg-blue-900/40 rounded-bl-[100px] z-0 transition-transform group-hover:scale-110 ease-out duration-500"></div>
            <div className="absolute top-0 right-0 p-8 transform translate-x-4 -translate-y-4 group-hover:scale-110 transition-transform z-0">
              <Target className="w-24 h-24 text-blue-800/50" />
            </div>

            <div className="relative z-10">
              <span className="inline-block px-3 py-1 bg-blue-950 text-blue-400 font-bold text-[10px] uppercase tracking-widest rounded-full mb-6 border border-blue-800">03 — Growth Buying</span>
              <h3 className="text-3xl font-black mb-3 text-white text-balance font-[family-name:var(--font-display)]">增长买量中心</h3>
              <p className="text-[13px] font-bold text-blue-300 mb-6 pb-6 border-b border-blue-900/70">结果导向的流量分发中枢，高效匹配。</p>
              
              <div className="space-y-5 mb-8">
                <div>
                  <h4 className="text-xs font-bold text-blue-400 mb-2 border-l-2 border-blue-500 pl-2">广告主 (Advertisers)</h4>
                  <ul className="text-[11px] text-slate-300 space-y-1.5">
                    <li>• <strong className="text-white">全渠道买量</strong>: FB, TK, Google, X, Unity等</li>
                    <li>• <strong className="text-white">行业沉淀</strong>: 社交, 金融, 游戏, AI工具全品类自运营经验</li>
                    <li>• <strong className="text-white">结算模式</strong>: 支持 CPA 与 ROAS</li>
                  </ul>
                </div>
                
                <div className="bg-[#022C22] p-4 rounded-xl border border-emerald-900/50 relative overflow-hidden">
                  <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-emerald-500/20 to-transparent pointer-events-none"></div>
                  <h4 className="text-xs font-bold text-emerald-400 mb-2 border-l-2 border-emerald-500 pl-2">流量主 (Publishers)</h4>
                  <ul className="text-[11px] text-emerald-100/70 space-y-2">
                    <li>• <strong className="text-emerald-50">极致变现</strong>: 100% 广告填充率。</li>
                    <li className="bg-emerald-900/40 p-2 rounded border border-emerald-800 flex items-center gap-1.5">
                      <div className="bg-emerald-500 text-white rounded-sm px-1 py-0.5 inline-flex items-center"><svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg></div>
                      <strong className="text-emerald-300">杀手锏：Day0 (T+0) 极速结算</strong>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="mt-auto relative z-10 pt-4">
              <Link href="/media" className="w-full inline-flex items-center justify-center text-blue-900 text-xs font-bold uppercase tracking-widest hover:text-white hover:bg-blue-600 transition-all bg-white px-4 py-3.5 rounded-xl border border-blue-100 hover:border-transparent shadow-lg shadow-white/10 group/btn">
                了解详情 <ArrowRight className="w-4 h-4 ml-1.5 group-hover/btn:translate-x-1 transition-transform" />
              </Link>
              <div className="mt-3 flex flex-wrap gap-3">
                <Link href="/insights/topics/meta-ads" className="text-[11px] font-bold text-blue-200 hover:text-white">
                  Meta Ads 专题
                </Link>
                <Link href="/insights/topics/tiktok-ads" className="text-[11px] font-bold text-blue-200 hover:text-white">
                  TikTok 专题
                </Link>
                <Link href="/insights/topics/cpa-network" className="text-[11px] font-bold text-blue-200 hover:text-white">
                  CPA 专题
                </Link>
              </div>
            </div>
          </motion.div>

        </div>
      </section>
      
      <Contact />

      <Footer />
    </div>
  );
}
