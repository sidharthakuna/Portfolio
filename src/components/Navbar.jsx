import "../Stylings/Navbar.css";
import { useState, useEffect, useRef, useCallback } from "react";
import profilePic from "../assets/profile.jpg";
import DP from "./DP";
import PullCord from "./PullCord";
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
  certifications: "Certs",
  "coding-profiles": "Profiles",
  contact: "Contact",
};

function Navbar() {
  const [active, setActive]           = useState("home");
  const [showProfile, setShowProfile] = useState(false);
  const [menuOpen, setMenuOpen]       = useState(false);
  const [scrolled, setScrolled]       = useState(false);

  const navLinksRef = useRef(null);
  const [indicator, setIndicator] = useState({ left: 0, width: 0, opacity: 0 });

  const isNavigatingRef = useRef(false);
  const navigateTimeoutRef = useRef(null);

  const handleResumeDownload = () => {
    const link = document.createElement("a");
    const baseUrl = import.meta.env.BASE_URL.endsWith("/")
      ? import.meta.env.BASE_URL
      : `${import.meta.env.BASE_URL}/`;
    link.href = `${baseUrl}Sidhartha_Kuna_Resume.pdf`;
    link.download = "Sidhartha_Kuna_Resume.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleClick = (section) => {
    setMenuOpen(false);
    setActive(section);

    isNavigatingRef.current = true;
    if (navigateTimeoutRef.current) clearTimeout(navigateTimeoutRef.current);

    const element = document.getElementById(section);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }

    navigateTimeoutRef.current = setTimeout(() => {
      isNavigatingRef.current = false;
    }, 750);
  };

  // Section detection via IntersectionObserver
  useEffect(() => {
    const visible = new Map();

    const observer = new IntersectionObserver(
      (entries) => {
        if (isNavigatingRef.current) return;

        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            visible.set(entry.target.id, entry.boundingClientRect.top);
          } else {
            visible.delete(entry.target.id);
          }
        });

        if (visible.size === 0) return;

        const topMost = [...visible.entries()].reduce((a, b) =>
          Math.abs(a[1]) < Math.abs(b[1]) ? a : b
        );
        setActive(topMost[0]);
      },
      { threshold: 0.2, rootMargin: "-10% 0px -65% 0px" }
    );

    NAV_SECTIONS.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  // Navbar shrink & bottom-of-page contact snap
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20);

      if (isNavigatingRef.current) return;

      const atBottom =
        window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 6;
      if (atBottom) {
        const last = NAV_SECTIONS[NAV_SECTIONS.length - 1];
        setActive(last);
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Sliding underline capsule indicator position calculation
  const updateIndicator = useCallback(() => {
    const container = navLinksRef.current;
    if (!container) return;
    const activeEl = container.querySelector(`.nav-link[data-section="${active}"]`);
    if (activeEl) {
      setIndicator({
        left: activeEl.offsetLeft,
        width: activeEl.offsetWidth,
        opacity: 1,
      });
    }
  }, [active]);

  useEffect(() => {
    updateIndicator();
    window.addEventListener("resize", updateIndicator);
    return () => window.removeEventListener("resize", updateIndicator);
  }, [updateIndicator, scrolled]);

  return (
    <>
      {/* Accessible skip link */}
      <a href="#home" className="skip-link">Skip to main content</a>

      <header className={`nav-header ${scrolled ? "nav-scrolled" : ""}`}>
        <nav aria-label="Main navigation" className="nav-container">
          {/* Brand / Logo */}
          <div className="logo" onClick={() => handleClick("home")} role="button" tabIndex={0} onKeyDown={(e) => e.key === "Enter" && handleClick("home")}>
            <div className="logo-avatar-wrap">
              <img
                src={profilePic}
                alt="Sidhartha Kuna"
                className="profile-dp"
                onClick={(e) => {
                  e.stopPropagation();
                  setShowProfile(true);
                }}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.stopPropagation();
                    setShowProfile(true);
                  }
                }}
                title="Click to view full photo"
              />
              <span className="logo-live-dot" aria-hidden="true" />
            </div>
            <div className="logo-text">
              <span className="logo-name">Sidhartha Kuna</span>
              <span className="logo-role">Backend Engineer</span>
            </div>
          </div>

          {/* Desktop Nav Links Capsule */}
          <div className="nav-links" ref={navLinksRef}>
            {NAV_SECTIONS.map((section) => (
              <button
                key={section}
                data-section={section}
                className={`nav-link ${active === section ? "active" : ""}`}
                onClick={() => handleClick(section)}
                aria-current={active === section ? "page" : undefined}
              >
                {NAV_LABELS[section]}
              </button>
            ))}

            {/* Sliding Pill Background */}
            <span
              className="nav-indicator"
              style={{
                transform: `translateX(${indicator.left}px)`,
                width: indicator.width,
                opacity: indicator.opacity,
              }}
              aria-hidden="true"
            />

            {/* Micro Laser Bulb Indicator */}
            <span
              className="nav-bulb"
              style={{
                transform: `translateX(${indicator.left + indicator.width / 2 - 13}px)`,
                opacity: indicator.opacity,
              }}
              aria-hidden="true"
            />
          </div>

          {/* Desktop Actions & Pull Cord (Rightmost) */}
          <div className="nav-actions">
            <button className="resume-btn" onClick={handleResumeDownload} aria-label="Download Sidhartha Kuna Resume PDF">
              <HiDownload aria-hidden="true" className="resume-btn-icon" />
              <span>Resume</span>
            </button>

            {/* Theme Pull Cord - Anchored next to Resume button on navbar divider line */}
            <PullCord />

            {/* Mobile Hamburger Toggle */}
            <button
              className="hamburger"
              onClick={() => setMenuOpen((prev) => !prev)}
              aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
            >
              {menuOpen
                ? <HiX size={22} aria-hidden="true" />
                : <HiMenuAlt3 size={22} aria-hidden="true" />}
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile Drawer Navigation */}
      {menuOpen && (
        <div id="mobile-menu" className={`mobile-menu${menuOpen ? " mobile-menu--open" : ""}`} role="navigation" aria-label="Mobile navigation">
          <div className="mobile-menu-inner">
            {NAV_SECTIONS.map((section, i) => (
              <button
                key={section}
                className={`mobile-link ${active === section ? "active" : ""}`}
                style={{ animationDelay: `${i * 0.03}s` }}
                onClick={() => handleClick(section)}
                aria-current={active === section ? "page" : undefined}
              >
                <span className="mobile-link-num">0{i + 1}.</span>
                <span>{NAV_LABELS[section]}</span>
              </button>
            ))}
            <button
              className="mobile-resume-btn"
              onClick={() => {
                handleResumeDownload();
                setMenuOpen(false);
              }}
            >
              <HiDownload aria-hidden="true" style={{ marginRight: "8px" }} />
              Download Resume (PDF)
            </button>
          </div>
        </div>
      )}

      {/* Profile Photo Lightbox Modal */}
      <DP isOpen={showProfile} onClose={() => setShowProfile(false)} />
    </>
  );
}

export default Navbar;