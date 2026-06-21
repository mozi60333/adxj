import type { Metadata } from "next";
import { JsonLd, breadcrumbJsonLd, serviceJsonLd } from "@/lib/seo";
import { canonicalUrl, site } from "@/lib/site";

const description =
  "加入 ADXJ 出海行业社群，连接跨境开发者、应用团队、广告投放、商务渠道、媒体资源和海外增长服务。";
const path = "/community";

export const metadata: Metadata = {
  title: "行业社群 | 跨境出海资源交流群",
  description,
  keywords: ["出海行业社群", "跨境交流", "Telegram 社群", "企业微信社群", "出海资源", "开发者社群"],
  alternates: { canonical: canonicalUrl(path) },
  openGraph: {
    title: "行业社群 | 跨境出海资源交流群",
    description: "面向出海企业、开发者和增长团队的跨境资源社群。",
    url: canonicalUrl(path),
    siteName: site.name,
    type: "website",
    locale: site.locale,
  },
};

const structuredData = [
  breadcrumbJsonLd([
    { name: "首页", path: "/" },
    { name: "行业社群", path },
  ]),
  serviceJsonLd({
    name: "ADXJ 出海行业社群",
    description,
    path,
    serviceType: "跨境出海资源社群服务",
  }),
];

export default function CommunityLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd data={structuredData} />
      {children}
    </>
  );
}
