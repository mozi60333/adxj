import { absoluteUrl, canonicalUrl, site } from "@/lib/site";
import type { FaqItem } from "@/lib/seo-content";

type BreadcrumbItem = {
  name: string;
  path: string;
};

type ServiceJsonLdOptions = {
  name: string;
  description: string;
  path: string;
  serviceType: string;
};

export function JsonLd({ data }: { data: unknown }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function breadcrumbJsonLd(items: BreadcrumbItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: canonicalUrl(item.path),
    })),
  };
}

export function serviceJsonLd({
  name,
  description,
  path,
  serviceType,
}: ServiceJsonLdOptions) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name,
    serviceType,
    description,
    url: canonicalUrl(path),
    provider: {
      "@type": "Organization",
      name: site.name,
      url: canonicalUrl("/"),
      logo: absoluteUrl(site.logoImage),
    },
    areaServed: {
      "@type": "Place",
      name: "Global",
    },
  };
}

export function faqPageJsonLd(items: FaqItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}
