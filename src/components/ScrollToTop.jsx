import { useState, useEffect } from "react";
import { FiArrowUp } from "react-icons/fi";
import "../Stylings/ScrollToTop.css";

export default function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <button
      className={`floating-scroll-top ${visible ? "floating-scroll-top--visible" : ""}`}
      onClick={scrollToTop}
      aria-label="Scroll back to top"
      title="Scroll to top"
    >
      <FiArrowUp size={18} />
    </button>
  );
}
