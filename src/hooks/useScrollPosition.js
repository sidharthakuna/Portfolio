import { useState, useEffect } from "react";

/**
 * Custom hook to track window scroll position.
 * @returns {{ scrollY: number, scrollX: number, isScrolled: boolean }}
 */
export function useScrollPosition(threshold = 20) {
  const [scrollState, setScrollState] = useState({
    scrollY: 0,
    scrollX: 0,
    isScrolled: false,
  });

  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY;
      const x = window.scrollX;
      setScrollState({
        scrollY: y,
        scrollX: x,
        isScrolled: y > threshold,
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, [threshold]);

  return scrollState;
}
