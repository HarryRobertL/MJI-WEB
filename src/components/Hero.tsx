import { services } from "../content";
import RotatingEarth from "./ui/wireframe-dotted-globe";

export function Hero() {
  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="hero-aurora" aria-hidden="true">
        <div className="hero-aurora-glow" />
      </div>

      <div className="wrap hero-grid">
        <div className="hero-copy">
          <h1 id="hero-title" className="hero-enter hero-enter-title">
            Physical security for hostile, denied, and{" "}
            <span className="accent-word hero-enter-accent">sensitive environments.</span>
          </h1>
          <p className="lead hero-enter hero-enter-lead">
            McKenzie Jones International works with corporations, family offices,
            humanitarian teams, investors, and government principals whose
            operations cannot absorb a public failure.
          </p>
          <div className="hero-actions hero-enter hero-enter-actions">
            <a className="btn btn-primary" href="#enquiry">
              <span className="max-[479px]:hidden">Send a confidential enquiry</span>
              <span className="min-[480px]:hidden">Send an enquiry</span>
            </a>
            <a className="btn btn-secondary" href="#services">
              Read the service lines
            </a>
          </div>

          <nav className="path-panel" aria-label="Service lines">
            <ol className="path-list">
              {services.map((service) => (
                <li key={service.id}>
                  <a href={`#${service.id}`}>
                    <span className="path-no">{service.number}</span>
                    <span>{service.title}</span>
                  </a>
                </li>
              ))}
            </ol>
          </nav>
        </div>

        <div className="hero-stage hero-enter hero-enter-stage">
          <RotatingEarth width={480} height={480} className="hero-globe" />
        </div>
      </div>
    </section>
  );
}
