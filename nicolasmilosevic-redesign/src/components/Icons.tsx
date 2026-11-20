// One line-icon set (Lucide geometry), one size, one stroke.
type P = { className?: string };
const base = {
  width: 20,
  height: 20,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.75,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
};
export const ChevronRight = ({ className }: P) => (
  <svg {...base} className={className}>
    <path d="m9 18 6-6-6-6" />
  </svg>
);
export const ChevronLeft = ({ className }: P) => (
  <svg {...base} className={className}>
    <path d="m15 18-6-6 6-6" />
  </svg>
);
export const Menu = ({ className }: P) => (
  <svg {...base} className={className}>
    <path d="M4 8h16M4 16h16" />
  </svg>
);
export const Close = ({ className }: P) => (
  <svg {...base} className={className}>
    <path d="M18 6 6 18M6 6l12 12" />
  </svg>
);
