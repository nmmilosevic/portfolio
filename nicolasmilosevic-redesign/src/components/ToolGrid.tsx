"use client";
import { useEffect, useRef, useState } from "react";

type Logo = { name: string; svg: string; color: string; mask?: string };

/**
 * Stack: one panel with a holographic edge and glow, the tools inside in their brand colours.
 * A highlight moves from tool to tool.
 */
export default function ToolGrid({ logos, title }: { logos: Logo[]; title: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [run, setRun] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const io = new IntersectionObserver(([e]) => setRun(e.isIntersecting), { threshold: 0.4 });
    if (ref.current) io.observe(ref.current);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!run) return;
    const t = setInterval(() => setActive((n) => (n + 1) % logos.length), 1400);
    return () => clearInterval(t);
  }, [run, logos.length]);

  return (
    <div ref={ref} data-rise className="holo">
      <div className="holo-inner grid gap-8 px-6 py-8 md:grid-cols-12 md:items-center md:gap-6 md:px-12 md:py-12">
        <div className="md:col-span-3">
          <h2 className="holo-title mb-2">{title}</h2>
          <p className="text-[15px] leading-snug text-ink-2">The tools I design and build with.</p>
        </div>
        <ul className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-5 md:col-span-9 md:gap-y-10">
          {logos.map((l, i) => (
            <li
              key={l.name}
              data-on={i === active ? "" : undefined}
              onMouseEnter={() => setActive(i)}
              className="tool-card flex flex-col items-center gap-3"
            >
              {l.mask ? (
                <span
                  className="tool-logo brand-mask block h-8 w-8 md:h-9 md:w-9"
                  style={{ background: l.color, WebkitMaskImage: `url(${l.mask})`, maskImage: `url(${l.mask})` }}
                  aria-hidden
                />
              ) : (
                <span className="tool-logo block h-8 w-8 md:h-9 md:w-9" style={{ color: l.color }} dangerouslySetInnerHTML={{ __html: l.svg }} />
              )}
              <span className="tool-name text-center text-[13px] font-medium leading-tight md:text-[15px]">{l.name}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
