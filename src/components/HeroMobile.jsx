import "../Stylings/HeroMobile.css";
import { useEffect, useState } from "react";
import { FaGithub, FaLinkedinIn, FaJava } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { SiLeetcode, SiSpringboot, SiMysql, SiDocker, SiPostgresql } from "react-icons/si";
import { TbApi } from "react-icons/tb";
import { FiArrowRight, FiMail } from "react-icons/fi";

const STACK_MOBILE = [
  { icon: <FaJava style={{ color: "#E76F00" }} />, label: "Java" },
  { icon: <SiSpringboot style={{ color: "#6DB33F" }} />, label: "Spring Boot" },
  { icon: <SiPostgresql style={{ color: "#4169E1" }} />, label: "PostgreSQL" },
  { icon: <TbApi style={{ color: "#38BDF8" }} />, label: "REST APIs" },
  { icon: <SiDocker style={{ color: "#2496ED" }} />, label: "Docker" },
];

function HeroMobile() {
  const [typedText, setTypedText] = useState("");

  useEffect(() => {
    const text = "Sidhartha Kuna";
    let i = 0;

    const interval = setInterval(() => {
      setTypedText(text.slice(0, i + 1));
      i++;

      if (i >= text.length) {
        clearInterval(interval);
      }
    }, 85);

    return () => clearInterval(interval);
  }, []);

  const scrollToProjects = () => {
    const section = document.getElementById("projects");
    if (section) section.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToContact = () => {
    const section = document.getElementById("contact");
    if (section) section.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="home" className="hero fade-in">
      <div className="hero-mobile-container">
        {/* Availability Badge */}
        <div className="badge">
          <span className="badge-pulse" aria-hidden="true" />
          <span>Java Backend Developer</span>
        </div>

        <p className="hero-mobile-salute">
          Hi, I'm
        </p>

        {/* Typewriter Name */}
        <h1 className="hero-name">
          <span className="accent">{typedText}</span>
          <span className="cursor" aria-hidden="true"> </span>
        </h1>

        <div className="name-underline" aria-hidden="true" />

        <p className="subtitle">
          Building Scalable Backend Systems with <span className="subtitle-highlight">Java &amp; Spring Boot</span>
        </p>

        <p className="desc">
          Computer Science undergrad crafting resilient microservices, REST APIs, and databases. Passionate about clean architecture, cloud infrastructure, and algorithms.
        </p>

        {/* Mobile Tech Stack Chips */}
        <div className="hero-mobile-stack">
          {STACK_MOBILE.map((item) => (
            <span className="hero-mobile-chip" key={item.label}>
              {item.icon}
              <span>{item.label}</span>
            </span>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="btn-row">
          <button
            className="btn-primary"
            onClick={scrollToProjects}
          >
            <span>View Projects</span>
            <FiArrowRight size={14} />
          </button>

          <button className="btn-outline" onClick={() => window.open("https://github.com/sidharthakuna", "_blank")}>
            <FaGithub size={14} />
            <span>GitHub Profile</span>
          </button>

          <button className="btn-outline" onClick={scrollToContact}>
            <FiMail size={14} />
            <span>Get in Touch</span>
          </button>
        </div>

        {/* Social Icons */}
        <div className="social-row">
          <a
            href="https://github.com/sidharthakuna"
            className="social-icon"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub Profile"
          >
            <FaGithub size={16} />
          </a>

          <a
            href="https://www.linkedin.com/in/sidharthakuna/"
            className="social-icon"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn Profile"
          >
            <FaLinkedinIn size={16} />
          </a>

          <a
            href="https://leetcode.com/u/SidharthaKuna/"
            className="social-icon"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LeetCode Profile"
          >
            <SiLeetcode size={16} />
          </a>

          <a
            href="mailto:sidharthakuna@gmail.com"
            className="social-icon"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Email Sidhartha Kuna"
          >
            <MdEmail size={17} />
          </a>
        </div>
      </div>
    </section>
  );
}

export default HeroMobile;