import "../Stylings/HeroAnimation.css";
import { FaJava, FaGitAlt, FaCode } from "react-icons/fa";
import { SiSpringboot, SiMysql } from "react-icons/si";
import { TbApi } from "react-icons/tb";

function HeroAnimation() {
  return (
    <div className="hero-animation-card">
      <div className="hero-animation">
        <svg viewBox="0 0 420 420" className="orbit-svg">
          <circle
            cx="210"
            cy="210"
            r="150"
            fill="none"
            stroke="#21262d"
            strokeWidth="1"
            strokeDasharray="2 6"
          />
          <circle
            cx="210"
            cy="210"
            r="188"
            fill="none"
            stroke="#21262d"
            strokeWidth="1"
            strokeDasharray="1 5"
            opacity="0.6"
          />
        </svg>

        <div id="hero-ring1">
          <div className="hero-dot-blue"></div>
          <div className="hero-dot-green"></div>
        </div>

        <div id="hero-ring2">
          <div className="hero-dot-orange"></div>
        </div>

        <div className="hero-cube-container">
          <div id="hero-cube">

            <div className="hero-face hero-f-java">
              <FaJava />
              <span>Java</span>
            </div>

            <div className="hero-face hero-f-spring">
              <SiSpringboot />
              <span>Spring Boot</span>
            </div>

            <div className="hero-face hero-f-sql">
              <SiMysql />
              <span>MySQL</span>
            </div>

            <div className="hero-face hero-f-git">
              <FaGitAlt />
              <span>Git</span>
            </div>

            <div className="hero-face hero-f-api">
              <TbApi />
              <span>REST API</span>
            </div>

            <div className="hero-face hero-f-code">
              <FaCode />
              <span>Clean Code</span>
            </div>

          </div>
        </div>

        <div className="glow-wrapper">
          <div className="hero-glow"></div>
        </div>

        <div className="hero-particle hero-particle1"></div>
        <div className="hero-particle hero-particle2"></div>
        <div className="hero-particle hero-particle3"></div>
        <div className="hero-particle hero-particle4"></div>
        <div className="hero-particle hero-particle5"></div>

      </div>
    </div>
  );
}

export default HeroAnimation;