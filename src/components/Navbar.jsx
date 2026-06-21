import "../Stylings/Navbar.css";
import { useState, useEffect, useRef } from "react";
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
  const [scrolled, setScrolled]       = useState(false);

  const navLinksRef = useRef(null);
  const [indicator, setIndicator] = useState({ left: 0, width: 0, opacity: 0 });

  // True while a nav click is driving the scroll — prevents the
  // IntersectionObserver / bottom-of-page logic from fighting the click
  // and overwriting `active` mid-scroll.
  const isNavigatingRef = useRef(false);
  const navigateTimeoutRef = useRef(null);

  const handleResumeDownload = () => {
    const link = document.createElement("a");
    link.href = "/Portfolio/Sidhartha_Kuna_Resume.pdf";
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

    setTimeout(() => {
      const element = document.getElementById(section);
      if (element) element.scrollIntoView({ behavior: "smooth" });

      // Give the smooth scroll time to finish before letting
      // scroll/observer logic take control of `active` again.
      navigateTimeoutRef.current = setTimeout(() => {
        isNavigatingRef.current = false;
      }, 700);
    }, 300);
  };

  // Section detection — when multiple sections intersect at once (common with
  // short sections near the bottom, e.g. Contact), pick whichever is closest
  // to the top of the viewport instead of "last one wins".
  useEffect(() => {
    const visible = new Map(); // id -> distance from top of viewport

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
      { threshold: 0.2, rootMargin: "-10% 0px -70% 0px" }
    );
    NAV_SECTIONS.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  // Shrink navbar on scroll + force "contact" active at the very bottom of
  // the page (short last sections don't always cross the intersection
  // threshold, which was the root cause of the stuck-on-previous-link bug).
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 16);

      if (isNavigatingRef.current) return;

      const atBottom =
        window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2;
      if (atBottom) {
        const last = NAV_SECTIONS[NAV_SECTIONS.length - 1];
        setActive(last);
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Sliding underline indicator — track active nav-link's position/width
  useEffect(() => {
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
  }, [active, scrolled]);

  return (
    <>
      {/* Skip to main content — hidden until focused */}
      <a href="#home" className="skip-link">Skip to main content</a>

      <nav aria-label="Main navigation" className={scrolled ? "nav-scrolled" : ""}>
        {/* Logo */}
        <div className="logo">
          <div className="logo-avatar">
            <img
              src={profilePic}
              alt="Sidhartha Kuna – view profile photo"
              className="profile-dp"
              onClick={() => setShowProfile(true)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === "Enter" && setShowProfile(true)}
            />
          </div>
          <span>Sidhartha Kuna</span>
        </div>

        {/* Desktop nav links */}
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
          <span
            className="nav-indicator"
            style={{
              transform: `translateX(${indicator.left}px)`,
              width: indicator.width,
              opacity: indicator.opacity,
            }}
            aria-hidden="true"
          />
        </div>

        {/* Desktop resume button */}
        <button className="resume-btn" onClick={() => {handleResumeDownload()}}>
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
        <div id="mobile-menu" className={`mobile-menu${menuOpen ? " mobile-menu--open" : ""}`}  role="navigation" aria-label="Mobile navigation">
          {NAV_SECTIONS.map((section, i) => (
            <button
              key={section}
              className={`mobile-link ${active === section ? "active" : ""}`}
              style={{ animationDelay: `${i * 0.04}s` }}
              onClick={() => handleClick(section)}
              aria-current={active === section ? "page" : undefined}
            >
              {NAV_LABELS[section]}
            </button>
          ))}
          <button
            className="mobile-resume-btn"
            style={{ animationDelay: `${NAV_SECTIONS.length * 0.04}s` }}
            onClick={() => {
              handleResumeDownload();
              setMenuOpen(false)
            }}
          >
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