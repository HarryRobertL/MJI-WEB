import type { ComponentProps, PointerEvent } from "react";
import { cn } from "@/lib/utils";

/** Corner crosshair from 21st Feature Grid Spotlight Cards (MIT, Mohammad Shehadeh). */
function CrossDecor({ position }: { position: "top-start" | "bottom-end" }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1"
      strokeLinecap="round"
      className={cn(
        "pointer-events-none absolute z-10 size-3.5 text-foreground/40",
        position === "top-start" &&
          "start-0 top-0 -translate-x-1/2 -translate-y-1/2",
        position === "bottom-end" &&
          "end-0 bottom-0 translate-x-1/2 translate-y-1/2",
      )}
    >
      <path d="M5 12h14" />
      <path d="M12 5v14" />
    </svg>
  );
}

export function FeatureCard({ className, children, ...props }: ComponentProps<"div">) {
  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    event.currentTarget.style.setProperty("--mx", `${event.clientX - rect.left}px`);
    event.currentTarget.style.setProperty("--my", `${event.clientY - rect.top}px`);
  };

  return (
    <div
      onPointerMove={handlePointerMove}
      className={cn("feature-card group relative flex h-full flex-col gap-6 px-6 pt-8 pb-6", className)}
      {...props}
    >
      <div aria-hidden className="feature-spotlight" />
      <div className="feature-rail feature-rail-y feature-rail-start" />
      <div className="feature-rail feature-rail-y feature-rail-end" />
      <div className="feature-rail feature-rail-x feature-rail-top" />
      <div className="feature-rail feature-rail-x feature-rail-bottom" />
      <CrossDecor position="top-start" />
      <CrossDecor position="bottom-end" />
      {children}
    </div>
  );
}
