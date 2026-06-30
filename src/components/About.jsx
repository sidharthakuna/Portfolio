import "../Stylings/About.css";
import { useState } from "react";
import profilePic from "../assets/profile.jpg";
import DP from "./DP";
import { FiUser } from "react-icons/fi";

function About() {
  const [showProfile, setShowProfile] = useState(false);

  const openProfile = () => setShowProfile(true);
  const handleAvatarKey = (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      openProfile();
    }
  };

  return (
    <div id="about">
      <div className="section-title">
        <span className="about-icon-box" aria-hidden="true">
          <FiUser size={16} />
        </span>
        About
      </div>

      <div className="card about-card">
        <div className="about-body">

          {/* LEFT — Profile Photo */}
          <div className="about-left">
            <div className="about-avatar-wrap">
              <img
                src={profilePic}
                alt="Sidhartha Kuna"
                className="about-avatar"
                onClick={openProfile}
                role="button"
                tabIndex={0}
                onKeyDown={handleAvatarKey}
                aria-label="View full profile photo"
              />
              <div className="about-avatar-ring" aria-hidden="true" />
            </div>

            <div className="about-name">Sidhartha Kuna</div>
            <div className="about-role">Java Backend Developer</div>
            <div className="about-college">B.Tech CSE · Raghu Engineering College · 2028</div>

            <div className="about-open-badge">
              <span className="about-pulse" aria-hidden="true" />
              Open to Opportunities
            </div>
          </div>

          {/* RIGHT — Content */}
          <div className="about-right">
            <p className="about-text">
              I'm a Computer Science undergraduate at{" "}
              <span className="about-highlight">Raghu Engineering College{" "}</span>
              with a strong interest in backend engineering and software development.
              I specialize in building reliable applications using{" "}
              <span className="about-highlight">Java, Spring Boot, REST APIs, and MySQL</span>,
              focusing on clean architecture, maintainable code, and practical problem-solving.
            </p>

            <p className="about-text" style={{ marginTop: "10px" }}>
              My current focus is strengthening my backend development skills through
              real-world projects, data structures & algorithms, and cloud technologies.
              I'm actively learning{" "}
              <span className="about-highlight">AWS, Docker, Linux, and System Design{" "}</span>
              while working toward becoming a well-rounded software engineer capable of
              building scalable production-ready systems.
            </p>

            <div className="about-divider" />

            <div className="about-stats">
              <div className="about-stat">
                <div className="about-stat-num">1+</div>
                <div className="about-stat-lbl">Projects Built</div>
              </div>
              <div className="about-stat-sep" aria-hidden="true" />
              <div className="about-stat">
                <div className="about-stat-num">2yr</div>
                <div className="about-stat-lbl">Learning Journey</div>
              </div>
              <div className="about-stat-sep" aria-hidden="true" />
              <div className="about-stat">
                <div className="about-stat-num">5+</div>
                <div className="about-stat-lbl">Technologies</div>
              </div>
              <div className="about-stat-sep" aria-hidden="true" />
              <div className="about-stat">
                <div className="about-stat-num">75+</div>
                <div className="about-stat-lbl">DSA Solved</div>
              </div>
            </div>
          </div>

        </div>
      </div>

      <DP isOpen={showProfile} onClose={() => setShowProfile(false)} />
    </div>
  );
}

export default About;