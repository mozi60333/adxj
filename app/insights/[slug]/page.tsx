import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  CalendarDays,
  Clock3,
  Mail,
  MessageCircle,
  Send,
  Tag,
} from "lucide-react";
import { Footer } from "@/components/footer";
import { MatrixBackground } from "@/components/matrix-pattern";
import { Nav } from "@/components/nav";
import { JsonLd, breadcrumbJsonLd } from "@/lib/seo";
import { absoluteUrl, canonicalUrl, site } from "@/lib/site";
import { articles, getArticleBySlug } from "../articles";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return articles.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article) {
    return {
      title: "出海资讯文章 | ADXJ",
      description: "ADXJ 出海资讯文章。",
      alternates: { canonical: canonicalUrl("/insights") },
    };
  }

  const articleUrl = canonicalUrl(`/insights/${article.slug}`);

  return {
    title: `${article.title} | ADXJ 出海资讯`,
    description: article.excerpt,
    keywords: article.keywords,
    alternates: { canonical: articleUrl },
    openGraph: {
      title: article.title,
      description: article.excerpt,
      url: articleUrl,
      siteName: site.name,
      type: "article",
      locale: site.locale,
      publishedTime: article.publishedAt,
      authors: ["ADXJ 蓝鲸出海"],
      tags: article.keywords,
      images: [
        {
          url: absoluteUrl(article.coverImage),
          width: 1672,
          height: 941,
          alt: article.coverAlt,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: article.title,
      description: article.excerpt,
      images: [absoluteUrl(article.coverImage)],
    },
  };
}

export default async function InsightArticlePage({ params }: PageProps) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  const articleUrl = canonicalUrl(`/insights/${article.slug}`);
  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.excerpt,
    image: absoluteUrl(article.coverImage),
    datePublished: article.publishedAt,
    dateModified: article.publishedAt,
    author: {
      "@type": "Organization",
      name: "ADXJ 蓝鲸出海",
      url: canonicalUrl("/"),
    },
    publisher: {
      "@type": "Organization",
      name: site.name,
      url: canonicalUrl("/"),
      logo: {
        "@type": "ImageObject",
        url: absoluteUrl(site.logoImage),
      },
    },
    mainEntityOfPage: articleUrl,
    keywords: article.keywords.join(", "),
  };

  const breadcrumbJsonLdData = breadcrumbJsonLd([
    { name: "首页", path: "/" },
    { name: "出海资讯", path: "/insights" },
    { name: article.title, path: `/insights/${article.slug}` },
  ]);

  return (
    <div className="min-h-screen overflow-x-hidden bg-slate-50 text-slate-900 selection:bg-blue-200 selection:text-blue-950">
      <Nav />
      <JsonLd data={[articleJsonLd, breadcrumbJsonLdData]} />

      <article>
        <header className="relative overflow-hidden border-b border-slate-200 bg-white px-6 py-16 md:px-10 md:py-20">
          <MatrixBackground />
          <div className="relative z-10 mx-auto max-w-5xl">
            <Link
              href="/insights"
              className="mb-8 inline-flex items-center gap-2 text-xs font-bold text-blue-700 transition-colors hover:text-blue-900"
            >
              <ArrowLeft className="h-4 w-4" />
              返回出海资讯
            </Link>
            <div className="mb-6 flex flex-wrap items-center gap-3">
              <span className="rounded-full border border-blue-100 bg-blue-50 px-3 py-1.5 text-[11px] font-bold text-blue-700">
                {article.category}
              </span>
              <span className="inline-flex items-center gap-1 text-xs font-bold text-slate-400">
                <CalendarDays className="h-3.5 w-3.5" />
                {article.publishedAt}
              </span>
              <span className="inline-flex items-center gap-1 text-xs font-bold text-slate-400">
                <Clock3 className="h-3.5 w-3.5" />
                {article.readTime}
              </span>
            </div>
            <h1 className="text-4xl font-black leading-tight text-slate-950 md:text-6xl font-[family-name:var(--font-display)]">
              {article.title}
            </h1>
            <p className="mt-6 max-w-4xl text-base leading-relaxed text-slate-600 md:text-lg">{article.excerpt}</p>
          </div>
        </header>

        <div className="mx-auto max-w-5xl px-6 py-10 md:px-10">
          <div className="relative aspect-[16/9] overflow-hidden rounded-[2rem] border border-slate-200 bg-slate-100 shadow-xl shadow-slate-200/70">
            <Image
              src={article.coverImage}
              alt={article.coverAlt}
              fill
              priority
              sizes="(min-width: 1024px) 960px, 100vw"
              className="object-cover"
            />
          </div>
        </div>

        <div className="mx-auto grid max-w-7xl gap-10 px-6 pb-16 md:px-10 lg:grid-cols-[minmax(0,1fr)_280px]">
          <div className="rounded-[2rem] border border-slate-200 bg-white p-7 shadow-sm md:p-10">
            <div className="space-y-10">
              {article.content.map((section) => (
                <section key={section.heading}>
                  <h2 className="mb-4 text-2xl font-black leading-snug text-slate-950 font-[family-name:var(--font-display)]">
                    {section.heading}
                  </h2>
                  <div className="space-y-4">
                    {section.paragraphs.map((paragraph) => (
                      <p key={paragraph} className="text-[15px] leading-8 text-slate-700">
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </section>
              ))}
            </div>
          </div>

          <aside className="lg:sticky lg:top-28 lg:self-start">
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="mb-4 flex items-center gap-2 text-xs font-black uppercase tracking-widest text-slate-400">
                <Tag className="h-4 w-4" />
                Keywords
              </div>
              <div className="flex flex-wrap gap-2">
                {article.keywords.map((keyword) => (
                  <span key={keyword} className="rounded-full bg-blue-50 px-3 py-1.5 text-[11px] font-bold text-blue-700">
                    {keyword}
                  </span>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </article>

      <section id="contact" className="border-y border-slate-200 bg-white px-6 py-16 md:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 max-w-3xl">
            <div className="mb-3 text-xs font-black uppercase tracking-widest text-blue-700">Contact ADXJ</div>
            <h2 className="text-3xl font-black text-slate-950 md:text-4xl font-[family-name:var(--font-display)]">
              需要出海上架、投放或增长诊断？
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-slate-600">
              将应用品类、目标地区、当前问题和预算阶段发给我们，ADXJ 团队可协助评估上架、风控、买量与转化链路。
            </p>
          </div>
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
            <a
              href="mailto:business@adxj.com?subject=出海资讯咨询"
              className="rounded-2xl border border-slate-200 bg-slate-50 p-6 transition-all hover:-translate-y-0.5 hover:border-blue-200 hover:bg-blue-50"
            >
              <Mail className="mb-5 h-8 w-8 text-blue-600" />
              <div className="text-xs font-bold uppercase tracking-widest text-slate-400">Email</div>
              <div className="mt-2 text-lg font-black text-slate-950">business@adxj.com</div>
            </a>
            <a
              href="https://t.me/M7HHHH"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-2xl border border-slate-200 bg-slate-50 p-6 transition-all hover:-translate-y-0.5 hover:border-blue-200 hover:bg-blue-50"
            >
              <Send className="mb-5 h-8 w-8 text-blue-600" />
              <div className="text-xs font-bold uppercase tracking-widest text-slate-400">Telegram</div>
              <div className="mt-2 text-lg font-black text-slate-950">@M7HHHH</div>
            </a>
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
              <MessageCircle className="mb-5 h-8 w-8 text-emerald-600" />
              <div className="text-xs font-bold uppercase tracking-widest text-slate-400">WeChat</div>
              <div className="mt-2 text-lg font-black text-slate-950">M7HHHH</div>
            </div>
            <div className="rounded-2xl border border-blue-100 bg-blue-50 p-6">
              <div className="relative mb-4 h-24 w-24 overflow-hidden rounded-xl border border-blue-100 bg-white p-1">
                <Image src="/wecom-qr-v2.png" alt="ADXJ 企业微信二维码" fill sizes="96px" className="object-contain" />
              </div>
              <div className="text-xs font-bold uppercase tracking-widest text-blue-500">WeCom</div>
              <div className="mt-2 text-lg font-black text-slate-950">企业微信</div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
