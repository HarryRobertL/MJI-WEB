import { useEffect, useState } from "react";
import { Spinner } from "./ui/spinner-1";

const MIN_VISIBLE_MS = 80;
const FADE_MS = 150;

export function Preloader() {
  const [phase, setPhase] = useState<"in" | "out" | "gone">("in");

  useEffect(() => {
    const started = performance.now();
    let frame = 0;
    let hideTimer = 0;

    frame = window.requestAnimationFrame(() => {
      frame = window.requestAnimationFrame(() => {
        const remaining = Math.max(0, MIN_VISIBLE_MS - (performance.now() - started));
        hideTimer = window.setTimeout(() => setPhase("out"), remaining);
      });
    });

    return () => {
      window.cancelAnimationFrame(frame);
      window.clearTimeout(hideTimer);
    };
  }, []);

  if (phase === "gone") {
    return null;
  }

  return (
    <div
      className={phase === "out" ? "preloader is-leaving" : "preloader"}
      role="status"
      aria-live="polite"
      aria-label="Loading"
      style={{ transitionDuration: `${FADE_MS}ms` }}
      onTransitionEnd={(event) => {
        if (event.propertyName === "opacity" && phase === "out") {
          setPhase("gone");
        }
      }}
    >
      <Spinner size={36} />
    </div>
  );
}
