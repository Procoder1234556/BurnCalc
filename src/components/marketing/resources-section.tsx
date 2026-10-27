import Image from "next/image";
import Link from "next/link";
import { MarketingContainer } from "@/components/marketing/container";
import { SectionHeading } from "@/components/marketing/section-heading";
import { BLOG_POSTS } from "@/data/marketing";

export function ResourcesSection() {
  return (
    <section id="resources" className="bg-background py-20 sm:py-24 lg:py-28">
      <MarketingContainer>
        <SectionHeading align="center" title="Resources for sharper metrics" />
        <ul className="mt-12 grid gap-6 sm:grid-cols-3">
          {BLOG_POSTS.map((post) => (
            <li key={post.title}>
              <article className="group overflow-hidden rounded-xl border border-border bg-white">
                <div className="relative aspect-[16/10] overflow-hidden bg-surface-elevated">
                  <Image
                    src={post.image}
                    alt=""
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-[1.02] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
                    sizes="(max-width: 640px) 100vw, 33vw"
                  />
                </div>
                <div className="p-5">
                  <p className="text-xs font-medium text-muted">{post.category}</p>
                  <h3 className="mt-2 text-base font-semibold leading-snug text-text">
                    {post.title}
                  </h3>
                  <Link
                    href={post.href}
                    className="mt-3 inline-block text-sm font-medium text-text underline-offset-2 hover:underline"
                  >
                    Read more
                  </Link>
                </div>
              </article>
            </li>
          ))}
        </ul>
      </MarketingContainer>
    </section>
  );
}
