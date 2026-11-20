// All drawings share one look: filled rounded shapes in graded greys, one element in the accent.
const g = (o: number) => ({ fill: "currentColor", fillOpacity: o });
const A = { fill: "var(--accent)" };

/* ---------- What I do ---------- */
export const doArt: Record<string, React.ReactNode> = {
  "Product design": (
    <svg viewBox="0 0 160 100" aria-hidden>
      <rect x="20" y="10" width="120" height="80" rx="10" {...g(0.07)} />
      <rect x="20" y="10" width="120" height="14" rx="7" {...g(0.14)} />
      <rect x="30" y="34" width="36" height="46" rx="6" {...g(0.16)} />
      <rect className="ill-slide" x="74" y="34" width="56" height="16" rx="6" {...A} />
      <rect x="74" y="58" width="56" height="6" rx="3" {...g(0.3)} />
      <rect x="74" y="70" width="36" height="6" rx="3" {...g(0.2)} />
    </svg>
  ),
  "Product strategy": (
    <svg viewBox="0 0 160 100" aria-hidden>
      <path id="route" d="M24 78 C 56 78, 56 30, 88 30 S 120 62, 136 22" fill="none" />
      {[
        [24, 78], [38, 76], [50, 66], [58, 50], [70, 36], [86, 30], [100, 36], [110, 50], [122, 44], [136, 22],
      ].map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r={i === 9 ? 6 : 3} {...g(0.15 + i * 0.07)} />
      ))}
      <circle r="5" {...A}>
        <animateMotion dur="4s" repeatCount="indefinite" keyPoints="0;1;1" keyTimes="0;0.75;1" calcMode="spline" keySplines="0.32 0.72 0 1;0 0 1 1">
          <mpath href="#route" />
        </animateMotion>
      </circle>
    </svg>
  ),
  "Design systems": (
    <svg viewBox="0 0 160 100" aria-hidden>
      <rect x="40" y="14" width="34" height="34" rx="8" {...g(0.15)} />
      <circle cx="103" cy="31" r="17" {...g(0.3)} />
      <rect x="40" y="56" width="34" height="34" rx="17" {...g(0.45)} />
      <rect x="86" y="56" width="34" height="34" rx="4" {...g(0.6)} />
      <rect className="ill-hop" x="40" y="14" width="34" height="34" rx="8" {...A} />
    </svg>
  ),
  "Prototyping in code": (
    <svg viewBox="0 0 160 100" aria-hidden>
      {[
        [30, 70], [42, 50], [42, 86], [54, 40], [42, 60], [30, 30],
      ].map(([x, w], i) => (
        <rect key={i} className="ill-pop" style={{ animationDelay: `${i * 0.12}s` }} x={x} y={14 + i * 12} width={w} height="7" rx="3.5" {...g(0.15 + i * 0.09)} />
      ))}
      <rect className="ill-blink" x="64" y="74" width="4" height="9" rx="2" {...A} />
    </svg>
  ),
  "User research": (
    <svg viewBox="0 0 160 100" aria-hidden>
      {Array.from({ length: 18 }, (_, i) => (
        <circle key={i} cx={34 + (i % 6) * 18} cy={30 + Math.floor(i / 6) * 20} r="5" {...g(0.12 + (i % 6) * 0.08)} />
      ))}
      <g className="ill-scan">
        <circle cx="52" cy="50" r="15" {...A} fillOpacity="0.18" />
        <circle cx="52" cy="50" r="5" {...A} />
      </g>
    </svg>
  ),
};

