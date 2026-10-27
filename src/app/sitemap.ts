import type { MetadataRoute } from "next";

import { TOOL_SLUGS } from "@/data/tools-catalog";

import { GEO_REGIONS, toolGeoPath } from "@/lib/seo/geo-markets";

import { STATIC_PAGE_SEO } from "@/lib/seo/page-registry";

import { getSiteUrl } from "@/lib/seo/site";



export default function sitemap(): MetadataRoute.Sitemap {

  const base = getSiteUrl();

  const now = new Date();



  const staticRoutes: MetadataRoute.Sitemap = STATIC_PAGE_SEO.map((page) => ({

    url: page.path === "/" ? `${base}/` : `${base}${page.path}`,

    lastModified: now,

    changeFrequency: page.path === "/" ? "weekly" : "monthly",

    priority: page.path === "/" ? 1 : page.path === "/tools" ? 0.9 : 0.3,

  }));



  const toolRoutes: MetadataRoute.Sitemap = TOOL_SLUGS.flatMap((slug) => {

    const global: MetadataRoute.Sitemap[number] = {

      url: `${base}/tools/${slug}`,

      lastModified: now,

      changeFrequency: "monthly",

      priority: 0.85,

    };

    const geo: MetadataRoute.Sitemap = GEO_REGIONS.map((region) => ({

      url: `${base}${toolGeoPath(slug, region)}`,

      lastModified: now,

      changeFrequency: "monthly",

      priority: 0.75,

    }));

    return [global, ...geo];

  });



  return [...staticRoutes, ...toolRoutes];

}


