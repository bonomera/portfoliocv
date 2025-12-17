'use client';

import { contactLinks } from "@/lib/constants";

export default function Contact() {
  return (
    <section className="contact" id="contact">
      <h2>Travaillons ensemble</h2>
      <p>Vous avez un projet en tête ? Je serais ravi de discuter de vos idées.</p>
      <div className="contact-links">
        {contactLinks.map((link) => (
          <a
            key={link.id}
            href={link.href}
            className="contact-link"
            target="_blank"
            rel="noopener noreferrer"
          >
            {link.label}
          </a>
        ))}
      </div>
    </section>
  );
}
