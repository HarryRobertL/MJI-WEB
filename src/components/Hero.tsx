import { services } from "../content";
import RotatingEarth from "./ui/wireframe-dotted-globe";

export function Hero() {
  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="wrap hero-grid">
        <div className="hero-copy">
          <p className="eyebrow">Physical security and risk consultancy</p>
          <h1 id="hero-title">
            Protect people, assets, and <span className="accent-word">operations.</span>
          </h1>
          <p className="lead">
            McKenzie Jones International provides strategic, operational, and
            tactical security for organisations and individuals exposed to
            elevated threat environments, geopolitical instability, and complex
            risk profiles.
          </p>
          <div className="hero-actions">
            <a className="btn btn-primary" href="#services">
              View services
            </a>
            <a className="btn btn-secondary" href="#contact">
              Contact the firm
            </a>
          </div>
        </div>

        <div className="hero-stage">
          <RotatingEarth width={360} height={360} className="hero-globe" />
        </div>
      </div>

      <div className="wrap">
        <nav className="path-panel" aria-label="Service paths">
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
    </section>
  );
}
