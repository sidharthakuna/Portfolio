import { FaLinkedinIn, FaGithub } from "react-icons/fa";
import "../Stylings/Footer.css";

function Footer() {
  return (
    <footer className="footer-wrap">
      <div className="footer-content">
        <p className="footer-copy">
          &copy; {new Date().getFullYear()} Sidhartha Kuna &bull; Java Backend Developer
        </p>

        <span className="footer-divider" aria-hidden="true">&bull;</span>

        <div className="footer-links">
          <a
            href="https://github.com/sidharthakuna"
            target="_blank"
            rel="noopener noreferrer"
            className="footer-link"
            aria-label="GitHub Profile"
          >
            <span className="footer-link-icon" aria-hidden="true">
              <FaGithub size={13} />
            </span>
            <span>GitHub</span>
          </a>

          <a
            href="https://www.linkedin.com/in/sidharthakuna/"
            target="_blank"
            rel="noopener noreferrer"
            className="footer-link"
            aria-label="LinkedIn Profile"
          >
            <span className="footer-link-icon" aria-hidden="true">
              <FaLinkedinIn size={13} />
            </span>
            <span>LinkedIn</span>
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;