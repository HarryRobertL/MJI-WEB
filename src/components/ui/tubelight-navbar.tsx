import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export interface TubeNavItem {
  href: string;
  label: string;
  icon: LucideIcon;
}

interface TubeLightNavbarProps {
  items: readonly TubeNavItem[];
  activeHref?: string;
  className?: string;
  placement?: "inline" | "bottom";
}

export function TubeLightNavbar({
  items,
  activeHref = "",
  className,
  placement = "inline",
}: TubeLightNavbarProps) {
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduceMotion(media.matches);
    sync();
    media.addEventListener("change", sync);
    return () => media.removeEventListener("change", sync);
  }, []);

  return (
    <nav
      aria-label="Primary"
      className={cn(
        placement === "bottom" &&
          "pointer-events-none fixed inset-x-0 bottom-0 z-50 flex justify-center px-4 pb-[calc(12px+env(safe-area-inset-bottom))]",
        className,
      )}
    >
      <div
        className={cn(
          "pointer-events-auto flex items-center gap-1 rounded-full border border-[color-mix(in_srgb,var(--slate)_28%,var(--paper))] bg-[color-mix(in_srgb,var(--paper)_88%,transparent)] p-1 shadow-[0_8px_24px_color-mix(in_srgb,var(--ink)_10%,transparent)] backdrop-blur-md",
          placement === "inline" && "w-full min-[992px]:w-auto",
        )}
      >
        {items.map((item) => {
          const Icon = item.icon;
          const isActive = activeHref === item.href;

          return (
            <a
              key={item.href}
              href={item.href}
              aria-current={isActive ? "location" : undefined}
              className={cn(
                "relative z-0 flex min-h-11 flex-1 items-center justify-center rounded-full px-3 py-2 text-sm font-semibold no-underline transition-colors min-[992px]:flex-none min-[992px]:px-5",
                "text-[var(--ink)]/75 hover:text-[var(--ink)]",
                isActive && "text-[var(--ink)]",
              )}
            >
              <span className="hidden min-[992px]:inline">{item.label}</span>
              <span className="inline-flex min-[992px]:hidden">
                <Icon size={18} strokeWidth={2.25} aria-hidden="true" />
                <span className="sr-only">{item.label}</span>
              </span>
              {isActive ? (
                <motion.span
                  layoutId={reduceMotion ? undefined : "nav-lamp"}
                  className="absolute inset-0 -z-10 rounded-full bg-[color-mix(in_srgb,var(--signal)_16%,var(--paper))]"
                  initial={false}
                  transition={
                    reduceMotion
                      ? { duration: 0 }
                      : { type: "spring", stiffness: 300, damping: 30 }
                  }
                >
                  <span className="absolute -top-1 left-1/2 h-1 w-7 -translate-x-1/2 rounded-t-full bg-[var(--signal)]">
                    <span className="absolute -top-2 -left-2 h-6 w-12 rounded-full bg-[var(--signal)]/30 blur-md" />
                    <span className="absolute -top-1 left-0 h-5 w-7 rounded-full bg-[var(--signal)]/25 blur-md" />
                  </span>
                </motion.span>
              ) : null}
            </a>
          );
        })}
      </div>
    </nav>
  );
}
