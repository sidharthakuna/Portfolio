import "../Stylings/Skills.css";
import { FiTerminal } from "react-icons/fi";

const SKILL_GROUPS = [
  {
    category: "Backend Engineering",
    type: "blue",
    skills: ["Java", "Spring Boot", "Spring MVC", "REST APIs", "JWT Auth", "Maven", "Hibernate / JPA"],
  },
  {
    category: "Frontend & UI",
    type: "purple",
    skills: ["HTML5", "CSS3 / Vanilla", "JavaScript (ES6+)", "React.js", "Vite", "Responsive Design"],
  },
  {
    category: "Databases & Storage",
    type: "orange",
    skills: ["PostgreSQL", "MySQL", "Relational Modeling", "Indexing", "Query Optimization"],
  },
  {
    category: "DevOps & Tools",
    type: "yellow",
    skills: ["Docker", "Git", "GitHub", "Postman", "IntelliJ IDEA", "VS Code", "Linux CLI"],
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