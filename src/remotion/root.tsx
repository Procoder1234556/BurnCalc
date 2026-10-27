import { Composition } from "remotion";
import {
  BURNCALC_LAUNCH_DURATION,
  BURNCALC_LAUNCH_FPS,
  BURNCALC_LAUNCH_SIZE,
  BurncalcLaunchComposition,
} from "@/remotion/burncalc-launch-composition";

export const RemotionRoot = () => (
  <Composition
    id="BurnCalcLaunch"
    component={BurncalcLaunchComposition}
    durationInFrames={BURNCALC_LAUNCH_DURATION}
    fps={BURNCALC_LAUNCH_FPS}
    width={BURNCALC_LAUNCH_SIZE.width}
    height={BURNCALC_LAUNCH_SIZE.height}
  />
);
