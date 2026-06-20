import type {Metadata} from 'next';
import { Inter, Space_Grotesk } from 'next/font/google';
import './globals.css'; // Global styles

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });
const spaceGrotesk = Space_Grotesk({ subsets: ['latin'], variable: '--font-display' });
const siteUrl = 'https://adxj.com';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'ADXJ | 蓝鲸出海全球化效果营销中枢',
    template: '%s | ADXJ',
  },
  description: 'ADXJ.COM 是蓝鲸出海旗下全球化效果营销与开发者服务品牌，专注跨境出海、海外广告投放、App 上架、开发者账号、网盟发行和企业增长服务。',
  keywords: [
    'ADXJ',
    '蓝鲸出海',
    '跨境出海',
    '海外广告投放',
    '开发者服务',
    'App Store 上架',
    'Google Play 上架',
    'Meta Ads',
    'TikTok Ads',
    'Telegram Ads',
  ],
  alternates: { canonical: '/' },
  openGraph: {
    title: 'ADXJ | 蓝鲸出海全球化效果营销中枢',
    description: '面向出海企业的开发者服务、海外投放、网盟发行、社群资源与增长诊断。',
    url: siteUrl,
    siteName: 'ADXJ',
    locale: 'zh_CN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ADXJ | 蓝鲸出海全球化效果营销中枢',
    description: '跨境出海、海外投放、开发者上架与企业增长服务。',
  },
  robots: {
    index: true,
    follow: true,
  },
};

const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'ADXJ',
  alternateName: ['蓝鲸出海', '香港蓝鲸网络有限公司'],
  url: siteUrl,
  email: 'business@adxj.com',
  foundingDate: '2016',
  brand: {
    '@type': 'Brand',
    name: 'ADXJ',
  },
  sameAs: ['https://adxj.com'],
  contactPoint: [
    {
      '@type': 'ContactPoint',
      contactType: 'business cooperation',
      email: 'business@adxj.com',
      availableLanguage: ['zh-CN', 'en'],
    },
  ],
};

const websiteJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'ADXJ',
  url: siteUrl,
  inLanguage: 'zh-CN',
  publisher: {
    '@type': 'Organization',
    name: 'ADXJ',
  },
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="zh-CN">
      <body className={`${inter.variable} ${spaceGrotesk.variable} font-sans`} suppressHydrationWarning>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
