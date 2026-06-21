import type { Metadata } from "next";
import { JsonLd, breadcrumbJsonLd, serviceJsonLd } from "@/lib/seo";
import { canonicalUrl, site } from "@/lib/site";

const description =
  "蓝鲸出海是香港蓝鲸网络有限公司旗下母品牌，覆盖跨境电商、海外广告投放、开发者服务、跨境软件开发、跨境支付、社群与网盟发行。";
const path = "/bluewhale";

export const metadata: Metadata = {
  title: "蓝鲸出海 | 母品牌与企业产品矩阵",
  description,
  keywords: ["蓝鲸出海", "香港蓝鲸网络有限公司", "ADXJ", "跨境出海", "网盟发行", "开发者服务"],
  alternates: { canonical: canonicalUrl(path) },
  openGraph: {
    title: "蓝鲸出海 | 母品牌与企业产品矩阵",
    description: "了解蓝鲸出海、ADXJ 企业产品矩阵、合作媒体、行业版图与企业服务能力。",
    url: canonicalUrl(path),
    siteName: site.name,
    type: "website",
    locale: site.locale,
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
];

export default function BlueWhaleLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd data={structuredData} />
      {children}
    </>
  );
}
