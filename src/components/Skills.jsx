import "../Stylings/Skills.css";
import { FiTerminal } from "react-icons/fi";

const SKILL_GROUPS = [
  {
    category: "Backend Engineering",
    type: "blue",
    skills: ["Java 21", "Spring Boot 3", "Spring Data JPA", "REST APIs", "JWT Auth", "Flyway", "Hibernate"],
  },
  {
    category: "Frontend & UI",
    type: "purple",
    skills: ["React 19", "TypeScript", "Tailwind CSS", "JavaScript (ES6+)", "Vite", "HTML5 / CSS3"],
  },
  {
    category: "Databases & Storage",
    type: "orange",
    skills: ["PostgreSQL", "MySQL", "Relational Modeling", "Database Indexing", "Cloudflare R2 / S3"],
  },
  {
    category: "DevOps & Tools",
    type: "yellow",
    skills: ["Docker", "Git / GitHub", "Postman", "IntelliJ IDEA", "Linux CLI", "Maven"],
  },
];

const CURRENTLY_LEARNING = [
  "AWS (EC2 / S3 / RDS)", "Docker Containerization", "Microservices Architecture", "System Design", "Advanced DSA",
];

function Skills() {
  return (
    <section id="skills" className="skills-section">
      <div className="section-title">
        <span className="skills-icon-box" aria-hidden="true">
          <FiTerminal size={18} />
        </span>
        Technical Arsenal
      </div>

      <div className="card skills-card">
        {/* Categorized Skills Grid */}
        <div className="skills-cols">
          {SKILL_GROUPS.map((group) => (
            <div className={`skill-group skill-group--${group.type}`} key={group.category}>
              <div className={`skill-head skill-head--${group.type}`}>
                <span className={`skill-dot dot-${group.type}`} aria-hidden="true" />
                <span>{group.category}</span>
              </div>
              <div className="skill-pill-row">
                {group.skills.map((skill) => (
                  <span className={`skill-pill pill-${group.type}`} key={skill}>
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Currently Learning Section */}
        <div className="skills-learn-section">
          <div className="skills-learn-label">
            <span className="learn-dot" aria-hidden="true" />
            <span>Currently Mastering</span>
          </div>
          <div className="skill-pill-row">
            {CURRENTLY_LEARNING.map((item) => (
              <span className="skill-pill pill-green" key={item}>
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Skills;