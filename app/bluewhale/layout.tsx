import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "蓝鲸出海 | 母品牌与企业产品矩阵",
  description:
    "蓝鲸出海是香港蓝鲸网络有限公司旗下母品牌，覆盖跨境电商、海外广告投放、开发者服务、跨境软件开发、跨境支付、社群与网盟发行。",
  keywords: ["蓝鲸出海", "香港蓝鲸网络有限公司", "ADXJ", "跨境出海", "网盟发行", "开发者服务"],
  alternates: { canonical: "/bluewhale" },
  openGraph: {
    title: "蓝鲸出海 | 母品牌与企业产品矩阵",
    description: "了解蓝鲸出海、ADXJ 企业产品矩阵、合作媒体、行业版图与企业服务能力。",
    url: "https://adxj.com/bluewhale",
    siteName: "ADXJ",
    type: "website",
    locale: "zh_CN",
  },
};

export default function BlueWhaleLayout({ children }: { children: React.ReactNode }) {
  return children;
}

