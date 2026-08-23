import { useEffect, useRef } from "react";
import "@/styles/ui/Cursor.css";

export function Cursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);

  const mousePos = useRef({ x: -100, y: -100 });
  const dotPos = useRef({ x: -100, y: -100 });
  const ringPos = useRef({ x: -100, y: -100 });
  const isHovering = useRef(false);
  const isVisible = useRef(false);

  useEffect(() => {
    // Only initialize custom cursor on devices that support hover (non-touch)
    if (typeof window === "undefined" || window.matchMedia("(pointer: coarse)").matches) {
      return;
    }

    const handleMouseMove = (e) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
      if (!isVisible.current) {
        isVisible.current = true;
        if (dotRef.current) dotRef.current.style.opacity = "1";
        if (ringRef.current) ringRef.current.style.opacity = "1";
      }
    };

    const handleMouseOver = (e) => {
      const target = e.target;
      const isInteractive = target.closest(
        'a, button, input, textarea, select, [role="button"], .project-card, .cert-card, .cp-card, .pull-cord__bulb, .profile-dp, .about-avatar'
      );
      if (isInteractive) {
        isHovering.current = true;
        if (ringRef.current) {
          ringRef.current.classList.add("cursor-ring--hover");
        }
      }
    };

    const handleMouseOut = (e) => {
      const target = e.target;
      const isInteractive = target.closest(
        'a, button, input, textarea, select, [role="button"], .project-card, .cert-card, .cp-card, .pull-cord__bulb, .profile-dp, .about-avatar'
      );
      if (isInteractive) {
        isHovering.current = false;
        if (ringRef.current) {
          ringRef.current.classList.remove("cursor-ring--hover");
        }
      }
    };

    const handleMouseLeaveWindow = () => {
      isVisible.current = false;
      if (dotRef.current) dotRef.current.style.opacity = "0";
      if (ringRef.current) ringRef.current.style.opacity = "0";
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("mouseover", handleMouseOver, { passive: true });
    window.addEventListener("mouseout", handleMouseOut, { passive: true });
    document.addEventListener("mouseleave", handleMouseLeaveWindow);

    let animationId;
    const DOT_FACTOR = 0.35;
    const RING_FACTOR = 0.14;

    const render = () => {
      // Lerp calculations
      dotPos.current.x += (mousePos.current.x - dotPos.current.x) * DOT_FACTOR;
      dotPos.current.y += (mousePos.current.y - dotPos.current.y) * DOT_FACTOR;

      ringPos.current.x += (mousePos.current.x - ringPos.current.x) * RING_FACTOR;
      ringPos.current.y += (mousePos.current.y - ringPos.current.y) * RING_FACTOR;

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${dotPos.current.x}px, ${dotPos.current.y}px, 0) translate(-50%, -50%)`;
      }

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringPos.current.x}px, ${ringPos.current.y}px, 0) translate(-50%, -50%)`;
      }

      animationId = requestAnimationFrame(render);
    };

    animationId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseover", handleMouseOver);
      window.removeEventListener("mouseout", handleMouseOut);
      document.removeEventListener("mouseleave", handleMouseLeaveWindow);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <div className="cursor-wrapper" aria-hidden="true">
      <div ref={dotRef} className="cursor-dot" />
      <div ref={ringRef} className="cursor-ring" />
    </div>
  );
}

export default Cursor;
