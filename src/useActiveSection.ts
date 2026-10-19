import { useEffect, useState } from "react";
import { navItems } from "./content";

export function useActiveSection() {
  const [activeHref, setActiveHref] = useState("");

  useEffect(() => {
    const sections = navItems
      .map((item) => document.getElementById(item.href.slice(1)))
      .filter((section): section is HTMLElement => Boolean(section));

    if (sections.length === 0) {
      return;
    }

    const ratios = new Map<string, number>();

    const updateActive = () => {
      let bestId = "";
      let bestRatio = 0;

      for (const [id, ratio] of ratios) {
        if (ratio > bestRatio) {
          bestRatio = ratio;
          bestId = id;
        }
      }

      if (bestId) {
        setActiveHref(`#${bestId}`);
        return;
      }

      const nearTop = sections.find((section) => {
        const rect = section.getBoundingClientRect();
        return rect.top <= 140 && rect.bottom > 140;
      });
      setActiveHref(nearTop ? `#${nearTop.id}` : "");
    };

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          ratios.set(entry.target.id, entry.isIntersecting ? entry.intersectionRatio : 0);
        }
        updateActive();
      },
      {
        rootMargin: "-20% 0px -55% 0px",
        threshold: [0, 0.15, 0.35, 0.55, 0.75, 1],
      },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return activeHref;
}
