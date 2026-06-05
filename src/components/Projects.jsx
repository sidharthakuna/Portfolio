import "../Stylings/Projects.css";

// UI icons
import {  FiCpu, FiTool, FiStar, FiDownload, FiExternalLink, FiTerminal, FiLayers, FiGrid } from "react-icons/fi";
import { BsCheckLg, BsLightbulb } from "react-icons/bs";
import { FaGithub } from "react-icons/fa";

// Brand / tech stack icons
import { DiJava, DiMysql, DiDocker, DiHtml5, DiCss3 } from "react-icons/di";
import { SiSpringboot, SiPython, SiJavascript } from "react-icons/si";

const techConfig = [
  { label: "Java",        icon: <DiJava        color="#E76F00" size={14} /> },
  { label: "Spring Boot", icon: <SiSpringboot  color="#6DB33F" size={12} /> },
  { label: "Python",      icon: <SiPython      color="#3776AB" size={12} /> },
  { label: "MySQL",       icon: <DiMysql       color="#00758F" size={16} /> },
  { label: "HTML",        icon: <DiHtml5       color="#E34F26" size={14} /> },
  { label: "CSS",         icon: <DiCss3        color="#1572B6" size={14} /> },
  { label: "JavaScript",  icon: <SiJavascript  color="#F7DF1E" size={12} /> },
  { label: "Docker",      icon: <DiDocker      color="#2496ED" size={16} /> },
];

const features = [
  "Upload Audio Files",
  "AI Noise Reduction",
  "Download Clean Audio",
  "REST API Integration",
  "File Processing",
];

function Projects() {
  return (
    <section id="projects" className="section" style={{ paddingTop: "0" }}>
      <div className="section-title">
        <span className="project-icon-box">
          <FiLayers size={20} />
        </span>
        Projects
      </div>

      <div className="project-card">
        <div className="project-inner">

          {/* LEFT PREVIEW */}
          <div className="proj-preview">
            <div className="mock-win">
              <div className="mock-bar">
                <div className="dot-red"></div>
                <div className="dot-yel"></div>
                <div className="dot-grn"></div>
                <span style={{ fontSize: "10px", color: "#484F58", marginLeft: "auto" }}>
                  AI Noise Remover
                </span>
              </div>

              <div className="mock-body">
                <div style={{ textAlign: "center", marginBottom: "10px" }}>
                  <div style={{ fontSize: "12px", fontWeight: "600", color: "#E6EDF3", marginBottom: "3px" }}>
                    AI Noise Remover
                  </div>
                  <div style={{ fontSize: "10px", color: "#8B949E" }}>
                    Upload audio files and remove background noise
                  </div>
                </div>

                <div style={{ border: "2px dashed #30363D", borderRadius: "6px", padding: "16px", textAlign: "center" }}>
                  <div style={{ fontSize: "22px" }}>🎵</div>
                  <div style={{ fontSize: "10px", color: "#8B949E", marginTop: "4px" }}>
                    Drag & Drop Audio File
                  </div>
                  <div style={{ fontSize: "9px", color: "#484F58" }}>
                    or click to browse
                  </div>
                </div>

                <button style={{
                  background: "#1F6FEB", color: "#fff", border: "none",
                  width: "100%", padding: "7px", borderRadius: "5px",
                  marginTop: "10px", fontSize: "11px", cursor: "pointer",
                }}>
                  Choose File
                </button>

                <div style={{ textAlign: "center", marginTop: "8px", fontSize: "10px", color: "#58A6FF", display: "flex", alignItems: "center", justifyContent: "center", gap: "4px" }}>
                  <FiDownload size={11} />
                  Download Cleaned Audio
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT CONTENT */}
          <div className="proj-body">
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "10px" }}>
              <span className="proj-title">AI Noise Remover</span>
              <span className="featured-badge">Featured</span>
            </div>

            <p className="proj-desc">
              A web application that uses AI-powered noise reduction to clean audio files.
              Users can upload recordings, process them through the backend, and download
              the cleaned version.
            </p>

            {/* TECH STACK */}
            <div style={{ marginBottom: "12px" }}>
              <div className="info-label">
                <FiTool size={13} color="#E76F00" /> Tech Stack
              </div>
              <div className="stack-row">
                {techConfig.map(({ label, icon }) => (
                  <span className="stack-tag" key={label}>
                    <span className="stack-logo">{icon}</span>
                    {label}
                  </span>
                ))}
              </div>
            </div>

            {/* FEATURES */}
            <div style={{ marginBottom: "12px" }}>
              <div className="info-label">
                <FiStar size={13} color="#F7D358" /> Key Features
              </div>
              <div className="info-val">
                {features.map((feat) => (
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
            <div style={{ marginBottom: "20px" }}>
              <div className="info-label">
                <BsLightbulb size={13} color="#FFD700" /> What I Learned
              </div>
              <div className="info-val">
                Spring Boot development, REST APIs, backend integration with Python,
                file handling, Docker basics, and deployment workflows.
              </div>
            </div>

            {/* BUTTONS */}
            <div style={{ display: "flex", gap: "8px" }}>
              <button
                className="btn-outline"
                onClick={() => { const win = window.open("https://github.com/sidharthakuna/Ai-BackgroundNoice-Remover", "_blank"); if (win) win.opener = null; }}
                style={{ fontSize: "12px", padding: "7px 14px", display: "flex", alignItems: "center", gap: "5px" }}
              >
                <FaGithub size={13} /> GitHub
              </button>

              <button
                className="btn-primary"
                onClick={() => { const win = window.open("https://ai-backgroundnoice-remover.onrender.com", "_blank"); if (win) win.opener = null; }}
                style={{ fontSize: "12px", padding: "7px 14px", display: "flex", alignItems: "center", gap: "5px" }}
              >
                <FiExternalLink size={12} /> Live Demo
              </button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

export default Projects;