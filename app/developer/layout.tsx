import type { Metadata } from "next";
import { JsonLd, breadcrumbJsonLd, serviceJsonLd } from "@/lib/seo";
import { canonicalUrl, site } from "@/lib/site";

const description =
  "ADXJ 为出海开发者提供 iOS 开发者账号、Google Play 开发者账号、应用上架、审核被拒处理、包体合规、账号风控和技术支持。";
const path = "/developer";

export const metadata: Metadata = {
  title: "开发者服务 | iOS 与 Google Play 出海上架",
  description,
  keywords: ["开发者服务", "iOS 上架", "Google Play 上架", "开发者账号", "审核被拒", "账号风控"],
  alternates: { canonical: canonicalUrl(path) },
  openGraph: {
    title: "开发者服务 | iOS 与 Google Play 出海上架",
    description: "面向出海应用团队的开发者账号、应用上架、审核处理与包体合规服务。",
    url: canonicalUrl(path),
    siteName: site.name,
    type: "website",
    locale: site.locale,
  },
};

const structuredData = [
  breadcrumbJsonLd([
    { name: "首页", path: "/" },
    { name: "开发者服务", path },
  ]),
  serviceJsonLd({
    name: "ADXJ 开发者服务",
    description,
    path,
    serviceType: "应用上架与开发者账号服务",
  }),
];

export default function DeveloperLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd data={structuredData} />
      {children}
    </>
  );
}
