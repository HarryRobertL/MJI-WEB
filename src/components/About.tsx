import { audiences, credentials, personnel, values } from "../content";
import { useReveal } from "../useReveal";

export function About() {
  const introRef = useReveal<HTMLDivElement>();

  return (
    <section className="section" id="about" tabIndex={-1} aria-labelledby="about-title">
      <div className="wrap about-grid">
        <div ref={introRef} className="reveal">
          <p className="eyebrow">The firm</p>
          <h2 id="about-title">About McKenzie Jones INTL</h2>
        </div>
        <div className="about-copy">
          <p>
            McKenzie Jones International is a specialist physical security and
            risk consultancy operating at the highest end of the market. The
            firm employs military and former government veterans with
            operational experience in hostile, denied, and sensitive
            environments.
          </p>
          <p>
            The work combines intelligence-led risk analysis, operational
            excellence, discreet white-glove service, and rapid deployment.
            The aim is to be the most trusted specialist security risk
            consultancy for high-risk and complex global operations.
          </p>
          <ul className="audience">
            {audiences.map((item) => (
              <li key={item.title}>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </li>
            ))}
          </ul>
          <div>
            <h3>Core values</h3>
            <ul className="places">
              {values.map((value) => (
                <li key={value}>{value}</li>
              ))}
            </ul>
          </div>
          <div>
            <h3>Personnel</h3>
            <ul className="scope">
              {personnel.map((person) => (
                <li key={person}>{person}</li>
              ))}
            </ul>
          </div>
          {credentials.length > 0 ? (
            <div>
              <h3>Credentials</h3>
              <ul className="scope">
                {credentials.map((item) => (
                  <li key={item.title}>
                    <strong>{item.title}</strong>
                    {item.detail ? ` — ${item.detail}` : null}
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
