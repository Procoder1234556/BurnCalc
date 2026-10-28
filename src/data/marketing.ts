export const NAV_LINKS = [
  { label: "Story", href: "#story" },
  { label: "Tools", href: "/tools" },
  { label: "Thoughts", href: "#thoughts" },
  { label: "FAQ", href: "#faq" },
] as const;

export const LOGO_STRIP = [
  "Atlas Seed",
  "Northline",
  "Meridian VC",
  "Foundry",
  "Summit Partners",
  "Benchmark",
] as const;

export const HERO_BENEFITS = [
  {
    title: "Burn & runway",
    description: "Monthly burn and months of cash from a few P&L inputs.",
  },
  {
    title: "Unit economics",
    description: "LTV, CAC, payback, and Rule of 40 with plain-language notes.",
  },
  {
    title: "Round modeling",
    description: "Pre/post money, ownership, and dilution for pitch prep.",
  },
] as const;

export const PERSONA_CARDS = [
  {
    title: "I need to know my runway",
    description:
      "Enter revenue, expenses, and cash on hand. See monthly burn and runway in seconds — no spreadsheet formulas to debug.",
    href: "/calculator",
    cta: "Try it",
  },
  {
    title: "I'm preparing a pitch",
    description:
      "Model valuation, ownership, margins, and unit economics with short explanations you can reuse in your deck narrative.",
    href: "/calculator",
    cta: "Learn more",
  },
  {
    title: "I'm screening deals",
    description:
      "Sanity-check founder numbers with a consistent metrics view before you jump into the full model.",
    href: "/calculator",
    cta: "Try it",
  },
] as const;

export const PROBLEM_POINTS = [
  {
    title: "Messy burn calculations",
    description: "Revenue, expenses, and cash rarely line up the same way twice across decks.",
  },
  {
    title: "Unclear unit economics",
    description: "CAC, LTV, and payback get copy-pasted without a shared definition.",
  },
  {
    title: "Hard-to-explain valuations",
    description: "Ownership and dilution stories fall apart when the math isn't visible.",
  },
] as const;

export const METRIC_FEATURES = [
  {
    title: "Burn rate & runway",
    description: "Net monthly burn and months of runway from cash and P&L.",
    href: "#metrics",
  },
  {
    title: "Gross & net margins",
    description: "Margin percentages when you have revenue, COGS, or net income.",
    href: "#metrics",
  },
  {
    title: "LTV, CAC & payback",
    description: "Customer economics with LTV:CAC ratio and payback period.",
    href: "#metrics",
  },
  {
    title: "Rule of 40 & growth",
    description: "MoM growth and Rule of 40 for a quick SaaS health read.",
    href: "#metrics",
  },
  {
    title: "Valuation & ownership",
    description: "Pre and post money with investor ownership percentage.",
    href: "#metrics",
  },
  {
    title: "Dilution",
    description: "See round impact on existing shareholders at a glance.",
    href: "#metrics",
  },
  {
    title: "EPS & basic ratios",
    description: "Earnings per share, P/E, and ROE when later-stage inputs are filled.",
    href: "#metrics",
  },
  {
    title: "Export & share",
    description: "Copy or download a clean summary for updates and memos.",
    href: "#how-it-works",
  },
] as const;

export const PROCESS_STEPS = [
  {
    step: "1",
    title: "Enter a few numbers",
    description: "Cash, revenue, expenses, growth, and optional round or customer fields.",
  },
  {
    step: "2",
    title: "See live metrics",
    description: "Burn, runway, ratios, and valuation outputs update as you type.",
  },
  {
    step: "3",
    title: "Read short explanations",
    description: "Each result includes a one-line definition and formula context.",
  },
  {
    step: "4",
    title: "Export or share",
    description: "Copy a summary or export text for your pitch or screening notes.",
  },
] as const;

export const CTA_BANNER_BULLETS = [
  "Burn, runway, and survival metrics",
  "LTV:CAC, payback, and Rule of 40",
  "Valuation, ownership, and dilution",
] as const;

export const TESTIMONIALS = [
  {
    quote:
      "We stopped rebuilding the same burn spreadsheet for every seed deck. Associates get a defensible snapshot before the partner call.",
    name: "Jordan Ellis",
    role: "VP Finance, Northline Systems",
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=85",
  },
  {
    quote:
      "I use BurnCalc the night before investor updates. Runway and unit economics in one place beats hunting through three tabs.",
    name: "Priya Nair",
    role: "Co-founder, Meridian Labs",
    image:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=85",
  },
  {
    quote:
      "Screening deals is faster when CAC, LTV, and dilution use the same definitions. It's the first pass before our model.",
    name: "Marcus Chen",
    role: "Principal, Atlas Seed",
    image:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=400&q=85",
  },
] as const;

