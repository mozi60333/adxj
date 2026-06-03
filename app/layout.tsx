import type {Metadata} from 'next';
import { Inter, Space_Grotesk } from 'next/font/google';
import './globals.css'; // Global styles

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });
const spaceGrotesk = Space_Grotesk({ subsets: ['latin'], variable: '--font-display' });

export const metadata: Metadata = {
  title: 'ADXJ | 蓝鲸网络 - 全球化效果营销中枢',
  description: 'ADXJ (adxj.com) 是蓝鲸网络旗下的全球化效果营销中枢。专注于为出海企业提供高性能的获客支撑。',
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="zh-CN">
      <body className={`${inter.variable} ${spaceGrotesk.variable} font-sans`} suppressHydrationWarning>{children}</body>
    </html>
  );
}
