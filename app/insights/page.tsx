import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BookOpen, Globe2, Layers3, SearchCheck } from "lucide-react";
import { Contact } from "@/components/contact";
import { Footer } from "@/components/footer";
import { MatrixBackground } from "@/components/matrix-pattern";
import { Nav } from "@/components/nav";
import { JsonLd, breadcrumbJsonLd } from "@/lib/seo";
import { absoluteUrl, canonicalUrl, site } from "@/lib/site";
import { articles, insightCategories } from "./articles";
import { InsightsList } from "./insights-list";

const description =
  "ADXJ 出海资讯沉淀 24 篇开发者出海、海外投放增长与企业出海洞察，覆盖 ASO 优化、App Store、Google Play、Meta Ads、TikTok Ads、Telegram Ads、AI 应用、SLOTS、现金贷、海外网盟 CPA 与订阅增长。";
const path = "/insights";

export const metadata: Metadata = {
  title: "出海资讯 | ADXJ 蓝鲸出海",
  description,
  keywords: [
    "出海资讯",
    "跨境出海",
    "开发者出海",
    "海外投放",
    "App Store 上架",
    "Google Play 上架",
    "Meta Ads",
    "TikTok Ads",
    "Telegram Ads",
    "AI 应用出海",
    "ASO 优化",
    "广告账户风控",
    "海外网盟 CPA",
    "私域转化",
    "订阅转化",
  ],
  alternates: { canonical: canonicalUrl(path) },
  openGraph: {
    title: "出海资讯 | ADXJ 蓝鲸出海",
    description: "面向出海企业、开发者和增长团队的海外上架、ASO、投放、风控与市场洞察。",
    url: canonicalUrl(path),
    siteName: site.name,
    type: "website",
    locale: site.locale,
    images: [
      {
        url: absoluteUrl(articles[0].coverImage),
        width: 1672,
        height: 941,
        alt: articles[0].coverAlt,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "出海资讯 | ADXJ 蓝鲸出海",
    description: "24 篇开发者出海、海外投放增长、ASO 优化、账户风控与企业出海洞察文章。",
    images: [absoluteUrl(articles[0].coverImage)],
  },
};

const articleCards = articles.map(({ content: _content, ...article }) => article);

const collectionJsonLd = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "ADXJ 出海资讯",
  url: canonicalUrl(path),
  description,
  about: insightCategories,
  mainEntity: articles.map((article) => ({
    "@type": "Article",
    headline: article.title,
    url: canonicalUrl(`/insights/${article.slug}`),
    image: absoluteUrl(article.coverImage),
    datePublished: article.publishedAt,
  })),
};

const breadcrumbJsonLdData = breadcrumbJsonLd([
  { name: "首页", path: "/" },
  { name: "出海资讯", path },
]);

export default function InsightsPage() {
  const featured = articles[0];

  return (
    <div className="min-h-screen overflow-x-hidden bg-slate-50 text-slate-900 selection:bg-blue-200 selection:text-blue-950">
      <Nav />
      <JsonLd data={[collectionJsonLd, breadcrumbJsonLdData]} />

      <section className="relative overflow-hidden border-b border-slate-200 bg-white px-6 py-20 md:px-10 md:py-24">
        <MatrixBackground />
        <div className="relative z-10 mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1fr_0.9fr] lg:items-center">
          <div>
            <div className="mb-6 flex flex-wrap items-center gap-3">
              <span className="inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-3 py-1.5 text-[11px] font-bold text-blue-700">
                <BookOpen className="h-3.5 w-3.5" />
                出海资讯
              </span>
              <span className="inline-flex items-center gap-2 rounded-full border border-emerald-100 bg-emerald-50 px-3 py-1.5 text-[11px] font-bold text-emerald-700">
                <SearchCheck className="h-3.5 w-3.5" />
                SEO Content
              </span>
            </div>
            <h1 className="max-w-5xl text-5xl font-black leading-[1.05] text-slate-950 md:text-7xl font-[family-name:var(--font-display)]">
              出海资讯
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-sky-500 to-emerald-500">
                上架、投放与增长洞察
              </span>
            </h1>
            <p className="mt-8 max-w-3xl text-[15px] leading-relaxed text-slate-600">
              围绕开发者出海、海外投放增长和出海企业洞察，沉淀 App Store、Google Play、ASO 优化、Meta Ads、TikTok Ads、Telegram Ads、AI 应用、SLOTS、现金贷、海外网盟 CPA 与工具应用订阅增长的实操内容。
            </p>
            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <Link
                href="#articles"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-8 py-4 text-xs font-bold text-white shadow-lg shadow-blue-200 transition-all hover:-translate-y-0.5 hover:bg-blue-700"
              >
                查看文章 <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="#contact"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-8 py-4 text-xs font-bold text-slate-700 shadow-sm transition-all hover:-translate-y-0.5 hover:bg-slate-50"
              >
                内容合作 <Globe2 className="h-4 w-4" />
              </Link>
            </div>
          </div>

          <Link
            href={`/insights/${featured.slug}`}
            className="group overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-2xl shadow-blue-900/10"
          >
            <div className="relative aspect-[16/9] overflow-hidden bg-slate-100">
              <Image
                src={featured.coverImage}
                alt={featured.coverAlt}
                fill
                priority
                sizes="(min-width: 1024px) 45vw, 100vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>
            <div className="p-6">
              <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-blue-50 px-3 py-1 text-[10px] font-bold text-blue-700">
                <Layers3 className="h-3.5 w-3.5" />
                Featured Insight
              </div>
              <h2 className="text-2xl font-black leading-snug text-slate-950 font-[family-name:var(--font-display)]">
                {featured.title}
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-slate-600">{featured.excerpt}</p>
            </div>
          </Link>
        </div>
      </section>

      <div id="articles" className="scroll-mt-28">
        <InsightsList articles={articleCards} categories={insightCategories} />
      </div>

      <Contact />
      <Footer />
    </div>
  );
}
