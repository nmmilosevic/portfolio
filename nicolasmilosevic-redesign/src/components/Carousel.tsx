"use client";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { ChevronLeft, ChevronRight } from "./Icons";

/** Snap carousel with glass previous / next controls floating over the cards. */
export default function Carousel({ children, label }: { children: ReactNode; label: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [edge, setEdge] = useState({ start: true, end: false });

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const update = () =>
      setEdge({ start: el.scrollLeft < 8, end: el.scrollLeft + el.clientWidth > el.scrollWidth - 8 });
    update();
    el.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      el.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  const go = (dir: 1 | -1) => {
    const el = ref.current;
    if (!el) return;
    const first = el.firstElementChild as HTMLElement | null;
    const step = (first?.offsetWidth ?? el.clientWidth) + 12;
    el.scrollBy({ left: dir * step, behavior: "smooth" });
  };

  return (
    <div className="relative" role="region" aria-roledescription="carousel" aria-label={label}>
      <div ref={ref} className="snap" data-lenis-prevent-wheel="">
        {children}
      </div>
      <div className="pointer-events-none absolute inset-y-0 left-0 right-0 hidden items-center justify-between px-8 md:flex">
        <button type="button" className="icon-btn glass pointer-events-auto" onClick={() => go(-1)} disabled={edge.start} aria-label="Previous">
          <ChevronLeft />
        </button>
        <button type="button" className="icon-btn glass pointer-events-auto" onClick={() => go(1)} disabled={edge.end} aria-label="Next">
          <ChevronRight />
        </button>
      </div>
    </div>
  );
}
