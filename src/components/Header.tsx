import { navItems } from "../content";
import { useHash } from "../useHash";

export function Header() {
  const hash = useHash();

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
          <img
            src="/mji-logo-300w.png"
            alt="McKenzie Jones International Ltd"
            width={300}
            height={114}
            className="brand-mark"
          />
        </a>

        <nav className="nav" aria-label="Primary">
          <ul className="nav-list">
            {navItems.map((item) => (
              <li key={item.href}>
                <a
                  className="nav-link"
                  href={item.href}
                  aria-current={hash === item.href ? "location" : undefined}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
          <a className="btn btn-primary nav-cta" href="#services">
            View services
          </a>
        </nav>
      </div>
    </header>
  );
}
