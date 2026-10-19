import { Briefcase, Crosshair, GraduationCap, Radar, Shield, Siren, type LucideIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { services } from "../content";
import { useHash } from "../useHash";
import { FeatureCard } from "./ui/feature-card";

const icons: Record<(typeof services)[number]["id"], LucideIcon> = {
  intelligence: Radar,
  "protective-services": Shield,
  consultancy: Briefcase,
  training: GraduationCap,
  "crisis-response": Siren,
  specialised: Crosshair,
};

function serviceIdFromHash(hash: string) {
  const id = hash.replace("#", "");
  return services.some((service) => service.id === id) ? id : "";
}

export function Services() {
  const hash = useHash();
  const [open, setOpen] = useState<Record<string, boolean>>(() => {
    const id = serviceIdFromHash(window.location.hash);
    return id ? { [id]: true } : {};
  });

  useEffect(() => {
    const id = serviceIdFromHash(hash);
    if (!id) {
      return;
    }

    setOpen((current) => (current[id] ? current : { ...current, [id]: true }));
  }, [hash]);

  return (
    <section className="section" id="services" tabIndex={-1} aria-labelledby="services-title">
      <div className="wrap">
        <div className="section-intro center">
          <p className="eyebrow">Services portfolio</p>
          <h2 id="services-title">Intelligence-led security services</h2>
          <p>
            Delivery is bespoke. Plans and advice are designed for each client,
            from protective operations to crisis response and training.
          </p>
        </div>

        <div className="feature-grid">
          {services.map((service) => {
            const Icon = icons[service.id];
            const isOpen = Boolean(open[service.id]);

            return (
              <FeatureCard key={service.id}>
                <article id={service.id} className="feature-body" aria-labelledby={`${service.id}-title`}>
                  <div className="feature-icon">
                    <Icon aria-hidden className="size-5" strokeWidth={1.5} />
                    <span>{service.number}</span>
                  </div>
                  <h3 id={`${service.id}-title`}>{service.title}</h3>
                  <p>{service.summary}</p>
                  <div id={`${service.id}-detail`} hidden={!isOpen}>
                    <p>{service.detail}</p>
                    <ul className="scope">
                      {service.scope.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </div>
                  <a
                    className="more"
                    href={`#${service.id}`}
                    aria-expanded={isOpen}
                    aria-controls={`${service.id}-detail`}
                    onClick={(event) => {
                      event.preventDefault();
                      setOpen((current) => ({
                        ...current,
                        [service.id]: !current[service.id],
                      }));
                    }}
                  >
                    {isOpen ? "Read less" : "Read more"}
                    <svg className="chevron" viewBox="0 0 16 16" aria-hidden="true">
                      <path d="M6 3l5 5-5 5" fill="none" stroke="currentColor" strokeWidth="1.75" />
                    </svg>
                  </a>
                </article>
              </FeatureCard>
            );
          })}
        </div>
      </div>
    </section>
  );
}
