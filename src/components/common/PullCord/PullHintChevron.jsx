export function PullHintChevron({ style }) {
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

export default PullHintChevron;
