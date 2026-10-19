import { useEffect, useState } from "react";
import { navItems } from "../content";
import { useHash } from "../useHash";

export function Header() {
  const hash = useHash();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, [hash]);

  useEffect(() => {
    if (!open) {
      return;
    }

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
      }
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className="site-header" id="top">
      <div className="wrap header-bar">
        <a className="brand" href="#top">
          <img
            src="/mji-logo-300w.png"
            alt="McKenzie Jones International Ltd"
            width={300}
            height={114}
            className="brand-mark"
          />
        </a>

        <button
          type="button"
          className="nav-toggle"
          aria-expanded={open}
          aria-controls="site-nav"
          onClick={() => setOpen((value) => !value)}
        >
          {open ? "Close" : "Menu"}
        </button>

        <nav id="site-nav" className={open ? "nav is-open" : "nav"} aria-label="Primary">
          <ul className="nav-list">
            {navItems.map((item) => (
              <li key={item.href}>
                <a
                  className="nav-link"
                  href={item.href}
                  aria-current={hash === item.href ? "location" : undefined}
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
          <a className="btn btn-primary" href="#services" onClick={() => setOpen(false)}>
            View services
          </a>
        </nav>
      </div>
    </header>
  );
}
