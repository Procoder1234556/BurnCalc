import { Navbar } from "@/components/marketing/navbar";
import { BurncalcLandingHero } from "@/components/marketing/hero/burncalc-landing-hero";
import { PiixpalProvider } from "@/components/marketing/piixpal-provider";
import { LogoStrip } from "@/components/marketing/logo-strip";
import { WisprFlowSection } from "@/components/marketing/wispr-flow-section";
import { WisprVoiceMemosSection } from "@/components/marketing/wispr-voice-memos";
import { ProblemSection } from "@/components/marketing/problem-section";
import { StartWhereSection } from "@/components/marketing/start-where-section";
import { ToolsHubGrid } from "@/components/marketing/tools-hub-grid";
import { ProcessSection } from "@/components/marketing/process-section";
import { CapabilityGrid } from "@/components/marketing/capability-grid";
import { CoverageSection } from "@/components/marketing/coverage-section";
import { FounderSection } from "@/components/marketing/founder-section";
import { TestimonialsSection } from "@/components/marketing/testimonials-section";
import { ResourcesSection } from "@/components/marketing/resources-section";
import { CtaBanner } from "@/components/marketing/cta-banner";
import { ThoughtsSection } from "@/components/marketing/thoughts-section";
import { FAQSection } from "@/components/marketing/faq-section";
import { FinalCTA } from "@/components/marketing/final-cta";
import { Footer } from "@/components/marketing/footer";

export function MarketingPage() {
  return (
    <>
      <PiixpalProvider />
      <Navbar />
      <main id="main">
        <BurncalcLandingHero />
        <LogoStrip />
        <WisprFlowSection />
        <WisprVoiceMemosSection />
        <ProblemSection />
        <StartWhereSection />
        <ToolsHubGrid />
        <ProcessSection />
        <CapabilityGrid />
        <CoverageSection />
        <FounderSection />
        <TestimonialsSection />
        <ResourcesSection />
        <CtaBanner />
        <ThoughtsSection />
        <FAQSection />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
