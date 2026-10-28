/**
 * Marketing copy in a Wispr Flow voice: spoken rhythm, short breaths,
 * concrete scenes — written to be read aloud or pasted into an investor memo.
 */

export const WISPR_FLOW_INTRO = {
  eyebrow: "Wispr Flow memo · BurnCalc",
  title: "Say the numbers once. Show the same numbers on the slide.",
  lede:
    "Most decks fail in the quiet part — when someone in the room does mental math and waits to see if you notice. BurnCalc is the two-minute pass that keeps your story aligned before that moment.",
  byline: "Voice draft for founders, operators, and associates",
} as const;

export const WISPR_FLOW_CHAPTERS = [
  {
    id: "runway",
    label: "00:42",
    headline: "Runway is not a vibe check",
    body: [
      "You know the slide. Big number. Rounded up. Maybe it still says eighteen months even though hiring changed last quarter.",
      "Runway is cash divided by net burn. Full stop. If you cannot say both parts out loud, the slide is decoration.",
      "BurnCalc asks for the few P&L fields you already have — revenue, expenses, cash — and gives you months left without rebuilding the spreadsheet tab you swore you would not touch again.",
    ],
  },
  {
    id: "unit-economics",
    label: "01:18",
    headline: "Unit economics is a sentence, not a chart junk drawer",
    body: [
      "CAC, LTV, payback. Three words that mean different things in marketing, finance, and the partner thread.",
      "Pick one definition. Stick to it. Put it in the memo.",
      "We show the ratio and the payback period with the formula in plain English so you can defend the number when someone asks which cohort you used.",
    ],
  },
  {
    id: "round",
    label: "02:03",
    headline: "Dilution is the price of speed — model it before counsel sends the cap table",
    body: [
      "Pre-money, post-money, ownership. You have said these words in a call. Maybe you nodded before the math reconciled.",
      "BurnCalc lines up round size and valuation so you see dilution on one screen — the same screen you used for burn five minutes ago.",
      "That continuity matters when you are dictating an update at midnight and do not want to open four files.",
    ],
  },
  {
    id: "browser",
    label: "02:47",
    headline: "Your data stays on your machine until you choose to share it",
    body: [
      "No account to start. Calculations run in the browser. Copy a summary when you are ready for email, Notion, or the data room.",
      "We built it for the call where you share screen and type live — not for the flow where you upload a model and hope the parser guessed right.",
    ],
  },
] as const;

export const WISPR_FLOW_PULL_QUOTES = [
  {
    quote:
      "If the headline number and the footnote disagree, investors hear the footnote.",
    context: "Screening habit",
  },
  {
    quote:
      "A defensible snapshot beats a perfect model you cannot explain in two minutes.",
    context: "Partner memo",
  },
  {
    quote:
      "Label the period on every growth rate. MoM is not YoY with extra confidence.",
    context: "Board prep",
  },
] as const;

export const WISPR_VOICE_MEMOS = [
  {
    title: "Before the partner meeting",
    duration: "0:38",
    transcript:
      "Pull cash, monthly net burn, and one growth input. Read runway out loud. If it sounds wrong, fix the inputs — not the adjective on slide four.",
  },
  {
    title: "Before the investor update",
    duration: "0:52",
    transcript:
      "Copy the summary block. Paste into your draft. Replace adjectives with the metrics underneath. Send.",
  },
  {
    title: "Before you sign the term sheet",
    duration: "1:05",
    transcript:
      "Run pre and post money with the round size you were offered. Check ownership against your last deck. That is the conversation worth having on the phone.",
  },
] as const;

export const WISPR_FLOW_CLOSER = {
  title: "Open the calculator. Talk through the outputs.",
  body:
    "Use BurnCalc like a voice memo for your metrics — quick, repeatable, same definitions every time. When the room goes quiet, you will already know what the math says.",
  primaryCta: "Open calculator",
  secondaryCta: "Browse tools",
} as const;
