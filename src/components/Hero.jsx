import "../Stylings/Hero.css";
import { useEffect, useState } from "react";
import { FaGithub, FaLinkedinIn } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { SiLeetcode } from "react-icons/si";

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
        <div className="badge">
          Aspiring Java Backend Developer
        </div>

        <p
          style={{
            fontSize: "18px",
            color: "#8B949E",
            marginBottom: "4px",
          }}
        >
          Hi, I'm
        </p>

        <h1>
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
            ⚙ GitHub
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

      {/* RIGHT SIDE */}
      <div className="code-card">
        <div className="code-bar">
          <div className="dot-red"></div>
          <div className="dot-yel"></div>
          <div className="dot-grn"></div>
        </div>

        <div className="code-pre">
          <pre
            style={{
              margin: 0,
              whiteSpace: "pre-wrap",
            }}
          >
{`@RestController
public class HelloController {
   @GetMapping("/api/hello")
   public ResponseEntity<String> hello() {
      return ResponseEntity.ok(
         "Hello! I'm Sidhartha Kuna 👋"
      );
   }
}
`}
          </pre>
        </div>

        <div className="tech-row">
          <span className="tech-badge">
            ☕ Java
          </span>

          <span className="tech-badge">
            🍃 Spring Boot
          </span>

          <span className="tech-badge">
            🗄️ MySQL
          </span>

          <span className="tech-badge">
            🔀 Git
          </span>
        </div>
      </div>
    </div>
  );
}

export default Hero;