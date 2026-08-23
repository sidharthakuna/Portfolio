import "../Stylings/Education.css";
import { FiBookOpen } from "react-icons/fi";
import { HiOutlineAcademicCap } from "react-icons/hi";
import { MdOutlineCalendarToday, MdOutlineStars } from "react-icons/md";

const coursework = [
  "Data Structures & Algorithms",
  "Object Oriented Programming (OOP)",
  "Database Management Systems (DBMS)",
  "Operating Systems (OS)",
  "Computer Networks",
  "Software Engineering Principles",
];

function Education() {
  return (
    <section id="education" className="section" style={{ paddingTop: "0" }}>
      <div className="section-title">
        <span className="education-icon-box" aria-hidden="true">
          <FiBookOpen size={18} />
        </span>
        Academic Foundation
      </div>

      <div className="card edu-card">
        {/* LEFT — University Info */}
        <div className="edu-left">
          {/* Header Row: Logo on Left + Name & Degree on Right */}
          <div className="edu-header-row">
            <div className="edu-logo-wrap">
              <HiOutlineAcademicCap size={32} className="edu-cap-icon" />
            </div>
            <div className="edu-title-block">
              <h3 className="edu-college">Raghu Engineering College</h3>
              <div className="edu-degree">B.Tech in Computer Science &amp; Engineering</div>
            </div>
          </div>

          {/* Metadata & Status Chips Row */}
          <div className="edu-badges-row">
            <span className="edu-meta-pill">
              <MdOutlineCalendarToday size={13} color="#94A3B8" />
              <span>2024 – 2028</span>
            </span>
            <span className="edu-meta-pill">
              <MdOutlineStars size={14} color="#F59E0B" />
              <span>CGPA: <strong className="edu-cgpa">9.0</strong></span>
            </span>
            <div className="edu-status-badge">
              <span className="edu-pulse" aria-hidden="true" />
              <span>3rd Year &bull; Currently Enrolled</span>
            </div>
          </div>
        </div>

        {/* Specular Divider */}
        <div className="edu-divider" aria-hidden="true" />

        {/* RIGHT — Relevant Coursework */}
        <div className="edu-right">
          <div className="edu-cw-label">
            Key Academic Coursework
          </div>

          <div className="edu-cw-grid">
            {coursework.map((course) => (
              <div className="edu-cw-item" key={course}>
                <span className="edu-cw-dot" aria-hidden="true" />
                <span>{course}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Education;