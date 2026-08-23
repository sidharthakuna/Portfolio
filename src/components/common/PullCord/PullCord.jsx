import { useState, useRef, useCallback } from "react";
import { useTheme } from "@/hooks";
import LightbulbFob from "./LightbulbFob";
import PullHintChevron from "./PullHintChevron";
import "@/styles/ui/PullCord.css";

const L0 = 36;             // Rest length of beaded cord in px
const DRAG_THRESHOLD = 38; // Pulled distance to toggle theme

// Physics Simulation Constants
const SPRING_K = 0.28;     // Spring stiffness for length
const SPRING_DAMP = 0.72;  // Spring damping
const PENDULUM_K = 0.20;   // Pendulum gravity torque
const PENDULUM_DAMP = 0.85;// Pendulum damping

export function PullCord() {
  const { theme, toggleTheme } = useTheme();
  const [theta, setTheta] = useState(0); // Pendulum angle (radians)
  const [length, setLength] = useState(L0); // String length (px)
  const [isDragging, setIsDragging] = useState(false);

  const startPointerRef = useRef({ x: 0, y: 0 });
  const isDraggingRef = useRef(false);
  const animFrameRef = useRef(null);

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
      toggleTheme();
    }

    const releaseOmega = e?.clientX ? (e.clientX - startPointerRef.current.x) * 0.005 : 0;
    runPhysicsRelease(theta, length, releaseOmega);
  };

  const onKeyDown = (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      toggleTheme();
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

  const CANVAS_W = 100;
  const CANVAS_H = 180;
  const ORIGIN_X = 50;
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

export default PullCord;
