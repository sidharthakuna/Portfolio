import { FiArrowUp } from "react-icons/fi";
import { useScrollPosition } from "@/hooks";
import "@/styles/layout/ScrollToTop.css";

export function ScrollToTop() {
  const { scrollY } = useScrollPosition(300);
  const visible = scrollY > 300;

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

export default ScrollToTop;
