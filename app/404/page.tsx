import type { Metadata } from "next";
import { NotFoundPage } from "@/components/not-found-page";

export const metadata: Metadata = {
  title: "404 | 增长航线暂时没有落点",
  description: "你访问的页面暂时不存在。可返回 ADXJ 首页、出海资讯、开发者服务或媒体买量入口继续浏览。",
  robots: {
    index: false,
    follow: true,
  },
};

export default function Custom404Page() {
  return <NotFoundPage />;
}
