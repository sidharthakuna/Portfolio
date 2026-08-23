import { FiTerminal } from "react-icons/fi";
import { SKILL_GROUPS, CURRENTLY_LEARNING } from "@/data";
import "@/styles/sections/Skills.css";

export function Skills() {
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
