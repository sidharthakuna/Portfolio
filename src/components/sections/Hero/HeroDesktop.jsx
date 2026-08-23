import { useEffect, useState } from "react";
import { FaGithub, FaLinkedinIn } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { SiLeetcode } from "react-icons/si";
import { FiArrowRight, FiMail } from "react-icons/fi";
import { HERO_STACK_DESKTOP, HERO_PROFILE_INFO } from "@/data";
import "@/styles/sections/HeroDesktop.css";

export function HeroDesktop() {
  const [typedText, setTypedText] = useState("");
  const [showCursorBlink, setShowCursorBlink] = useState(false);

  useEffect(() => {
    const text = HERO_PROFILE_INFO.name;
    let i = 0;

    const interval = setInterval(() => {
      setTypedText(text.slice(0, i + 1));
      i++;

      if (i >= text.length) {
        clearInterval(interval);
        setShowCursorBlink(true);
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
    <section id="home" className="hero-d fade-in">
      <div className="hero-d__content">
        {/* Eyebrow Badge */}
        <div className="hero-d__eyebrow">
          <span className="hero-d__pulse-dot" aria-hidden="true" />
          <span>Available for Opportunities</span>
        </div>

        {/* Large Name Heading */}
        <h1 className="hero-d__name">
          <span className="hero-d__accent">{typedText}</span>
          <span
            className={
              "hero-d__cursor" +
              (showCursorBlink ? " hero-d__cursor--blink" : "")
            }
            aria-hidden="true"
          >
            {" "}
          </span>
        </h1>

        {/* Subtitle & Description */}
        <p className="hero-d__subtitle">
          Engineering High-Throughput <span className="hero-d__sub-highlight">Spring Boot APIs</span> &amp; <span className="hero-d__sub-highlight">Distributed Systems</span>
        </p>

        <p className="hero-d__desc">
          Computer Science undergraduate at {HERO_PROFILE_INFO.college} specializing in scalable backend architectures, relational database optimization, asynchronous event streaming, and algorithmic problem-solving.
        </p>

        {/* Core Stack Matrix */}
        <div className="hero-d__stack-wrapper">
          <span className="hero-d__stack-label">Core Tech Matrix:</span>
          <div className="hero-d__stack">
            {HERO_STACK_DESKTOP.map((item) => (
              <div className="hero-d__chip" key={item.label}>
                <span className="hero-d__chip-icon">{item.icon}</span>
                <span>{item.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Action Row: CTAs & Social Links */}
        <div className="hero-d__action-row">
          <div className="hero-d__btn-row">
            <button className="btn-primary hero-d__btn-primary" onClick={scrollToProjects}>
              <span>View Featured Projects</span>
              <FiArrowRight size={15} />
            </button>

            <button
              className="btn-outline hero-d__btn-outline"
              onClick={() =>
                window.open(HERO_PROFILE_INFO.github, "_blank")
              }
            >
              <FaGithub size={15} />
              <span>GitHub Profile</span>
            </button>

            <button className="btn-outline hero-d__btn-outline" onClick={scrollToContact}>
              <FiMail size={15} />
              <span>Get in Touch</span>
            </button>
          </div>

          <div className="hero-d__social-row">
            <a
              href={HERO_PROFILE_INFO.github}
              className="hero-d__social-icon"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub Profile"
              title="GitHub Profile"
            >
              <FaGithub size={16} />
            </a>
            <a
              href={HERO_PROFILE_INFO.linkedin}
              className="hero-d__social-icon"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn Profile"
              title="LinkedIn Profile"
            >
              <FaLinkedinIn size={16} />
            </a>
            <a
              href={HERO_PROFILE_INFO.leetcode}
              className="hero-d__social-icon"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LeetCode Profile"
              title="LeetCode Profile"
            >
              <SiLeetcode size={16} />
            </a>
            <a
              href={`mailto:${HERO_PROFILE_INFO.email}`}
              className="hero-d__social-icon"
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Email ${HERO_PROFILE_INFO.name}`}
              title="Email Sidhartha"
            >
              <MdEmail size={17} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroDesktop;
