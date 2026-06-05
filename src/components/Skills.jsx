import "../Stylings/Skills.css";

function Skills() {
  return (
    <section id="skills" className="card skills-card">
      <div className="section-title">
        <span className="title-icon">&lt;/&gt;</span>
        Skills
      </div>

      <div className="skills-cols">
        <div>
          <div className="skill-head">Backend</div>
          <div className="skill-pill-row">
            <span className="skill-pill pill-blue">Java</span>
            <span className="skill-pill pill-blue">Spring Boot</span>
            <span className="skill-pill pill-blue">REST APIs</span>
            <span className="skill-pill pill-blue">Maven</span>
          </div>
        </div>

        <div>
          <div className="skill-head">Frontend</div>
          <div className="skill-pill-row">
            <span className="skill-pill pill-purple">HTML5</span>
            <span className="skill-pill pill-purple">CSS3</span>
            <span className="skill-pill pill-purple">JavaScript</span>
            <span className="skill-pill pill-purple">React</span>
          </div>
        </div>

        <div>
          <div className="skill-head">Database</div>
          <div className="skill-pill-row">
            <span className="skill-pill pill-orange">MySQL</span>
            <span className="skill-pill pill-orange">PostgreSQL</span>
          </div>
        </div>

        <div>
          <div className="skill-head">Tools</div>
          <div className="skill-pill-row">
            <span className="skill-pill pill-yellow">Git</span>
            <span className="skill-pill pill-yellow">GitHub</span>
            <span className="skill-pill pill-yellow">Postman</span>
            <span className="skill-pill pill-yellow">IntelliJ IDEA</span>
            <span className="skill-pill pill-yellow">VS Code</span>
            <span className="skill-pill pill-yellow">Docker</span>
          </div>
        </div>
      </div>

      <div className="skills-learn-section">
        <div className="skills-learn-label">
          <span className="learn-dot" />
          Currently Learning
        </div>
        <div className="skill-pill-row">
          <span className="skill-pill pill-green">AWS</span>
          <span className="skill-pill pill-green">Docker</span>
          <span className="skill-pill pill-green">Linux</span>
          <span className="skill-pill pill-green">DSA</span>
          <span className="skill-pill pill-green">System Design</span>
        </div>
      </div>
    </section>
  );
}

export default Skills;