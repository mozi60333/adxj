import type { Metadata } from "next";
import { canonicalUrl, site } from "@/lib/site";

const path = "/join";

export const metadata: Metadata = {
  title: "加入我们 | ADXJ 蓝鲸出海招聘",
  description:
    "ADXJ 蓝鲸出海招聘市场、运营、投放、开发、商务、渠道与素材岗位，Base 北京、西安、重庆、成都、武汉、长沙、广州、深圳。",
  keywords: ["ADXJ 招聘", "蓝鲸出海招聘", "海外投放招聘", "开发者服务招聘", "市场运营招聘"],
  alternates: { canonical: canonicalUrl(path) },
  openGraph: {
    title: "加入我们 | ADXJ 蓝鲸出海招聘",
    description: "加入 ADXJ 蓝鲸出海，与我们一起搭建全球出海增长网络。",
    url: canonicalUrl(path),
    siteName: site.name,
    type: "website",
    locale: site.locale,
  },
};

export default function JoinLayout({ children }: { children: React.ReactNode }) {
  return children;
}
