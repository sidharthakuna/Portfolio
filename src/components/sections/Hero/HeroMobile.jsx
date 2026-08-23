import { useEffect, useState } from "react";
import { FaGithub, FaLinkedinIn } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { SiLeetcode } from "react-icons/si";
import { FiArrowRight, FiMail } from "react-icons/fi";
import { HERO_STACK_MOBILE, HERO_PROFILE_INFO } from "@/data";
import "@/styles/sections/HeroMobile.css";

export function HeroMobile() {
  const [typedText, setTypedText] = useState("");

  useEffect(() => {
    const text = HERO_PROFILE_INFO.name;
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
          {HERO_STACK_MOBILE.map((item) => (
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

          <button
            className="btn-outline"
            onClick={() => window.open(HERO_PROFILE_INFO.github, "_blank")}
          >
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
            href={HERO_PROFILE_INFO.github}
            className="social-icon"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub Profile"
          >
            <FaGithub size={16} />
          </a>

          <a
            href={HERO_PROFILE_INFO.linkedin}
            className="social-icon"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn Profile"
          >
            <FaLinkedinIn size={16} />
          </a>

          <a
            href={HERO_PROFILE_INFO.leetcode}
            className="social-icon"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LeetCode Profile"
          >
            <SiLeetcode size={16} />
          </a>

          <a
            href={`mailto:${HERO_PROFILE_INFO.email}`}
            className="social-icon"
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Email ${HERO_PROFILE_INFO.name}`}
          >
            <MdEmail size={17} />
          </a>
        </div>
      </div>
    </section>
  );
}

export default HeroMobile;
