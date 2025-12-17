import Navigation from "./components/Navigation";
import HeroInteractive from "./components/HeroInteractive";
import Projects from "./components/Projects";
import Skills from "./components/Skills";
import Contact from "./components/Contact";

export default function Home() {
  return (
    <div className="container">
      <Navigation />
      <HeroInteractive />
      <Projects />
      <Skills />
      <Contact />
    </div>
  );
}