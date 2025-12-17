import Link from "next/link";

export default function Hero() {
  return (
    <section className="hero" id="home">
      <div className="hero-content">
        <h1>
          Bonjour, je suis <span className="accent">Raphael</span>
        </h1>
        <p>
          Etudiant en electronique passionné par la conception de puce et le secteur des semiconducteurs.
          Je souhaite etayer mes connaisances.
        </p>
        <Link href="#projects" className="cta-button">
          Découvrir mes projets
        </Link>
      </div>
      <div className="hero-visual">
        <div className="orbital"></div>
        <div className="orbital"></div>
        <div className="orbital"></div>
        <div className="core"></div>
      </div>
    </section>
  );
}
