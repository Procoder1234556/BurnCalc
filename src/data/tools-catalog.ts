import type { CalculatorOutputs } from "@/lib/metrics/types";
import type { RawInputs } from "@/lib/metrics/parse";

export type ToolCategory =
  | "survival"
  | "growth"
  | "unit-economics"
  | "fundraising"
  | "corporate";

export type OutputMetricKey = keyof CalculatorOutputs;

export type ToolDefinition = {
  slug: string;
  name: string;
  shortLabel: string;
  category: ToolCategory;
  accent: string;
  icon: string;
  inputIds: (keyof RawInputs)[];
  primaryMetrics: OutputMetricKey[];
  secondaryMetrics?: OutputMetricKey[];
  seoTitle: string;
  seoDescription: string;
  keywords: string[];
  intro: string;
  howItWorks: string[];
  faq: { q: string; a: string }[];
};

export const TOOL_CATEGORIES: Record<
  ToolCategory,
  { label: string; description: string }
> = {
  survival: {
    label: "Runway & burn",
    description: "Cash survival metrics for founders and boards.",
  },
  growth: {
    label: "Growth & margins",
    description: "Momentum and profitability reads from your P&L.",
  },
  "unit-economics": {
    label: "Unit economics",
    description: "Customer acquisition and lifetime value tools.",
  },
  fundraising: {
    label: "Fundraising",
    description: "Ownership, valuation, and dilution modeling.",
  },
  corporate: {
    label: "Later-stage ratios",
    description: "EPS, P/E, and ROE when public-style inputs exist.",
  },
};

