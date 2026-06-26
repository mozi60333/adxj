import type { MetadataRoute } from "next";
import { absoluteUrl, canonicalUrl } from "@/lib/site";
import { articles } from "./insights/articles";
import { insightTopics, topicHref } from "./insights/topics";

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
  const siteUpdatedAt = new Date("2026-06-27");
  const latestArticleDate = articles.reduce((latest, article) => {
    const articleDate = new Date(article.updatedAt ?? article.publishedAt);
    return articleDate > latest ? articleDate : latest;
  }, new Date("2026-06-21"));

  const staticEntries: MetadataRoute.Sitemap = staticRoutes.map((route) => ({
    url: canonicalUrl(route || "/"),
    lastModified: route === "/insights" ? latestArticleDate : siteUpdatedAt,
    changeFrequency: route === "" ? "weekly" : route === "/insights" ? "daily" : "monthly",
    priority: route === "" ? 1 : route === "/insights" ? 0.9 : route === "/join" ? 0.45 : 0.8,
  }));
  const topicEntries: MetadataRoute.Sitemap = insightTopics.map((topic) => ({
    url: canonicalUrl(topicHref(topic.slug)),
    lastModified: latestArticleDate,
    changeFrequency: "weekly",
    priority: 0.82,
  }));

  return [
    ...staticEntries,
    ...topicEntries,
    ...articles.map((article) => ({
      url: canonicalUrl(`/insights/${article.slug}`),
      lastModified: new Date(article.updatedAt ?? article.publishedAt),
      changeFrequency: "monthly" as const,
      priority: 0.75,
      images: [absoluteUrl(article.coverImage)],
    })),
  ];
}
