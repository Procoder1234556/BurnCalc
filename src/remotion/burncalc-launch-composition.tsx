"use client";

import { AbsoluteFill, Sequence } from "remotion";
import { LaptopFrame } from "@/components/snap-cn/laptop-frame";
import { TextReveal } from "@/components/snap-cn/text-reveal";
import { BurncalcRemotionScreen } from "@/remotion/burncalc-screen";

const burncalcSnapTheme = {
  primary: "#1a1a1a",
  primaryForeground: "#ffffff",
  background: "#fafaf8",
  foreground: "#1a1a1a",
  card: "#ffffff",
  mutedForeground: "#6b6b6b",
  border: "#e8e8e6",
};

export const BURNCALC_LAUNCH_DURATION = 210;
export const BURNCALC_LAUNCH_FPS = 30;
export const BURNCALC_LAUNCH_SIZE = { width: 1280, height: 720 };

export function BurncalcLaunchComposition() {
  return (
    <AbsoluteFill style={{ backgroundColor: "#f5ede4" }}>
      <Sequence durationInFrames={72}>
        <AbsoluteFill
          style={{
            alignItems: "center",
            justifyContent: "center",
            padding: 48,
          }}
        >
          <TextReveal
            text="Know your burn. Know your runway."
            fontSize={48}
            fontWeight={600}
            theme={burncalcSnapTheme}
            mode="light"
            fontFamily="Satoshi"
          />
        </AbsoluteFill>
      </Sequence>
      <Sequence from={60} durationInFrames={150}>
        <LaptopFrame
          entrance="open"
          floatLoop
          mode="light"
          theme={burncalcSnapTheme}
          fontFamily="Satoshi"
          notchLabel="BurnCalc · metrics live"
          scale={0.88}
        >
          <BurncalcRemotionScreen />
        </LaptopFrame>
      </Sequence>
    </AbsoluteFill>
  );
}
