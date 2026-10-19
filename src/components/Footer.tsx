import { company, contact, navItems } from "../content";

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="wrap footer-grid">
        <div>
          <img
            src="/mji-logo-1200w.png"
            alt="McKenzie Jones International Ltd"
            width={1200}
            height={456}
            className="footer-mark"
          />
          <p>
            Specialist physical security and risk consultancy for high-risk and
            complex global operations.
          </p>
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
            <li>
              <a className="more" href="/privacy.html">
                Privacy
              </a>
            </li>
          </ul>
        </nav>
      </div>

      <div className="wrap footer-legal">
        <p>
          {company.registeredName}. Registered in {company.placeOfRegistration}.
          Company number {company.companyNumber}.
        </p>
        <p>
          Registered office: {company.registeredOffice.join(", ")}.
        </p>
        <p>
          <a href={contact.emailHref}>{contact.email}</a>
          {" · "}
          <a href={contact.phoneHref}>{contact.phone}</a>
          {" · "}
          <a href="/privacy.html">Privacy policy</a>
        </p>
      </div>

      <div className="wrap footer-base">
        <p>© {new Date().getFullYear()} McKenzie Jones INTL. All rights reserved.</p>
      </div>
    </footer>
  );
}
