function Skills() {
  return (
    <div id="skills" className="card">
      <div className="section-title">
        <span className="title-icon">&lt;/&gt;</span>
        Skills
      </div>

      <div className="skills-cols">
        {/* Backend */}
        <div>
          <div className="skill-head">Backend</div>

          <div className="skill-item">
            <div className="sdot"></div>
            Java
          </div>

          <div className="skill-item">
            <div className="sdot"></div>
            Spring Boot
          </div>

          <div className="skill-item">
            <div className="sdot"></div>
            REST APIs
          </div>

          <div className="skill-item">
            <div className="sdot"></div>
            Maven
          </div>
        </div>

        {/* Frontend */}
        <div>
          <div className="skill-head">Frontend</div>

          <div className="skill-item">
            <div className="sdot"></div>
            HTML5
          </div>

          <div className="skill-item">
            <div className="sdot"></div>
            CSS3
          </div>

          <div className="skill-item">
            <div className="sdot"></div>
            JavaScript
          </div>

          <div className="skill-item">
            <div className="sdot"></div>
            React.js
          </div>
        </div>

        {/* Database */}
        <div>
          <div className="skill-head">Database</div>

          <div className="skill-item">
            <div className="sdot"></div>
            MySQL
          </div>

          <div className="skill-item">
            <div className="sdot"></div>
            PostgreSQL
          </div>
        </div>

        {/* Tools */}
        <div>
          <div className="skill-head">Tools</div>

          <div className="skill-item">
            <div className="sdot"></div>
            Git
          </div>

          <div className="skill-item">
            <div className="sdot"></div>
            GitHub
          </div>

          <div className="skill-item">
            <div className="sdot"></div>
            Postman
          </div>

          <div className="skill-item">
            <div className="sdot"></div>
            IntelliJ IDEA
          </div>

          <div className="skill-item">
            <div className="sdot"></div>
            VS Code
          </div>
        </div>
      </div>

      <div
        style={{
          marginTop: "16px",
          paddingTop: "14px",
          borderTop: "1px solid #21262D",
        }}
      >
        <div
          style={{
            fontSize: "11px",
            color: "#58A6FF",
            fontWeight: "700",
            marginBottom: "6px",
          }}
        >
          📚 Currently Learning
        </div>

        <div className="learn-row">
          <div className="learn-row">
            <span className="learn-badge">AWS</span>
            <span className="learn-badge">Docker</span>
            <span className="learn-badge">Linux</span>
            <span className="learn-badge">Maven</span>
            <span className="learn-badge">DSA</span>
            <span className="learn-badge">System Design</span>
            <span className="learn-badge">Postman</span>
            <span className="learn-badge">IntelliJ IDEA</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Skills;