import { Navbar } from "@/components/marketing/navbar";
import { QuotesHero } from "@/components/marketing/quotes-hero";
import { ToolsHubGrid } from "@/components/marketing/tools-hub-grid";
import { ThoughtsSection } from "@/components/marketing/thoughts-section";
import { FAQSection } from "@/components/marketing/faq-section";
import { Footer } from "@/components/marketing/footer";

export function MarketingPage() {
  return (
    <>
      <Navbar />
      <main id="main">
        <QuotesHero />
        <ToolsHubGrid />
        <ThoughtsSection />
        <FAQSection />
      </main>
      <Footer />
    </>
  );
}
