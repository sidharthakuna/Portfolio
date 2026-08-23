import { useState } from "react";
import { FaGithub, FaLinkedinIn } from "react-icons/fa";
import { FiMail, FiMapPin, FiSend, FiCheck, FiMessageSquare, FiAlertCircle } from "react-icons/fi";
import { SiLeetcode } from "react-icons/si";
import { CONTACT_INFO } from "@/data";
import "@/styles/sections/Contact.css";

export function Contact() {
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) {
      setError("Please fill in all fields before sending.");
      setTimeout(() => setError(""), 3000);
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      setError("Please enter a valid email address.");
      setTimeout(() => setError(""), 3000);
      return;
    }

    // Launch mail client with pre-filled message
    const subject = encodeURIComponent(`Portfolio Inquiry from ${name.trim()}`);
    const body = encodeURIComponent(
      `${message.trim()}\n\n---\nSender Email: ${email.trim()}\nSender Name: ${name.trim()}`
    );
    window.location.href = `mailto:${CONTACT_INFO.email}?subject=${subject}&body=${body}`;

    setSent(true);
    setError("");
    setName("");
    setEmail("");
    setMessage("");
    setTimeout(() => setSent(false), 4000);
  };

  return (
    <section id="contact" className="section" style={{ paddingTop: "0" }}>
      <div className="section-title">
        <span className="contact-icon-box" aria-hidden="true">
          <FiMessageSquare size={18} />
        </span>
        Get in Touch
      </div>

      <div className="contact-grid">
        {/* LEFT SIDE — Contact Information */}
        <div className="card contact-card">
          <h3 className="contact-heading">Let's Build Something Exceptional</h3>
          <p className="contact-lead-text">
            I am actively seeking backend engineering internships, entry-level developer roles, and open-source collaborations. Feel free to send a message or connect directly through my channels.
          </p>

          <div className="contact-details-list">
            <a href={`mailto:${CONTACT_INFO.email}`} className="contact-item">
              <span className="contact-item-icon email-icon">
                <FiMail size={17} />
              </span>
              <span>{CONTACT_INFO.email}</span>
            </a>

            <div className="contact-item">
              <span className="contact-item-icon loc-icon">
                <FiMapPin size={17} />
              </span>
              <span>{CONTACT_INFO.location}</span>
            </div>

            <a
              href={CONTACT_INFO.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="contact-item"
            >
              <span className="contact-item-icon linkedin-icon">
                <FaLinkedinIn size={16} />
              </span>
              <span>linkedin.com/in/sidharthakuna</span>
            </a>

            <a
              href={CONTACT_INFO.leetcode}
              target="_blank"
              rel="noopener noreferrer"
              className="contact-item"
            >
              <span className="contact-item-icon lc-icon">
                <SiLeetcode size={16} />
              </span>
              <span>leetcode.com/u/SidharthaKuna</span>
            </a>
          </div>

          <div className="contact-social-section">
            <span className="contact-social-label">Direct Channels:</span>
            <div className="social-row">
              <a
                href={CONTACT_INFO.github}
                className="social-icon"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub Profile"
              >
                <FaGithub size={16} />
              </a>

              <a
                href={CONTACT_INFO.linkedin}
                className="social-icon"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn Profile"
              >
                <FaLinkedinIn size={16} />
              </a>

              <a
                href={CONTACT_INFO.leetcode}
                className="social-icon"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LeetCode Profile"
              >
                <SiLeetcode size={16} />
              </a>

              <a
                href={`mailto:${CONTACT_INFO.email}`}
                className="social-icon"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Email Sidhartha"
              >
                <FiMail size={16} />
              </a>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE — Interactive Form */}
        <div className="card contact-form-card">
          <h3 className="contact-heading">Send a Direct Message</h3>

          <form onSubmit={handleSubmit} className="contact-form">
            <div className="form-group">
              <label htmlFor="contact-name" className="form-label">
                Full Name
              </label>
              <input
                id="contact-name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                type="text"
                className="c-input"
                placeholder="e.g. Alex Turing"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="contact-email" className="form-label">
                Email Address
              </label>
              <input
                id="contact-email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                className="c-input"
                placeholder="e.g. alex@example.com"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="contact-message" className="form-label">
                Message
              </label>
              <textarea
                id="contact-message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={5}
                className="c-textarea"
                placeholder="Describe your project, role, or opportunity..."
                required
              />
            </div>

            {error && (
              <div className="contact-error-msg" role="alert">
                <FiAlertCircle size={14} />
                <span>{error}</span>
              </div>
            )}

            <button type="submit" className="btn-primary contact-submit-btn">
              {sent ? (
                <>
                  <FiCheck size={16} /> <span>Email Prepared &bull; Thank You!</span>
                </>
              ) : (
                <>
                  <FiSend size={15} /> <span>Send Message</span>
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

export default Contact;
