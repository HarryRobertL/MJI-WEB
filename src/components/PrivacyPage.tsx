import { company, contact } from "../content";

export function PrivacyPage() {
  return (
    <>
      <a className="skip-link" href="#privacy-content">
        Skip to content
      </a>
      <header className="site-header" id="top">
        <div className="wrap header-bar privacy-header">
          <a className="brand" href="/">
            <img
              src="/mji-logo-1200w.png"
              alt="McKenzie Jones International Ltd"
              width={1200}
              height={456}
              className="brand-mark"
            />
          </a>
          <a className="btn btn-secondary" href="/">
            Back to site
          </a>
        </div>
      </header>

      <main id="privacy-content" className="section privacy-page">
        <div className="wrap privacy-copy">
          <p className="eyebrow">Legal</p>
          <h1>Privacy policy</h1>
          <p className="lead">
            This notice explains how {company.registeredName} (“MJI”, “we”)
            handles personal data collected through this website and the
            confidential enquiry form. It is intended for UK GDPR compliance and
            should be reviewed by legal counsel before launch.
          </p>

          <h2>Who we are</h2>
          <p>
            {company.registeredName} is registered in {company.placeOfRegistration}
            under company number {company.companyNumber}. Registered office:{" "}
            {company.registeredOffice.join(", ")}.
          </p>
          <p>
            Contact:{" "}
            <a href={contact.emailHref}>{contact.email}</a> /{" "}
            <a href={contact.phoneHref}>{contact.phone}</a>.
          </p>

          <h2>What we collect</h2>
          <p>When you submit a confidential enquiry we collect:</p>
          <ul>
            <li>Name</li>
            <li>Email address</li>
            <li>Organisation</li>
            <li>Requirement type and urgency</li>
            <li>Message content</li>
            <li>Your consent to process the enquiry</li>
          </ul>
          <p>
            Server logs may also record technical data such as IP address and
            browser type for security and reliability.
          </p>

          <h2>Why we process it</h2>
          <p>
            We process enquiry data to respond to your request and, where
            appropriate, to provide security consultancy services. The legal
            basis is typically legitimate interests in responding to business
            enquiries, and consent where you tick the enquiry consent box.
          </p>

          <h2>How long we keep it</h2>
          <p>
            Retention period: [RETENTION PERIOD, e.g. 12 months for unanswered
            enquiries, longer where a client relationship follows]. Replace this
            placeholder before launch.
          </p>

          <h2>Who processes it</h2>
          <p>
            Enquiries are emailed through Resend, a transactional email
            processor. Hosting is provided by Vercel. We do not sell personal
            data.
          </p>

          <h2>Your rights</h2>
          <p>
            Under UK GDPR you may request access, rectification, erasure,
            restriction, or objection, and you may complain to the Information
            Commissioner’s Office. To exercise rights, contact{" "}
            <a href={contact.emailHref}>{contact.email}</a>.
          </p>

          <h2>Updates</h2>
          <p>
            We may update this notice. The version published on this page is the
            current one. Last reviewed: [PRIVACY REVIEW DATE].
          </p>
        </div>
      </main>
    </>
  );
}
