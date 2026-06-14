import "../Stylings/Navbar.css";
import { useState, useEffect } from "react";
import profilePic from "../assets/profile.jpg";
// import resumePDF from "../assets/resume.pdf";
import DP from "./DP";
import { HiDownload, HiMenu, HiX , HiMenuAlt3 } from "react-icons/hi";

const NAV_SECTIONS = [
  "home", "about", "skills", "projects", "journey",
  "education", "certifications", "coding-profiles", "contact",
];

const NAV_LABELS = {
  home: "Home",
  about: "About",
  skills: "Skills",
  projects: "Projects",
  journey: "Journey",
  education: "Education",
  certifications: "Certifications",
  "coding-profiles": "Profiles",
  contact: "Contact",
};

function Navbar() {
  const [active, setActive]           = useState("home");
  const [showProfile, setShowProfile] = useState(false);
  const [menuOpen, setMenuOpen]       = useState(false);

  // clicking a nav item — close menu then scroll
  const handleClick = (section) => {
    setMenuOpen(false);
    setActive(section);
    setTimeout(() => {
      const element = document.getElementById(section);
      if (element) element.scrollIntoView({ behavior: "smooth" });
    }, 300);
  };

  // active section tracking via IntersectionObserver
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { threshold: 0.2, rootMargin: "-10% 0px -70% 0px" }
    );
    NAV_SECTIONS.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <nav>
        {/* Logo */}
        <div className="logo">
          <img
            src={profilePic}
            alt="Profile"
            className="profile-dp"
            onClick={() => setShowProfile(true)}
          />
          <span>Sidhartha Kuna</span>
        </div>

        {/* Desktop nav links */}
        <div className="nav-links">
          {NAV_SECTIONS.map((section) => (
            <button
              key={section}
              className={`nav-link ${active === section ? "active" : ""}`}
              onClick={() => handleClick(section)}
            >
              {NAV_LABELS[section]}
            </button>
          ))}
        </div>

        {/* Desktop resume button */}
        <button className="resume-btn" onClick={() => {}}>
          <HiDownload style={{ marginRight: "6px", verticalAlign: "middle", fontSize: "15px" }} />
          Download Resume
        </button>

        {/* Hamburger toggle — mobile only */}
        <button
          className="hamburger"
          onClick={() => setMenuOpen((prev) => !prev)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <HiX size={20} color="#58A6FF" /> : <HiMenuAlt3 size={20} color="#58A6FF" />}
        </button>
      </nav>

      {/* Mobile dropdown */}
      {menuOpen && (
        <div className="mobile-menu">
          {NAV_SECTIONS.map((section) => (
            <button
              key={section}
              className={`mobile-link ${active === section ? "active" : ""}`}
              onClick={() => handleClick(section)}
            >
              {NAV_LABELS[section]}
            </button>
          ))}
          <button className="mobile-resume-btn" onClick={() => setMenuOpen(false)}>
            <HiDownload style={{ marginRight: "6px", verticalAlign: "middle" }} />
            Download Resume
          </button>
        </div>
      )}

      <DP isOpen={showProfile} onClose={() => setShowProfile(false)} />
    </>
  );
}

export default Navbar;