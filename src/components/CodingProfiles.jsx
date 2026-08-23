import "../Stylings/CodingProfiles.css";
import { FiCode, FiArrowRight } from "react-icons/fi";
import { FaGithub, FaLinkedinIn } from "react-icons/fa";
import { SiLeetcode } from "react-icons/si";

const profiles = [
  {
    id: "leetcode",
    name: "LeetCode",
    icon: <SiLeetcode size={28} />,
    badge: "Algorithmic Problem Solving",
    stats: [
      { label: "Problems Solved", value: "76+" },
      { label: "Contest Rating", value: "1,298" },
    ],
    link: "https://leetcode.com/u/SidharthaKuna/",
    cta: "View LeetCode Profile",
  },
  {
    id: "github",
    name: "GitHub",
    icon: <FaGithub size={28} />,
    badge: "Open Source Repositories",
    stats: [
      { label: "Public Repos", value: "8" },
      { label: "Yearly Contributions", value: "58+" },
    ],
    link: "https://github.com/sidharthakuna",
    cta: "Explore GitHub",
  },
  {
    id: "linkedin",
    name: "LinkedIn",
    icon: <FaLinkedinIn size={26} />,
    badge: "Professional Network",
    stats: [
      { label: "Network", value: "Let's Connect" },
      { label: "Handle", value: "@sidharthakuna" },
    ],
    link: "https://www.linkedin.com/in/sidharthakuna/",
    cta: "Connect on LinkedIn",
  },
];

function CodingProfiles() {
  return (
    <section id="coding-profiles" className="section" style={{ paddingTop: "0" }}>
      <div className="section-title">
        <span className="cp-icon-box" aria-hidden="true">
          <FiCode size={18} />
        </span>
        Coding &amp; Professional Profiles
      </div>

      <div className="cp-grid">
        {profiles.map((p) => (
          <div
            className={`cp-card cp-card--${p.id}`}
            key={p.id}
          >
            {/* Header */}
            <div className="cp-header">
              <div className={`cp-icon-wrap cp-icon-wrap--${p.id}`}>
                {p.icon}
              </div>
              <div className="cp-title-wrap">
                <h3 className="cp-name">{p.name}</h3>
                <span className="cp-badge">{p.badge}</span>
              </div>
            </div>

            {/* Stats Matrix */}
            <div className="cp-stats">
              {p.stats.map((s) => (
                <div className="cp-stat" key={s.label}>
                  <div className={`cp-stat-value cp-stat-value--${p.id}`}>
                    {s.value}
                  </div>
                  <div className="cp-stat-label">{s.label}</div>
                </div>
              ))}
            </div>

            {/* CTA Link */}
            <a
              href={p.link}
              target="_blank"
              rel="noopener noreferrer"
              className={`cp-link cp-link--${p.id}`}
            >
              <span>{p.cta}</span>
              <FiArrowRight size={14} />
            </a>
          </div>
        ))}
      </div>
    </section>
  );
}

export default CodingProfiles;