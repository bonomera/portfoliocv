'use client';

export default function Navigation() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav>
      <a className="logo" href="/">
        Portfolio
      </a>
      <ul className="nav-links">
        <li>
          <a onClick={() => scrollToSection('projects')}>Projets</a>
        </li>
        <li>
          <a onClick={() => scrollToSection('skills')}>Compétences</a>
        </li>
        <li>
          <a onClick={() => scrollToSection('contact')}>Contact</a>
        </li>
        <li>
          <a href="/contact">Forum</a>
        </li>
      </ul>
    </nav>
  );
}