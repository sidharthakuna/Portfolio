import "../Stylings/Projects.css";
import { useState } from "react";

import { FiLayers } from "react-icons/fi";

// Brand / tech stack icons
import { DiJava, DiMysql, DiDocker, DiHtml5, DiCss3 } from "react-icons/di";
import { SiSpringboot, SiPython, SiJavascript } from "react-icons/si";

import ProjectDetail from "./ProjectDetail";
import aiNoiseRemoverImg from "../assets/ai-noise-remover.png";

// Each project follows this shape — add a new object here to add a new card.
// image: import the screenshot from src/assets, same as aiNoiseRemoverImg above.
const projects = [
  {
    id: "ai-noise-remover",
    title: "AI Noise Remover",
    tagline: "Upload audio, strip background noise, download it clean.",
    description:
      "A web application that uses AI-powered noise reduction to clean audio files. Users can upload recordings, process them through the backend, and download the cleaned version.",
    image: aiNoiseRemoverImg,
    featured: true,
    tech: [
      { label: "Java", icon: <DiJava color="#E76F00" size={14} /> },
      { label: "Spring Boot", icon: <SiSpringboot color="#6DB33F" size={12} /> },
      { label: "Python", icon: <SiPython color="#3776AB" size={12} /> },
      { label: "MySQL", icon: <DiMysql color="#00758F" size={16} /> },
      { label: "HTML", icon: <DiHtml5 color="#E34F26" size={14} /> },
      { label: "CSS", icon: <DiCss3 color="#1572B6" size={14} /> },
      { label: "JavaScript", icon: <SiJavascript color="#F7DF1E" size={12} /> },
      { label: "Docker", icon: <DiDocker color="#2496ED" size={16} /> },
    ],
    features: [
      "Upload Audio Files",
      "AI Noise Reduction",
      "Download Clean Audio",
      "REST API Integration",
      "File Processing",
    ],
    learnings:
      "Spring Boot development, REST APIs, backend integration with Python, file handling, Docker basics, and deployment workflows.",
    github: "https://github.com/sidharthakuna/Ai-BackgroundNoice-Remover",
    demo: "https://ai-backgroundnoice-remover.onrender.com",
  },
];

function Projects() {
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
          <FiLayers size={20} />
        </span>
        Projects
      </div>

      <div className="project-grid">
        {projects.map((proj) => (
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
              {proj.featured && <span className="project-card-featured">Featured</span>}
            </div>

            <div className="project-card-info">
              <div className="project-card-title">{proj.title}</div>
              <div className="project-card-desc">{proj.tagline}</div>

              <div className="project-card-tags">
                {proj.tech.slice(0, 6).map(({ label, icon }) => (
                  <span className="stack-logo" key={label} title={label}>
                    {icon}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      <ProjectDetail
        isOpen={selected !== null}
        project={selected}
        onClose={() => setSelected(null)}
      />
    </section>
  );
}

export default Projects;