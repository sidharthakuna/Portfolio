import { useRef, useEffect, useState } from "react";
import "../Stylings/Journey.css";
import { FiCompass } from "react-icons/fi";
import { FaCoffee } from "react-icons/fa";
import {
  MdOutlineDashboard,
  MdOutlineStorage,
  MdOutlineMic,
  MdRocketLaunch,
} from "react-icons/md";

const COLS = 2;

const stops = [
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
  // position 2 → left col row 1 (AI Noise Remover)
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
  // position 3 → right col row 1 (Spring Boot)
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

function Journey() {
  const circleRefs = useRef([]);
  const [snakePath, setSnakePath] = useState("");
  const wrapRef = useRef(null);

  useEffect(() => {
    const buildPath = () => {
      if (!wrapRef.current) return;
      const wrap = wrapRef.current.getBoundingClientRect();
      const wrapW = wrapRef.current.offsetWidth;
      const wrapH = wrapRef.current.offsetHeight;

      const circles = circleRefs.current.map((el) => {
        if (!el) return null;
        const r = el.getBoundingClientRect();
        return {
          x: r.left - wrap.left + r.width / 2,
          y: r.top - wrap.top + r.height / 2,
        };
      });

      if (circles.some((c) => !c)) return;

      const R = 32; // corner radius
      const PAD = 16; // how close the line hugs the card edge

      // The path connects:
      // [0] Java (left)  ──────────────────  [1] Web Dev (right)
      //                                             │ (drops down right outer edge)
      // [2] AI Noise (left)  ──────────────  [3] Spring Boot (right)
      //      │ (drops down left outer edge)
      // [4] Now (left)

      // Row 0: node 0 (left) → node 1 (right): straight horizontal
      // Row transition 1→2: node 1 RIGHT col exits → hugs RIGHT outer edge → node 2 LEFT col
      // Row 1: node 2 (left) → node 3 (right): straight horizontal
      // Row transition 3→4: node 3 RIGHT col exits → hugs RIGHT outer edge... 
      //   BUT node 4 is on LEFT col so we need to wrap around right side again
      //   Wait — node 4 is alone on row 2, col 0 (left). 
      //   So node 3 (right col) → drop right edge → node 4 (left col): same as 1→2

      const rightEdge = wrapW - PAD;
      const leftEdge = PAD;

      let d = `M ${circles[0].x} ${circles[0].y}`;
      let wrapCount = 0; // counts how many row transitions have happened

      for (let i = 1; i < circles.length; i++) {
        const p = circles[i - 1];
        const c = circles[i];

        const prevRow = Math.floor((i - 1) / COLS);
        const currRow = Math.floor(i / COLS);
        const sameRow = prevRow === currRow;

        if (sameRow) {
          // Straight horizontal between nodes on same row
          d += ` L ${c.x} ${c.y}`;
        } else {
          // Row transition — alternate which outer edge we hug
          // wrapCount 0 (row0→row1): hug RIGHT edge
          // wrapCount 1 (row1→row2): hug LEFT edge
          // wrapCount 2 (row2→row3): hug RIGHT edge … and so on
          const useRightEdge = wrapCount % 2 === 0;

          if (useRightEdge) {
            // Exit right → hug right outer edge down → enter next row from right
            d += ` H ${rightEdge - R}`;
            d += ` Q ${rightEdge} ${p.y} ${rightEdge} ${p.y + R}`;
            d += ` V ${c.y - R}`;
            d += ` Q ${rightEdge} ${c.y} ${rightEdge - R} ${c.y}`;
            d += ` H ${c.x}`;
          } else {
            // Exit left → hug left outer edge down → enter next row from left
            d += ` H ${leftEdge + R}`;
            d += ` Q ${leftEdge} ${p.y} ${leftEdge} ${p.y + R}`;
            d += ` V ${c.y - R}`;
            d += ` Q ${leftEdge} ${c.y} ${leftEdge + R} ${c.y}`;
            d += ` H ${c.x}`;
          }

          wrapCount++;
        }
      }

      setSnakePath(d);
    };

    const id = setTimeout(buildPath, 50);
    window.addEventListener("resize", buildPath);
    return () => {
      clearTimeout(id);
      window.removeEventListener("resize", buildPath);
    };
  }, []);

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
        <div className="timeline-wrap" ref={wrapRef}>
          <div className="timeline-line" aria-hidden="true" />
          <div className="timeline-line-glow" aria-hidden="true" />

          <div className="timeline">
            {stops.map((s, i) => (
              <div
                className="t-item"
                key={i}
                onMouseEnter={() => handleHover(s.color)}
                onMouseLeave={handleLeave}
              >
                <div
                  className="t-circle-wrap"
                  ref={(el) => (circleRefs.current[i] = el)}
                >
                  <svg className="t-rings" viewBox="0 0 80 80" aria-hidden="true">
                    <circle
                      cx="40" cy="40" r="28"
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
                      cx="40" cy="4" r="2.5"
                      fill={s.color}
                      opacity="0.7"
                      style={{
                        animation: `spinCW ${s.outerSpeed} linear infinite`,
                        transformOrigin: "40px 40px",
                      }}
                    />
                    <circle
                      cx="40" cy="12" r="1.8"
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

          {snakePath && (
            <svg className="snake-svg" aria-hidden="true">
              <defs>
                <linearGradient id="snakeGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%"   stopColor="#A371F7" />
                  <stop offset="25%"  stopColor="#58A6FF" />
                  <stop offset="60%"  stopColor="#E09B3D" />
                  <stop offset="80%"  stopColor="#F47067" />
                  <stop offset="100%" stopColor="#3FB950" />
                </linearGradient>
              </defs>
              <path
                d={snakePath}
                fill="none"
                stroke="url(#snakeGrad)"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          )}
        </div>
      </div>
    </section>
  );
}

export default Journey;