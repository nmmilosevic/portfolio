"use client";
import { useEffect, useState, type RefObject } from "react";

/** True while the element floats over a surface marked [data-dark]. */
export function useOnDark(ref: RefObject<HTMLElement | null>, deps: unknown[] = []) {
  const [dark, setDark] = useState(false);
  useEffect(() => {
    const probe = () => {
      const el = ref.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const under = document
        .elementsFromPoint(r.left + r.width / 2, r.top + r.height / 2)
        .find((n) => !el.contains(n) && n.closest("[data-dark]"));
      setDark(Boolean(under));
    };
    probe();
    const t = setTimeout(probe, 400);
    window.addEventListener("scroll", probe, { passive: true });
    window.addEventListener("resize", probe);
    return () => {
      clearTimeout(t);
      window.removeEventListener("scroll", probe);
      window.removeEventListener("resize", probe);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
  return dark;
}
