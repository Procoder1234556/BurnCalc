import { Easing, interpolate, useCurrentFrame } from "remotion";

const burncalcTheme = {
  background: "#ffffff",
  foreground: "#1a1a1a",
  muted: "#6b6b6b",
  border: "#e8e8e6",
  positive: "#2d8a4e",
  surface: "#fafaf8",
};

export function BurncalcRemotionScreen() {
  const frame = useCurrentFrame();
  const fade = (delay: number) =>
    interpolate(frame, [delay, delay + 12], [0, 1], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.out(Easing.cubic),
    });

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        background: burncalcTheme.background,
        color: burncalcTheme.foreground,
        fontFamily: 'Satoshi, Inter, system-ui, sans-serif',
        padding: 28,
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: 20,
      }}
    >
      <div style={{ opacity: fade(8) }}>
        <p
          style={{
            fontSize: 11,
            fontWeight: 600,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            color: burncalcTheme.muted,
          }}
        >
          Inputs
        </p>
        {[
          ["Monthly revenue", "$185,000"],
          ["Monthly expenses", "$310,000"],
          ["Cash balance", "$2,400,000"],
        ].map(([label, value], i) => (
          <div key={label} style={{ marginTop: 10, opacity: fade(12 + i * 6) }}>
            <p style={{ fontSize: 10, color: burncalcTheme.muted }}>{label}</p>
            <div
              style={{
                marginTop: 4,
                padding: "8px 10px",
                borderRadius: 8,
                border: `1px solid ${burncalcTheme.border}`,
                background: burncalcTheme.surface,
                fontFamily: "ui-monospace, monospace",
                fontSize: 12,
              }}
            >
              {value}
            </div>
          </div>
        ))}
      </div>
      <div style={{ opacity: fade(14) }}>
        <p
          style={{
            fontSize: 11,
            fontWeight: 600,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            color: burncalcTheme.muted,
          }}
        >
          Metrics
        </p>
        {[
          ["Monthly burn", "$125,000", burncalcTheme.foreground],
          ["Runway", "19.2 mo", burncalcTheme.positive],
          ["LTV : CAC", "52.6×", burncalcTheme.positive],
          ["Rule of 40", "79.6%", burncalcTheme.foreground],
        ].map(([label, value, color], i) => (
          <div
            key={label}
            style={{
              marginTop: 10,
              padding: 12,
              borderRadius: 10,
              border: `1px solid ${burncalcTheme.border}`,
              opacity: fade(18 + i * 5),
            }}
          >
            <p style={{ fontSize: 10, color: burncalcTheme.muted }}>{label}</p>
            <p
              style={{
                marginTop: 4,
                fontSize: 18,
                fontWeight: 600,
                fontFamily: "ui-monospace, monospace",
                color,
              }}
            >
              {value}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
