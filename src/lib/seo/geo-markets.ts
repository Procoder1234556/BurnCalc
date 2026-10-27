export const GEO_REGIONS = ["us", "uk", "eu", "in"] as const;

export type GeoRegion = (typeof GEO_REGIONS)[number];

export type GeoMarket = {
  id: GeoRegion;
  hreflang: string;
  openGraphLocale: string;
  audienceLabel: string;
  countryName: string;
  hubCities: string;
  currencyNote: string;
  extraKeywords: string[];
  schemaCountry: { "@type": "Country" | "Place"; name: string };
};

export const GEO_MARKETS: Record<GeoRegion, GeoMarket> = {
  us: {
    id: "us",
    hreflang: "en-US",
    openGraphLocale: "en_US",
    audienceLabel: "US startups and investors",
    countryName: "United States",
    hubCities: "San Francisco, New York, and Austin",
    currencyNote: "USD reporting is typical in US pitch decks and VC memos.",
    extraKeywords: [
      "us startup calculator",
      "silicon valley burn rate",
      "usd runway calculator",
    ],
    schemaCountry: { "@type": "Country", name: "United States" },
  },
  uk: {
    id: "uk",
    hreflang: "en-GB",
    openGraphLocale: "en_GB",
    audienceLabel: "UK startups and investors",
    countryName: "United Kingdom",
    hubCities: "London, Cambridge, and Edinburgh",
    currencyNote: "GBP figures are common in UK SEIS/EIS and Series A materials.",
    extraKeywords: [
      "uk startup calculator",
      "london runway calculator",
      "gbp burn rate",
    ],
    schemaCountry: { "@type": "Country", name: "United Kingdom" },
  },
  eu: {
    id: "eu",
    hreflang: "en",
    openGraphLocale: "en_GB",
    audienceLabel: "European startups and investors",
    countryName: "European Union",
    hubCities: "Berlin, Paris, Amsterdam, and Stockholm",
    currencyNote: "EUR reporting varies by entity; label currency on every export.",
    extraKeywords: [
      "europe startup calculator",
      "eu saas metrics",
      "berlin burn rate calculator",
    ],
    schemaCountry: { "@type": "Place", name: "European Union" },
  },
  in: {
    id: "in",
    hreflang: "en-IN",
    openGraphLocale: "en_IN",
    audienceLabel: "Indian startups and investors",
    countryName: "India",
    hubCities: "Bengaluru, Mumbai, and Delhi NCR",
    currencyNote: "INR and USD both appear in Indian venture materials — state yours.",
    extraKeywords: [
      "india startup calculator",
      "bengaluru runway calculator",
      "inr burn rate",
    ],
    schemaCountry: { "@type": "Country", name: "India" },
  },
};

export function isGeoRegion(value: string): value is GeoRegion {
  return (GEO_REGIONS as readonly string[]).includes(value);
}

export function toolGeoPath(slug: string, region: GeoRegion): string {
  return `/tools/${slug}/for/${region}`;
}
