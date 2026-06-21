import Link from "next/link";
import {
  ArrowRight,
  Code2,
  Compass,
  Home,
  Mail,
  Megaphone,
  Newspaper,
  Send,
  ShieldCheck,
  Users,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Footer } from "@/components/footer";
import { MatrixBackground } from "@/components/matrix-pattern";
import { Nav } from "@/components/nav";
import { site } from "@/lib/site";

type RouteCard = {
  href: string;
  label: string;
  description: string;
  icon: LucideIcon;
};

const routeCards: RouteCard[] = [
  {
    href: "/",
    label: "回到首页",
    description: "重新进入 ADXJ 全球效果营销中枢。",
    icon: Home,
  },
  {
    href: "/insights/",
    label: "查看出海资讯",
    description: "从 ASO、买量、账号风控和投放复盘里找线索。",
    icon: Newspaper,
  },
  {
    href: "/developer/",
    label: "开发者服务",
    description: "处理上架、账号、技术交付与合规链路。",
    icon: Code2,
  },
  {
    href: "/media/",
    label: "媒体买量",
    description: "对接海外投放、CPA/ROAS 优化与流量变现。",
    icon: Megaphone,
  },
];

const signalStats = [
  { value: "2016", label: "深耕海外营销" },
  { value: "100K+", label: "出海社群情报" },
  { value: "8 城", label: "运营技术联动" },
  { value: "Day0", label: "流量变现结算" },
];

export function NotFoundPage() {
  return (
    <div className="flex min-h-screen flex-col overflow-x-hidden bg-slate-50 text-slate-900 selection:bg-blue-200 selection:text-blue-950">
      <Nav />

      <main className="flex-1">
        <section className="relative overflow-hidden border-b border-slate-200 bg-white px-6 py-14 md:px-10 lg:py-20">
          <MatrixBackground />
          <div className="relative z-10 mx-auto grid max-w-7xl gap-10 lg:grid-cols-[minmax(0,1fr)_420px] lg:items-center">
            <div>
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-3 py-1.5 text-[11px] font-black uppercase tracking-widest text-blue-700">
                <Compass className="h-3.5 w-3.5" />
                404 / Growth Route Missing
              </div>

              <h1 className="max-w-4xl text-4xl font-black leading-tight text-slate-950 md:text-6xl font-[family-name:var(--font-display)]">
                这条增长航线暂时没有落点
              </h1>

              <p className="mt-6 max-w-3xl text-sm leading-8 text-slate-600 md:text-base">
                你访问的链接可能已经迁移、失效，或还没有被接入 ADXJ 的出海增长地图。社群情报、开发者服务、媒体买量和企业合作入口仍然在线，可以从下面重新选择方向。
              </p>

              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-3.5 text-xs font-black uppercase tracking-widest text-white shadow-lg shadow-blue-200 transition-all hover:-translate-y-0.5 hover:bg-blue-700"
                >
                  返回增长中枢
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="#contact"
                  className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-6 py-3.5 text-xs font-black uppercase tracking-widest text-slate-700 shadow-sm transition-all hover:-translate-y-0.5 hover:border-blue-200 hover:text-blue-700"
                >
                  联系 ADXJ
                </Link>
              </div>
            </div>

            <div className="relative overflow-hidden rounded-[2rem] border border-slate-200 bg-slate-950 p-7 text-white shadow-2xl shadow-slate-300/60">
              <div className="absolute inset-0 opacity-20">
                <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    <pattern id="not-found-grid" width="44" height="44" patternUnits="userSpaceOnUse">
                      <path d="M 44 0 L 0 0 0 44" fill="none" stroke="#38BDF8" strokeWidth="0.6" />
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill="url(#not-found-grid)" />
                </svg>
              </div>

              <div className="relative">
                <div className="flex items-center justify-between border-b border-white/10 pb-5">
                  <div>
                    <div className="text-[10px] font-black uppercase tracking-[0.28em] text-blue-300">
                      ADXJ Signal Console
                    </div>
                    <div className="mt-1 text-sm font-bold text-slate-300">Route diagnostics online</div>
                  </div>
                  <ShieldCheck className="h-8 w-8 text-emerald-300" />
                </div>

                <div className="py-8">
                  <div className="text-[7rem] font-black leading-none tracking-tight text-white md:text-[8rem] font-[family-name:var(--font-display)]">
                    404
                  </div>
                  <div className="mt-4 grid gap-3 text-xs text-slate-300">
                    <div className="flex items-center justify-between border-b border-white/10 pb-3">
                      <span>Store path</span>
                      <span className="font-bold text-rose-300">Not indexed</span>
                    </div>
                    <div className="flex items-center justify-between border-b border-white/10 pb-3">
                      <span>Growth signal</span>
                      <span className="font-bold text-blue-300">Rerouting</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Business desk</span>
                      <span className="font-bold text-emerald-300">Online</span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  {signalStats.map((item) => (
                    <div key={item.value} className="rounded-xl border border-white/10 bg-white/5 p-4">
                      <div className="text-xl font-black text-white font-[family-name:var(--font-display)]">
                        {item.value}
                      </div>
                      <div className="mt-1 text-[10px] font-bold uppercase tracking-widest text-slate-400">
                        {item.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="px-6 py-12 md:px-10">
          <div className="mx-auto max-w-7xl">
            <div className="mb-7 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <div className="text-xs font-black uppercase tracking-widest text-blue-700">Next Route</div>
                <h2 className="mt-2 text-2xl font-black text-slate-950 font-[family-name:var(--font-display)]">
                  重新选择一条出海路径
                </h2>
              </div>
              <div className="text-xs font-bold text-slate-400">ADXJ.COM / Blue Whale Network</div>
            </div>

            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {routeCards.map((card) => {
                const Icon = card.icon;

                return (
                  <Link
                    key={card.href}
                    href={card.href}
                    className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:border-blue-200 hover:shadow-xl hover:shadow-blue-100/70"
                  >
                    <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600 transition-colors group-hover:bg-blue-600 group-hover:text-white">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div className="text-base font-black text-slate-950">{card.label}</div>
                    <p className="mt-3 text-xs leading-6 text-slate-500">{card.description}</p>
                    <div className="mt-5 inline-flex items-center gap-1.5 text-[11px] font-black uppercase tracking-widest text-blue-700">
                      进入
                      <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        <section id="contact" className="border-y border-slate-200 bg-white px-6 py-12 md:px-10">
          <div className="mx-auto grid max-w-7xl gap-6 md:grid-cols-[minmax(0,1fr)_auto] md:items-center">
            <div>
              <div className="text-xs font-black uppercase tracking-widest text-blue-700">Business Desk</div>
              <h2 className="mt-2 text-2xl font-black text-slate-950 font-[family-name:var(--font-display)]">
                需要人工帮你找回正确入口？
              </h2>
              <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-600">
                把目标地区、应用品类、当前问题或合作需求发给 ADXJ，我们会从上架、投放、社群资源和增长诊断里帮你重新定位路径。
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <a
                href={`mailto:${site.email}?subject=ADXJ%20404%20路径咨询`}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-slate-950 px-5 py-3 text-xs font-black uppercase tracking-widest text-white transition-all hover:-translate-y-0.5 hover:bg-blue-700"
              >
                <Mail className="h-4 w-4" />
                Email
              </a>
              <a
                href="https://t.me/M7HHHH"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3 text-xs font-black uppercase tracking-widest text-slate-700 transition-all hover:-translate-y-0.5 hover:border-blue-200 hover:text-blue-700"
              >
                <Send className="h-4 w-4" />
                Telegram
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
