export const site = {
  url: "https://adxj.com",
  host: "adxj.com",
  name: "ADXJ",
  locale: "zh_CN",
  language: "zh-CN",
  email: "business@adxj.com",
  defaultOgImage: "/brand/adxj-logo-horizontal-full.png",
  logoImage: "/brand/adxj-logo-horizontal.png",
};

const fileExtensionPattern = /\/[^/?#]+\.[^/?#]+$/;

export function absoluteUrl(path = "/") {
  if (/^https?:\/\//.test(path)) return path;
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return new URL(normalizedPath, site.url).toString();
}

export function canonicalUrl(path = "/") {
  const url = new URL(path.startsWith("/") ? path : `/${path}`, site.url);

  if (!fileExtensionPattern.test(url.pathname) && !url.pathname.endsWith("/")) {
    url.pathname = `${url.pathname}/`;
  }

  return url.toString();
}
