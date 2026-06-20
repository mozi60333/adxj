"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { ArrowRight, CalendarDays, Clock3, Search } from "lucide-react";
import type { InsightCategory } from "./articles";

export type ArticleCardData = {
  title: string;
  slug: string;
  category: InsightCategory;
  excerpt: string;
  keywords: string[];
  coverImage: string;
  coverAlt: string;
  publishedAt: string;
  readTime: string;
};

const categoryStyles: Record<InsightCategory, string> = {
  开发者出海: "bg-blue-50 text-blue-700 border-blue-100",
  海外投放增长: "bg-emerald-50 text-emerald-700 border-emerald-100",
  出海企业洞察: "bg-slate-100 text-slate-700 border-slate-200",
};

export function InsightsList({
  articles,
  categories,
}: {
  articles: ArticleCardData[];
  categories: InsightCategory[];
}) {
  const [activeCategory, setActiveCategory] = useState<"全部" | InsightCategory>("全部");

  const visibleArticles = useMemo(() => {
    if (activeCategory === "全部") return articles;
    return articles.filter((article) => article.category === activeCategory);
  }, [activeCategory, articles]);

  return (
    <section className="mx-auto w-full max-w-7xl px-6 py-16 md:px-10">
      <div className="mb-10 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
        <div>
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-blue-100 bg-white px-3 py-1 text-[10px] font-bold uppercase text-blue-700 shadow-sm">
            <Search className="h-3.5 w-3.5" />
            Insight Library
          </div>
          <h2 className="text-3xl font-black text-slate-950 md:text-4xl font-[family-name:var(--font-display)]">
            出海资讯文章
          </h2>
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setActiveCategory("全部")}
            className={`rounded-full border px-4 py-2 text-xs font-bold transition-all ${
              activeCategory === "全部"
                ? "border-slate-900 bg-slate-900 text-white"
                : "border-slate-200 bg-white text-slate-600 hover:border-blue-200 hover:text-blue-700"
            }`}
          >
            全部
          </button>
          {categories.map((category) => (
            <button
              key={category}
              type="button"
              onClick={() => setActiveCategory(category)}
              className={`rounded-full border px-4 py-2 text-xs font-bold transition-all ${
                activeCategory === category
                  ? "border-blue-600 bg-blue-600 text-white"
                  : "border-slate-200 bg-white text-slate-600 hover:border-blue-200 hover:text-blue-700"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
        {visibleArticles.map((article) => (
          <article
            key={article.slug}
            className="group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all hover:-translate-y-0.5 hover:border-blue-200 hover:shadow-xl hover:shadow-blue-100/70"
          >
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
              <div className="mb-4 flex flex-wrap items-center gap-2">
                <span className={`rounded-full border px-3 py-1 text-[10px] font-bold ${categoryStyles[article.category]}`}>
                  {article.category}
                </span>
                <span className="inline-flex items-center gap-1 text-[10px] font-bold text-slate-400">
                  <CalendarDays className="h-3.5 w-3.5" />
                  {article.publishedAt}
                </span>
                <span className="inline-flex items-center gap-1 text-[10px] font-bold text-slate-400">
                  <Clock3 className="h-3.5 w-3.5" />
                  {article.readTime}
                </span>
              </div>
              <h3 className="text-xl font-black leading-snug text-slate-950 font-[family-name:var(--font-display)]">
                <Link href={`/insights/${article.slug}`} className="transition-colors hover:text-blue-700">
                  {article.title}
                </Link>
              </h3>
              <p className="mt-4 line-clamp-3 text-sm leading-relaxed text-slate-600">{article.excerpt}</p>
              <div className="mt-5 flex flex-wrap gap-2">
                {article.keywords.slice(0, 4).map((keyword) => (
                  <span key={keyword} className="rounded-full bg-slate-50 px-2.5 py-1 text-[10px] font-bold text-slate-500">
                    {keyword}
                  </span>
                ))}
              </div>
              <Link
                href={`/insights/${article.slug}`}
                className="mt-6 inline-flex items-center gap-2 text-xs font-black text-blue-700 transition-colors hover:text-blue-900"
              >
                阅读全文 <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

