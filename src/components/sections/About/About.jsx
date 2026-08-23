import { useState } from "react";
import { FiUser, FiCode, FiClock, FiLayers, FiCheckCircle } from "react-icons/fi";
import profilePic from "@/assets/profile.jpg";
import { DP } from "@/components/common";
import "@/styles/sections/About.css";

export function About() {
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
          <FiUser size={18} />
        </span>
        About Me
      </div>

      <div className="card about-card">
        <div className="about-body">
          {/* LEFT — Profile Card */}
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
                title="Click to view full photo"
              />
              <div className="about-avatar-ring" aria-hidden="true" />
            </div>

            <div className="about-name">Sidhartha Kuna</div>
            <div className="about-role">Java Backend Developer</div>
            <div className="about-college">B.Tech CSE &bull; Raghu Engineering College &bull; 2028</div>

            <div className="about-open-badge">
              <span className="about-pulse" aria-hidden="true" />
              <span>Available for Roles &bull; 2026</span>
            </div>
          </div>

          {/* RIGHT — Narrative & Stats */}
          <div className="about-right">
            <p className="about-text">
              I am a Computer Science undergraduate at{" "}
              <span className="about-highlight">Raghu Engineering College</span>, deeply passionate about backend engineering, API architecture, and high-performance server-side systems.
              My primary technical foundation centers around{" "}
              <span className="about-highlight">Java, Spring Boot, REST APIs, and Relational Databases</span>, with a relentless focus on clean code, SOLID design principles, and scalable system design.
            </p>

            <p className="about-text" style={{ marginTop: "12px" }}>
              I thrive on engineering real-world solutions that handle data efficiently. Currently expanding my expertise into{" "}
              <span className="about-highlight">AWS, Docker, Microservices, and Advanced DSA</span> to prepare for large-scale enterprise deployments and high-concurrency environments.
            </p>

            <div className="about-divider" aria-hidden="true" />

            {/* Key Metrics Matrix */}
            <div className="about-stats">
              <div className="about-stat">
                <div className="about-stat-icon">
                  <FiLayers size={14} color="#38BDF8" />
                </div>
                <div className="about-stat-num">1+</div>
                <div className="about-stat-lbl">Full-Stack Project</div>
              </div>

              <div className="about-stat">
                <div className="about-stat-icon">
                  <FiClock size={14} color="#A78BFA" />
                </div>
                <div className="about-stat-num">2+ Yrs</div>
                <div className="about-stat-lbl">Dev Experience</div>
              </div>

              <div className="about-stat">
                <div className="about-stat-icon">
                  <FiCode size={14} color="#F59E0B" />
                </div>
                <div className="about-stat-num">8+</div>
                <div className="about-stat-lbl">Core Tech Tools</div>
              </div>

              <div className="about-stat">
                <div className="about-stat-icon">
                  <FiCheckCircle size={14} color="#10B981" />
                </div>
                <div className="about-stat-num">76+</div>
                <div className="about-stat-lbl">DSA Problems Solved</div>
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
