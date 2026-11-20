"use client";
import { useEffect } from "react";

// The NM favicon, its holographic colours sliding like the Stack title.
// Browsers other than Firefox don't animate SVG favicons, so this redraws it a few times a second,
// only while the tab is visible and never with reduced motion.
const NM =
  "M4 45.16V18.84H10.96L21.64 36.63L22.27 37.98H22.53V18.84H27.61V45.16H20.81L9.88 27.07L9.3 25.81H9.06V45.16ZM30.65 45.16V18.84H39.09L44.66 36.48L45.19 38.38H45.5L46 36.46L51.73 18.84H60V45.16H55.02V25.9L55.03 23.44H54.74L54 26.13L47.98 45.16H42.71L36.62 25.96L35.94 23.44H35.63L35.64 25.9V45.16Z";
const STOPS: [number, string][] = [
  [0, "#E86BB0"], [0.25, "#9B7BFF"], [0.5, "#4F9DFF"], [0.75, "#2FC9A4"], [0.9, "#E0B400"], [1, "#E86BB0"],
];

export default function HoloFavicon() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const size = 64;
    const canvas = document.createElement("canvas");
    canvas.width = canvas.height = size;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const path = new Path2D(NM);
    let link = document.querySelector<HTMLLinkElement>('link[rel="icon"][data-holo]');
    if (!link) {
      link = document.createElement("link");
      link.rel = "icon";
      link.dataset.holo = "";
      document.head.appendChild(link);
    }
    // other icon links would win over ours in some browsers
    document.querySelectorAll<HTMLLinkElement>('link[rel="icon"]:not([data-holo])').forEach((l) => l.remove());

    const draw = (t: number) => {
      const shift = ((t / 4000) % 1) * size;
      ctx.clearRect(0, 0, size, size);
      ctx.fillStyle = "#FBFBFD";
      ctx.beginPath();
      ctx.roundRect(0, 0, size, size, 14);
      ctx.fill();
      // two gradient lengths side by side so the slide loops without a seam
      const g = ctx.createLinearGradient(-size + shift, 0, size + shift, 0);
      for (const [o, c] of STOPS) g.addColorStop(o / 2, c);
      for (const [o, c] of STOPS) g.addColorStop(0.5 + o / 2, c);
      ctx.fillStyle = g;
      ctx.fill(path);
      link!.href = canvas.toDataURL("image/png");
    };

    let timer = 0;
    const start = () => {
      if (timer) return;
      timer = window.setInterval(() => draw(performance.now()), 160);
    };
    const stop = () => {
      window.clearInterval(timer);
      timer = 0;
    };
    const onVisibility = () => (document.hidden ? stop() : start());
    draw(performance.now());
    if (!document.hidden) start();
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      stop();
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);
  return null;
}
