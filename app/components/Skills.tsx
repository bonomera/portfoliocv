import { skills } from "@/lib/constants";

export default function Skills() {
  return (
    <section className="skills" id="skills">
      <h2 className="section-title">
        Compétences <span className="accent">techniques</span>
      </h2>
      <div className="skills-grid">
        {skills.map((skill) => (
          <div key={skill.id} className="skill-item">
            <h4>{skill.category}</h4>
            <p>{skill.items}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
