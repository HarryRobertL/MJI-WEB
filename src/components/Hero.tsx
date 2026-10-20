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
          <p className="eyebrow hero-enter hero-enter-eyebrow">
            Physical security and risk consultancy
          </p>
          <h1 id="hero-title" className="hero-enter hero-enter-title">
            Protect people, assets, and{" "}
            <span className="accent-word hero-enter-accent">operations.</span>
          </h1>
          <p className="lead hero-enter hero-enter-lead">
            McKenzie Jones International provides strategic, operational, and
            tactical security for organisations and individuals exposed to
            elevated threat environments, geopolitical instability, and complex
            risk profiles.
          </p>
          <div className="hero-actions hero-enter hero-enter-actions">
            <a className="btn btn-primary" href="#services">
              View services
            </a>
            <a className="btn btn-secondary" href="#contact">
              Contact the firm
            </a>
          </div>
        </div>

        <div className="hero-stage hero-enter hero-enter-stage">
          <RotatingEarth width={480} height={480} className="hero-globe" />
        </div>
      </div>

      <div className="wrap">
        <nav className="path-panel" aria-label="Service paths">
          <ol className="path-list">
            {services.map((service, index) => (
              <li
                key={service.id}
                className="hero-enter hero-enter-path"
                style={{ animationDelay: `${560 + index * 70}ms` }}
              >
                <a href={`#${service.id}`}>
                  <span className="path-no">{service.number}</span>
                  <span>{service.title}</span>
                </a>
              </li>
            ))}
          </ol>
        </nav>
      </div>
    </section>
  );
}
