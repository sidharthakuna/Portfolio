import { useState, useEffect, useRef } from "react";

/**
 * Custom hook to detect the currently visible section on screen.
 * @param {string[]} sectionIds Array of section element IDs to observe
 * @param {string} initialSection Default active section ID
 * @returns {{ activeSection: string, setActiveSection: (id: string) => void, isNavigatingRef: React.MutableRefObject<boolean>, scrollToSection: (id: string) => void }}
 */
export function useScrollSpy(sectionIds, initialSection = "home") {
  const [activeSection, setActiveSection] = useState(initialSection);
  const isNavigatingRef = useRef(false);
  const navigateTimeoutRef = useRef(null);

  const scrollToSection = (sectionId) => {
    setActiveSection(sectionId);
    isNavigatingRef.current = true;

    if (navigateTimeoutRef.current) {
      clearTimeout(navigateTimeoutRef.current);
    }

    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }

    navigateTimeoutRef.current = setTimeout(() => {
      isNavigatingRef.current = false;
    }, 750);
  };

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
        setActiveSection(topMost[0]);
      },
      { threshold: 0.2, rootMargin: "-10% 0px -65% 0px" }
    );

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [sectionIds]);

  // Bottom of page detection
  useEffect(() => {
    const onScroll = () => {
      if (isNavigatingRef.current) return;

      const atBottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 6;
      if (atBottom && sectionIds.length > 0) {
        const last = sectionIds[sectionIds.length - 1];
        setActiveSection(last);
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [sectionIds]);

  return {
    activeSection,
    setActiveSection,
    scrollToSection,
    isNavigatingRef,
  };
}
