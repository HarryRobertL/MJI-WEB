import { useEffect, useState } from "react";
import { contact } from "../content";

export function MobileContactBar() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const hero = document.querySelector(".hero");
    const contactSection = document.getElementById("contact");
    if (!hero || !contactSection) {
      return;
    }

    let heroOut = false;
    let contactIn = false;

    const sync = () => {
      const isMobile = window.matchMedia("(max-width: 991px)").matches;
      setVisible(isMobile && heroOut && !contactIn);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.target === hero) {
            heroOut = !entry.isIntersecting;
          }
          if (entry.target === contactSection) {
            contactIn = entry.isIntersecting;
          }
        }
        sync();
      },
      { threshold: 0.08 },
    );

    observer.observe(hero);
    observer.observe(contactSection);
    window.addEventListener("resize", sync);
    sync();

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", sync);
    };
  }, []);

  if (!visible) {
    return null;
  }

  return (
    <div className="mobile-contact-bar" role="region" aria-label="Quick contact">
      <a className="btn btn-primary" href={contact.phoneHref}>
        Call
      </a>
      <a className="btn btn-secondary" href={contact.emailHref}>
        Email
      </a>
    </div>
  );
}