/* ---------- How I work ---------- */
export const howArt: React.ReactNode[] = [
  // own the outcome: rows fill in, the last one done in the accent
  <svg key="own" viewBox="0 0 160 100" aria-hidden>
    {[0, 1, 2].map((i) => (
      <g key={i} className="ill-pop" style={{ animationDelay: `${i * 0.3}s` }}>
        <rect x="34" y={18 + i * 24} width="16" height="16" rx="5" {...(i === 2 ? A : g(0.25 + i * 0.2))} />
        <rect x="58" y={23 + i * 24} width={i === 2 ? 46 : 68} height="6" rx="3" {...g(0.15 + i * 0.12)} />
      </g>
    ))}
  </svg>,
  // design with the people who build: two discs moving together
  <svg key="with" viewBox="0 0 160 100" aria-hidden>
    <circle className="ill-left" cx="64" cy="50" r="28" {...g(0.2)} />
    <circle className="ill-right" cx="96" cy="50" r="28" {...A} fillOpacity="0.85" />
  </svg>,
  // leave a system behind: layers, the top one lifts and settles
  <svg key="system" viewBox="0 0 160 100" aria-hidden>
    <path d="M80 76 40 62l40-14 40 14z" {...g(0.15)} />
    <path d="M80 62 40 48l40-14 40 14z" {...g(0.35)} />
    <path className="ill-lift" d="M80 48 40 34l40-14 40 14z" {...A} />
  </svg>,
  // work remotely: a trail of dots between two places, a message travelling along it
  <svg key="remote" viewBox="0 0 160 100" aria-hidden>
    <path id="arc" d="M36 72 Q 80 8, 124 72" fill="none" />
    {Array.from({ length: 11 }, (_, i) => {
      const t = i / 10;
      const x = (1 - t) * (1 - t) * 36 + 2 * (1 - t) * t * 80 + t * t * 124;
      const y = (1 - t) * (1 - t) * 72 + 2 * (1 - t) * t * 8 + t * t * 72;
      return <circle key={i} cx={x} cy={y} r={i === 0 || i === 10 ? 6 : 2.5} {...g(i === 0 || i === 10 ? 0.5 : 0.15 + Math.abs(5 - i) * 0.04)} />;
    })}
    <circle r="4.5" {...A}>
      <animateMotion dur="3.2s" repeatCount="indefinite" keyPoints="0;1;0" keyTimes="0;0.5;1" calcMode="spline" keySplines="0.32 0.72 0 1;0.32 0.72 0 1">
        <mpath href="#arc" />
      </animateMotion>
    </circle>
  </svg>,
];

/* ---------- Contact ---------- */
// A short conversation: your message comes in, a reply starts typing, then lands in the accent.
export const contactArt = (
  <svg viewBox="0 0 240 180" aria-hidden className="h-auto w-full">
    <g className="ct ct-1">
      <rect x="20" y="20" width="132" height="36" rx="18" {...g(0.2)} />
      <rect x="38" y="34" width="72" height="8" rx="4" {...g(0.45)} />
    </g>
    <g className="ct ct-2">
      <rect x="20" y="64" width="96" height="36" rx="18" {...g(0.2)} />
      <rect x="38" y="78" width="48" height="8" rx="4" {...g(0.45)} />
    </g>
    <g className="ct ct-3">
      <rect x="164" y="112" width="56" height="28" rx="14" {...g(0.2)} />
      {[0, 1, 2].map((i) => (
        <circle key={i} className="ct-dot" style={{ animationDelay: `${i * 0.15}s` }} cx={180 + i * 12} cy="126" r="3.5" {...g(0.7)} />
      ))}
    </g>
    <g className="ct ct-4">
      <rect x="84" y="112" width="136" height="48" rx="20" fill="#fff" />
      <rect x="102" y="128" width="84" height="7" rx="3.5" fill="var(--accent)" />
      <rect x="102" y="141" width="52" height="7" rx="3.5" fill="var(--accent)" fillOpacity="0.5" />
    </g>
  </svg>
);


/* ---------- What I owned (case studies) ---------- */
// One drawing per kind of work. Each case study picks four different ones.
export type OwnedKind =
  | "dashboard" | "table" | "website" | "system" | "tree" | "flow"
  | "swatches" | "analytics" | "users" | "suite" | "cards" | "phone" | "illustration";

