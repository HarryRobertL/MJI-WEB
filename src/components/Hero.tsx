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
          <p className="eyebrow animate-in fade-in slide-in-from-bottom-4 duration-700 fill-mode-both">
            Physical security and risk consultancy
          </p>
          <h1
            id="hero-title"
            className="animate-in fade-in slide-in-from-bottom-4 duration-700 delay-100 fill-mode-both"
          >
            Protect people, assets, and <span className="accent-word">operations.</span>
          </h1>
          <p className="lead animate-in fade-in slide-in-from-bottom-4 duration-700 delay-200 fill-mode-both">
            McKenzie Jones International provides strategic, operational, and
            tactical security for organisations and individuals exposed to
            elevated threat environments, geopolitical instability, and complex
            risk profiles.
          </p>
          <div className="hero-actions animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300 fill-mode-both">
            <a className="btn btn-primary" href="#services">
              View services
            </a>
            <a className="btn btn-secondary" href="#contact">
              Contact the firm
            </a>
          </div>
        </div>

        <div className="hero-stage animate-in fade-in zoom-in-95 duration-700 delay-200 fill-mode-both">
          <RotatingEarth width={360} height={360} className="hero-globe" />
        </div>
      </div>

      <div className="wrap">
        <nav className="path-panel" aria-label="Service paths">
          <ol className="path-list">
            {services.map((service, index) => (
              <li
                key={service.id}
                className="animate-in fade-in slide-in-from-bottom-4 duration-700 fill-mode-both"
                style={{ animationDelay: `${400 + index * 75}ms` }}
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
