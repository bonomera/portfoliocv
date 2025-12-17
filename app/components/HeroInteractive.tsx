'use client';

import { useRef, useState } from 'react';
import Link from "next/link";

export default function HeroInteractive() {
  const coreRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    e.preventDefault();
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !coreRef.current) return;

    const visualContainer = coreRef.current.parentElement;
    if (!visualContainer) return;

    const rect = visualContainer.getBoundingClientRect();
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    // Position relative au centre du container
    const x = e.clientX - rect.left - centerX;
    const y = e.clientY - rect.top - centerY;

    setPosition({ x, y });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    // Retour en douceur à la position initiale
    setPosition({ x: 0, y: 0 });
  };

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
      <div 
        className="hero-visual"
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        <div className="orbital"></div>
        <div className="orbital"></div>
        <div className="orbital"></div>
        <div
          ref={coreRef}
          className="core"
          onMouseDown={handleMouseDown}
          style={{
            transform: `translate(${position.x}px, ${position.y}px)`,
            transition: isDragging ? 'none' : 'transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)',
            cursor: isDragging ? 'grabbing' : 'grab',
          }}
        ></div>
      </div>
    </section>
  );
}
