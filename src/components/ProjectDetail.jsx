import { useEffect } from "react";
import { FiTool, FiStar, FiExternalLink, FiX } from "react-icons/fi";
import { BsCheckLg, BsLightbulb } from "react-icons/bs";
import { FaGithub } from "react-icons/fa";

function ProjectDetail({ isOpen, project, onClose }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  if (!isOpen || !project) return null;

  return (
    <div className="project-detail-overlay" onClick={onClose}>
      <div
        className="project-detail-modal"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="project-modal-title"
      >
        <button
          className="project-detail-close"
          onClick={onClose}
          aria-label="Close project details modal"
        >
          <FiX size={18} />
        </button>

        <div className="project-detail-grid">
          {/* LEFT COLUMN — Preview Image & Action Buttons */}
          <div className="project-detail-col-left">
            <div className="project-detail-image-wrap">
              <img
                src={project.image}
                alt={project.title}
                className="project-detail-image"
              />
            </div>

            {/* ACTION BUTTONS (Always visible directly under the image) */}
            <div className="project-detail-actions">
              {project.github && (
                <button
                  className="btn-outline project-modal-btn"
                  onClick={() => {
                    const win = window.open(project.github, "_blank", "noopener,noreferrer");
                    if (win) win.opener = null;
                  }}
                >
                  <FaGithub size={15} />
                  <span>Source Code</span>
                </button>
              )}

              {project.demo && (
                <button
                  className="btn-primary project-modal-btn"
                  onClick={() => {
                    const win = window.open(project.demo, "_blank", "noopener,noreferrer");
                    if (win) win.opener = null;
                  }}
                >
                  <FiExternalLink size={14} />
                  <span>Live Demo</span>
                </button>
              )}
            </div>
          </div>

          {/* RIGHT COLUMN — Details, Tech Stack & Architectural Insights */}
          <div className="project-detail-col-right">
            <div className="project-detail-header">
              <h2 id="project-modal-title" className="proj-title">{project.title}</h2>
              {project.featured && <span className="featured-badge">Featured</span>}
            </div>

            <p className="proj-desc">{project.description}</p>

            {/* TECH STACK */}
            <div className="project-detail-section">
              <div className="info-label">
                <FiTool size={13} color="#38BDF8" />
                <span>Tech Stack</span>
              </div>
              <div className="stack-row">
                {project.tech.map(({ label, icon }) => (
                  <span className="stack-tag" key={label}>
                    <span className="stack-logo">{icon}</span>
                    <span>{label}</span>
                  </span>
                ))}
              </div>
            </div>

            {/* FEATURES */}
            <div className="project-detail-section">
              <div className="info-label">
                <FiStar size={13} color="#F59E0B" />
                <span>Key Architectural Highlights</span>
              </div>
              <div className="feature-grid">
                {project.features.slice(0, 4).map((feat) => (
                  <span className="check-item" key={feat}>
                    <span className="check-mark">
                      <BsCheckLg size={11} color="#10B981" />
                    </span>
                    <span>{feat}</span>
                  </span>
                ))}
              </div>
            </div>

            {/* LEARNINGS */}
            {project.learnings && (
              <div className="project-detail-section project-detail-section-last">
                <div className="info-label">
                  <BsLightbulb size={13} color="#A78BFA" />
                  <span>Engineering Takeaway</span>
                </div>
                <div className="learning-box">{project.learnings}</div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProjectDetail;