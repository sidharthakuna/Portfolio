function Projects() {
  return (
    <section
      id="projects"
      className="section"
      style={{ paddingTop: "0" }}
    >
      <div className="section-title">
        <span className="title-icon">📁</span>
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

                <span
                  style={{
                    fontSize: "10px",
                    color: "#484F58",
                    marginLeft: "auto",
                  }}
                >
                  AI Noise Remover
                </span>
              </div>

              <div className="mock-body">

                <div
                  style={{
                    textAlign: "center",
                    marginBottom: "10px",
                  }}
                >
                  <div
                    style={{
                      fontSize: "12px",
                      fontWeight: "600",
                      color: "#E6EDF3",
                      marginBottom: "3px",
                    }}
                  >
                    AI Noise Remover
                  </div>

                  <div
                    style={{
                      fontSize: "10px",
                      color: "#8B949E",
                    }}
                  >
                    Upload audio files and remove
                    background noise
                  </div>
                </div>

                <div
                  style={{
                    border: "2px dashed #30363D",
                    borderRadius: "6px",
                    padding: "16px",
                    textAlign: "center",
                  }}
                >
                  <div style={{ fontSize: "22px" }}>
                    🎵
                  </div>

                  <div
                    style={{
                      fontSize: "10px",
                      color: "#8B949E",
                      marginTop: "4px",
                    }}
                  >
                    Drag & Drop Audio File
                  </div>

                  <div
                    style={{
                      fontSize: "9px",
                      color: "#484F58",
                    }}
                  >
                    or click to browse
                  </div>
                </div>

                <button
                  style={{
                    background: "#1F6FEB",
                    color: "#fff",
                    border: "none",
                    width: "100%",
                    padding: "7px",
                    borderRadius: "5px",
                    marginTop: "10px",
                    fontSize: "11px",
                    cursor: "pointer",
                  }}
                >
                  Choose File
                </button>

                <div
                  style={{
                    textAlign: "center",
                    marginTop: "8px",
                    fontSize: "10px",
                    color: "#58A6FF",
                  }}
                >
                  ↓ Download Cleaned Audio
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT CONTENT */}
          <div className="proj-body">

            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                marginBottom: "10px",
              }}
            >
              <span className="proj-title">
                AI Noise Remover
              </span>

              <span className="featured-badge">
                Featured
              </span>
            </div>

            <p className="proj-desc">
              A web application that uses AI-powered
              noise reduction to clean audio files.
              Users can upload recordings, process
              them through the backend, and download
              the cleaned version.
            </p>

            {/* TECH STACK */}
            <div style={{ marginBottom: "12px" }}>
              <div className="info-label">
                🔧 Tech Stack
              </div>

              <div className="stack-row">
                <span className="stack-tag">Java</span>
                <span className="stack-tag">Spring Boot</span>
                <span className="stack-tag">Python</span>
                <span className="stack-tag">MySQL</span>
                <span className="stack-tag">HTML</span>
                <span className="stack-tag">CSS</span>
                <span className="stack-tag">JavaScript</span>
                <span className="stack-tag">Docker</span>
              </div>
            </div>

            {/* FEATURES */}
            <div style={{ marginBottom: "12px" }}>
              <div className="info-label">
                ⭐ Key Features
              </div>

              <div className="info-val">

                <span className="check-item">
                  <span className="check-mark">✓</span>
                  Upload Audio Files
                </span>

                <span className="check-item">
                  <span className="check-mark">✓</span>
                  AI Noise Reduction
                </span>

                <span className="check-item">
                  <span className="check-mark">✓</span>
                  Download Clean Audio
                </span>

                <span className="check-item">
                  <span className="check-mark">✓</span>
                  REST API Integration
                </span>

                <span className="check-item">
                  <span className="check-mark">✓</span>
                  File Processing
                </span>
              </div>
            </div>

            {/* LEARNINGS */}
            <div style={{ marginBottom: "20px" }}>
              <div className="info-label">
                💡 What I Learned
              </div>

              <div className="info-val">
                Spring Boot development,
                REST APIs, backend integration
                with Python, file handling,
                Docker basics, and deployment
                workflows.
              </div>
            </div>

            {/* BUTTONS */}
            <div
              style={{
                display: "flex",
                gap: "8px",
              }}
            >
              <button
                className="btn-outline"
                onClick={()=>
                  window.open(
                    "https://github.com/sidharthakuna",
                    "_blank" 
                  )
                }
                style={{
                  fontSize: "12px",
                  padding: "7px 14px",
                }}
              >
                ⚙ GitHub
              </button>

              <button
                className="btn-primary"
                onClick={()=>
                  window.open(
                    "https://ai-backgroundnoice-remover.onrender.com",
                    "_blank"
                  )
                }
                style={{
                  fontSize: "12px",
                  padding: "7px 14px",
                }}
              >
                ↗ Live Demo
              </button>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}

export default Projects;