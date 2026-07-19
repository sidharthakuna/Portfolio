import { useState, useRef, useCallback } from "react";
import "../Stylings/PullCord.css";

const DRAG_THRESHOLD = 55; // px pulled before it counts as a toggle
const CORD_REST_LENGTH = 34; // px, cord length when idle
const FOB_WIDTH = 32;
const FOB_HEIGHT = 42;

function readInitialTheme() {
  const stored = localStorage.getItem("theme");
  if (stored) return stored;
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

function LightbulbFob() {
  return (
    <svg
      className="pull-cord__fob-svg"
      width={FOB_WIDTH}
      height={FOB_HEIGHT}
      viewBox="0 0 32 42"
      fill="none"
    >
      {/* screw base — sits at the TOP, against the chain */}
      <rect x="11.5" y="2" width="9" height="9" rx="1.5" fill="var(--bulb-base)" />
      <line x1="11.5" y1="4.3" x2="20.5" y2="4.3" stroke="var(--bulb-glass)" strokeWidth="0.8" opacity="0.5" />
      <line x1="11.5" y1="6.6" x2="20.5" y2="6.6" stroke="var(--bulb-glass)" strokeWidth="0.8" opacity="0.5" />
      <line x1="11.5" y1="8.9" x2="20.5" y2="8.9" stroke="var(--bulb-glass)" strokeWidth="0.8" opacity="0.5" />
      <rect x="13.5" y="0.5" width="5" height="2.5" rx="1" fill="var(--bulb-base)" />

      {/* neck connecting base to glass */}
      <rect x="12" y="11" width="8" height="3" fill="var(--bulb-base)" opacity="0.5" />

      {/* glass envelope — hangs BELOW, rounded end pointing down */}
      <path
        d="M11 14 L11 16 C 8 18 5 21 5 26 C 5 32 9 37 16 37
           C 23 37 27 32 27 26 C 27 21 24 18 21 16 L21 14 Z"
        fill="var(--bulb-glass)"
        stroke="var(--bulb-base)"
        strokeWidth="1.2"
      />

      {/* filament, redrawn to sit inside the lowered glass */}
      <path
        d="M12 21 L15 27 L12 29 L20 23 L17 21 L20 29"
        stroke="var(--bulb-filament)"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  );
}

function PullHintChevron({ style }) {
  return (
    <svg
      className="pull-cord__hint"
      width="14"
      height="8"
      viewBox="0 0 14 8"
      fill="none"
      style={style}
    >
      <path
        d="M1 1 L7 7 L13 1"
        stroke="var(--hint-color)"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function PullCord() {
  const [theme, setTheme] = useState(readInitialTheme);
  const [dragY, setDragY] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [isSwinging, setIsSwinging] = useState(false);

  const startYRef = useRef(0);
  const draggingRef = useRef(false);

  const applyTheme = useCallback((next) => {
    setTheme(next);
    if (next === "light") {
      document.documentElement.setAttribute("data-theme", "light");
    } else {
      document.documentElement.removeAttribute("data-theme");
    }
    localStorage.setItem("theme", next);
  }, []);

  const onPointerDown = (e) => {
    draggingRef.current = true;
    startYRef.current = e.clientY;
    setIsDragging(true);
    setIsSwinging(false);
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e) => {
    if (!draggingRef.current) return;
    const delta = Math.max(0, e.clientY - startYRef.current);
    setDragY(Math.min(delta, DRAG_THRESHOLD * 1.6));
  };

  const endDrag = () => {
    if (!draggingRef.current) return;
    draggingRef.current = false;
    setIsDragging(false);

    if (dragY >= DRAG_THRESHOLD) {
      applyTheme(theme === "dark" ? "light" : "dark");
    }

    setDragY(0);
    setIsSwinging(true);
    window.setTimeout(() => setIsSwinging(false), 700);
  };

  const onKeyDown = (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      applyTheme(theme === "dark" ? "light" : "dark");
      setIsSwinging(true);
      window.setTimeout(() => setIsSwinging(false), 700);
    }
  };

  const pulledRatio = Math.min(dragY / DRAG_THRESHOLD, 1);
  const cordLength = CORD_REST_LENGTH + dragY;
  // Bulb is warm/cream in dark theme (reads as "lit") and solid black in
  // light theme (reads as "off"/silhouette), so the glow follows dark theme.
  // Flip to `theme === "light"` if you'd rather it glow in light theme.
  const isLit = theme === "dark";

  return (
    <div className="pull-cord">
      <svg
        className="pull-cord__thread"
        width="8"
        height={cordLength}
        style={{ height: cordLength }}
      >
        <line
          x1="4"
          y1="0"
          x2="4"
          y2={cordLength}
          stroke="var(--chain-bead)"
          strokeWidth="4"
          strokeLinecap="round"
          strokeDasharray="0.1 7"
        />
      </svg>

      <div
        className={[
          "pull-cord__bulb",
          isDragging ? "pull-cord__bulb--dragging" : "",
          isSwinging ? "pull-cord__bulb--swinging" : "",
        ].join(" ").trim()}
        style={{
          transform: `translateY(${dragY}px) scale(${1 + pulledRatio * 0.06})`,
        }}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        onKeyDown={onKeyDown}
        role="switch"
        aria-checked={theme === "dark"}
        aria-label={`Pull to switch to ${theme === "dark" ? "light" : "dark"} theme`}
        tabIndex={0}
      >
        {isLit && (
          <span
            className="pull-cord__glow"
            style={{ opacity: 0.45 + pulledRatio * 0.45 }}
          />
        )}
        <LightbulbFob />
      </div>

      <PullHintChevron
        style={{ opacity: isDragging ? 0.15 : 1 }}
      />
    </div>
  );
}