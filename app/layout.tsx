import type {Metadata} from 'next';
import { Inter, Space_Grotesk } from 'next/font/google';
import { JsonLd } from '@/lib/seo';
import { absoluteUrl, canonicalUrl, site } from '@/lib/site';
import './globals.css'; // Global styles

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });
const spaceGrotesk = Space_Grotesk({ subsets: ['latin'], variable: '--font-display' });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
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
  alternates: { canonical: canonicalUrl('/') },
  openGraph: {
    title: 'ADXJ | 蓝鲸出海全球化效果营销中枢',
    description: '面向出海企业的开发者服务、海外投放、网盟发行、社群资源与增长诊断。',
    url: canonicalUrl('/'),
    siteName: site.name,
    locale: site.locale,
    type: 'website',
    images: [
      {
        url: absoluteUrl(site.defaultOgImage),
        alt: 'ADXJ 蓝鲸出海全球化效果营销中枢',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ADXJ | 蓝鲸出海全球化效果营销中枢',
    description: '跨境出海、海外投放、开发者上架与企业增长服务。',
    images: [absoluteUrl(site.defaultOgImage)],
  },
  robots: {
    index: true,
    follow: true,
  },
};

const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: site.name,
  alternateName: ['蓝鲸出海', '香港蓝鲸网络有限公司'],
  url: canonicalUrl('/'),
  email: site.email,
  foundingDate: '2016',
  logo: absoluteUrl(site.logoImage),
  brand: {
    '@type': 'Brand',
    name: site.name,
  },
  sameAs: [canonicalUrl('/')],
  contactPoint: [
    {
      '@type': 'ContactPoint',
      contactType: 'business cooperation',
      email: site.email,
      availableLanguage: [site.language, 'en'],
    },
  ],
};

const websiteJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: site.name,
  url: canonicalUrl('/'),
  inLanguage: site.language,
  publisher: {
    '@type': 'Organization',
    name: site.name,
  },
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="zh-CN">
      <body className={`${inter.variable} ${spaceGrotesk.variable} font-sans`} suppressHydrationWarning>
        <JsonLd data={organizationJsonLd} />
        <JsonLd data={websiteJsonLd} />
        {children}
      </body>
    </html>
  );
}
