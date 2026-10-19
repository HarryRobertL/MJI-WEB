import { type FormEvent, useState } from "react";
import { contact, services } from "../content";

type Status = "idle" | "submitting" | "success" | "error";

const urgencyOptions = [
  { value: "routine", label: "Routine" },
  { value: "48h", label: "Within 48 hours" },
  { value: "immediate", label: "Immediate" },
] as const;

export function EnquiryForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);

    setStatus("submitting");
    setErrorMessage("");

    try {
      const response = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: String(data.get("name") ?? "").trim(),
          email: String(data.get("email") ?? "").trim(),
          organisation: String(data.get("organisation") ?? "").trim(),
          requirement: String(data.get("requirement") ?? "").trim(),
          urgency: String(data.get("urgency") ?? "").trim(),
          message: String(data.get("message") ?? "").trim(),
          company_website: String(data.get("company_website") ?? "").trim(),
          consent: data.get("consent") === "on",
        }),
      });

      if (!response.ok) {
        const payload = (await response.json().catch(() => null)) as
          | { error?: string }
          | null;
        throw new Error(payload?.error || "Unable to send your enquiry.");
      }

      form.reset();
      setStatus("success");
    } catch (error) {
      setStatus("error");
      setErrorMessage(
        error instanceof Error ? error.message : "Unable to send your enquiry.",
      );
    }
  }

  return (
    <div className="enquiry">
      <div className="enquiry-intro">
        <h3>Confidential enquiry</h3>
        <p>
          Share a brief outline of your requirement. Enquiries are handled
          discreetly by the London office.
        </p>
      </div>

      <form className="enquiry-form" onSubmit={onSubmit} noValidate>
        <div className="enquiry-honeypot" aria-hidden="true">
          <label htmlFor="company_website">Company website</label>
          <input
            id="company_website"
            name="company_website"
            type="text"
            tabIndex={-1}
            autoComplete="off"
          />
        </div>

        <div className="enquiry-grid">
          <label className="enquiry-field">
            <span>Name</span>
            <input name="name" type="text" required maxLength={120} autoComplete="name" />
          </label>
          <label className="enquiry-field">
            <span>Email</span>
            <input
              name="email"
              type="email"
              required
              maxLength={160}
              autoComplete="email"
            />
          </label>
          <label className="enquiry-field">
            <span>Organisation</span>
            <input
              name="organisation"
              type="text"
              required
              maxLength={160}
              autoComplete="organization"
            />
          </label>
          <label className="enquiry-field">
            <span>Requirement</span>
            <select name="requirement" required defaultValue="">
              <option value="" disabled>
                Select a service
              </option>
              {services.map((service) => (
                <option key={service.id} value={service.title}>
                  {service.title}
                </option>
              ))}
              <option value="Other">Other</option>
            </select>
          </label>
          <label className="enquiry-field">
            <span>Urgency</span>
            <select name="urgency" required defaultValue="routine">
              {urgencyOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </label>
        </div>

        <label className="enquiry-field">
          <span>Message</span>
          <textarea name="message" required rows={5} maxLength={4000} />
        </label>

        <label className="enquiry-consent">
          <input name="consent" type="checkbox" required />
          <span>
            I agree to McKenzie Jones International processing this enquiry as
            described in the{" "}
            <a href="/privacy.html">privacy policy</a>.
          </span>
        </label>

        <div className="enquiry-actions">
          <button
            className="btn btn-primary"
            type="submit"
            disabled={status === "submitting"}
          >
            {status === "submitting" ? "Sending…" : "Send enquiry"}
          </button>
        </div>

        <div className="enquiry-status" aria-live="polite">
          {status === "success" ? (
            <p className="enquiry-success">
              Thank you. Your enquiry has been sent. We will respond discreetly.
            </p>
          ) : null}
          {status === "error" ? (
            <p className="enquiry-error">
              {errorMessage} If the problem continues, call{" "}
              <a href={contact.phoneHref}>{contact.phone}</a>.
            </p>
          ) : null}
        </div>
      </form>
    </div>
  );
}
