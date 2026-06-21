import type { MetadataRoute } from "next";
import { canonicalUrl } from "@/lib/site";
import { articles } from "./insights/articles";

export const dynamic = "force-static";

const staticRoutes = [
  "",
  "/bluewhale",
  "/insights",
  "/developer",
  "/media",
  "/community",
  "/join",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date("2026-06-21");
  const staticEntries: MetadataRoute.Sitemap = staticRoutes.map((route) => ({
    url: canonicalUrl(route || "/"),
    lastModified,
    changeFrequency: route === "" ? "weekly" : route === "/insights" ? "daily" : "monthly",
    priority: route === "" ? 1 : route === "/insights" ? 0.9 : 0.8,
  }));

  return [
    ...staticEntries,
    ...articles.map((article) => ({
      url: canonicalUrl(`/insights/${article.slug}`),
      lastModified: new Date(article.publishedAt),
      changeFrequency: "monthly" as const,
      priority: 0.75,
    })),
  ];
}
