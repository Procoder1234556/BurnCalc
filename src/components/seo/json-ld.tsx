import { jsonLdScript } from "@/lib/seo/site";

export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={jsonLdScript(data)} />
  );
}
