"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { articles } from "@/app/insights/articles";
import { insightTopicMap, topicHref, type InsightTopicSlug } from "@/app/insights/topics";

export function SeoCaseLinks({
  title,
  description,
  slugs = [],
  topicSlugs = [],
  theme = "light",
}: {
  title: string;
  description?: string;
  slugs?: string[];
  topicSlugs?: InsightTopicSlug[];
  theme?: "light" | "dark";
}) {
  const selectedArticles = slugs
    .map((slug) => articles.find((article) => article.slug === slug))
    .filter(Boolean)
    .slice(0, 3);
  const dark = theme === "dark";

  return (
    <section className={dark ? "rounded-[2rem] border border-slate-800 bg-[#111827] p-8 md:p-10" : "rounded-[2rem] border border-blue-100 bg-white p-8 shadow-xl shadow-slate-200/50 md:p-10"}>
      <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <div className={dark ? "mb-3 text-xs font-black uppercase tracking-widest text-cyan-300" : "mb-3 text-xs font-black uppercase tracking-widest text-blue-700"}>
            Growth Cases
          </div>
          <h2 className={dark ? "text-3xl font-black text-white font-[family-name:var(--font-display)]" : "text-3xl font-black text-slate-950 font-[family-name:var(--font-display)]"}>
            {title}
          </h2>
        </div>
        {description && (
          <p className={dark ? "max-w-xl text-sm leading-relaxed text-slate-400" : "max-w-xl text-sm leading-relaxed text-slate-600"}>
            {description}
          </p>
        )}
      </div>

      {topicSlugs.length > 0 && (
        <div className="mb-6 flex flex-wrap gap-2">
          {topicSlugs.map((slug) => {
            const topic = insightTopicMap[slug];
            return (
              <Link
                key={slug}
                href={topicHref(slug)}
                className={dark ? "rounded-full border border-blue-900/50 bg-blue-950/40 px-4 py-2 text-xs font-bold text-blue-200 hover:bg-blue-900" : "rounded-full border border-blue-100 bg-blue-50 px-4 py-2 text-xs font-bold text-blue-700 hover:bg-blue-100"}
              >
                {topic.name} 专题
              </Link>
            );
          })}
        </div>
      )}

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        {selectedArticles.map((article) => article && (
          <Link
            key={article.slug}
            href={`/insights/${article.slug}`}
            className={dark ? "group rounded-2xl border border-slate-800 bg-slate-950 p-5 transition-all hover:-translate-y-0.5 hover:border-blue-700" : "group rounded-2xl border border-slate-100 bg-slate-50 p-5 transition-all hover:-translate-y-0.5 hover:border-blue-200 hover:bg-blue-50"}
          >
            <div className={dark ? "mb-3 text-[10px] font-bold text-cyan-300" : "mb-3 text-[10px] font-bold text-blue-700"}>
              {article.category}
            </div>
            <h3 className={dark ? "text-base font-black leading-snug text-white group-hover:text-cyan-200" : "text-base font-black leading-snug text-slate-950 group-hover:text-blue-700"}>
              {article.title}
            </h3>
            <p className={dark ? "mt-3 line-clamp-3 text-xs leading-6 text-slate-400" : "mt-3 line-clamp-3 text-xs leading-6 text-slate-600"}>
              {article.excerpt}
            </p>
            <span className={dark ? "mt-5 inline-flex items-center gap-2 text-xs font-black text-cyan-300" : "mt-5 inline-flex items-center gap-2 text-xs font-black text-blue-700"}>
              阅读案例 <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
