import type { Metadata } from "next";
import { JsonLd, breadcrumbJsonLd, serviceJsonLd } from "@/lib/seo";
import { canonicalUrl, site } from "@/lib/site";

const description =
  "ADXJ 提供 Facebook、Google、TikTok、Telegram Ads、X 等海外媒体投放代运营、CPA/ROAS 优化、素材测试和广告账户风控服务。";
const path = "/media";

export const metadata: Metadata = {
  title: "媒体买量 | 海外广告投放与 ROAS 增长",
  description,
  keywords: ["海外投放", "媒体买量", "Facebook 投放", "Google Ads", "TikTok Ads", "Telegram Ads", "ROAS"],
  alternates: { canonical: canonicalUrl(path) },
  openGraph: {
    title: "媒体买量 | 海外广告投放与 ROAS 增长",
    description: "为出海企业提供多渠道广告投放、素材优化、账户风控和增长复盘。",
    url: canonicalUrl(path),
    siteName: site.name,
    type: "website",
    locale: site.locale,
  },
};

const structuredData = [
  breadcrumbJsonLd([
    { name: "首页", path: "/" },
    { name: "媒体买量", path },
  ]),
  serviceJsonLd({
    name: "ADXJ 媒体买量服务",
    description,
    path,
    serviceType: "海外广告投放与 ROAS 增长服务",
  }),
];

export default function MediaLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd data={structuredData} />
      {children}
    </>
  );
}
