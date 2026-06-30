import { FiCompass } from "react-icons/fi";
import { FaCoffee } from "react-icons/fa";
import {
  MdOutlineDashboard,
  MdOutlineStorage,
  MdOutlineMic,
  MdRocketLaunch,
} from "react-icons/md";
import "../../Stylings/Journey.css";

// Web order: Java → Web Dev → Spring Boot → AI Noise Remover → Now
// (positions 3 & 4 swapped vs mobile)
const stopsWeb = [
  {
    year: "2024",
    title: "Started Java",
    icon: <FaCoffee size={18} />,
    color: "#A371F7",
    glow: "rgba(163,113,247,0.3)",
    yearColor: "#A371F7",
    outerSpeed: "8s",
    innerSpeed: "5s",
    outerDash: "12 8",
    innerDash: "6 10",
  },
  {
    year: "2024",
    title: "Web Development",
    icon: <MdOutlineDashboard size={20} />,
    color: "#58A6FF",
    glow: "rgba(88,166,255,0.3)",
    yearColor: "#58A6FF",
    outerSpeed: "6s",
    innerSpeed: "4s",
    outerDash: "14 6",
    innerDash: "8 8",
  },
  // Swapped: Spring Boot is now 3rd on web
  {
    year: "2025",
    title: "Spring Boot",
    icon: <MdOutlineStorage size={20} />,
    color: "#F47067",
    glow: "rgba(244,112,103,0.3)",
    yearColor: "#F47067",
    outerSpeed: "5s",
    innerSpeed: "3s",
    outerDash: "16 5",
    innerDash: "10 6",
  },
  // Swapped: AI Noise Remover is now 4th on web
  {
    year: "2026",
    title: "AI Noise Remover",
    icon: <MdOutlineMic size={20} />,
    color: "#E09B3D",
    glow: "rgba(224,155,61,0.3)",
    yearColor: "#E09B3D",
    outerSpeed: "4s",
    innerSpeed: "2.5s",
    outerDash: "18 4",
    innerDash: "12 5",
  },
  {
    year: "Now",
    title: "Learning & Growing",
    icon: <MdRocketLaunch size={20} />,
    color: "#3FB950",
    glow: "rgba(63,185,80,0.4)",
    yearColor: "#3FB950",
    isNow: true,
    outerSpeed: "2.5s",
    innerSpeed: "1.5s",
    outerDash: "none",
    innerDash: "none",
  },
];

// Gradient matches the web order: purple → blue → red → orange → green
const WEB_GRADIENT =
  "linear-gradient(90deg, #A371F7 0%, #58A6FF 25%, #F47067 50%, #E09B3D 75%, #3FB950 100%)";

function JourneyWeb() {
  const handleHover = (color) => {
    document.documentElement.style.setProperty("--tl-hover-color", color);
  };
  const handleLeave = () => {
    document.documentElement.style.setProperty("--tl-hover-color", "transparent");
  };

  return (
    <section id="journey" className="section" style={{ paddingTop: "0" }}>
      <div className="section-title">
        <span className="journey-icon-box">
          <FiCompass size={20} />
        </span>
        Journey
      </div>

      <div className="card">
        <div className="timeline-wrap timeline-wrap--web">
          {/* Straight horizontal line */}
          <div
            className="timeline-line"
            style={{ background: WEB_GRADIENT }}
            aria-hidden="true"
          />
          <div className="timeline-line-glow" aria-hidden="true" />

          <div className="timeline timeline--web">
            {stopsWeb.map((s, i) => (
              <div
                className="t-item"
                key={i}
                onMouseEnter={() => handleHover(s.color)}
                onMouseLeave={handleLeave}
              >
                <div className="t-circle-wrap">
                  <svg
                    className="t-rings"
                    viewBox="0 0 80 80"
                    aria-hidden="true"
                  >
                    <circle
                      cx="40"
                      cy="40"
                      r="28"
                      fill="none"
                      stroke={s.color}
                      strokeWidth="1"
                      opacity="0.2"
                      strokeDasharray={s.innerDash}
                      strokeLinecap="round"
                      style={{
                        animation: `spinCCW ${s.innerSpeed} linear infinite`,
                        transformOrigin: "40px 40px",
                      }}
                    />
                    <circle
                      cx="40"
                      cy="4"
                      r="2.5"
                      fill={s.color}
                      opacity="0.7"
                      style={{
                        animation: `spinCW ${s.outerSpeed} linear infinite`,
                        transformOrigin: "40px 40px",
                      }}
                    />
                    <circle
                      cx="40"
                      cy="12"
                      r="1.8"
                      fill={s.color}
                      opacity="0.5"
                      style={{
                        animation: `spinCCW ${s.innerSpeed} linear infinite`,
                        transformOrigin: "40px 40px",
                      }}
                    />
                  </svg>
                  <div
                    className={`t-circle${s.isNow ? " t-circle--now" : ""}`}
                    style={{
                      borderColor: s.color,
                      color: s.color,
                      boxShadow: `0 0 0 2px ${s.glow}`,
                    }}
                  >
                    {s.icon}
                  </div>
                </div>

                <div className="t-year" style={{ color: s.yearColor }}>
                  {s.year}
                </div>
                <div className="t-title">{s.title}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default JourneyWeb;