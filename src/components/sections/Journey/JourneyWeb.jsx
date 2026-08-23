import { FiCompass } from "react-icons/fi";
import { STOPS_WEB } from "@/data";
import "@/styles/sections/Journey.css";

export function JourneyWeb() {
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
        <div className="timeline-wrap timeline-wrap--web">
          {/* Theme-Adaptive Laser Conduit Beam */}
          <div
            className="timeline-line"
            style={{ background: "var(--journey-line-grad)" }}
            aria-hidden="true"
          />
          <div className="timeline-line-glow" aria-hidden="true" />

          <div className="timeline timeline--web">
            {STOPS_WEB.map((s, i) => (
              <div
                className="t-item"
                key={i}
                onMouseEnter={() => handleHover(s.colorVar)}
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
        </div>
      </div>
    </section>
  );
}

export default JourneyWeb;
