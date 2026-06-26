"use client";

import type { FaqItem } from "@/lib/seo-content";

export function SeoFaqSection({
  items,
  eyebrow = "FAQ",
  title = "常见问题",
  description,
  theme = "light",
}: {
  items: FaqItem[];
  eyebrow?: string;
  title?: string;
  description?: string;
  theme?: "light" | "dark";
}) {
  const dark = theme === "dark";

  return (
    <section className={dark ? "rounded-[2rem] border border-blue-900/50 bg-slate-950 p-8 md:p-10" : "rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm md:p-10"}>
      <div className="mb-8 max-w-3xl">
        <div className={dark ? "mb-3 text-xs font-black uppercase tracking-widest text-cyan-300" : "mb-3 text-xs font-black uppercase tracking-widest text-blue-700"}>
          {eyebrow}
        </div>
        <h2 className={dark ? "text-3xl font-black text-white font-[family-name:var(--font-display)]" : "text-3xl font-black text-slate-950 font-[family-name:var(--font-display)]"}>
          {title}
        </h2>
        {description && (
          <p className={dark ? "mt-4 text-sm leading-relaxed text-slate-400" : "mt-4 text-sm leading-relaxed text-slate-600"}>
            {description}
          </p>
        )}
      </div>
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        {items.map((item) => (
          <div
            key={item.question}
            className={dark ? "rounded-2xl border border-slate-800 bg-slate-900/80 p-5" : "rounded-2xl border border-slate-100 bg-slate-50 p-5"}
          >
            <h3 className={dark ? "text-sm font-black leading-relaxed text-white" : "text-sm font-black leading-relaxed text-slate-950"}>
              {item.question}
            </h3>
            <p className={dark ? "mt-3 text-xs leading-6 text-slate-400" : "mt-3 text-xs leading-6 text-slate-600"}>
              {item.answer}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
