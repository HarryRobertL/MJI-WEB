import { Briefcase, Crosshair, GraduationCap, Radar, Shield, Siren, type LucideIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { services } from "../content";
import { useHash } from "../useHash";
import { useReveal } from "../useReveal";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";
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
  const introRef = useReveal<HTMLDivElement>();
  const [open, setOpen] = useState<string[]>(() => {
    const id = serviceIdFromHash(window.location.hash);
    return id ? [id] : [];
  });

  useEffect(() => {
    const id = serviceIdFromHash(hash);
    if (!id) {
      return;
    }

    setOpen((current) => (current.includes(id) ? current : [...current, id]));
  }, [hash]);

  return (
    <section className="section" id="services" tabIndex={-1} aria-labelledby="services-title">
      <div className="wrap">
        <div ref={introRef} className="section-intro center reveal">
          <p className="eyebrow">Services portfolio</p>
          <h2 id="services-title">Intelligence-led security services</h2>
          <p>
            Delivery is bespoke. Plans and advice are designed for each client,
            from protective operations to crisis response and training.
          </p>
        </div>

        <Accordion
          type="multiple"
          value={open}
          onValueChange={setOpen}
          className="feature-grid"
        >
          {services.map((service) => {
            const Icon = icons[service.id];

            return (
              <FeatureCard key={service.id}>
                <AccordionItem value={service.id} className="border-0">
                  <article
                    id={service.id}
                    className="feature-body"
                    aria-labelledby={`${service.id}-title`}
                  >
                    <div className="feature-icon">
                      <Icon aria-hidden className="size-5" strokeWidth={1.5} />
                      <span>{service.number}</span>
                    </div>
                    <h3 id={`${service.id}-title`}>{service.title}</h3>
                    <p>{service.summary}</p>
                    <AccordionContent id={`${service.id}-detail`} className="pb-0">
                      <p>{service.detail}</p>
                      <ul className="scope">
                        {service.scope.map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                    </AccordionContent>
                    <AccordionTrigger className="more mt-auto w-fit flex-none justify-start gap-2 py-0 hover:no-underline [&[data-state=open]_.read-more]:hidden [&[data-state=closed]_.read-less]:hidden [&[data-state=open]>svg]:rotate-90">
                      <span className="read-more">Read more</span>
                      <span className="read-less">Read less</span>
                    </AccordionTrigger>
                  </article>
                </AccordionItem>
              </FeatureCard>
            );
          })}
        </Accordion>
      </div>
    </section>
  );
}
