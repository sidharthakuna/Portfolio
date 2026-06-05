import { FaGithub, FaLinkedinIn } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { SiLeetcode } from "react-icons/si"
import { useState,useEffect } from "react"
import "../Stylings/Contact.css";
function Contact() {

  const [sent,setSent] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = () => {
    setSent(true);
    setTimeout(()=> setSent(false),2000);
  }
  return (
    <section
      id="contact"
      className="section"
      style={{ paddingTop: "0" }}
    >
      <div className="section-title">
        <span className="title-icon">✉</span>
        Let's Connect
      </div>

      <div className="contact-grid">
        {/* LEFT SIDE */}
        <div className="card">
          <p
            style={{
              fontSize: "14px",
              color: "#8B949E",
              lineHeight: "1.7",
              marginBottom: "20px",
            }}
          >
            I'm always open to discussing new
            opportunities, internships, backend
            development roles, and interesting
            projects. Feel free to reach out!
          </p>

          <div className="contact-item">
            <span style={{ color: "#58A6FF" }}>
              ✉
            </span>
            sidharthakuna@gmail.com
          </div>

          <div className="contact-item">
            <span style={{ color: "#58A6FF" }}>
              📍
            </span>
            Andhra Pradesh, India
          </div>

          <div className="contact-item">
            <span style={{ color: "#58A6FF" }}>
              🔗
            </span>
            linkedin.com/in/sidharthakuna
          </div>

          <div className="contact-item">
            <span style={{ color: "#58A6FF" }}>
              🏆
            </span>
            leetcode.com/u/SidharthaKuna
          </div>

          <div
            style={{
              display: "flex",
              gap: "10px",
              marginTop: "16px",
            }}
          >
            <div className="social-row">
              <a
                href="https://github.com/sidharthakuna"
                className="social-icon"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaGithub />
              </a>

              <a
                href="https://www.linkedin.com/in/sidharthakuna/"
                className="social-icon"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaLinkedinIn />
              </a>

              <a
                href="https://leetcode.com/u/SidharthaKuna/"
                className="social-icon"
                target="_blank"
                rel="noopener noreferrer"
              >
                <SiLeetcode />
              </a>

              <a
                href="mailto:sidharthakuna@gmail.com"
                className="social-icon"
                target="_blank"
                rel="noopener noreferrer"
              >
                <MdEmail />
              </a>
            </div>
          </div>
        </div>
        {/* RIGHT SIDE */}
        <div className="card">
          <input
            value={name} onChange={(e)=> setName(e.target.value)}
            type="text"
            className="c-input"
            placeholder="Your Name"
          />

          <input
            value={email} onChange={(e)=> setEmail(e.target.value)}
            type="email"
            className="c-input"
            placeholder="Your Email"
          />

          <textarea
            value={message} onChange={(e) => setMessage(e.target.value)}
            rows="5"
            className="c-textarea"
            placeholder="Your Message"
          ></textarea>

          <button
            className="btn-primary"
            style={{
              width: "100%",
              fontSize: "13px",
            }}
            onClick={handleSubmit}>
            {sent ? "✓ Message Sent!" : "Send Message →"}
          </button>
        </div>
      </div>
    </section>
  );
}

export default Contact;