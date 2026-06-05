import "../Stylings/Navbar.css";
import { useState,useEffect } from "react";
import profilePic from "../assets/profile.jpg"
import DP from "./DP"
function Navbar() {
  const [active, setActive] = useState("home");

  const [showProfile,setShowProfile] = useState(false);

  const handleClick = (section) => {
    setActive(section);

    const element = document.getElementById(section);

    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
  const sections = ["home", "about", "skills", "projects", "journey", "contact"];

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActive(entry.target.id);
        }
      });
    },
    { threshold:  0.2, rootMargin: "-10% 0px -70% 0px"  }
  );

  sections.forEach((id) => {
    const el = document.getElementById(id);
    if (el) observer.observe(el);
  });

  return () => observer.disconnect();
}, []);

  return (<>
      <nav>
      <div className="logo">
        <img 
         src={profilePic} 
         alt="Profile" 
         className="profile-dp"
         onClick={()=> setShowProfile(true)}
         ></img>
        <span>Sidhartha Kuna</span>
      </div>

      <div className="nav-links">
        <button
          className={`nav-link ${
            active === "home" ? "active" : ""
          }`}
          onClick={() => handleClick("home")}
        >
          Home
        </button>

        <button
          className={`nav-link ${
            active === "about" ? "active" : ""
          }`}
          onClick={() => handleClick("about")}
        >
          About
        </button>

        <button
          className={`nav-link ${
            active === "skills" ? "active" : ""
          }`}
          onClick={() => handleClick("skills")}
        >
          Skills
        </button>

        <button
          className={`nav-link ${
            active === "projects" ? "active" : ""
          }`}
          onClick={() => handleClick("projects")}
        >
          Projects
        </button>

        <button
          className={`nav-link ${
            active === "journey" ? "active" : ""
          }`}
          onClick={() => handleClick("journey")}
        >
          Journey
        </button>

        <button
          className={`nav-link ${
            active === "contact" ? "active" : ""
          }`}
          onClick={() => handleClick("contact")}
        >
          Contact
        </button>
      </div>

      <button className="resume-btn">
        Download Resume ↓
      </button>     
    </nav>
          <DP
        isOpen={showProfile}
        onClose={() => setShowProfile(false)}
      />
  
  </>

  );
}

export default Navbar;