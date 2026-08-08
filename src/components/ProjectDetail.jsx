import { FiTool, FiStar, FiExternalLink } from "react-icons/fi";
import { BsCheckLg, BsLightbulb } from "react-icons/bs";
import { FaGithub } from "react-icons/fa";

function ProjectDetail({ isOpen, project, onClose }) {
  if (!isOpen || !project) return null;

  return (
    <div className="project-detail-overlay" onClick={onClose}>
      <div className="project-detail-modal" onClick={(e) => e.stopPropagation()}>
        <button className="project-detail-close" onClick={onClose} aria-label="Close project details">
          ✕
        </button>

        <div className="project-detail-image-wrap">
          <img src={project.image} alt={project.title} className="project-detail-image" />
        </div>

        <div className="project-detail-body">
          <div className="project-detail-header">
            <span className="proj-title">{project.title}</span>
            {project.featured && <span className="featured-badge">Featured</span>}
          </div>

          <p className="proj-desc">{project.description}</p>

          {/* TECH STACK */}
          <div className="project-detail-section">
            <div className="info-label">
              <FiTool size={13} color="#E76F00" /> Tech Stack
            </div>
            <div className="stack-row">
              {project.tech.map(({ label, icon }) => (
                <span className="stack-tag" key={label}>
                  <span className="stack-logo">{icon}</span>
                  {label}
                </span>
              ))}
            </div>
          </div>

          {/* FEATURES */}
          <div className="project-detail-section">
            <div className="info-label">
              <FiStar size={13} color="#F7D358" /> Key Features
            </div>
            <div className="info-val">
              {project.features.map((feat) => (
                <span className="check-item" key={feat}>
                  <span className="check-mark">
                    <BsCheckLg size={11} color="#3FB950" />
                  </span>
                  {feat}
                </span>
              ))}
            </div>
          </div>

          {/* LEARNINGS */}
          <div className="project-detail-section project-detail-section-last">
            <div className="info-label">
              <BsLightbulb size={13} color="#FFD700" /> What I Learned
            </div>
            <div className="info-val">{project.learnings}</div>
          </div>

          {/* BUTTONS */}
          <div className="project-detail-actions">
            {project.github && (
              <button
                className="btn-outline"
                onClick={() => {
                  const win = window.open(project.github, "_blank");
                  if (win) win.opener = null;
                }}
                style={{ fontSize: "12px", padding: "7px 14px", display: "flex", alignItems: "center", gap: "5px" }}
              >
                <FaGithub size={13} /> GitHub
              </button>
            )}

            {project.demo && (
              <button
                className="btn-primary"
                onClick={() => {
                  const win = window.open(project.demo, "_blank");
                  if (win) win.opener = null;
                }}
                style={{ fontSize: "12px", padding: "7px 14px", display: "flex", alignItems: "center", gap: "5px" }}
              >
                <FiExternalLink size={12} /> Live Demo
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProjectDetail;