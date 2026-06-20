import type { MetadataRoute } from "next";
import { articles, siteUrl } from "./insights/articles";

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
  const lastModified = new Date("2026-06-20");
  const staticEntries: MetadataRoute.Sitemap = staticRoutes.map((route) => ({
    url: `${siteUrl}${route}`,
    lastModified,
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : route === "/insights" ? 0.9 : 0.8,
  }));

  return [
    ...staticEntries,
    ...articles.map((article) => ({
      url: `${siteUrl}/insights/${article.slug}`,
      lastModified: new Date(article.publishedAt),
      changeFrequency: "monthly" as const,
      priority: 0.75,
    })),
  ];
}
