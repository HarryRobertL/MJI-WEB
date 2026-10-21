import { useActiveSection } from "../useActiveSection";
import { primaryNav } from "../primaryNav";
import { TubeLightNavbar } from "./ui/tubelight-navbar";

export function Header() {
  const activeHref = useActiveSection();

  return (
    <header className="site-header" id="top">
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

        <div className="nav">
          <a className="btn btn-primary nav-cta" href="#services">
            View services
          </a>
        </div>
      </div>

      <TubeLightNavbar items={primaryNav} activeHref={activeHref} placement="bottom" />
    </header>
  );
}
