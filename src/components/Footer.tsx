import { navItems } from "../content";

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="wrap footer-grid">
        <div>
          <img
            src="/mji-logo-300w.png"
            alt="McKenzie Jones International Ltd"
            width={300}
            height={114}
            className="footer-mark"
          />
          <p>Specialist physical security and risk consultancy for high-risk and complex global operations.</p>
        </div>
        <nav aria-label="Footer">
          <ul className="footer-links">
            {navItems.map((item) => (
              <li key={item.href}>
                <a className="more" href={item.href}>
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <div className="wrap footer-base">
        <p>© {new Date().getFullYear()} McKenzie Jones INTL. All rights reserved.</p>
      </div>
    </footer>
  );
}
