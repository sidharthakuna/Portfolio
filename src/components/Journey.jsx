function Journey() {
  return (
    <section
      id="journey"
      className="section"
      style={{ paddingTop: "0" }}
    >
      <div className="section-title">
        <span className="title-icon">📈</span>
        Journey
      </div>

      <div className="card">
        <div className="timeline-wrap">

          <div className="timeline-track"></div>

          <div className="timeline">

            <div className="t-item">
              <div className="t-dot"></div>

              <div className="t-year">
                2024
              </div>

              <div className="t-title">
                Started Java
              </div>

              <div className="t-desc">
                Began learning Java, OOP concepts,
                loops, collections, and core programming.
              </div>
            </div>

            <div className="t-item">
              <div className="t-dot"></div>

              <div className="t-year">
                2024
              </div>

              <div className="t-title">
                Learned Web Development
              </div>

              <div className="t-desc">
                Built projects using HTML, CSS,
                JavaScript and explored frontend basics.
              </div>
            </div>

            <div className="t-item">
              <div className="t-dot"></div>

              <div className="t-year">
                2025
              </div>

              <div className="t-title">
                Spring Boot Journey
              </div>

              <div className="t-desc">
                Learned REST APIs, Maven,
                backend architecture and databases.
              </div>
            </div>

            <div className="t-item">
              <div className="t-dot"></div>

              <div className="t-year">
                2026
              </div>

              <div className="t-title">
                AI Noise Remover
              </div>

              <div className="t-desc">
                Built an AI-powered audio noise
                reduction application using Spring Boot.
              </div>
            </div>

            <div className="t-item">
              <div className="t-dot now"></div>

              <div
                className="t-year"
                style={{ color: "#3FB950" }}
              >
                Now
              </div>

              <div className="t-title">
                Learning & Growing
              </div>

              <div className="t-desc">
                Exploring Docker, AWS, Linux,
                DSA, System Design and cloud deployment.
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}

export default Journey;