import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
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
import { getTopicForKeyword, inferArticleTopicSlug, insightTopicMap, topicHref } from "../topics";

type PageProps = {
  params: Promise<{ slug: string }>;
};

function renderParagraphWithLinks(paragraph: string) {
  const telegramPattern = /(Telegram @M7HHHH|@M7HHHH)/g;
  const parts = paragraph.split(telegramPattern);

  return parts.map((part, index) => {
    if (part === "Telegram @M7HHHH" || part === "@M7HHHH") {
      return (
        <a
          key={`${part}-${index}`}
          href="https://t.me/M7HHHH"
          target="_blank"
          rel="noopener noreferrer"
          className="font-bold text-blue-700 underline decoration-blue-200 underline-offset-4 transition-colors hover:text-blue-900 hover:decoration-blue-500"
        >
          {part}
        </a>
      );
    }

    return part;
  });
}

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
    dateModified: article.updatedAt ?? article.publishedAt,
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
  const primaryTopicSlug = article.topic ?? inferArticleTopicSlug(article);
  const primaryTopic = insightTopicMap[primaryTopicSlug];
  const relatedArticles = (
    article.relatedSlugs?.length
      ? article.relatedSlugs
          .map((relatedSlug) => articles.find((item) => item.slug === relatedSlug))
          .filter(Boolean)
      : articles.filter((item) => item.slug !== article.slug && (item.topic ?? inferArticleTopicSlug(item)) === primaryTopicSlug)
  ).slice(0, 3);

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
                        {renderParagraphWithLinks(paragraph)}
                      </p>
                    ))}
                  </div>
                </section>
              ))}
            </div>

            <div className="mt-10 rounded-[2rem] border border-blue-100 bg-blue-50 p-6 md:p-8">
              <div className="mb-3 text-xs font-black uppercase tracking-widest text-blue-700">Next Step</div>
              <h2 className="text-2xl font-black text-slate-950 font-[family-name:var(--font-display)]">
                继续查看 {primaryTopic.name} 服务与相关案例
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-slate-700">
                如果你遇到的问题和本文相近，可以先看专题里的更多案例，也可以直接把当前情况发给 ADXJ 做初步诊断。
              </p>
              <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-3">
                <Link
                  href={primaryTopic.serviceHref}
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-xs font-bold text-white transition-all hover:bg-blue-700"
                >
                  相关服务 <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href={topicHref(primaryTopic.slug)}
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-blue-100 bg-white px-5 py-3 text-xs font-bold text-blue-700 transition-all hover:bg-blue-50"
                >
                  {primaryTopic.name} 专题
                </Link>
                <a
                  href={site.telegramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-blue-100 bg-white px-5 py-3 text-xs font-bold text-blue-700 transition-all hover:bg-blue-50"
                >
                  Telegram @M7HHHH
                </a>
              </div>
            </div>

            {relatedArticles.length > 0 && (
              <div className="mt-8 rounded-[2rem] border border-slate-200 bg-white p-6 md:p-8">
                <div className="mb-5 text-xs font-black uppercase tracking-widest text-slate-400">Related Articles</div>
                <div className="grid grid-cols-1 gap-4">
                  {relatedArticles.map((relatedArticle) => relatedArticle && (
                    <Link
                      key={relatedArticle.slug}
                      href={`/insights/${relatedArticle.slug}`}
                      className="group rounded-2xl border border-slate-100 bg-slate-50 p-5 transition-all hover:border-blue-200 hover:bg-blue-50"
                    >
                      <div className="mb-2 text-[10px] font-bold text-blue-700">{relatedArticle.category}</div>
                      <h3 className="text-base font-black leading-snug text-slate-950 group-hover:text-blue-700">
                        {relatedArticle.title}
                      </h3>
                      <p className="mt-2 line-clamp-2 text-xs leading-6 text-slate-600">{relatedArticle.excerpt}</p>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          <aside className="lg:sticky lg:top-28 lg:self-start">
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="mb-4 flex items-center gap-2 text-xs font-black uppercase tracking-widest text-slate-400">
                <Tag className="h-4 w-4" />
                Keywords
              </div>
              <div className="flex flex-wrap gap-2">
                {article.keywords.map((keyword) => {
                  const keywordTopicSlug = getTopicForKeyword(keyword, primaryTopicSlug);
                  return (
                  <Link key={keyword} href={topicHref(keywordTopicSlug)} className="rounded-full bg-blue-50 px-3 py-1.5 text-[11px] font-bold text-blue-700 transition-colors hover:bg-blue-100 hover:text-blue-900">
                    {keyword}
                  </Link>
                  );
                })}
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
