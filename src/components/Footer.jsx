import { FaLinkedinIn } from "react-icons/fa";
import "../Stylings/Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <p>© 2026 Sidhartha Kuna</p>

      <a href="https://www.linkedin.com/in/sidharthakuna/"
        target="_blank"
        rel="noopener noreferrer"
        className="footer-link"
        aria-label="Sidhartha Kuna on LinkedIn (opens in new tab)"
      >
        <span className="linkedin-icon" aria-hidden="true">
          <FaLinkedinIn />
        </span>
        <span>LinkedIn</span>
      </a>
    </footer>
  );
}

export default Footer;