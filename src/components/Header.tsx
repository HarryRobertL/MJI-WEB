import { useEffect, useState } from "react";

export function Header() {
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    let lastY = window.scrollY;

    const onScroll = () => {
      const y = Math.max(0, window.scrollY);
      const delta = y - lastY;
      lastY = y;

      if (y < 24) {
        setHidden(false);
        return;
      }

      if (delta > 6) {
        setHidden(true);
      } else if (delta < -6) {
        setHidden(false);
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`site-header${hidden ? " is-away" : ""}`} id="top">
      <div className="wrap header-bar">
        <a
          className="brand"
          href="#top"
          onClick={(event) => {
            event.preventDefault();
            const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
            window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" });
            if (window.location.hash) {
              history.replaceState(null, "", `${window.location.pathname}${window.location.search}`);
            }
          }}
        >
          <span className="brand-mark-wrap">
            <img
              src="/mji-logo-1200w.png"
              alt="McKenzie Jones International Ltd"
              width={1200}
              height={456}
              className="brand-mark brand-mark-base"
            />
            <img
              src="/mji-logo-gold-1200w.png"
              alt=""
              width={1200}
              height={456}
              className="brand-mark brand-mark-gold"
              aria-hidden="true"
            />
          </span>
        </a>
      </div>
    </header>
  );
}