export const TOOLS: ToolDefinition[] = [
  {
    slug: "burn-rate-calculator",
    name: "Burn Rate Calculator",
    shortLabel: "Burn rate",
    category: "survival",
    accent: "#E85D4C",
    icon: "flame",
    inputIds: ["monthlyRevenue", "monthlyExpenses"],
    primaryMetrics: ["monthlyBurn"],
    seoTitle: "Free Burn Rate Calculator for Startups",
    seoDescription:
      "Calculate monthly net burn from revenue and expenses. Free browser tool for founders and VCs in the US, UK, EU, and India.",
    keywords: [
      "burn rate calculator",
      "startup burn rate",
      "monthly burn",
      "net burn calculator",
    ],
    intro:
      "Net burn is what you spend above what you earn each month. Enter monthly revenue and operating expenses to see burn instantly.",
    howItWorks: [
      "Enter recognized monthly revenue.",
      "Enter total monthly operating expenses.",
      "Burn displays as expenses minus revenue (zero if you are cash-flow positive).",
    ],
    faq: [
      {
        q: "What is net burn rate?",
        a: "Net burn is monthly expenses minus monthly revenue when expenses are higher. It is the cash you lose per month before financing.",
      },
      {
        q: "Is gross burn different?",
        a: "Yes. Gross burn is total spend without subtracting revenue. This tool shows net burn, which is standard for runway planning.",
      },
    ],
  },
  {
    slug: "runway-calculator",
    name: "Runway Calculator",
    shortLabel: "Runway",
    category: "survival",
    accent: "#3B82F6",
    icon: "calendar",
    inputIds: ["cashBalance", "monthlyRevenue", "monthlyExpenses"],
    primaryMetrics: ["monthlyBurn", "runwayMonths"],
    seoTitle: "Startup Runway Calculator — Months of Cash Left",
    seoDescription:
      "Calculate how many months of runway you have from cash, revenue, and expenses. Free, private, runs in your browser.",
    keywords: ["runway calculator", "startup runway", "months of cash", "cash runway"],
    intro:
      "Runway answers how long cash lasts at your current net burn. Add cash on hand plus monthly P&L inputs.",
    howItWorks: [
      "Enter cash balance today.",
      "Add monthly revenue and expenses.",
      "Runway is cash divided by net monthly burn when burn is positive.",
    ],
    faq: [
      {
        q: "What if we are profitable?",
        a: "When revenue covers expenses, net burn is zero and runway is undefined — a good problem. The tool will explain that state.",
      },
      {
        q: "Should I use bank cash or runway net of debt?",
        a: "Use the cash number you manage day to day. Align with how you report to your board.",
      },
    ],
  },
  {
    slug: "cac-calculator",
    name: "CAC Calculator",
    shortLabel: "CAC",
    category: "unit-economics",
    accent: "#8B5CF6",
    icon: "target",
    inputIds: ["smSpend", "newCustomers"],
    primaryMetrics: ["cac"],
    seoTitle: "Customer Acquisition Cost (CAC) Calculator",
    seoDescription:
      "Compute CAC from sales & marketing spend and new customers acquired. Free unit economics calculator for SaaS and startups.",
    keywords: ["cac calculator", "customer acquisition cost", "saas cac"],
    intro:
      "Customer acquisition cost is S&M spend divided by new customers in the same period. Keep the period consistent.",
    howItWorks: [
      "Enter sales and marketing spend for the period.",
      "Enter new customers acquired in that same period.",
      "CAC updates live with a short explanation.",
    ],
    faq: [
      {
        q: "What belongs in S&M spend?",
        a: "Include paid marketing, sales salaries, commissions, and tools directly tied to acquisition for the period you choose.",
      },
    ],
  },
  {
    slug: "ltv-calculator",
    name: "LTV Calculator",
    shortLabel: "LTV",
    category: "unit-economics",
    accent: "#10B981",
    icon: "users",
    inputIds: ["arpu", "grossMarginPercent", "monthlyChurnPercent"],
    primaryMetrics: ["ltv"],
    seoTitle: "Customer Lifetime Value (LTV) Calculator",
    seoDescription:
      "Estimate LTV from ARPU, gross margin, and monthly churn. Free LTV calculator for subscription and SaaS businesses.",
    keywords: ["ltv calculator", "lifetime value", "saas ltv"],
    intro:
      "LTV estimates gross profit per customer over their lifetime using ARPU, margin, and churn.",
    howItWorks: [
      "Enter average revenue per user per month.",
      "Add gross margin percent and monthly churn percent.",
      "LTV uses the standard margin-adjusted formula shown in the tool.",
    ],
    faq: [
      {
        q: "Is this gross or net LTV?",
        a: "This version uses gross margin on ARPU. Align churn and ARPU to the same customer definition.",
      },
    ],
  },
  {
    slug: "ltv-cac-ratio-calculator",
    name: "LTV to CAC Ratio Calculator",
    shortLabel: "LTV:CAC",
    category: "unit-economics",
    accent: "#F59E0B",
    icon: "scale",
    inputIds: [
      "smSpend",
      "newCustomers",
      "arpu",
      "grossMarginPercent",
      "monthlyChurnPercent",
    ],
    primaryMetrics: ["cac", "ltv", "ltvToCac"],
    seoTitle: "LTV to CAC Ratio Calculator",
    seoDescription:
      "Calculate LTV:CAC from acquisition spend and customer economics. Compare unit economics before you pitch investors.",
    keywords: ["ltv cac ratio", "ltv to cac calculator", "unit economics"],
    intro:
      "The LTV:CAC ratio compares lifetime value to acquisition cost. Investors use it as a quick health check — with context.",
    howItWorks: [
      "Fill CAC inputs (S&M and new customers).",
      "Fill LTV inputs (ARPU, margin, churn).",
      "See LTV:CAC with formula hints.",
    ],
    faq: [
      {
        q: "What is a good LTV:CAC ratio?",
        a: "Many SaaS businesses target 3:1 or higher, but stage, payback, and margin matter. Use this as a sanity check, not a verdict.",
      },
    ],
  },
  {
    slug: "payback-period-calculator",
    name: "CAC Payback Calculator",
    shortLabel: "Payback",
    category: "unit-economics",
    accent: "#EC4899",
    icon: "clock",
    inputIds: ["smSpend", "newCustomers", "arpu", "grossMarginPercent"],
    primaryMetrics: ["cac", "paybackMonths"],
    seoTitle: "CAC Payback Period Calculator",
    seoDescription:
      "Calculate how many months to recover customer acquisition cost from gross margin dollars. Free payback calculator.",
    keywords: ["cac payback", "payback period calculator", "saas payback"],
    intro: "Payback months show how long gross profit from a customer repays CAC.",
    howItWorks: [
      "Enter CAC inputs and ARPU with gross margin.",
      "Payback is CAC divided by monthly gross profit per customer.",
    ],
    faq: [
      {
        q: "Why use gross margin in payback?",
        a: "You repay CAC from contribution margin, not top-line ARPU. Margin aligns payback with cash reality.",
      },
    ],
  },
  {
    slug: "rule-of-40-calculator",
    name: "Rule of 40 Calculator",
    shortLabel: "Rule of 40",
    category: "growth",
    accent: "#6366F1",
    icon: "trending-up",
    inputIds: [
      "priorMonthRevenue",
      "monthlyRevenue",
      "revenue",
      "netIncome",
    ],
    primaryMetrics: ["revenueGrowthMom", "revenueGrowthAnnualized", "ruleOf40"],
    seoTitle: "Rule of 40 Calculator for SaaS",
    seoDescription:
      "Compute Rule of 40 from growth and profitability inputs. Free SaaS benchmark calculator for founders and investors.",
    keywords: ["rule of 40 calculator", "saas rule of 40", "growth plus margin"],
    intro:
      "Rule of 40 adds growth rate and profit margin. Useful as a quick SaaS benchmark — not a substitute for your full model.",
    howItWorks: [
      "Provide revenue growth inputs (MoM or annual).",
      "Add net margin inputs when available.",
      "See Rule of 40 with labeled components.",
    ],
    faq: [
      {
        q: "Which growth rate should I use?",
        a: "Use the same period you show investors. MoM and YoY are not interchangeable — label your choice.",
      },
    ],
  },
  {
    slug: "gross-margin-calculator",
    name: "Gross Margin Calculator",
    shortLabel: "Gross margin",
    category: "growth",
    accent: "#14B8A6",
    icon: "percent",
    inputIds: ["revenue", "cogs"],
    primaryMetrics: ["grossMargin"],
    seoTitle: "Gross Margin Calculator",
    seoDescription:
      "Calculate gross margin percent from revenue and COGS. Free margin calculator for startup P&L snapshots.",
    keywords: ["gross margin calculator", "gross profit margin"],
    intro: "Gross margin is revenue minus COGS, expressed as a percent of revenue.",
    howItWorks: ["Enter revenue.", "Enter cost of goods sold.", "Margin displays as a percentage."],
    faq: [
      {
        q: "Revenue vs monthly revenue?",
        a: "Use the same period for revenue and COGS — monthly, quarterly, or annual.",
      },
    ],
  },
  {
    slug: "net-margin-calculator",
    name: "Net Margin Calculator",
    shortLabel: "Net margin",
    category: "growth",
    accent: "#0EA5E9",
    icon: "chart-pie",
    inputIds: ["revenue", "netIncome"],
    primaryMetrics: ["netMargin"],
    seoTitle: "Net Profit Margin Calculator",
    seoDescription:
      "Calculate net margin from revenue and net income. Free profitability calculator for decks and diligence.",
    keywords: ["net margin calculator", "profit margin startup"],
    intro: "Net margin is net income divided by revenue for the period you choose.",
    howItWorks: ["Enter revenue.", "Enter net income.", "Net margin displays as a percentage."],
    faq: [
      {
        q: "GAAP or cash?",
        a: "Match whatever you present in your deck. Label whether figures are GAAP, management, or cash-based.",
      },
    ],
  },
  {
    slug: "pre-money-post-money-calculator",
    name: "Pre & Post Money Calculator",
    shortLabel: "Pre / post",
    category: "fundraising",
    accent: "#A855F7",
    icon: "banknote",
    inputIds: ["preMoneyValuation", "investmentAmount"],
    primaryMetrics: ["postMoney", "investorOwnership"],
    seoTitle: "Pre Money and Post Money Valuation Calculator",
    seoDescription:
      "Calculate post-money valuation and investor ownership from pre-money and round size. Free fundraising calculator.",
    keywords: [
      "pre money post money calculator",
      "post money valuation",
      "startup valuation calculator",
    ],
    intro:
      "Post-money is pre-money plus new investment. Investor ownership is investment divided by post-money.",
    howItWorks: [
      "Enter pre-money valuation from the term sheet.",
      "Enter new money in the round.",
      "See post-money and ownership instantly.",
    ],
    faq: [
      {
        q: "Does this include option pool refresh?",
        a: "No. This is the core round math. Model option pool separately with your counsel.",
      },
    ],
  },
  {
    slug: "dilution-calculator",
    name: "Dilution Calculator",
    shortLabel: "Dilution",
    category: "fundraising",
    accent: "#EF4444",
    icon: "slice",
    inputIds: ["preMoneyValuation", "investmentAmount"],
    primaryMetrics: ["dilution", "investorOwnership", "postMoney"],
    seoTitle: "Startup Dilution Calculator",
    seoDescription:
      "Estimate founder dilution from pre-money and investment amount. Free cap table math for round modeling.",
    keywords: ["dilution calculator", "startup dilution", "founder dilution"],
    intro:
      "Dilution shows how much existing shareholders are diluted when new money prices the round.",
    howItWorks: [
      "Enter pre-money and investment.",
      "Dilution derives from pre versus post-money ownership.",
    ],
    faq: [
      {
        q: "Is this fully diluted?",
        a: "This is the basic round dilution math. Fully diluted ownership includes options and convertibles separately.",
      },
    ],
  },
  {
    slug: "revenue-growth-calculator",
    name: "Revenue Growth Calculator",
    shortLabel: "Growth",
    category: "growth",
    accent: "#22C55E",
    icon: "line-chart",
    inputIds: ["priorMonthRevenue", "monthlyRevenue", "priorYearRevenue"],
    primaryMetrics: ["revenueGrowthMom", "revenueGrowthYoy", "revenueGrowthAnnualized"],
    seoTitle: "Revenue Growth Calculator (MoM & YoY)",
    seoDescription:
      "Calculate month-over-month and year-over-year revenue growth. Free growth rate calculator for investor updates.",
    keywords: ["revenue growth calculator", "mom growth", "yoy growth startup"],
    intro: "Compare current revenue to prior month or prior year with clear period labels.",
    howItWorks: [
      "Enter current monthly revenue.",
      "Enter prior month and/or prior year revenue.",
      "MoM, YoY, and annualized rates update live.",
    ],
    faq: [
      {
        q: "Annualized from MoM?",
        a: "Annualized growth compounds monthly growth. Use it carefully for volatile early revenue.",
      },
    ],
  },
  {
    slug: "eps-pe-roe-calculator",
    name: "EPS, P/E & ROE Calculator",
    shortLabel: "EPS / P/E / ROE",
    category: "corporate",
    accent: "#64748B",
    icon: "building",
    inputIds: ["netIncome", "sharesOutstanding", "sharePrice", "shareholdersEquity"],
    primaryMetrics: ["eps", "peRatio", "roe"],
    seoTitle: "EPS, P/E Ratio, and ROE Calculator",
    seoDescription:
      "Compute earnings per share, price-to-earnings, and return on equity when you have public-style inputs.",
    keywords: ["eps calculator", "pe ratio calculator", "roe calculator"],
    intro: "Later-stage and public-style metrics when you provide shares, price, and equity.",
    howItWorks: [
      "Enter net income and shares outstanding for EPS.",
      "Add share price for P/E.",
      "Add shareholders' equity for ROE.",
    ],
    faq: [
      {
        q: "When should startups use these?",
        a: "Most pre-IPO companies skip P/E. Use when you have public comparables or later-stage reporting.",
      },
    ],
  },
];

export function getToolBySlug(slug: string): ToolDefinition | undefined {
  return TOOLS.find((t) => t.slug === slug);
}

export const TOOL_SLUGS = TOOLS.map((t) => t.slug);
