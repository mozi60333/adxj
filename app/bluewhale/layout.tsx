import type { Metadata } from "next";
import { JsonLd, breadcrumbJsonLd, faqPageJsonLd, serviceJsonLd } from "@/lib/seo";
import { serviceFaqs } from "@/lib/seo-content";
import { absoluteUrl, canonicalUrl, site } from "@/lib/site";

const description =
  "蓝鲸出海是香港蓝鲸网络有限公司旗下母品牌，覆盖跨境电商、海外广告投放、开发者服务、跨境软件开发、跨境支付、社群与网盟发行。";
const path = "/bluewhale";

export const metadata: Metadata = {
  title: "蓝鲸出海 | 母品牌与企业产品矩阵",
  description,
  keywords: ["蓝鲸出海", "香港蓝鲸网络有限公司", "ADXJ", "跨境出海", "出海增长服务", "网盟发行", "开发者服务"],
  alternates: { canonical: canonicalUrl(path) },
  openGraph: {
    title: "蓝鲸出海 | 母品牌与企业产品矩阵",
    description: "了解蓝鲸出海、ADXJ 企业产品矩阵、合作媒体、行业版图与企业服务能力。",
    url: canonicalUrl(path),
    siteName: site.name,
    type: "website",
    locale: site.locale,
    images: [
      {
        url: absoluteUrl(site.defaultOgImage),
        width: 1200,
        height: 630,
        alt: "蓝鲸出海与 ADXJ 企业产品矩阵",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "蓝鲸出海 | 母品牌与企业产品矩阵",
    description,
    images: [absoluteUrl(site.defaultOgImage)],
  },
};

const structuredData = [
  breadcrumbJsonLd([
    { name: "首页", path: "/" },
    { name: "蓝鲸出海", path },
  ]),
  serviceJsonLd({
    name: "蓝鲸出海母品牌与企业产品矩阵",
    description,
    path,
    serviceType: "跨境增长生态服务",
  }),
  faqPageJsonLd(serviceFaqs.bluewhale),
];

export default function BlueWhaleLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd data={structuredData} />
      {children}
    </>
  );
}
