import "../Stylings/Navbar.css";
import { useState, useEffect } from "react";
import profilePic from "../assets/profile.jpg";
import DP from "./DP";
import { HiDownload, HiX, HiMenuAlt3 } from "react-icons/hi";

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

  const handleClick = (section) => {
    setMenuOpen(false);
    setActive(section);
    setTimeout(() => {
      const element = document.getElementById(section);
      if (element) element.scrollIntoView({ behavior: "smooth" });
    }, 300);
  };

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
      {/* Skip to main content — hidden until focused */}
      <a href="#home" className="skip-link">Skip to main content</a>

      <nav aria-label="Main navigation">
        {/* Logo */}
        <div className="logo">
          <img
            src={profilePic}
            alt="Sidhartha Kuna – view profile photo"
            className="profile-dp"
            onClick={() => setShowProfile(true)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === "Enter" && setShowProfile(true)}
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
              aria-current={active === section ? "page" : undefined}
            >
              {NAV_LABELS[section]}
            </button>
          ))}
        </div>

        {/* Desktop resume button */}
        <button className="resume-btn" onClick={() => {}}>
          <HiDownload
            aria-hidden="true"
            style={{ marginRight: "6px", verticalAlign: "middle", fontSize: "15px" }}
          />
          Download Resume
        </button>

        {/* Hamburger toggle — mobile only */}
        <button
          className="hamburger"
          onClick={() => setMenuOpen((prev) => !prev)}
          aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
        >
          {menuOpen
            ? <HiX size={20} color="#58A6FF" aria-hidden="true" />
            : <HiMenuAlt3 size={20} color="#58A6FF" aria-hidden="true" />}
        </button>
      </nav>

      {/* Mobile dropdown */}
      {menuOpen && (
        <div id="mobile-menu" className="mobile-menu" role="navigation" aria-label="Mobile navigation">
          {NAV_SECTIONS.map((section) => (
            <button
              key={section}
              className={`mobile-link ${active === section ? "active" : ""}`}
              onClick={() => handleClick(section)}
              aria-current={active === section ? "page" : undefined}
            >
              {NAV_LABELS[section]}
            </button>
          ))}
          <button className="mobile-resume-btn" onClick={() => setMenuOpen(false)}>
            <HiDownload aria-hidden="true" style={{ marginRight: "6px", verticalAlign: "middle" }} />
            Download Resume
          </button>
        </div>
      )}

      <DP isOpen={showProfile} onClose={() => setShowProfile(false)} />
    </>
  );
}

export default Navbar;