import { About } from "./components/About";
import { Preloader } from "./components/Preloader";
import { Coverage } from "./components/Coverage";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { Operations } from "./components/Operations";
import { Services } from "./components/Services";
import { TubeLightNavbar } from "./components/ui/tubelight-navbar";
import { primaryNav } from "./primaryNav";
import { useActiveSection } from "./useActiveSection";

export default function App() {
  const activeHref = useActiveSection();

  return (
    <>
      <Preloader />
      <a className="skip-link" href="#content">
        Skip to content
      </a>
      <Header />
      <main id="content">
        <Hero />
        <About />
        <Services />
        <Operations />
        <Coverage />
      </main>
      <Footer />
      <TubeLightNavbar
        items={primaryNav}
        activeHref={activeHref}
        placement="bottom"
        cta={{ href: "#enquiry", label: "Send enquiry" }}
      />
    </>
  );
}
