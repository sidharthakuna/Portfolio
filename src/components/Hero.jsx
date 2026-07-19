import "../Stylings/Hero.css";
import { useEffect, useState } from "react";
import { FaGithub, FaLinkedinIn, FaJava, FaGitAlt, FaRocket } from "react-icons/fa";
import { MdEmail, MdOutlineContactMail } from "react-icons/md";
import { SiLeetcode, SiSpringboot, SiMysql } from "react-icons/si";
import HeroAnimation from "./HeroAnimation"; 

function Hero() {
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

    if (section) {
      section.scrollIntoView({
        behavior: "smooth",
      });
    }
  };

  //scroll to contact position
  const scrollToContact = () => {
    const section = document.getElementById("contact");
    if (section) section.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div id="home" className="hero fade-in">
      {/* LEFT SIDE */}
      <div>
        <div className="badge">Aspiring Java Backend Developer</div><br></br>
        <p
          style={{
            fontSize: "16px",
            color: "#8B949E",
            marginBottom: "4px",
          }}
        >
          Hi, I'm
        </p>

        <h1 className="hero-name">
          <span className="accent">{typedText}</span>
          <span className="cursor"> </span>
        </h1>

        <p className="subtitle">
          Java Backend Developer | Spring Boot Enthusiast
        </p>

        <p className="desc">
          I build scalable backend applications using
          Java, Spring Boot, REST APIs, and databases.
          Currently learning cloud technologies and
          exploring new possibilities.
        </p>

        <div className="btn-row">
          <button
            className="btn-primary"
            onClick={scrollToProjects}
          >
            View Projects →
          </button>

          <button className="btn-outline" onClick={()=> window.open("https://github.com/sidharthakuna", "_blank")}>
            <FaGithub size={13} /> GitHub
          </button>

          <button className="btn-outline" onClick={scrollToContact}>
            ✉ Contact Me
          </button>
        </div>

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
      <HeroAnimation />
    </div>
  );
}

export default Hero;