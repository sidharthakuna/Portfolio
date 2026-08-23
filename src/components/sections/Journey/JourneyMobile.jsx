import { useRef, useEffect, useState } from "react";
import { FiCompass } from "react-icons/fi";
import { STOPS_MOBILE } from "@/data";
import "@/styles/sections/Journey.css";

export function JourneyMobile() {
  const circleRefs = useRef([]);
  const [snakePath, setSnakePath] = useState("");
  const wrapRef = useRef(null);

  useEffect(() => {
    const buildPath = () => {
      if (!wrapRef.current) return;
      const wrap = wrapRef.current.getBoundingClientRect();
      const wrapW = wrapRef.current.offsetWidth;

      const circles = circleRefs.current.map((el) => {
        if (!el) return null;
        const r = el.getBoundingClientRect();
        return {
          x: r.left - wrap.left + r.width / 2,
          y: r.top - wrap.top + r.height / 2,
        };
      });

      if (circles.some((c) => !c)) return;

      const R = 32;
      const ROW_EDGE_PAD = 18;
      const rightEdgeX = wrapW - ROW_EDGE_PAD;
      const leftEdgeX = ROW_EDGE_PAD;

      let d = "";

      // ── SEGMENT 0: Stop 0 -> Stop 1 (Row 0: L -> R)
      d += `M ${circles[0].x} ${circles[0].y} `;
      d += `L ${circles[1].x} ${circles[1].y} `;

      // ── TURN 0: Row 0 Right -> Row 1 Right (U-turn on RIGHT side)
      d += `L ${rightEdgeX - R} ${circles[1].y} `;
      d += `A ${R} ${R} 0 0 1 ${rightEdgeX} ${circles[1].y + R} `;
      d += `L ${rightEdgeX} ${circles[3].y - R} `;
      d += `A ${R} ${R} 0 0 1 ${rightEdgeX - R} ${circles[3].y} `;

      // ── SEGMENT 1: Stop 3 (Right) -> Stop 2 (Left) (Row 1: R -> L)
      d += `L ${circles[3].x} ${circles[3].y} `;
      d += `L ${circles[2].x} ${circles[2].y} `;

      // ── TURN 1: Row 1 Left -> Row 2 Left (U-turn on LEFT side)
      d += `L ${leftEdgeX + R} ${circles[2].y} `;
      d += `A ${R} ${R} 0 0 0 ${leftEdgeX} ${circles[2].y + R} `;
      d += `L ${leftEdgeX} ${circles[4].y - R} `;
      d += `A ${R} ${R} 0 0 0 ${leftEdgeX + R} ${circles[4].y} `;

      // ── SEGMENT 2: into Stop 4 (Row 2: L -> Stop 4)
      d += `L ${circles[4].x} ${circles[4].y}`;

      setSnakePath(d);
    };

    buildPath();

    const ro = new ResizeObserver(() => buildPath());
    if (wrapRef.current) ro.observe(wrapRef.current);

    window.addEventListener("resize", buildPath);
    return () => {
      ro.disconnect();
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
        <span className="journey-icon-box" aria-hidden="true">
          <FiCompass size={18} />
        </span>
        Evolutionary Journey
      </div>

      <div className="card journey-card">
        <div className="timeline-wrap" ref={wrapRef}>
          <div className="timeline timeline--mobile">
            {STOPS_MOBILE.map((s, i) => (
              <div
                className="t-item"
                key={i}
                onMouseEnter={() => handleHover(s.colorVar)}
                onMouseLeave={handleLeave}
              >
                <div
                  className="t-circle-wrap"
                  ref={(el) => {
                    circleRefs.current[i] = el;
                  }}
                >
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
                      stroke={s.colorVar}
                      strokeWidth="1.4"
                      opacity="0.3"
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
                      r="2.8"
                      fill={s.colorVar}
                      opacity="0.85"
                      style={{
                        animation: `spinCW ${s.outerSpeed} linear infinite`,
                        transformOrigin: "40px 40px",
                      }}
                    />
                    <circle
                      cx="40"
                      cy="12"
                      r="2"
                      fill={s.colorVar}
                      opacity="0.65"
                      style={{
                        animation: `spinCCW ${s.innerSpeed} linear infinite`,
                        transformOrigin: "40px 40px",
                      }}
                    />
                  </svg>
                  <div
                    className={`t-circle${s.isNow ? " t-circle--now" : ""}`}
                    style={{
                      borderColor: s.colorVar,
                      color: s.colorVar,
                      boxShadow: `0 0 0 2.5px ${s.glowVar}`,
                    }}
                  >
                    {s.icon}
                  </div>
                </div>

                <div className="t-year" style={{ color: s.colorVar }}>
                  {s.year}
                </div>
                <div className="t-title">{s.title}</div>
              </div>
            ))}
          </div>

          {snakePath && (
            <svg className="snake-svg" aria-hidden="true">
              <defs>
                <linearGradient id="snakeGradMobile" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="var(--journey-c1)" />
                  <stop offset="25%" stopColor="var(--journey-c2)" />
                  <stop offset="60%" stopColor="var(--journey-c4)" />
                  <stop offset="80%" stopColor="var(--journey-c3)" />
                  <stop offset="100%" stopColor="var(--journey-c5)" />
                </linearGradient>
              </defs>
              <path
                d={snakePath}
                fill="none"
                stroke="url(#snakeGradMobile)"
                strokeWidth="2.5"
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

export default JourneyMobile;
