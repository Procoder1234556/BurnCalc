"use client";

import { useRive } from "@rive-app/react-canvas";
import { cn } from "@/lib/utils";

const RIVE_SRC =
  "https://public.rive.app/community/runtime-files/2195-4346-avatar-pack-use-case.riv";

/** rive.app–style interactive accent (falls back to a calm pulse if blocked) */
export function RiveAccent({ className }: { className?: string }) {
  const { RiveComponent, rive } = useRive({
    src: RIVE_SRC,
    autoplay: true,
  });

  if (!rive) {
    return (
      <div
        className={cn(
          "size-14 rounded-full bg-surface-muted motion-safe:animate-pulse",
          className,
        )}
        aria-hidden
      />
    );
  }

  return (
    <div className={cn("size-14", className)} aria-hidden>
      <RiveComponent className="size-full" />
    </div>
  );
}
