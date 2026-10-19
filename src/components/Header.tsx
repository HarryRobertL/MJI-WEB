import { useState } from "react";
import { navItems } from "../content";
import { useHash } from "../useHash";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";

export function Header() {
  const hash = useHash();
  const [open, setOpen] = useState(false);

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

        <nav className="nav nav-desktop" aria-label="Primary">
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
          <a className="btn btn-primary" href="#services">
            View services
          </a>
        </nav>

        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <button type="button" className="nav-toggle" aria-expanded={open}>
              {open ? "Close" : "Menu"}
            </button>
          </SheetTrigger>
          <SheetContent side="right" className="nav-sheet w-[min(100%,20rem)]">
            <SheetHeader>
              <SheetTitle className="text-left text-base font-semibold tracking-tight">
                Menu
              </SheetTitle>
            </SheetHeader>
            <nav aria-label="Mobile">
              <ul className="nav-list flex flex-col gap-1">
                {navItems.map((item) => (
                  <li key={item.href}>
                    <a
                      className="nav-link block py-2"
                      href={item.href}
                      aria-current={hash === item.href ? "location" : undefined}
                      onClick={() => setOpen(false)}
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
              <a
                className="btn btn-primary mt-4 inline-flex"
                href="#services"
                onClick={() => setOpen(false)}
              >
                View services
              </a>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
