import { FiCode, FiArrowRight } from "react-icons/fi";
import { CODING_PROFILES } from "@/data";
import "@/styles/sections/CodingProfiles.css";

export function CodingProfiles() {
  return (
    <section id="coding-profiles" className="section" style={{ paddingTop: "0" }}>
      <div className="section-title">
        <span className="cp-icon-box" aria-hidden="true">
          <FiCode size={18} />
        </span>
        Coding &amp; Professional Profiles
      </div>

      <div className="cp-grid">
        {CODING_PROFILES.map((p) => (
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
