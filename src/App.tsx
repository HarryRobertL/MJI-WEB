import { About } from "./components/About";
import { Preloader } from "./components/Preloader";
import { Coverage } from "./components/Coverage";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { Operations } from "./components/Operations";
import { Services } from "./components/Services";

export default function App() {
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
    </>
  );
}
