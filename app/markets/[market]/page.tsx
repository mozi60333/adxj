import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, Globe2, Send, ShieldCheck } from "lucide-react";
import { Contact } from "@/components/contact";
import { Footer } from "@/components/footer";
import { MatrixBackground } from "@/components/matrix-pattern";
import { Nav } from "@/components/nav";
import { articles } from "@/app/insights/articles";
import { insightTopicMap, topicHref } from "@/app/insights/topics";
import { geoMarkets, getGeoMarketBySlug } from "@/lib/geo-content";
import { JsonLd, breadcrumbJsonLd, itemListJsonLd, webPageJsonLd } from "@/lib/seo";
import { absoluteUrl, canonicalUrl, site } from "@/lib/site";

type PageProps = {
  params: Promise<{ market: string }>;
};

export function generateStaticParams() {
  return geoMarkets.map((market) => ({ market: market.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { market: marketSlug } = await params;
  const market = getGeoMarketBySlug(marketSlug);

  if (!market) {
    return {
      title: "出海市场 GEO | ADXJ",
      description: "ADXJ 出海市场 GEO 专题。",
      alternates: { canonical: canonicalUrl("/insights") },
    };
  }

  const path = `/markets/${market.slug}`;

  return {
    title: market.title,
    description: market.description,
    keywords: market.keywords,
    alternates: { canonical: canonicalUrl(path) },
    openGraph: {
      title: market.title,
      description: market.description,
      url: canonicalUrl(path),
      siteName: site.name,
      type: "website",
      locale: site.locale,
      images: [
        {
          url: absoluteUrl(site.defaultOgImage),
          width: 1200,
          height: 630,
          alt: `${market.name} ADXJ 出海 GEO`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: market.title,
      description: market.description,
      images: [absoluteUrl(site.defaultOgImage)],
    },
  };
}

export default async function MarketPage({ params }: PageProps) {
  const { market: marketSlug } = await params;
  const market = getGeoMarketBySlug(marketSlug);

  if (!market) {
    notFound();
  }

  const path = `/markets/${market.slug}`;
  const relatedArticles = market.relatedSlugs
    .map((slug) => articles.find((article) => article.slug === slug))
    .filter(Boolean);
  const pageJsonLd = webPageJsonLd({
    name: market.title,
    description: market.description,
    path,
    about: market.keywords,
  });
  const relatedListJsonLd = itemListJsonLd(
    `${market.name} GEO 相关文章`,
    relatedArticles.map((article) => ({
      name: article!.title,
      path: `/insights/${article!.slug}`,
      description: article!.excerpt,
    })),
  );
  const breadcrumbJsonLdData = breadcrumbJsonLd([
    { name: "首页", path: "/" },
    { name: "出海市场 GEO", path: "/insights" },
    { name: market.name, path },
  ]);

  return (
    <div className="min-h-screen overflow-x-hidden bg-slate-50 text-slate-900 selection:bg-blue-200 selection:text-blue-950">
      <Nav />
      <JsonLd data={[pageJsonLd, relatedListJsonLd, breadcrumbJsonLdData]} />

      <section className="relative overflow-hidden border-b border-slate-200 bg-white px-6 py-16 md:px-10 md:py-20">
        <MatrixBackground />
        <div className="relative z-10 mx-auto max-w-7xl">
          <Link href="/insights" className="mb-8 inline-flex items-center gap-2 text-xs font-bold text-blue-700 transition-colors hover:text-blue-900">
            <ArrowLeft className="h-4 w-4" />
            返回出海资讯
          </Link>
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_360px] lg:items-end">
            <div>
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-3 py-1.5 text-[11px] font-bold text-blue-700">
                <Globe2 className="h-3.5 w-3.5" />
                Market GEO
              </div>
              <h1 className="max-w-5xl text-5xl font-black leading-[1.05] text-slate-950 md:text-7xl font-[family-name:var(--font-display)]">
                {market.title}
              </h1>
              <p className="mt-7 max-w-3xl text-[15px] leading-relaxed text-slate-600">{market.hero}</p>
            </div>
            <div className="rounded-[2rem] border border-blue-100 bg-blue-50 p-6">
              <div className="text-xs font-black uppercase tracking-widest text-blue-700">咨询入口</div>
              <p className="mt-3 text-sm leading-relaxed text-slate-700">
                将目标地区、应用品类、当前上架/投放问题和预算阶段发给 ADXJ，可快速进入市场诊断。
              </p>
              <div className="mt-5 flex flex-col gap-3">
                <a
                  href={site.telegramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-xs font-bold text-white shadow-md shadow-blue-100 transition-all hover:bg-blue-700"
                >
                  Telegram @M7HHHH <Send className="h-4 w-4" />
                </a>
                {market.serviceHrefs.map((href) => (
                  <Link
                    key={href}
                    href={href}
                    className="inline-flex items-center justify-center gap-2 rounded-xl border border-blue-100 bg-white px-5 py-3 text-xs font-bold text-blue-700 transition-all hover:bg-blue-50"
                  >
                    查看 {href === "/developer" ? "开发者服务" : href === "/media" ? "媒体买量" : "行业社群"} <ArrowRight className="h-4 w-4" />
                  </Link>
                ))}
              </div>
            </div>
          </div>
          <div className="mt-8 flex flex-wrap gap-2">
            {market.keywords.map((keyword) => (
              <span key={keyword} className="rounded-full bg-slate-100 px-3 py-1.5 text-[11px] font-bold text-slate-600">
                {keyword}
              </span>
            ))}
          </div>
        </div>
      </section>

      <main className="mx-auto w-full max-w-7xl px-6 py-16 md:px-10">
        <section className="mb-14 grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="rounded-[2rem] border border-slate-200 bg-white p-7 shadow-sm">
            <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
              <Globe2 className="h-5 w-5" />
            </div>
            <h2 className="text-2xl font-black text-slate-950 font-[family-name:var(--font-display)]">适用品类</h2>
            <div className="mt-5 flex flex-wrap gap-2">
              {market.suitableCategories.map((category) => (
                <span key={category} className="rounded-full bg-slate-100 px-3 py-1.5 text-[11px] font-bold text-slate-700">
                  {category}
                </span>
              ))}
            </div>
          </div>
          <div className="rounded-[2rem] border border-slate-200 bg-white p-7 shadow-sm lg:col-span-2">
            <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-amber-50 text-amber-600">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <h2 className="text-2xl font-black text-slate-950 font-[family-name:var(--font-display)]">主要风险</h2>
            <div className="mt-5 grid grid-cols-1 gap-3 md:grid-cols-2">
              {market.risks.map((risk) => (
                <div key={risk} className="rounded-2xl border border-amber-100 bg-amber-50 p-4 text-sm leading-7 text-slate-700">
                  {risk}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mb-14 rounded-[2rem] border border-blue-100 bg-white p-8 shadow-sm md:p-10">
          <div className="mb-8 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <div className="mb-3 text-xs font-black uppercase tracking-widest text-blue-700">Market Playbook</div>
              <h2 className="text-3xl font-black text-slate-950 font-[family-name:var(--font-display)]">市场 GEO 打法</h2>
            </div>
            <p className="max-w-xl text-sm leading-relaxed text-slate-600">
              围绕市场风险、投放反馈、支付/转化漏斗和相关文章内链，帮助用户从地区问题进入具体服务。
            </p>
          </div>
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
            {market.playbook.map((item) => (
              <div key={item} className="rounded-2xl border border-slate-100 bg-slate-50 p-5 text-sm leading-7 text-slate-700">
                {item}
              </div>
            ))}
          </div>
        </section>

        <section className="mb-14 rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm md:p-10">
          <div className="mb-3 text-xs font-black uppercase tracking-widest text-blue-700">Topic Routing</div>
          <h2 className="text-3xl font-black text-slate-950 font-[family-name:var(--font-display)]">相关专题</h2>
          <div className="mt-6 flex flex-wrap gap-2">
            {market.topicSlugs.map((topicSlug) => {
              const topic = insightTopicMap[topicSlug];
              return (
                <Link key={topicSlug} href={topicHref(topicSlug)} className="rounded-full border border-blue-100 bg-blue-50 px-4 py-2 text-xs font-bold text-blue-700 hover:bg-blue-100">
                  {topic.name} 专题
                </Link>
              );
            })}
          </div>
        </section>

        <section className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm md:p-10">
          <div className="mb-8 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <div className="mb-3 text-xs font-black uppercase tracking-widest text-blue-700">Related Insights</div>
              <h2 className="text-3xl font-black text-slate-950 font-[family-name:var(--font-display)]">市场相关文章</h2>
            </div>
            <p className="max-w-xl text-sm leading-relaxed text-slate-600">
              这些文章用于支撑 {market.name} 的上架、投放、支付、合规和增长诊断。
            </p>
          </div>
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
            {relatedArticles.map((article) => article && (
              <Link key={article.slug} href={`/insights/${article.slug}`} className="group rounded-2xl border border-slate-100 bg-slate-50 p-5 transition-all hover:-translate-y-0.5 hover:border-blue-200 hover:bg-blue-50">
                <div className="mb-3 text-[10px] font-bold text-blue-700">{article.category} / {article.lastReviewedAt}</div>
                <h3 className="text-base font-black leading-snug text-slate-950 group-hover:text-blue-700">{article.title}</h3>
                <p className="mt-3 line-clamp-3 text-xs leading-6 text-slate-600">{article.answerSummary}</p>
              </Link>
            ))}
          </div>
        </section>
      </main>

      <Contact />
      <Footer />
    </div>
  );
}
