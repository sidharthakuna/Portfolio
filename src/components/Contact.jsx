import { FaGithub, FaLinkedinIn } from "react-icons/fa";
import { MdEmail, MdLocationOn } from "react-icons/md";
import { FiLink, FiSend, FiCheck, FiMessageCircle } from "react-icons/fi";
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
        <span className="contact-icon-box">
          <FiMessageCircle size={20} />
        </span>
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
            <MdEmail size={15} color="#EA4335" />
             sidharthakuna@gmail.com
          </div>

          <div className="contact-item">
            <MdLocationOn size={15} color="#34A853" />
            Visakhapatnam, Andhra Pradesh, India
          </div>

          <div className="contact-item">
            <FiLink size={13} color="#0A66C2" />
            linkedin.com/in/sidharthakuna
          </div>

          <div className="contact-item">
            <SiLeetcode size={13} color="#FFA116" />
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
            style={{ width: "100%", fontSize: "13px", display: "flex", alignItems: "center", justifyContent: "center", gap: "6px" }}
            onClick={handleSubmit}
          >
            {sent ? (
              <><FiCheck size={14} /> Message Sent!</>
            ) : (
              <><FiSend size={13} /> Send Message</>
            )}
          </button>
        </div>
      </div>
    </section>
  );
}

export default Contact;