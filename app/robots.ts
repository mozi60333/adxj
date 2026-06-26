import type { MetadataRoute } from "next";
import { absoluteUrl, site } from "@/lib/site";

export const dynamic = "force-static";

const allowedUserAgents = [
  "*",
  "Googlebot",
  "OAI-SearchBot",
  "GPTBot",
  "ChatGPT-User",
  "PerplexityBot",
  "Perplexity-User",
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: allowedUserAgents.map((userAgent) => ({
      userAgent,
      allow: "/",
    })),
    sitemap: absoluteUrl("/sitemap.xml"),
    host: site.host,
  };
}
