import { contact } from "../content";

export function Operations() {
  return (
    <section className="section" id="contact" tabIndex={-1} aria-labelledby="contact-title">
      <div className="wrap">
        <div className="section-intro center animate-in fade-in slide-in-from-bottom-4 duration-700 fill-mode-both">
          <p className="eyebrow">Mayfair</p>
          <h2 id="contact-title">Contact</h2>
          <p>
            For more information, write or call the London office. Service
            delivery is tailored to each client.
          </p>
        </div>
        <div className="stats-frame contact-frame">
          <div className="stats-cell">
            <p className="contact-label">Office</p>
            <address>
              {contact.address.map((line) => (
                <span key={line}>{line}</span>
              ))}
            </address>
          </div>
          <div className="stats-cell">
            <p className="contact-label">Telephone</p>
            <a className="contact-link" href={contact.phoneHref}>
              {contact.phone}
            </a>
          </div>
          <div className="stats-cell">
            <p className="contact-label">Email</p>
            <a className="contact-link" href={contact.emailHref}>
              {contact.email}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
