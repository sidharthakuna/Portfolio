import "../Stylings/About.css";
import { useState } from "react";
import profilePic from "../assets/profile.jpg";
import DP from "./DP";

function About() {

  const [showProfile,setShowProfile] = useState(false);

  return (
    <section id="about" className="card about-card">
      <div className="about-header">
        <img
          src={profilePic}
          alt="Sidhartha Kuna"
          className="about-avatar"
          onClick={()=>setShowProfile(true)}
        />
        <div>
          <div className="about-name">Sidhartha Kuna</div>
          <div className="about-role">B.Tech CSE · Raghu Engineering College</div>
        </div>
      </div>

      <div className="about-divider" />

      <p className="about-text">
        I'm a passionate backend developer who loves building clean, scalable
        systems. Currently pursuing B.Tech in Computer Science at{" "}
        <span className="about-highlight">Raghu Engineering College</span>,
        expected to graduate in <span className="about-highlight">2028</span>.
      </p>

      <p className="about-text" style={{ marginTop: "10px" }}>
        My primary stack is{" "}
        <span className="about-highlight">Java & Spring Boot</span> — I enjoy
        designing REST APIs, working with relational databases, and integrating
        backend services end-to-end.
      </p>

      <p className="about-text" style={{ marginTop: "10px" }}>
        Outside of coding I solve problems on{" "}
        <span className="about-highlight">LeetCode</span> and explore System
        Design concepts. Currently levelling up with{" "}
        <span className="about-highlight">AWS, Docker & Linux</span> to move
        toward cloud-native development.
      </p>

      <div className="about-divider" />

      <div className="about-stats">
        <div className="about-stat">
          <div className="about-stat-num">1+</div>
          <div className="about-stat-lbl">Projects Build</div>
        </div>
        <div className="about-stat-sep" />
        <div className="about-stat">
          <div className="about-stat-num">2yr</div>
          <div className="about-stat-lbl">Learning Journey</div>
        </div>
        <div className="about-stat-sep" />
        <div className="about-stat">
          <div className="about-stat-num">5+</div>
          <div className="about-stat-lbl">Technologies</div>
        </div>
        <div className="about-stat-sep" />
        <div className="about-stat">
          <div className="about-stat-num">75+</div>
          <div className="about-stat-lbl">DSA Problems</div>
        </div>
      </div>
      <DP
        isOpen = {showProfile}
        onClose={()=>setShowProfile(false)}
      ></DP>
    </section>
  );
}

export default About;