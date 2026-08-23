import { useState } from "react";
import { FiLayers, FiExternalLink, FiGithub } from "react-icons/fi";
import { PROJECTS } from "@/data";
import ProjectDetail from "./ProjectDetail";
import "@/styles/sections/Projects.css";

export function Projects() {
  const [selected, setSelected] = useState(null);

  const openProject = (proj) => setSelected(proj);
  const handleCardKey = (e, proj) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      openProject(proj);
    }
  };

  return (
    <section id="projects" className="section" style={{ paddingTop: "0" }}>
      <div className="section-title">
        <span className="project-icon-box" aria-hidden="true">
          <FiLayers size={18} />
        </span>
        Featured Projects
      </div>

      <div className="project-grid">
        {PROJECTS.map((proj) => (
          <div
            className="project-card"
            key={proj.id}
            onClick={() => openProject(proj)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => handleCardKey(e, proj)}
            aria-label={`View details for ${proj.title}`}
          >
            <div className="project-img-wrap">
              <img src={proj.image} alt={proj.title} className="project-img" />
              {proj.featured && <span className="project-card-featured">Featured Architecture</span>}
              <div className="project-card-overlay">
                <span className="project-card-view-btn">Inspect Architecture &rarr;</span>
              </div>
            </div>

            <div className="project-card-info">
              <div className="project-card-header">
                <h3 className="project-card-title">{proj.title}</h3>
                <div className="project-card-quick-links" onClick={(e) => e.stopPropagation()}>
                  {proj.github && (
                    <a
                      href={proj.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="project-quick-link"
                      aria-label="GitHub Repo"
                      title="View GitHub Repository"
                    >
                      <FiGithub size={15} />
                    </a>
                  )}
                  {proj.demo && (
                    <a
                      href={proj.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="project-quick-link"
                      aria-label="Live Demo"
                      title="Open Live Deployment"
                    >
                      <FiExternalLink size={15} />
                    </a>
                  )}
                </div>
              </div>

              <p className="project-card-desc">{proj.tagline}</p>

              <div className="project-card-stack">
                {proj.tech.map((t) => (
                  <span className="stack-tag-pill" key={t.label}>
                    {t.icon}
                    <span>{t.label}</span>
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Deep-Dive Inspection Modal */}
      <ProjectDetail
        isOpen={Boolean(selected)}
        project={selected}
        onClose={() => setSelected(null)}
      />
    </section>
  );
}

export default Projects;
