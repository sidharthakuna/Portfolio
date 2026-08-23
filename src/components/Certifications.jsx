import "../Stylings/Certifications.css";
import { FiAward } from "react-icons/fi";
import { MdOutlineVerified } from "react-icons/md";
import { FaJava } from "react-icons/fa";

const certs = [
  {
    title: "Java SE Programming & Core Architecture",
    issuer: "Oracle / Java Certification",
    year: "2024",
    accent: "#F80000",
    icon: <FaJava size={28} color="#E76F00" />,
    image: null,
    credentialId: "Verified Academic Credential",
  },
];

function Certifications() {
  return (
    <section id="certifications" className="section" style={{ paddingTop: "0" }}>
      <div className="section-title">
        <span className="cert-icon-box" aria-hidden="true">
          <FiAward size={18} />
        </span>
        Certifications &amp; Credentials
      </div>

      <div className="cert-grid">
        {certs.map((cert, i) => (
          <div
            className="cert-card"
            key={i}
            style={{
              ["--cert-accent"]: cert.accent,
              ["--cert-glow"]: cert.accent + "25",
            }}
          >
            {/* Header Icon / Image Preview */}
            <div className="cert-img-wrap">
              {cert.image ? (
                <img src={cert.image} alt={cert.title} className="cert-img" />
              ) : (
                <div className="cert-placeholder">
                  <div className="cert-placeholder-icon">
                    {cert.icon}
                  </div>
                  <span className="cert-placeholder-tag">Certified Java Engineer</span>
                </div>
              )}
            </div>

            {/* Meta details */}
            <div className="cert-info">
              <div className="cert-title">{cert.title}</div>
              <div className="cert-meta">
                <span className="cert-issuer">{cert.issuer}</span>
                <span className="cert-year">{cert.year}</span>
              </div>
            </div>

            <div className="cert-verified-badge" title="Verified Certification">
              <MdOutlineVerified size={16} />
              <span>Verified</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Certifications;