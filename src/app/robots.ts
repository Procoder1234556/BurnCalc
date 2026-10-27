import type { MetadataRoute } from "next";
import { getSiteUrl } from "@/lib/seo/site";

export default function robots(): MetadataRoute.Robots {
  const base = getSiteUrl();
  const sharedDisallow = ["/dashboard/"];

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: sharedDisallow,
      },
      {
        userAgent: "Googlebot",
        allow: "/",
        disallow: sharedDisallow,
      },
      {
        userAgent: "Bingbot",
        allow: "/",
        disallow: sharedDisallow,
      },
      {
        userAgent: "Slurp",
        allow: "/",
        disallow: sharedDisallow,
      },
      {
        userAgent: "DuckDuckBot",
        allow: "/",
        disallow: sharedDisallow,
      },
      {
        userAgent: "Brave",
        allow: "/",
        disallow: sharedDisallow,
      },
    ],
    sitemap: `${base}/sitemap.xml`,
    host: base.replace(/^https?:\/\//, ""),
  };
}
