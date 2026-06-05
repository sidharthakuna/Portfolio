import { FaPhone } from "react-icons/fa";
import "../Stylings/Footer.css";
function Footer() {
  return (
    <footer className="footer">
      <p>© 2026 Sidhartha Kuna</p>

      <a href="tel:+917981794512" className="footer-link">
        <FaPhone /> +91 7981794512
      </a>
    </footer>
  );
}

export default Footer;