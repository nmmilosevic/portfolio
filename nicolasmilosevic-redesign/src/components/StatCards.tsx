"use client";
import { useEffect, useRef, useState } from "react";

const S = { fill: "none", stroke: "currentColor", strokeWidth: 1.5, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };

// One small drawing per number, in the order the site lists them.
const art = [
  // years: nine bars growing one after another, the last one in the accent
  <svg key="years" viewBox="0 0 160 80" aria-hidden>
    {Array.from({ length: 9 }, (_, i) => (
      <rect
        key={i}
        className="ill-grow"
        style={{ animationDelay: `${i * 0.12}s` }}
        x={26 + i * 12}
        y={64 - (10 + i * 5)}
        width="6"
        height={10 + i * 5}
        rx="3"
        fill={i === 8 ? "var(--accent)" : "currentColor"}
        fillOpacity={i === 8 ? 1 : 0.18 + i * 0.06}
      />
    ))}
  </svg>,
  // users: a field of people dots lighting up
  <svg key="users" viewBox="0 0 160 80" aria-hidden>
    {Array.from({ length: 33 }, (_, i) => {
      const c = i % 11;
      const r = Math.floor(i / 11);
      return (
        <circle
          key={i}
          className="ill-pop"
          style={{ animationDelay: `${((c * 7 + r * 13) % 20) * 0.08}s` }}
          cx={30 + c * 10}
          cy={24 + r * 16}
          r="3"
          fill={i === 16 ? "var(--accent)" : "currentColor"}
          fillOpacity={i === 16 ? 1 : 0.35}
        />
      );
    })}
  </svg>,
  // features: small blocks filling in one by one, like a backlog getting shipped
  <svg key="features" viewBox="0 0 160 80" aria-hidden>
    {Array.from({ length: 30 }, (_, i) => {
      const c = i % 10;
      const r = Math.floor(i / 10);
      return (
        <rect
          key={i}
          className="ill-pop"
          style={{ animationDelay: `${i * 0.05}s` }}
          x={27 + c * 11}
          y={20 + r * 14}
          width="8"
          height="8"
          rx="2"
          fill={i === 29 ? "var(--accent)" : "currentColor"}
          fillOpacity={i === 29 ? 1 : 0.15 + (i / 29) * 0.45}
        />
      );
    })}
  </svg>,
  // industries: five shapes of growing size moving in a wave, the last one in the accent
  <svg key="industries" viewBox="0 0 160 80" aria-hidden>
    {[6, 8, 10, 12, 14].map((r, i) => (
      <circle
        key={r}
        className="ill-wave"
        style={{ animationDelay: `${i * 0.15}s` }}
        cx={34 + i * 23}
        cy="44"
        r={r / 1.4}
        fill={i === 4 ? "var(--accent)" : "currentColor"}
        fillOpacity={i === 4 ? 1 : 0.2 + i * 0.15}
      />
    ))}
  </svg>,
];

function CountUp({ value }: { value: string }) {
  const m = value.match(/^([\d,.]+)(.*)$/);
  const target = m ? parseFloat(m[1].replace(/,/g, "")) : 0;
  const suffix = m ? m[2] : "";
  const ref = useRef<HTMLSpanElement>(null);
  const [n, setN] = useState(target);

  useEffect(() => {
    if (!m || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    setN(0);
    let raf = 0;
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return;
        io.disconnect();
        const t0 = performance.now();
        const dur = 1200;
        const tick = (t: number) => {
          const p = Math.min(1, Math.max(0, (t - t0) / dur));
          const eased = 1 - Math.pow(1 - p, 4);
          setN(Math.round(target * eased));
          if (p < 1) raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
      },
      { threshold: 0.5 }
    );
    if (ref.current) io.observe(ref.current);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  return (
    <span ref={ref} aria-label={value}>
      <span aria-hidden>
        {n}
        {suffix}
      </span>
    </span>
  );
}

export default function StatCards({ stats }: { stats: { value: string; label: string }[] }) {
  return (
    <ul className="grid grid-cols-2 gap-x-6 gap-y-10 lg:grid-cols-4">
      {stats.map((s, i) => (
        <li key={s.label} data-rise>
          <div className="mb-4 h-[72px] text-ink md:h-[88px]">
            <div className="h-full w-full max-w-[160px] [&>svg]:h-full [&>svg]:w-auto">{art[i]}</div>
          </div>
          <div>
            <p className="t-metric" style={{ fontSize: "clamp(32px, 2.4vw + 22px, 56px)" }}>
              <CountUp value={s.value} />
            </p>
            <p className="mt-2 text-[15px] leading-snug text-ink-2 md:text-[17px]">{s.label}</p>
          </div>
        </li>
      ))}
    </ul>
  );
}
