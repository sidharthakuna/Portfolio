import "../Stylings/Certifications.css";
import { FiAward } from "react-icons/fi";
import { MdOutlineVerified } from "react-icons/md";

// To add your certificate image:
// 1. Save the image into src/assets/certs/ (e.g. java.png)
// 2. Import it at the top: import javaCert from "../assets/certs/java.png";
// 3. Replace null with the imported variable: image: javaCert

const certs = [
  { title: "Java Programming", issuer: "Oracle",   year: "2024", accent: "#F80000", image: null },
 // { title: "Spring Boot 3",    issuer: "Udemy",    year: "2025", accent: "#A435F0", image: null },
 // { title: "SQL for Data Science", issuer: "Coursera", year: "2024", accent: "#0056D2", image: null },
  //{ title: "DSA in Java",      issuer: "",    year: "2024", accent: "#A435F0", image: null },
 // { title: "Git & GitHub",     issuer: "", year: "2024", accent: "#0056D2", image: null },
];

function Certifications() {
  return (
    <section id="certifications" className="section" style={{ paddingTop: "0" }}>
      <div className="section-title">
        <span className="cert-icon-box">
          <FiAward size={20} />
        </span>
        Certifications
      </div>

      <div className="cert-grid">
        {certs.map((cert, i) => (
          <div
            className="cert-card"
            key={i}
            style={{
              ["--cert-accent"]: cert.accent,
              ["--cert-glow"]: cert.accent + "22",
            }}
          >
            {/* Photo placeholder / actual image */}
            <div className="cert-img-wrap">
              {cert.image ? (
                <img src={cert.image} alt={cert.title} className="cert-img" />
              ) : (
                <div className="cert-placeholder">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="3" width="18" height="18" rx="2"/>
                    <circle cx="8.5" cy="8.5" r="1.5"/>
                    <polyline points="21 15 16 10 5 21"/>
                  </svg>
                  <span>Add Photo</span>
                </div>
              )}
            </div>

            {/* Minimal text */}
            <div className="cert-info">
              <div className="cert-title">{cert.title}</div>
              <div className="cert-meta">
                <span className="cert-issuer">{cert.issuer}</span>
                <span className="cert-year">{cert.year}</span>
              </div>
            </div>

            <MdOutlineVerified size={15} className="cert-verified" />
          </div>
        ))}
      </div>
    </section>
  );
}

export default Certifications;