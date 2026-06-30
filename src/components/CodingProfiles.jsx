import "../Stylings/CodingProfiles.css";
import { FiCode } from "react-icons/fi";
import { FaGithub } from "react-icons/fa";
import { FaLinkedinIn } from "react-icons/fa";
import { SiLeetcode, SiCodechef, SiHackerrank } from "react-icons/si";

const profiles = [
  {
    name: "LeetCode",
    icon: <SiLeetcode size={26} />,
    color: "#FFA116",
    glow: "rgba(255, 161, 22, 0.15)",
    border: "rgba(255, 161, 22, 0.3)",
    stats: [
      { label: "Problems Solved", value: "76" },
      { label: "Contest Rating", value: "1,298" },
    ],
    link: "https://leetcode.com/u/SidharthaKuna/",
    cta: "View Profile",
  },
  /*{
    name: "CodeChef",
    icon: <SiCodechef size={26} />,
    color: "#5B4638",
    glow: "rgba(91, 70, 56, 0.2)",
    border: "rgba(91, 70, 56, 0.4)",
    stats: [
      { label: "Star Coder", value: "3★" },
      { label: "Global Rank", value: "15672" },
    ],
    link: "https://www.codechef.com/",
    cta: "View Profile",
  },*/
 /* {
    name: "HackerRank",
    icon: <SiHackerrank size={26} />,
    color: "#00EA64",
    glow: "rgba(0, 234, 100, 0.1)",
    border: "rgba(0, 234, 100, 0.25)",
    stats: [
      { label: "Java Rating", value: "5★" },
      { label: "Specialty", value: "Problem Solving" },
    ],
    link: "https://www.hackerrank.com/",
    cta: "View Profile",
  },*/
  {
    name: "GitHub",
    icon: <FaGithub size={26} />,
    color: "#E6EDF3",
    glow: "rgba(230, 237, 243, 0.06)",
    border: "rgba(230, 237, 243, 0.15)",
    stats: [
      { label: "Repositories", value: "8" },
      { label: "Contributions", value: "58" },
    ],
    link: "https://github.com/sidharthakuna",
    cta: "View GitHub",
  },
  {
    name: "LinkedIn",
    icon: <FaLinkedinIn size={24} />,
    color: "#0A66C2",
    glow: "rgba(10, 102, 194, 0.12)",
    border: "rgba(10, 102, 194, 0.3)",
    stats: [
      { label: "Profile", value: "Let's Connect" },
      { label: "Handle", value: "/sidharthakuna" },
    ],
    link: "https://www.linkedin.com/in/sidharthakuna/",
    cta: "Connect",
  },
];

function CodingProfiles() {
  return (
    <section id="coding-profiles" className="section" style={{ paddingTop: "0" }}>
      <div className="section-title">
        <span className="cp-icon-box">
          <FiCode size={18} />
        </span>
        Coding Profiles
      </div>

      <div className="cp-grid">
        {profiles.map((p, i) => (
          <div
            className="cp-card"
            key={i}
            style={{
              ["--cp-glow"]: p.glow,
              ["--cp-border"]: p.border,
              ["--cp-color"]: p.color,
            }}
          >
            {/* Header */}
            <div className="cp-header">
              <div
                className="cp-icon-wrap"
                style={{
                  background: p.glow,
                  border: `1px solid ${p.border}`,
                  color: p.color,
                }}
              >
                {p.icon}
              </div>
              <span className="cp-name">{p.name}</span>
            </div>

            {/* Stats */}
            <div className="cp-stats">
              {p.stats.map((s) => (
                <div className="cp-stat" key={s.label}>
                  <div className="cp-stat-value" style={{ color: p.color }}>
                    {s.value}
                  </div>
                  <div className="cp-stat-label">{s.label}</div>
                </div>
              ))}
            </div>

            {/* Link */}
            <a
              href={p.link}
              target="_blank"
              rel="noopener noreferrer"
              className="cp-link"
              style={{ color: p.color, borderColor: p.border }}
            >
              {p.cta} →
            </a>
          </div>
        ))}
      </div>
    </section>
  );
}

export default CodingProfiles;