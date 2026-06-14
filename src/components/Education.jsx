import "../Stylings/Education.css";
import { FiBookOpen } from "react-icons/fi";
import { HiOutlineAcademicCap } from "react-icons/hi";
import { MdOutlineCalendarToday, MdOutlineStars } from "react-icons/md";

const coursework = [
  "Data Structures & Algorithms",
  "Object Oriented Programming",
  "Database Management Systems",
  "Operating Systems",
  "Computer Networks",
  "Software Engineering",
];

function Education() {
  return (
    <section id="education" className="section" style={{ paddingTop: "0" }}>
      <div className="section-title">
        <span className="education-icon-box">
          <FiBookOpen size={20} />
        </span>
        Education
      </div>

      <div className="card edu-card">
        {/* LEFT — College Info */}
        <div className="edu-left">
          <div className="edu-logo-wrap">
            <HiOutlineAcademicCap size={36} color="#58A6FF" />
          </div>

          <div className="edu-college">Raghu Engineering College</div>
          <div className="edu-degree">B.Tech in Computer Science &amp; Engineering</div>

          <div className="edu-meta-row">
            <span className="edu-meta-item">
              <MdOutlineCalendarToday size={13} color="#8B949E" />
              2024 – 2028
            </span>
            <span className="edu-meta-item">
              <MdOutlineStars size={13} color="#F7D358" />
              CGPA: 8.36 <span className="edu-meta-sub">(Till 4th Semester)</span>
            </span>
          </div>

          <div className="edu-status-badge">
            <span className="edu-pulse" />
            3rd Year · Currently Enrolled
          </div>
        </div>

        {/* DIVIDER */}
        <div className="edu-divider" />

        {/* RIGHT — Coursework */}
        <div className="edu-right">
          <div className="edu-cw-label">
            Relevant Coursework
          </div>

          <div className="edu-cw-grid">
            {coursework.map((course) => (
              <div className="edu-cw-item" key={course}>
                <span className="edu-cw-dot" />
                {course}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Education;