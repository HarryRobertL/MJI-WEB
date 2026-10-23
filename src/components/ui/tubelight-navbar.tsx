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
  cta?: { href: string; label: string };
}

export function TubeLightNavbar({
  items,
  activeHref = "",
  className,
  placement = "inline",
  cta,
}: TubeLightNavbarProps) {
  const [reduceMotion, setReduceMotion] = useState(false);
  const [idle, setIdle] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduceMotion(media.matches);
    sync();
    media.addEventListener("change", sync);
    return () => media.removeEventListener("change", sync);
  }, []);

  const isBottom = placement === "bottom";

  useEffect(() => {
    if (!isBottom) {
      setIdle(false);
      return;
    }

    const mobile = window.matchMedia("(max-width: 991px)");
    let timer = 0;

    const wake = () => {
      window.clearTimeout(timer);
      if (mobile.matches) {
        setIdle(false);
        return;
      }
      setIdle(false);
      timer = window.setTimeout(() => setIdle(true), 700);
    };

    wake();
    window.addEventListener("scroll", wake, { passive: true });
    window.addEventListener("pointermove", wake, { passive: true });
    window.addEventListener("keydown", wake);
    mobile.addEventListener("change", wake);

    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("scroll", wake);
      window.removeEventListener("pointermove", wake);
      window.removeEventListener("keydown", wake);
      mobile.removeEventListener("change", wake);
    };
  }, [isBottom]);

  return (
    <nav
      aria-label="Primary"
      className={cn(
        isBottom &&
          "pointer-events-none fixed inset-x-0 bottom-0 z-50 flex justify-center px-3 pb-[calc(16px+env(safe-area-inset-bottom))]",
        className,
      )}
    >
      <div
        className={cn(
          "pointer-events-auto flex items-center rounded-full border border-[color-mix(in_srgb,var(--slate)_28%,var(--paper))] bg-[color-mix(in_srgb,var(--paper)_92%,transparent)] shadow-[0_10px_32px_color-mix(in_srgb,var(--ink)_12%,transparent)] backdrop-blur-md",
          isBottom
            ? "max-w-[calc(100vw-24px)] gap-0.5 p-1 sm:gap-1.5 sm:p-1.5 min-[992px]:gap-2 min-[992px]:p-2 transition-opacity duration-1000 ease-[cubic-bezier(0.22,1,0.36,1)]"
            : "gap-1 p-1 w-full min-[992px]:w-auto",
          isBottom && idle && "opacity-[0.65] hover:opacity-100 focus-within:opacity-100",
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
                "relative z-0 flex items-center justify-center rounded-full font-semibold no-underline transition-colors",
                "text-[var(--ink)]/75 hover:text-[var(--ink)]",
                isActive && "text-[var(--ink)]",
                isBottom
                  ? "min-h-10 px-2.5 text-[13px] sm:min-h-12 sm:px-3.5 sm:text-[15px] min-[992px]:min-h-13 min-[992px]:px-5"
                  : "min-h-11 flex-1 px-3 py-2 text-sm min-[992px]:flex-none min-[992px]:px-5",
              )}
            >
              {isBottom ? (
                <>
                  <span className="hidden min-[640px]:inline">{item.label}</span>
                  <span className="inline-flex min-[640px]:hidden">
                    <Icon size={18} strokeWidth={2.25} aria-hidden="true" />
                    <span className="sr-only">{item.label}</span>
                  </span>
                </>
              ) : (
                <>
                  <span className="hidden min-[992px]:inline">{item.label}</span>
                  <span className="inline-flex min-[992px]:hidden">
                    <Icon size={18} strokeWidth={2.25} aria-hidden="true" />
                    <span className="sr-only">{item.label}</span>
                  </span>
                </>
              )}
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
                  <span className="absolute -top-1 left-1/2 h-1 w-8 -translate-x-1/2 rounded-t-full bg-[var(--signal)]">
                    <span className="absolute -top-2 -left-2 h-6 w-12 rounded-full bg-[var(--signal)]/30 blur-md" />
                    <span className="absolute -top-1 left-0 h-5 w-8 rounded-full bg-[var(--signal)]/25 blur-md" />
                  </span>
                </motion.span>
              ) : null}
            </a>
          );
        })}
        {cta ? (
          <a
            href={cta.href}
            aria-label={cta.label}
            className={cn(
              "inline-flex shrink-0 items-center justify-center rounded-full bg-[var(--ink)] font-semibold text-[var(--signal)] no-underline transition-colors hover:bg-[var(--signal)] hover:text-[var(--ink)]",
              isBottom
                ? "min-h-10 px-3 text-[13px] sm:min-h-12 sm:px-4 sm:text-[15px] min-[992px]:min-h-13 min-[992px]:px-5"
                : "min-h-11 px-4 text-sm min-[992px]:px-5",
            )}
          >
            <span className="max-[479px]:hidden">{cta.label}</span>
            <span className="min-[480px]:hidden">Enquire</span>
          </a>
        ) : null}
      </div>
    </nav>
  );
}
