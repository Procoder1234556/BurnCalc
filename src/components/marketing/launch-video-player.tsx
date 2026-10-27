"use client";

import { Player } from "@remotion/player";
import {
  BURNCALC_LAUNCH_DURATION,
  BURNCALC_LAUNCH_FPS,
  BURNCALC_LAUNCH_SIZE,
  BurncalcLaunchComposition,
} from "@/remotion/burncalc-launch-composition";

/** snapcn + Remotion launch preview (render MP4 with `npm run video:render`) */
export function LaunchVideoPlayer({ className }: { className?: string }) {
  return (
    <div
      className={className}
      style={{
        width: "100%",
        aspectRatio: `${BURNCALC_LAUNCH_SIZE.width} / ${BURNCALC_LAUNCH_SIZE.height}`,
      }}
    >
      <Player
        component={BurncalcLaunchComposition}
        durationInFrames={BURNCALC_LAUNCH_DURATION}
        fps={BURNCALC_LAUNCH_FPS}
        compositionWidth={BURNCALC_LAUNCH_SIZE.width}
        compositionHeight={BURNCALC_LAUNCH_SIZE.height}
        style={{ width: "100%", height: "100%" }}
        loop
        autoPlay
        controls
        acknowledgeRemotionLicense
        aria-label="BurnCalc product demo video"
      />
    </div>
  );
}
