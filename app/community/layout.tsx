import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "行业社群 | 跨境出海资源交流群",
  description:
    "加入 ADXJ 出海行业社群，连接跨境开发者、应用团队、广告投放、商务渠道、媒体资源和海外增长服务。",
  keywords: ["出海行业社群", "跨境交流", "Telegram 社群", "企业微信社群", "出海资源", "开发者社群"],
  alternates: { canonical: "/community" },
  openGraph: {
    title: "行业社群 | 跨境出海资源交流群",
    description: "面向出海企业、开发者和增长团队的跨境资源社群。",
    url: "https://adxj.com/community",
    siteName: "ADXJ",
    type: "website",
    locale: "zh_CN",
  },
};

export default function CommunityLayout({ children }: { children: React.ReactNode }) {
  return children;
}

