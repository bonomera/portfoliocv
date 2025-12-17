import { projects } from "@/lib/constants";

export default function Projects() {
  return (
    <section className="projects" id="projects">
      <h2 className="section-title">
        Projets <span className="accent">récents</span>
      </h2>
      <div className="projects-grid">
        {projects.map((project) => (
          <div key={project.id} className="project-card">
            <h3>{project.title}</h3>
            <p>{project.description}</p>
            <div className="project-tags">
              {project.tags.map((tag) => (
                <span key={tag} className="tag">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
