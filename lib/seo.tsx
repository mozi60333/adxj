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

type ItemListEntry = {
  name: string;
  path: string;
  description?: string;
};

type WebPageJsonLdOptions = {
  name: string;
  description: string;
  path: string;
  about?: string[];
};

type DefinedTermItem = {
  name: string;
  description: string;
  path?: string;
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

export function itemListJsonLd(name: string, items: ItemListEntry[]) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name,
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      url: canonicalUrl(item.path),
      ...(item.description ? { description: item.description } : {}),
    })),
  };
}

export function webPageJsonLd({ name, description, path, about = [] }: WebPageJsonLdOptions) {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name,
    description,
    url: canonicalUrl(path),
    inLanguage: site.language,
    about,
    publisher: {
      "@type": "Organization",
      name: site.name,
      url: canonicalUrl("/"),
    },
  };
}

export function collectionPageJsonLd({
  name,
  description,
  path,
  items,
  about = [],
}: WebPageJsonLdOptions & { items: ItemListEntry[] }) {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name,
    description,
    url: canonicalUrl(path),
    inLanguage: site.language,
    about,
    mainEntity: items.map((item) => ({
      "@type": "WebPage",
      name: item.name,
      url: canonicalUrl(item.path),
      ...(item.description ? { description: item.description } : {}),
    })),
  };
}

export function definedTermSetJsonLd(name: string, terms: DefinedTermItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "DefinedTermSet",
    name,
    hasDefinedTerm: terms.map((term) => ({
      "@type": "DefinedTerm",
      name: term.name,
      description: term.description,
      ...(term.path ? { url: canonicalUrl(term.path) } : {}),
    })),
  };
}
