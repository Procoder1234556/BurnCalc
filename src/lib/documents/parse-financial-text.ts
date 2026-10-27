import type { RawInputs } from "@/lib/metrics/parse";

export type ExtractedField = {
  key: keyof RawInputs;
  value: string;
  label: string;
};

export type ParseFinancialTextResult = {
  fields: Partial<RawInputs>;
  matches: ExtractedField[];
};

function parseMoneyToken(raw: string): string | null {
  const t = raw.trim().replace(/\$/g, "").replace(/,/g, "");
  const m = t.match(/^([\d.]+)\s*([kmb])?$/i);
  if (!m) return null;
  const base = Number(m[1]);
  if (!Number.isFinite(base)) return null;
  const suffix = (m[2] ?? "").toLowerCase();
  const mult =
    suffix === "k" ? 1_000 : suffix === "m" ? 1_000_000 : suffix === "b" ? 1_000_000_000 : 1;
  return String(Math.round(base * mult));
}

function parsePercentToken(raw: string): string | null {
  const t = raw.trim().replace(/%/g, "");
  const n = Number(t);
  if (!Number.isFinite(n)) return null;
  return String(n);
}

type Pattern = {
  key: keyof RawInputs;
  label: string;
  kind: "money" | "percent" | "number";
  regex: RegExp;
};

const PATTERNS: Pattern[] = [
  {
    key: "cashBalance",
    label: "Cash balance",
    kind: "money",
    regex: /cash(?:\s+on\s+hand|\s+balance)?[:\s]*\$?\s*([\d,.]+[kmb]?)/i,
  },
  {
    key: "monthlyRevenue",
    label: "Monthly revenue",
    kind: "money",
    regex: /(?:monthly\s+revenue|revenue\s+\(monthly\)|mrr)[:\s]*\$?\s*([\d,.]+[kmb]?)/i,
  },
  {
    key: "monthlyExpenses",
    label: "Monthly expenses",
    kind: "money",
    regex: /(?:monthly\s+(?:expenses|burn|opex)|operating\s+expenses)[:\s]*\$?\s*([\d,.]+[kmb]?)/i,
  },
  {
    key: "priorMonthRevenue",
    label: "Prior month revenue",
    kind: "money",
    regex: /prior\s+month(?:ly)?\s+revenue[:\s]*\$?\s*([\d,.]+[kmb]?)/i,
  },
  {
    key: "priorYearRevenue",
    label: "Prior year revenue",
    kind: "money",
    regex: /(?:prior\s+year|yoy)\s+revenue[:\s]*\$?\s*([\d,.]+[kmb]?)/i,
  },
  {
    key: "revenue",
    label: "Revenue",
    kind: "money",
    regex: /(?:total\s+)?revenue[:\s]*\$?\s*([\d,.]+[kmb]?)/i,
  },
  {
    key: "cogs",
    label: "COGS",
    kind: "money",
    regex: /(?:cogs|cost\s+of\s+(?:goods|revenue))[:\s]*\$?\s*([\d,.]+[kmb]?)/i,
  },
  {
    key: "netIncome",
    label: "Net income",
    kind: "money",
    regex: /net\s+income[:\s]*\$?\s*([\d,.]+[kmb]?)/i,
  },
  {
    key: "smSpend",
    label: "S&M spend",
    kind: "money",
    regex: /(?:s&?m|sales\s+(?:and|&)\s+marketing)(?:\s+spend)?[:\s]*\$?\s*([\d,.]+[kmb]?)/i,
  },
  {
    key: "newCustomers",
    label: "New customers",
    kind: "number",
    regex: /new\s+customers?[:\s]*([\d,.]+)/i,
  },
  {
    key: "arpu",
    label: "ARPU",
    kind: "money",
    regex: /arpu[:\s]*\$?\s*([\d,.]+[kmb]?)/i,
  },
  {
    key: "grossMarginPercent",
    label: "Gross margin",
    kind: "percent",
    regex: /gross\s+margin[:\s]*([\d.]+)\s*%?/i,
  },
  {
    key: "monthlyChurnPercent",
    label: "Monthly churn",
    kind: "percent",
    regex: /(?:monthly\s+)?churn[:\s]*([\d.]+)\s*%?/i,
  },
  {
    key: "preMoneyValuation",
    label: "Pre-money",
    kind: "money",
    regex: /pre[-\s]?money(?:\s+valuation)?[:\s]*\$?\s*([\d,.]+[kmb]?)/i,
  },
  {
    key: "investmentAmount",
    label: "Investment",
    kind: "money",
    regex: /(?:investment|round\s+size|new\s+money)[:\s]*\$?\s*([\d,.]+[kmb]?)/i,
  },
  {
    key: "sharesOutstanding",
    label: "Shares outstanding",
    kind: "number",
    regex: /shares\s+outstanding[:\s]*([\d,.]+[kmb]?)/i,
  },
  {
    key: "sharePrice",
    label: "Share price",
    kind: "money",
    regex: /share\s+price[:\s]*\$?\s*([\d,.]+)/i,
  },
  {
    key: "shareholdersEquity",
    label: "Shareholders' equity",
    kind: "money",
    regex: /shareholders?'?\s+equity[:\s]*\$?\s*([\d,.]+[kmb]?)/i,
  },
];

export function parseFinancialText(text: string): ParseFinancialTextResult {
  const normalized = text.replace(/\s+/g, " ");
  const fields: Partial<RawInputs> = {};
  const matches: ExtractedField[] = [];

  for (const pattern of PATTERNS) {
    if (fields[pattern.key]) continue;
    const m = normalized.match(pattern.regex);
    if (!m?.[1]) continue;
    let value: string | null = null;
    if (pattern.kind === "money") value = parseMoneyToken(m[1]);
    else if (pattern.kind === "percent") value = parsePercentToken(m[1]);
    else value = parseMoneyToken(m[1]) ?? m[1].replace(/,/g, "");
    if (!value) continue;
    fields[pattern.key] = value;
    matches.push({ key: pattern.key, value, label: pattern.label });
  }

  const arrMatch = normalized.match(/\barr[:\s]*\$?\s*([\d,.]+[kmb]?)/i);
  if (arrMatch?.[1] && !fields.monthlyRevenue) {
    const annual = parseMoneyToken(arrMatch[1]);
    if (annual) {
      const monthly = String(Math.round(Number(annual) / 12));
      fields.monthlyRevenue = monthly;
      matches.push({
        key: "monthlyRevenue",
        value: monthly,
        label: "Monthly revenue (from ARR ÷ 12)",
      });
    }
  }

  return { fields, matches };
}

export function mergeRawInputs(
  current: RawInputs,
  extracted: Partial<RawInputs>,
  overwriteEmptyOnly = true,
): RawInputs {
  const next = { ...current };
  for (const [key, value] of Object.entries(extracted)) {
    if (!value) continue;
    const k = key as keyof RawInputs;
    if (!overwriteEmptyOnly || !next[k]?.trim()) {
      next[k] = value;
    }
  }
  return next;
}
