import "../Stylings/HeroDesktop.css";
import { useEffect, useState } from "react";
import { FaGithub, FaLinkedinIn } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { SiLeetcode, SiSpringboot, SiMysql } from "react-icons/si";
import { FaJava } from "react-icons/fa";
import { TbApi } from "react-icons/tb";

const STACK = [
  { icon: <FaJava />, label: "Java" },
  { icon: <SiSpringboot />, label: "Spring Boot" },
  { icon: <TbApi />, label: "REST APIs" },
  { icon: <SiMysql />, label: "MySQL" },
];

function HeroDesktop() {
  const [typedText, setTypedText] = useState("");
  const [showCursorBlink, setShowCursorBlink] = useState(false);

  useEffect(() => {
    const text = "Sidhartha Kuna";
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
    <div id="home" className="hero-d fade-in">
      <span className="hero-d__eyebrow">Aspiring Java Backend Developer</span>

      <h1 className="hero-d__name">
        <span className="hero-d__accent">{typedText}</span>
        <span
          className={
            "hero-d__cursor" +
            (showCursorBlink ? " hero-d__cursor--blink" : "")
          }
        >
          {" "}
        </span>
      </h1>

      <p className="hero-d__subtitle">
        Java Backend Developer <span className="hero-d__dot">·</span> Spring
        Boot Enthusiast
      </p>

      <div className="hero-d__row">
        <p className="hero-d__desc">
          I build scalable backend applications using Java, Spring Boot, REST
          APIs, and databases. Currently learning cloud technologies and
          exploring new possibilities.
        </p>

        
      </div>

      <div className="hero-d__action-row">
        <div className="hero-d__btn-row">
          <button className="hero-d__btn-primary" onClick={scrollToProjects}>
            View Projects →
          </button>

          <button
            className="hero-d__btn-outline"
            onClick={() =>
              window.open("https://github.com/sidharthakuna", "_blank")
            }
          >
            <FaGithub size={13} /> GitHub
          </button>

          <button className="hero-d__btn-outline" onClick={scrollToContact}>
            ✉ Contact Me
          </button>
        </div>

        <div className="hero-d__social-row">
          <a
            href="https://github.com/sidharthakuna"
            className="hero-d__social-icon"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
          >
            <FaGithub />
          </a>
          <a
            href="https://www.linkedin.com/in/sidharthakuna/"
            className="hero-d__social-icon"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
          >
            <FaLinkedinIn />
          </a>
          <a
            href="https://leetcode.com/u/SidharthaKuna/"
            className="hero-d__social-icon"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LeetCode"
          >
            <SiLeetcode />
          </a>
          <a
            href="mailto:sidharthakuna@gmail.com"
            className="hero-d__social-icon"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Email"
          >
            <MdEmail />
          </a>
        </div>
      </div>
    </div>
  );
}

export default HeroDesktop;