import { useState } from "react";
import { clients } from "../content";

export function Coverage() {
  const [activeId, setActiveId] = useState<(typeof clients)[number]["id"]>(
    clients[0].id,
  );
  const active = clients.find((client) => client.id === activeId) ?? clients[0];

  return (
    <section className="section" id="clients" tabIndex={-1} aria-labelledby="clients-title">
      <div className="wrap">
        <div className="section-intro animate-in fade-in slide-in-from-bottom-4 duration-700 fill-mode-both">
          <p className="eyebrow">Who we serve</p>
          <h2 id="clients-title">Clients</h2>
          <p>
            MJI works with organisations and individuals exposed to elevated
            threat environments, geopolitical instability, and complex risk
            profiles.
          </p>
        </div>

        <div className="coverage-layout">
          <div className="region-list" role="group" aria-label="Client groups">
            {clients.map((client) => {
              const selected = client.id === active.id;
              return (
                <button
                  key={client.id}
                  type="button"
                  className="region-btn"
                  aria-pressed={selected}
                  onClick={() => setActiveId(client.id)}
                >
                  {client.name}
                </button>
              );
            })}
          </div>

          <article className="region-panel" aria-live="polite">
            <h3>{active.name}</h3>
            <p>{active.note}</p>
            <ul className="places">
              {active.places.map((place) => (
                <li key={place}>{place}</li>
              ))}
            </ul>
          </article>
        </div>
      </div>
    </section>
  );
}
