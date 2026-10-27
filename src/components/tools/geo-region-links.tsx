import Link from "next/link";
import { cn } from "@/lib/utils";
import { GEO_MARKETS, GEO_REGIONS, toolGeoPath, type GeoRegion } from "@/lib/seo/geo-markets";

export function GeoRegionLinks({
  slug,
  currentRegion,
  className,
}: {
  slug: string;
  currentRegion?: GeoRegion;
  className?: string;
}) {
  return (
    <div className={cn(className)}>
      <p className="text-xs font-medium text-muted">Regional pages (SEO)</p>
      <ul className="mt-2 flex flex-wrap gap-2">
        <li>
          <Link
            href={`/tools/${slug}`}
            className={cn(
              "rounded-full border px-3 py-1 text-xs transition-colors",
              !currentRegion
                ? "border-primary bg-primary/10 text-text"
                : "border-border text-muted hover:text-text",
            )}
            hrefLang="x-default"
          >
            Global
          </Link>
        </li>
        {GEO_REGIONS.map((region) => {
          const m = GEO_MARKETS[region];
          return (
            <li key={region}>
              <Link
                href={toolGeoPath(slug, region)}
                hrefLang={m.hreflang}
                className={cn(
                  "rounded-full border px-3 py-1 text-xs transition-colors",
                  currentRegion === region
                    ? "border-primary bg-primary/10 text-text"
                    : "border-border text-muted hover:text-text",
                )}
              >
                {m.countryName}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
