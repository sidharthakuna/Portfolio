import { useState, useEffect, useRef, useCallback } from "react";
import { HiDownload, HiX, HiMenuAlt3 } from "react-icons/hi";
import profilePic from "@/assets/profile.jpg";
import { DP, PullCord } from "@/components/common";
import { NAV_SECTIONS, NAV_LABELS } from "@/data";
import { useScrollSpy, useScrollPosition } from "@/hooks";
import { downloadResume } from "@/utils";
import "@/styles/layout/Navbar.css";

export function Navbar() {
  const [showProfile, setShowProfile] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const { isScrolled } = useScrollPosition(20);
  const { activeSection, scrollToSection } = useScrollSpy(NAV_SECTIONS, "home");

  const navLinksRef = useRef(null);
  const [indicator, setIndicator] = useState({ left: 0, width: 0, opacity: 0 });

  const handleNavClick = (section) => {
    setMenuOpen(false);
    scrollToSection(section);
  };

  // Sliding underline capsule indicator position calculation
  const updateIndicator = useCallback(() => {
    const container = navLinksRef.current;
    if (!container) return;
    const activeEl = container.querySelector(`.nav-link[data-section="${activeSection}"]`);
    if (activeEl) {
      setIndicator({
        left: activeEl.offsetLeft,
        width: activeEl.offsetWidth,
        opacity: 1,
      });
    }
  }, [activeSection]);

  useEffect(() => {
    updateIndicator();
    window.addEventListener("resize", updateIndicator);
    return () => window.removeEventListener("resize", updateIndicator);
  }, [updateIndicator, isScrolled]);

  return (
    <>
      {/* Accessible skip link */}
      <a href="#home" className="skip-link">
        Skip to main content
      </a>

      <header className={`nav-header ${isScrolled ? "nav-scrolled" : ""}`}>
        <nav aria-label="Main navigation" className="nav-container">
          {/* Brand / Logo */}
          <div
            className="logo"
            onClick={() => handleNavClick("home")}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === "Enter" && handleNavClick("home")}
          >
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
                className={`nav-link ${activeSection === section ? "active" : ""}`}
                onClick={() => handleNavClick(section)}
                aria-current={activeSection === section ? "page" : undefined}
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
            <button
              className="resume-btn"
              onClick={downloadResume}
              aria-label="Download Sidhartha Kuna Resume PDF"
            >
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
              {menuOpen ? (
                <HiX size={22} aria-hidden="true" />
              ) : (
                <HiMenuAlt3 size={22} aria-hidden="true" />
              )}
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile Drawer Navigation */}
      {menuOpen && (
        <div
          id="mobile-menu"
          className={`mobile-menu${menuOpen ? " mobile-menu--open" : ""}`}
          role="navigation"
          aria-label="Mobile navigation"
        >
          <div className="mobile-menu-inner">
            {NAV_SECTIONS.map((section, i) => (
              <button
                key={section}
                className={`mobile-link ${activeSection === section ? "active" : ""}`}
                style={{ animationDelay: `${i * 0.03}s` }}
                onClick={() => handleNavClick(section)}
                aria-current={activeSection === section ? "page" : undefined}
              >
                <span className="mobile-link-num">0{i + 1}.</span>
                <span>{NAV_LABELS[section]}</span>
              </button>
            ))}
            <button
              className="mobile-resume-btn"
              onClick={() => {
                downloadResume();
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
