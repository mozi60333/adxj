import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, BookOpen, Send } from "lucide-react";
import { Footer } from "@/components/footer";
import { MatrixBackground } from "@/components/matrix-pattern";
import { Nav } from "@/components/nav";
import { JsonLd, breadcrumbJsonLd } from "@/lib/seo";
import { absoluteUrl, canonicalUrl, site } from "@/lib/site";
import { articles } from "../../articles";
import {
  getTopicBySlug,
  inferArticleTopicSlug,
  insightTopics,
  topicHref,
  type InsightTopic,
} from "../../topics";

type PageProps = {
  params: Promise<{ topic: string }>;
};

function getTopicArticles(topic: InsightTopic) {
  return articles.filter((article) => (article.topic ?? inferArticleTopicSlug(article)) === topic.slug);
}

export function generateStaticParams() {
  return insightTopics.map((topic) => ({ topic: topic.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { topic: topicSlug } = await params;
  const topic = getTopicBySlug(topicSlug);

  if (!topic) {
    return {
      title: "出海专题 | ADXJ",
      description: "ADXJ 出海资讯专题。",
      alternates: { canonical: canonicalUrl("/insights") },
    };
  }

  const topicUrl = canonicalUrl(topicHref(topic.slug));
  const topicArticles = getTopicArticles(topic);
  const ogImage = topicArticles[0]?.coverImage ?? site.defaultOgImage;

  return {
    title: `${topic.name} 专题 | ADXJ 出海资讯`,
    description: topic.description,
    keywords: topic.keywords,
    alternates: { canonical: topicUrl },
    openGraph: {
      title: `${topic.name} 专题 | ADXJ 出海资讯`,
      description: topic.description,
      url: topicUrl,
      siteName: site.name,
      type: "website",
      locale: site.locale,
      images: [
        {
          url: absoluteUrl(ogImage),
          width: 1672,
          height: 941,
          alt: `${topic.name} 出海资讯专题`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${topic.name} 专题 | ADXJ 出海资讯`,
      description: topic.description,
      images: [absoluteUrl(ogImage)],
    },
  };
}

export default async function InsightTopicPage({ params }: PageProps) {
  const { topic: topicSlug } = await params;
  const topic = getTopicBySlug(topicSlug);

  if (!topic) {
    notFound();
  }

  const topicArticles = getTopicArticles(topic);
  const topicUrl = canonicalUrl(topicHref(topic.slug));
  const collectionJsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: `${topic.name} 专题`,
    url: topicUrl,
    description: topic.description,
    about: topic.keywords,
    mainEntity: topicArticles.map((article) => ({
      "@type": "Article",
      headline: article.title,
      url: canonicalUrl(`/insights/${article.slug}`),
      image: absoluteUrl(article.coverImage),
      datePublished: article.publishedAt,
      dateModified: article.lastReviewedAt ?? article.updatedAt ?? article.publishedAt,
    })),
  };
  const breadcrumbJsonLdData = breadcrumbJsonLd([
    { name: "首页", path: "/" },
    { name: "出海资讯", path: "/insights" },
    { name: `${topic.name} 专题`, path: topicHref(topic.slug) },
  ]);

  return (
    <div className="min-h-screen overflow-x-hidden bg-slate-50 text-slate-900 selection:bg-blue-200 selection:text-blue-950">
      <Nav />
      <JsonLd data={[collectionJsonLd, breadcrumbJsonLdData]} />

      <section className="relative overflow-hidden border-b border-slate-200 bg-white px-6 py-16 md:px-10 md:py-20">
        <MatrixBackground />
        <div className="relative z-10 mx-auto max-w-7xl">
          <Link href="/insights" className="mb-8 inline-flex items-center gap-2 text-xs font-bold text-blue-700 transition-colors hover:text-blue-900">
            <ArrowLeft className="h-4 w-4" />
            返回出海资讯
          </Link>
          <div className="grid gap-10 lg:grid-cols-[1fr_360px] lg:items-end">
            <div>
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-3 py-1.5 text-[11px] font-bold text-blue-700">
                <BookOpen className="h-3.5 w-3.5" />
                {topic.name} Topic
              </div>
              <h1 className="max-w-5xl text-5xl font-black leading-[1.05] text-slate-950 md:text-7xl font-[family-name:var(--font-display)]">
                {topic.heroTitle}
              </h1>
              <p className="mt-7 max-w-3xl text-[15px] leading-relaxed text-slate-600">{topic.description}</p>
            </div>
            <div className="rounded-[2rem] border border-blue-100 bg-blue-50 p-6">
              <div className="text-xs font-black uppercase tracking-widest text-blue-700">咨询入口</div>
              <p className="mt-3 text-sm leading-relaxed text-slate-700">
                遇到 {topic.name} 相关上架、投放、风控或转化问题，可以直接把当前情况发给 ADXJ。
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
                <Link
                  href={topic.serviceHref}
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-blue-100 bg-white px-5 py-3 text-xs font-bold text-blue-700 transition-all hover:bg-blue-50"
                >
                  查看相关服务 <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
          <div className="mt-8 flex flex-wrap gap-2">
            {topic.keywords.map((keyword) => (
              <span key={keyword} className="rounded-full bg-slate-100 px-3 py-1.5 text-[11px] font-bold text-slate-600">
                {keyword}
              </span>
            ))}
          </div>
        </div>
      </section>

      <main className="mx-auto w-full max-w-7xl px-6 py-16 md:px-10">
        <div className="mb-10 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="mb-3 text-xs font-black uppercase tracking-widest text-blue-700">Related Insights</div>
            <h2 className="text-3xl font-black text-slate-950 font-[family-name:var(--font-display)]">
              {topicArticles.length} 篇相关文章
            </h2>
          </div>
          <p className="max-w-xl text-sm leading-relaxed text-slate-600">
            这些内容按搜索意图聚合，适合从具体问题进入，再延伸到相关服务和咨询。
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
          {topicArticles.map((article) => (
            <article key={article.slug} className="group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all hover:-translate-y-0.5 hover:border-blue-200 hover:shadow-xl hover:shadow-blue-100/70">
              <Link href={`/insights/${article.slug}`} className="relative block aspect-[16/9] overflow-hidden bg-slate-100">
                <Image
                  src={article.coverImage}
                  alt={article.coverAlt}
                  fill
                  sizes="(min-width: 1280px) 33vw, (min-width: 768px) 50vw, 100vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </Link>
              <div className="flex flex-1 flex-col p-6">
                <div className="mb-4 text-[10px] font-bold text-blue-700">{article.category} / {article.publishedAt}</div>
                <h3 className="text-xl font-black leading-snug text-slate-950 font-[family-name:var(--font-display)]">
                  <Link href={`/insights/${article.slug}`} className="transition-colors hover:text-blue-700">
                    {article.title}
                  </Link>
                </h3>
                <p className="mt-4 line-clamp-3 text-sm leading-relaxed text-slate-600">{article.excerpt}</p>
                <Link href={`/insights/${article.slug}`} className="mt-6 inline-flex items-center gap-2 text-xs font-black text-blue-700 transition-colors hover:text-blue-900">
                  阅读全文 <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}
