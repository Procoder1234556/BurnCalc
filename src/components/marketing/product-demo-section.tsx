import { MarketingContainer } from "@/components/marketing/container";
import { LaunchVideoPlayer } from "@/components/marketing/launch-video-player";
import { ScreenStudioDemo } from "@/components/marketing/screen-studio-demo";
import { SectionHeading } from "@/components/marketing/section-heading";
import { JitterReveal } from "@/components/motion/jitter-reveal";

export function ProductDemoSection() {
  return (
    <section
      id="demo"
      className="scroll-mt-24 border-y border-border bg-surface-elevated py-20 sm:py-24 lg:py-28"
    >
      <MarketingContainer>
        <SectionHeading
          align="center"
          eyebrow="Product demo"
          title="Polished demos without the edit suite"
          description="Launch motion from snapcn and Remotion, device frames inspired by Shots, and guided highlights like Screen Studio — all showcasing the real BurnCalc workspace."
        />
        <div className="mt-12 grid items-start gap-10 lg:grid-cols-2 lg:gap-12">
          <JitterReveal>
            <div className="overflow-hidden rounded-2xl border border-border bg-white p-2 shadow-sm">
              <LaunchVideoPlayer />
            </div>
            <p className="mt-3 text-center text-xs text-muted lg:text-left">
              Remotion + snapcn · export with{" "}
              <code className="rounded bg-surface-muted px-1 py-0.5 text-[11px]">
                npm run video:render
              </code>
            </p>
          </JitterReveal>
          <JitterReveal delayMs={120}>
            <ScreenStudioDemo />
            <p className="mt-3 text-center text-xs text-muted lg:text-left">
              Interactive HTML mockup with guided cursor · swap in a Screen Studio
              capture anytime
            </p>
          </JitterReveal>
        </div>
      </MarketingContainer>
    </section>
  );
}
