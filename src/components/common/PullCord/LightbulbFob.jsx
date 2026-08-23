const FOB_WIDTH = 32;
const FOB_HEIGHT = 42;

export function LightbulbFob() {
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

export default LightbulbFob;
