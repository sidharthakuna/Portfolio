import { useState, useRef, useCallback, useEffect } from "react";
import "../Stylings/PullCord.css";

const L0 = 36;             // Rest length of beaded cord in px
const DRAG_THRESHOLD = 38; // Pulled distance to toggle theme
const FOB_WIDTH = 32;
const FOB_HEIGHT = 42;

// Physics Simulation Constants
const SPRING_K = 0.28;     // Spring stiffness for length
const SPRING_DAMP = 0.72;  // Spring damping
const PENDULUM_K = 0.20;   // Pendulum gravity torque
const PENDULUM_DAMP = 0.85;// Pendulum damping

function readInitialTheme() {
  const stored = localStorage.getItem("theme");
  if (stored === "light" || stored === "dark") return stored;
  return "dark";
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
      {/* Screw base — sits at top against the chain */}
      <rect x="11.5" y="2" width="9" height="9" rx="1.5" fill="var(--bulb-base)" />
      <line x1="11.5" y1="4.3" x2="20.5" y2="4.3" stroke="var(--bulb-glass)" strokeWidth="0.8" opacity="0.6" />
      <line x1="11.5" y1="6.6" x2="20.5" y2="6.6" stroke="var(--bulb-glass)" strokeWidth="0.8" opacity="0.6" />
      <line x1="11.5" y1="8.9" x2="20.5" y2="8.9" stroke="var(--bulb-glass)" strokeWidth="0.8" opacity="0.6" />
      <rect x="13.5" y="0.5" width="5" height="2.5" rx="1" fill="var(--bulb-base)" />

      {/* Neck connecting base to glass envelope */}
      <rect x="12" y="11" width="8" height="3" fill="var(--bulb-base)" opacity="0.7" />

      {/* Glass envelope */}
      <path
        d="M11 14 L11 16 C 8 18 5 21 5 26 C 5 32 9 37 16 37
           C 23 37 27 32 27 26 C 27 21 24 18 21 16 L21 14 Z"
        fill="var(--bulb-glass)"
        stroke="var(--bulb-base)"
        strokeWidth="1.4"
      />

      {/* Glowing tungsten filament */}
      <path
        d="M12 21 L15 27 L12 29 L20 23 L17 21 L20 29"
        stroke="var(--bulb-filament)"
        strokeWidth="1.8"
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
      aria-hidden="true"
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
  const [theta, setTheta] = useState(0); // Pendulum angle (radians)
  const [length, setLength] = useState(L0); // String length (px)
  const [isDragging, setIsDragging] = useState(false);

  const startPointerRef = useRef({ x: 0, y: 0 });
  const isDraggingRef = useRef(false);
  const animFrameRef = useRef(null);

  // Sync data-theme attribute on document on mount and update
  useEffect(() => {
    if (theme === "light") {
      document.documentElement.setAttribute("data-theme", "light");
    } else {
      document.documentElement.removeAttribute("data-theme");
    }
  }, [theme]);

  const applyTheme = useCallback((next) => {
    setTheme(next);
    if (next === "light") {
      document.documentElement.setAttribute("data-theme", "light");
    } else {
      document.documentElement.removeAttribute("data-theme");
    }
    localStorage.setItem("theme", next);
  }, []);

  // Physics Simulation Loop on Release
  const runPhysicsRelease = useCallback((initTheta, initLength, initOmega = 0) => {
    if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);

    let curTheta = initTheta;
    let curLength = initLength;
    let omega = initOmega;
    let vLength = 0;

    const tick = () => {
      // 1. Spring restoring force on length (Hooke's Law)
      const forceLength = -SPRING_K * (curLength - L0);
      vLength = (vLength + forceLength) * SPRING_DAMP;
      curLength += vLength;

      // 2. Gravitational pendulum restoring torque
      const torque = -PENDULUM_K * Math.sin(curTheta);
      omega = (omega + torque) * PENDULUM_DAMP;
      curTheta += omega;

      // 3. Convergence check to rest state
      if (
        Math.abs(curTheta) < 0.005 &&
        Math.abs(omega) < 0.005 &&
        Math.abs(curLength - L0) < 0.1 &&
        Math.abs(vLength) < 0.1
      ) {
        setTheta(0);
        setLength(L0);
        return;
      }

      setTheta(curTheta);
      setLength(curLength);
      animFrameRef.current = requestAnimationFrame(tick);
    };

    animFrameRef.current = requestAnimationFrame(tick);
  }, []);

  const onPointerDown = (e) => {
    if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    isDraggingRef.current = true;
    startPointerRef.current = { x: e.clientX, y: e.clientY };
    setIsDragging(true);
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e) => {
    if (!isDraggingRef.current) return;
    const dx = e.clientX - startPointerRef.current.x; // Left = negative, Right = positive
    const dy = Math.max(-10, e.clientY - startPointerRef.current.y);

    // Exact pendulum angle calculation
    const rawTheta = Math.atan2(dx, Math.max(10, L0 + dy));
    const clampedTheta = Math.max(-Math.PI / 3, Math.min(Math.PI / 3, rawTheta));

    // Elastic cord extension
    const dist = Math.sqrt(dx * dx + (L0 + Math.max(0, dy)) * (L0 + Math.max(0, dy)));
    const stretch = Math.max(0, dist - L0);
    const dampedStretch = Math.min(30, stretch / (1 + stretch * 0.015));
    const curLength = L0 + dampedStretch;

    setTheta(clampedTheta);
    setLength(curLength);
  };

  const endDrag = (e) => {
    if (!isDraggingRef.current) return;
    isDraggingRef.current = false;
    setIsDragging(false);

    const pullDistance = length - L0;
    if (pullDistance >= DRAG_THRESHOLD * 0.55 || (length * Math.cos(theta) - L0) >= 18) {
      applyTheme(theme === "dark" ? "light" : "dark");
    }

    const releaseOmega = e?.clientX ? (e.clientX - startPointerRef.current.x) * 0.005 : 0;
    runPhysicsRelease(theta, length, releaseOmega);
  };

  const onKeyDown = (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      applyTheme(theme === "dark" ? "light" : "dark");
      runPhysicsRelease(-0.35, L0 + 16, 0);
    }
  };

  // Pure geometry calculations
  const posX = length * Math.sin(theta);
  const posY = length * Math.cos(theta);
  // Negative sign ensures bulb bottom points along the string vector in direction of pull
  const deg = (-theta * 180) / Math.PI;

  const isLit = theme === "dark";
  const pulledRatio = Math.min(Math.max(0, length - L0) / 25, 1);

  const CANVAS_W = 160;
  const CANVAS_H = 200;
  const ORIGIN_X = 80;
  const ORIGIN_Y = 0;

  return (
    <div className="pull-cord">
      {/* Anchor Socket flush on navbar bottom divider line */}
      <div className="pull-cord__mount" aria-hidden="true">
        <span className="pull-cord__mount-ring" />
      </div>

      {/* Dynamic Straight Beaded Chain SVG from (ORIGIN_X, 0) to (ORIGIN_X + posX, posY) */}
      <svg
        className="pull-cord__svg-canvas"
        width={CANVAS_W}
        height={CANVAS_H}
        viewBox={`0 0 ${CANVAS_W} ${CANVAS_H}`}
        aria-hidden="true"
      >
        <line
          x1={ORIGIN_X}
          y1={ORIGIN_Y}
          x2={ORIGIN_X + posX}
          y2={posY}
          stroke="var(--chain-bead)"
          strokeWidth="3.5"
          strokeLinecap="round"
          strokeDasharray="0.1 7"
        />
      </svg>

      {/* Lightbulb Fob anchored exactly at (posX, posY) and rotated by string angle */}
      <div
        className={[
          "pull-cord__bulb",
          isDragging ? "pull-cord__bulb--dragging" : "",
        ].join(" ").trim()}
        style={{
          transform: `translate(${posX}px, ${posY}px) rotate(${deg}deg)`,
          transformOrigin: "top center",
        }}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        onKeyDown={onKeyDown}
        role="switch"
        aria-checked={theme === "dark"}
        aria-label={`Pull cord to switch to ${theme === "dark" ? "light" : "dark"} theme`}
        tabIndex={0}
      >
        {isLit && (
          <span
            className="pull-cord__glow"
            style={{ opacity: 0.6 + pulledRatio * 0.4 }}
          />
        )}
        <LightbulbFob />

        <PullHintChevron
          style={{ opacity: isDragging ? 0.1 : 0.75 }}
        />
      </div>
    </div>
  );
}