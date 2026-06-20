import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "媒体买量 | 海外广告投放与 ROAS 增长",
  description:
    "ADXJ 提供 Facebook、Google、TikTok、Telegram Ads、X 等海外媒体投放代运营、CPA/ROAS 优化、素材测试和广告账户风控服务。",
  keywords: ["海外投放", "媒体买量", "Facebook 投放", "Google Ads", "TikTok Ads", "Telegram Ads", "ROAS"],
  alternates: { canonical: "/media" },
  openGraph: {
    title: "媒体买量 | 海外广告投放与 ROAS 增长",
    description: "为出海企业提供多渠道广告投放、素材优化、账户风控和增长复盘。",
    url: "https://adxj.com/media",
    siteName: "ADXJ",
    type: "website",
    locale: "zh_CN",
  },
};

export default function MediaLayout({ children }: { children: React.ReactNode }) {
  return children;
}