export const FOUNDER_BULLETS = [
  "Founders prepping seed and Series A decks",
  "Operators sending monthly investor updates",
  "VCs and angels doing first-pass metric checks",
  "Finance leads who need a fast sanity check",
] as const;

export const BLOG_POSTS = [
  {
    category: "Runway",
    title: "How to calculate runway when revenue is growing",
    image:
      "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=800&q=85",
    href: "#resources",
  },
  {
    category: "Unit economics",
    title: "LTV:CAC benchmarks founders actually use in pitches",
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=85",
    href: "#resources",
  },
  {
    category: "Fundraising",
    title: "Pre-money vs post-money: a two-minute ownership refresher",
    image:
      "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=800&q=85",
    href: "#resources",
  },
  {
    category: "Voice memo",
    title: "Read your metrics out loud before you share screen",
    image:
      "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=800&q=85",
    href: "#story",
  },
] as const;

export const PRICING_PLANS = [
  {
    id: "free",
    name: "Free",
    price: 0,
    description: "Solo founders sanity-checking deck metrics.",
    features: [
      "Burn & runway",
      "12+ core metrics",
      "Browser only",
      "Copy summary",
    ],
    cta: "Try free",
    highlighted: false,
  },
  {
    id: "pro",
    name: "Pro",
    price: 19,
    description: "Operators who model rounds every week.",
    features: [
      "Everything in Free",
      "Valuation & dilution",
      "Export to text",
      "Priority updates",
    ],
    cta: "Start Pro",
    highlighted: true,
  },
  {
    id: "team",
    name: "Team",
    price: 49,
    description: "Associates screening multiple deals.",
    features: [
      "Everything in Pro",
      "Shared templates",
      "Team onboarding",
      "Email support",
    ],
    cta: "Contact sales",
    highlighted: false,
  },
] as const;

export const INTEGRATIONS = [
  { name: "Google Sheets", color: "#34A853" },
  { name: "Excel", color: "#217346" },
  { name: "QuickBooks", color: "#2CA01C" },
  { name: "Stripe", color: "#635BFF" },
  { name: "Notion", color: "#EDEDED" },
  { name: "Xero", color: "#13B5EA" },
  { name: "HubSpot", color: "#FF7A59" },
  { name: "Airtable", color: "#FCB400" },
] as const;

export const COMPARISON_ROWS = [
  { label: "Burn & runway", founder: true, vc: true, operator: true },
  { label: "Unit economics", founder: true, vc: true, operator: true },
  { label: "Valuation & dilution", founder: true, vc: true, operator: false },
  { label: "Ownership modeling", founder: true, vc: true, operator: false },
  { label: "Export summary", founder: true, vc: true, operator: true },
] as const;

export const FAQ_ITEMS = [
  {
    q: "What is BurnCalc?",
    a: "BurnCalc is a focused calculator for burn, runway, unit economics, valuation, and ownership. Enter a handful of numbers and get standard VC metrics with short explanations.",
  },
  {
    q: "Do I need an account?",
    a: "No account is required for the free workspace. Open the calculator and start typing.",
  },
  {
    q: "What metrics can I calculate?",
    a: "Monthly burn, runway, growth rates, gross and net margin, CAC, LTV, LTV:CAC, payback, Rule of 40, pre and post money, ownership, dilution, EPS, P/E, and ROE when inputs allow.",
  },
  {
    q: "Is my data stored?",
    a: "Calculations run in your browser. Nothing is sent to a server unless you copy or export results yourself.",
  },
  {
    q: "Can I use the results in investor updates?",
    a: "Yes. Copy or export a clean summary after you verify the numbers against your model.",
  },
  {
    q: "Is there a free plan?",
    a: "Yes. The Free plan includes the core calculator and copy summary at no cost.",
  },
  {
    q: "Can I export results?",
    a: "Use Copy summary or Export from the calculator workspace to download a text file.",
  },
  {
    q: "Who is BurnCalc for?",
    a: "Founders preparing pitches, operators sending updates, and investors screening deals who want consistent definitions without rebuilding spreadsheets.",
  },
  {
    q: "Why do the explanations matter?",
    a: "Each output includes a one-line definition and formula context so you can say the number and the method in the same breath — useful on live calls and in written memos.",
  },
  {
    q: "Can I use BurnCalc if I am not in the US?",
    a: "Yes. The math is the same; label your currency and reporting period on every slide and update you send.",
  },
  {
    q: "What is the Wispr Flow memo on the home page?",
    a: "It is long-form marketing copy written in a spoken-word rhythm — the kind of draft you would dictate before a partner meeting. It describes how BurnCalc fits pitch prep, not a separate product.",
  },
] as const;
