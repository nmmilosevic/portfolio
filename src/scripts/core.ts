// Shared helpers. Nothing runs per frame unless something is actually moving.
const scrollSubscribers = new Set<() => void>();
let scrollQueued = false;

window.addEventListener('scroll', () => {
  if (scrollQueued) return;
  scrollQueued = true;
  requestAnimationFrame(() => {
    scrollQueued = false;
    scrollSubscribers.forEach((fn) => fn());
  });
}, { passive: true });

// Calls fn at most once per frame, only while the page is scrolling.
export const onScrollFrame = (fn: () => void) => {
  scrollSubscribers.add(fn);
  fn();
  return () => void scrollSubscribers.delete(fn);
};

// Returns a function that starts the loop. It stops by itself once step returns false.
export const whileMoving = (step: () => boolean) => {
  let running = false;
  const loop = () => {
    if (step()) requestAnimationFrame(loop);
    else running = false;
  };
  return () => {
    if (running) return;
    running = true;
    requestAnimationFrame(loop);
  };
};

export const prefersReducedMotion = () => matchMedia('(prefers-reduced-motion: reduce)').matches;
export const hasFinePointer = () => matchMedia('(hover: hover) and (pointer: fine)').matches;

export const clamp = (v: number, min = 0, max = 1) => Math.min(max, Math.max(min, v));
export const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

export const $$ = <T extends Element = HTMLElement>(selector: string, root: ParentNode = document) =>
  Array.from(root.querySelectorAll<T>(selector));

// Reads a duration token in ms, for the rare timers that must match the CSS.
// The CSS minifier may rewrite 1000ms as 1s, so both units are handled.
export const durationMs = (token: string) => {
  const value = getComputedStyle(document.documentElement).getPropertyValue(`--duration-${token}`).trim();
  const amount = parseFloat(value) || 0;
  return value.endsWith('ms') ? amount : amount * 1000;
};

export type Cleanup = () => void;
