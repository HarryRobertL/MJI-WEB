import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

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
  return (
    <div
      className={cn("feature-card group relative flex h-full flex-col gap-6 px-6 pt-8 pb-6", className)}
      {...props}
    >
      <CrossDecor position="top-start" />
      <CrossDecor position="bottom-end" />
      {children}
    </div>
  );
}