export function ownedArt(kind: OwnedKind) {
  switch (kind) {
    case "dashboard":
      return (
        <svg viewBox="0 0 160 100" aria-hidden>
          <rect x="24" y="14" width="112" height="72" rx="10" {...g(0.07)} />
          <rect x="34" y="24" width="40" height="22" rx="5" {...g(0.18)} />
          <rect x="80" y="24" width="46" height="22" rx="5" {...g(0.12)} />
          {[0, 1, 2, 3, 4].map((i) => (
            <rect key={i} className="ill-grow" style={{ animationDelay: `${i * 0.12}s` }} x={36 + i * 18} y={76 - (8 + i * 4)} width="10" height={8 + i * 4} rx="3" {...(i === 4 ? A : g(0.2 + i * 0.1))} />
          ))}
        </svg>
      );
    case "table":
      return (
        <svg viewBox="0 0 160 100" aria-hidden>
          {[0, 1, 2, 3].map((r) => (
            <g key={r}>
              <rect x="28" y={18 + r * 18} width="104" height="12" rx="4" {...g(r === 0 ? 0.2 : 0.08)} />
              {[0, 1, 2].map((c) => (
                <rect key={c} x={34 + c * 34} y={22 + r * 18} width="22" height="4" rx="2" {...g(0.3)} />
              ))}
            </g>
          ))}
          <rect className="own-row" x="28" y="36" width="104" height="12" rx="4" {...A} fillOpacity="0.85" />
        </svg>
      );
    case "website":
      return (
        <svg viewBox="0 0 160 100" aria-hidden>
          <rect x="22" y="12" width="116" height="76" rx="10" {...g(0.07)} />
          <rect x="22" y="12" width="116" height="12" rx="6" {...g(0.14)} />
          <rect x="32" y="32" width="96" height="26" rx="6" {...g(0.18)} />
          <rect x="32" y="64" width="44" height="5" rx="2.5" {...g(0.3)} />
          <rect x="32" y="73" width="30" height="5" rx="2.5" {...g(0.2)} />
          <rect className="ill-pop" x="96" y="66" width="32" height="12" rx="6" {...A} />
        </svg>
      );
    case "system":
      return (
        <svg viewBox="0 0 160 100" aria-hidden>
          <rect x="48" y="16" width="30" height="30" rx="8" {...g(0.15)} />
          <circle cx="97" cy="31" r="15" {...g(0.3)} />
          <rect x="48" y="54" width="30" height="30" rx="15" {...g(0.45)} />
          <rect x="82" y="54" width="30" height="30" rx="4" {...g(0.6)} />
          <rect className="ill-hop-sm" x="48" y="16" width="30" height="30" rx="8" {...A} />
        </svg>
      );
    case "tree":
      return (
        <svg viewBox="0 0 160 100" aria-hidden>
          <rect x="66" y="12" width="28" height="14" rx="5" {...A} />
          {[0, 1, 2].map((i) => (
            <g key={i} className="ill-pop" style={{ animationDelay: `${0.2 + i * 0.15}s` }}>
              <rect x={78 + (i - 1) * 40 + 1} y="26" width="2" height="16" {...g(0.2)} />
              <rect x={66 + (i - 1) * 40} y="42" width="28" height="14" rx="5" {...g(0.3)} />
              <rect x={70 + (i - 1) * 40} y="64" width="20" height="10" rx="4" {...g(0.15)} />
              <rect x={70 + (i - 1) * 40} y="78" width="20" height="10" rx="4" {...g(0.1)} />
            </g>
          ))}
        </svg>
      );
    case "flow":
      return (
        <svg viewBox="0 0 160 100" aria-hidden>
          <path id="owned-flow" d="M30 50 H130" fill="none" />
          {[30, 80, 130].map((x, i) => (
            <rect key={x} x={x - 14} y="36" width="28" height="28" rx="8" {...g(0.15 + i * 0.15)} />
          ))}
          {[46, 54, 62, 96, 104, 112].map((x) => (
            <circle key={x} cx={x} cy="50" r="2" {...g(0.3)} />
          ))}
          <circle r="5" {...A}>
            <animateMotion dur="3s" repeatCount="indefinite" keyPoints="0;1;1" keyTimes="0;0.8;1" calcMode="spline" keySplines="0.32 0.72 0 1;0 0 1 1">
              <mpath href="#owned-flow" />
            </animateMotion>
          </circle>
        </svg>
      );
    case "swatches":
      return (
        <svg viewBox="0 0 160 100" aria-hidden>
          {[0, 1, 2, 3, 4].map((i) => (
            <rect key={i} className="ill-pop" style={{ animationDelay: `${i * 0.12}s` }} x={26 + i * 22} y="30" width="18" height="40" rx="6" {...(i === 2 ? A : g(0.12 + i * 0.12))} />
          ))}
        </svg>
      );
    case "analytics":
      return (
        <svg viewBox="0 0 160 100" aria-hidden>
          <rect x="24" y="14" width="112" height="72" rx="10" {...g(0.07)} />
          {[
            [36, 70], [52, 62], [68, 66], [84, 50], [100, 54], [116, 34],
          ].map(([x, y], i) => (
            <circle key={i} className="ill-pop" style={{ animationDelay: `${i * 0.1}s` }} cx={x} cy={y} r={i === 5 ? 6 : 4} {...(i === 5 ? A : g(0.2 + i * 0.08))} />
          ))}
        </svg>
      );
    case "users":
      return (
        <svg viewBox="0 0 160 100" aria-hidden>
          {[0, 1, 2].map((i) => (
            <g key={i}>
              <circle cx="44" cy={24 + i * 26} r="8" {...g(0.2 + i * 0.12)} />
              <rect x="58" y={20 + i * 26} width="50" height="8" rx="4" {...g(0.15)} />
              <rect x="114" y={18 + i * 26} width="22" height="12" rx="6" {...g(0.12)} />
            </g>
          ))}
          <rect className="own-toggle" x="114" y="44" width="22" height="12" rx="6" {...A} />
        </svg>
      );
    case "suite":
      return (
        <svg viewBox="0 0 160 100" aria-hidden>
          {Array.from({ length: 6 }, (_, i) => (
            <rect key={i} className="ill-pop" style={{ animationDelay: `${i * 0.1}s` }} x={42 + (i % 3) * 28} y={22 + Math.floor(i / 3) * 30} width="22" height="22" rx="7" {...(i === 4 ? A : g(0.12 + i * 0.08))} />
          ))}
        </svg>
      );
    case "cards":
      return (
        <svg viewBox="0 0 160 100" aria-hidden>
          <rect x="54" y="38" width="60" height="44" rx="8" {...g(0.12)} />
          <rect x="49" y="29" width="60" height="44" rx="8" {...g(0.25)} />
          <g className="own-card">
            <rect x="44" y="20" width="60" height="44" rx="8" {...A} />
            <rect x="54" y="32" width="28" height="5" rx="2.5" fill="var(--base)" />
            <rect x="54" y="42" width="36" height="5" rx="2.5" fill="var(--base)" fillOpacity="0.6" />
          </g>
        </svg>
      );
    case "phone":
      return (
        <svg viewBox="0 0 160 100" aria-hidden>
          <rect x="58" y="8" width="44" height="84" rx="12" {...g(0.1)} />
          <rect x="64" y="18" width="32" height="64" rx="6" {...g(0.08)} />
          <g className="own-scroll">
            <rect x="68" y="24" width="24" height="16" rx="4" {...A} />
            <rect x="68" y="44" width="24" height="5" rx="2.5" {...g(0.3)} />
            <rect x="68" y="53" width="18" height="5" rx="2.5" {...g(0.2)} />
            <rect x="68" y="62" width="24" height="12" rx="4" {...g(0.18)} />
          </g>
        </svg>
      );
    case "illustration":
      return (
        <svg viewBox="0 0 160 100" aria-hidden>
          <circle cx="62" cy="54" r="24" {...g(0.15)} />
          <path d="M96 76 120 34l24 42z" {...g(0.3)} />
          <rect className="own-spin" x="70" y="22" width="24" height="24" rx="6" {...A} />
        </svg>
      );
  }
}

/** Picks a drawing from what the item is about. */
export function ownedKind(text: string): OwnedKind {
  const t = text.toLowerCase();
  if (t.includes("illustration")) return "illustration";
  if (t.includes("app")) return "phone";
  if (t.includes("design system") || t.includes("component")) return "system";
  if (t.includes("visual system")) return "swatches";
  if (t.includes("information architecture")) return "tree";
  if (t.includes("comparator") || t.includes("table")) return "table";
  if (t.includes("homepage") || t.includes("website")) return "website";
  if (t.includes("permission") || t.includes("user management")) return "users";
  if (t.includes("analytics") || t.includes("views")) return "analytics";
  if (t.includes("draft") || t.includes("course structure")) return "cards";
  if (t.includes("suite")) return "suite";
  if (t.includes("dashboard")) return "dashboard";
  return "flow";
}
