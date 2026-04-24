export default function robots() {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/"],
      },
    ],
    sitemap: "https://www.hasbi.pro/sitemap.xml",
    host: "https://www.hasbi.pro",
  };
}
