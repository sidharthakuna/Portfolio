import { useState, useRef, useCallback, useEffect } from "react";
import { useTheme } from "@/hooks";
import LightbulbFob from "./LightbulbFob";
import PullHintChevron from "./PullHintChevron";
import "@/styles/ui/PullCord.css";

const L0 = 38;              // Prominent rest length of beaded cord in px
const DRAG_THRESHOLD = 18;  // Vertical drag distance to trigger theme toggle

// Highly bouncy & natural spring-pendulum physics parameters
const SPRING_STIFFNESS = 480;   // Spring stiffness (s^-2)
const SPRING_DAMPING = 8.8;     // Spring damping rate (s^-1) -> low damping for lively bounciness
const PENDULUM_GRAV = 270;      // Pendulum gravity torque (s^-2)
const PENDULUM_DAMPING = 4.8;   // Pendulum damping rate (s^-1)

const CANVAS_W = 100;
const CANVAS_H = 180;
const ORIGIN_X = 50;
const ORIGIN_Y = 0;

export function PullCord() {
  const { theme, toggleTheme } = useTheme();
  const [isDragging, setIsDragging] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);

  const bulbRef = useRef(null);
  const lineRef = useRef(null);
  const glowRef = useRef(null);
  const hintRef = useRef(null);

  // Physics state kept in refs for 60/120/144fps zero-overhead rendering
  const physRef = useRef({
    theta: 0,
    length: L0,
    omega: 0,
    vLength: 0,
  });

  const isDraggingRef = useRef(false);
  const startPointerRef = useRef({ x: 0, y: 0, time: 0 });
  const animFrameRef = useRef(null);
  const themeRef = useRef(theme);

  // Synchronize themeRef and rest glow state
  useEffect(() => {
    themeRef.current = theme;
    if (glowRef.current && !isDraggingRef.current) {
      const isLit = theme === "dark";
      const stretch = Math.max(0, physRef.current.length - L0);
      const ratio = Math.min(stretch / 24, 1);
      glowRef.current.style.opacity = isLit ? (0.75 + ratio * 0.25).toString() : (ratio * 0.8).toString();
      glowRef.current.style.transform = `translateX(-50%) scale(${(1 + ratio * 0.3).toFixed(3)})`;
    }
  }, [theme]);

  // Direct DOM transform update (runs in < 0.05ms without React reconciliation)
  const applyDOM = useCallback((theta, length, dragging = false) => {
    const posX = length * Math.sin(theta);
    const posY = length * Math.cos(theta);
    const deg = (-theta * 180) / Math.PI;

    if (bulbRef.current) {
      bulbRef.current.style.transform = `translate3d(${posX.toFixed(2)}px, ${posY.toFixed(2)}px, 0) rotate(${deg.toFixed(2)}deg)`;

      const stretch = Math.max(0, length - L0);
      const isCharged = dragging && (stretch >= DRAG_THRESHOLD || (length * Math.cos(theta) - L0) >= 14);
      if (isCharged) {
        bulbRef.current.classList.add("pull-cord__bulb--charged");
      } else {
        bulbRef.current.classList.remove("pull-cord__bulb--charged");
      }
    }

    if (lineRef.current) {
      lineRef.current.setAttribute("x2", (ORIGIN_X + posX).toFixed(2));
      lineRef.current.setAttribute("y2", posY.toFixed(2));
    }

    if (glowRef.current) {
      const isLit = themeRef.current === "dark";
      const stretch = Math.max(0, length - L0);
      const ratio = Math.min(stretch / 24, 1);
      glowRef.current.style.transform = `translateX(-50%) scale(${(1 + ratio * 0.35).toFixed(3)})`;
      glowRef.current.style.opacity = isLit
        ? (0.75 + ratio * 0.25).toFixed(3)
        : (ratio * 0.85).toFixed(3);
    }

    if (hintRef.current) {
      if (dragging || length > L0 + 3 || Math.abs(theta) > 0.04) {
        hintRef.current.style.opacity = "0";
      } else {
        hintRef.current.style.opacity = "0.75";
      }
    }
  }, []);

  // Multi-substep time-delta bouncy physics integration
  const runPhysicsRelease = useCallback((initTheta, initLength, initOmega = 0, onComplete) => {
    if (animFrameRef.current) {
      cancelAnimationFrame(animFrameRef.current);
    }

    physRef.current = {
      theta: initTheta,
      length: initLength,
      omega: initOmega,
      vLength: 0,
    };

    let lastTime = performance.now();

    const tick = (now) => {
      const dt = Math.min(Math.max((now - lastTime) / 1000, 0.001), 0.032);
      lastTime = now;

      const p = physRef.current;

      // 4 sub-steps for ultra-smooth mathematical spring bounciness
      const SUB_STEPS = 4;
      const subDt = dt / SUB_STEPS;

      for (let s = 0; s < SUB_STEPS; s++) {
        // 1. Spring restoring force with low damping for natural bouncy oscillation
        const forceLength = -SPRING_STIFFNESS * (p.length - L0) - SPRING_DAMPING * p.vLength;
        p.vLength += forceLength * subDt;
        p.length += p.vLength * subDt;

        // 2. Pendulum gravity torque with natural harmonic sway
        const torque = -PENDULUM_GRAV * Math.sin(p.theta) - PENDULUM_DAMPING * p.omega;
        p.omega += torque * subDt;
        p.theta += p.omega * subDt;
      }

      // Convergence test when energy is fully dissipated
      if (
        Math.abs(p.theta) < 0.002 &&
        Math.abs(p.omega) < 0.008 &&
        Math.abs(p.length - L0) < 0.1 &&
        Math.abs(p.vLength) < 0.6
      ) {
        p.theta = 0;
        p.length = L0;
        p.omega = 0;
        p.vLength = 0;
        applyDOM(0, L0, false);
        animFrameRef.current = null;
        if (onComplete) onComplete();
        return;
      }

      applyDOM(p.theta, p.length, false);
      animFrameRef.current = requestAnimationFrame(tick);
    };

    animFrameRef.current = requestAnimationFrame(tick);
  }, [applyDOM]);

  // Clean up animation on unmount
  useEffect(() => {
    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, []);

  const onPointerDown = (e) => {
    if (animFrameRef.current) {
      cancelAnimationFrame(animFrameRef.current);
      animFrameRef.current = null;
    }

    isDraggingRef.current = true;
    startPointerRef.current = {
      x: e.clientX,
      y: e.clientY,
      time: performance.now(),
    };

    setIsDragging(true);
    setHasInteracted(true);

    try {
      e.currentTarget.setPointerCapture(e.pointerId);
    } catch {
      // Ignore
    }
  };

  const onPointerMove = (e) => {
    if (!isDraggingRef.current) return;

    const dx = e.clientX - startPointerRef.current.x;
    const dy = Math.max(-8, e.clientY - startPointerRef.current.y);

    // Exact pendulum angle calculation
    const rawTheta = Math.atan2(dx, Math.max(10, L0 + dy));
    const clampedTheta = Math.max(-Math.PI / 3, Math.min(Math.PI / 3, rawTheta));

    // Elastic cord extension with smooth spring resistance
    const dist = Math.sqrt(dx * dx + (L0 + Math.max(0, dy)) * (L0 + Math.max(0, dy)));
    const stretch = Math.max(0, dist - L0);
    const dampedStretch = Math.min(32, stretch / (1 + stretch * 0.012));
    const curLength = L0 + dampedStretch;

    physRef.current.theta = clampedTheta;
    physRef.current.length = curLength;

    applyDOM(clampedTheta, curLength, true);
  };

  const endDrag = (e) => {
    if (!isDraggingRef.current) return;
    isDraggingRef.current = false;
    setIsDragging(false);

    try {
      if (e?.pointerId && e?.currentTarget?.hasPointerCapture?.(e.pointerId)) {
        e.currentTarget.releasePointerCapture(e.pointerId);
      }
    } catch {
      // Ignore
    }

    const { theta, length } = physRef.current;
    const pullDistance = length - L0;
    const verticalPull = length * Math.cos(theta) - L0;
    const dragDuration = performance.now() - startPointerRef.current.time;

    const isSignificantDrag = pullDistance >= DRAG_THRESHOLD || verticalPull >= 14;
    const isQuickClick = !isSignificantDrag && dragDuration < 320 && Math.abs(e.clientX - startPointerRef.current.x) < 8 && Math.abs(e.clientY - startPointerRef.current.y) < 8;

    if (isSignificantDrag) {
      // Pulled past threshold: toggle theme & release with lively bouncy spring
      toggleTheme();
      const releaseOmega = e?.clientX ? (e.clientX - startPointerRef.current.x) * 0.005 : 0;
      runPhysicsRelease(theta, length, releaseOmega);
    } else if (isQuickClick) {
      // Quick tap / click: trigger tactile flick pull down & spring bounce with theme toggle
      toggleTheme();
      runPhysicsRelease(-0.28, L0 + 26, 0.45);
    } else {
      // Minor drag under threshold: snap back with bounce without toggling
      runPhysicsRelease(theta, length, 0);
    }
  };

  const onKeyDown = (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      setHasInteracted(true);
      toggleTheme();
      runPhysicsRelease(-0.28, L0 + 26, 0.5);
    }
  };

  const isLit = theme === "dark";

  return (
    <div className="pull-cord">
      {/* Anchor Socket flush on navbar bottom divider line */}
      <div className="pull-cord__mount" aria-hidden="true">
        <span className="pull-cord__mount-ring" />
      </div>

      {/* Dynamic Straight Beaded Chain SVG */}
      <svg
        className="pull-cord__svg-canvas"
        width={CANVAS_W}
        height={CANVAS_H}
        viewBox={`0 0 ${CANVAS_W} ${CANVAS_H}`}
        aria-hidden="true"
      >
        <line
          ref={lineRef}
          x1={ORIGIN_X}
          y1={ORIGIN_Y}
          x2={ORIGIN_X}
          y2={L0}
          stroke="var(--chain-bead)"
          strokeWidth="3.5"
          strokeLinecap="round"
          strokeDasharray="0.1 7"
        />
      </svg>

      {/* Lightbulb Fob anchored at (posX, posY) and rotated along the pull vector */}
      <div
        ref={bulbRef}
        className={[
          "pull-cord__bulb",
          isDragging ? "pull-cord__bulb--dragging" : "",
        ].join(" ").trim()}
        style={{
          transform: `translate3d(0px, ${L0}px, 0) rotate(0deg)`,
          transformOrigin: "top center",
        }}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        onKeyDown={onKeyDown}
        role="switch"
        aria-checked={isLit}
        aria-label={`Pull cord to switch to ${isLit ? "light" : "dark"} theme`}
        tabIndex={0}
      >
        {/* Glow halo that smoothly scales and brightens on drag */}
        <span
          ref={glowRef}
          className="pull-cord__glow"
          style={{ opacity: isLit ? 0.75 : 0 }}
        />

        <LightbulbFob />

        {!hasInteracted && (
          <div ref={hintRef} className="pull-cord__hint-wrap">
            <PullHintChevron />
          </div>
        )}
      </div>
    </div>
  );
}

export default PullCord;
