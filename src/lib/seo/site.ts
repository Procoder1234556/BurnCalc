import type { Metadata } from "next";

const DEFAULT_SITE_URL = "https://burncalc.app";

export function getSiteUrl(): string {
  const fromEnv = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "");
  return fromEnv || DEFAULT_SITE_URL;
}

export const SITE_NAME = "BurnCalc";

export const DEFAULT_DESCRIPTION =
  "Free startup finance calculators for burn rate, runway, CAC, LTV, dilution, and more. Built for founders and investors in the US, UK, EU, and India.";

type PageMetaInput = {
  title: string;
  description: string;
  path: string;
  keywords?: string[];
  noIndex?: boolean;
  openGraphLocale?: string;
  alternatesLanguages?: Record<string, string>;
};

export function buildPageMetadata({
  title,
  description,
  path,
  keywords,
  noIndex,
  openGraphLocale = "en_US",
  alternatesLanguages,
}: PageMetaInput): Metadata {
  const siteUrl = getSiteUrl();
  const canonical = `${siteUrl}${path.startsWith("/") ? path : `/${path}`}`;
  const fullTitle = title.includes(SITE_NAME) ? title : `${title} | ${SITE_NAME}`;

  const googleVerification = process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION;
  const bingVerification = process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION;

  return {
    title: fullTitle,
    description,
    keywords,
    metadataBase: new URL(siteUrl),
    alternates: {
      canonical,
      ...(alternatesLanguages ? { languages: alternatesLanguages } : {}),
    },
    openGraph: {
      title: fullTitle,
      description,
      url: canonical,
      siteName: SITE_NAME,
      type: "website",
      locale: openGraphLocale,
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
    },
    robots: noIndex
      ? { index: false, follow: false }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            "max-snippet": -1,
            "max-image-preview": "large",
            "max-video-preview": -1,
          },
        },
    category: "finance",
    ...(googleVerification || bingVerification
      ? {
          verification: {
            ...(googleVerification ? { google: googleVerification } : {}),
            ...(bingVerification
              ? { other: { "msvalidate.01": bingVerification } }
              : {}),
          },
        }
      : {}),
  };
}

export function jsonLdScript(data: Record<string, unknown>) {
  return {
    __html: JSON.stringify(data),
  };
}
