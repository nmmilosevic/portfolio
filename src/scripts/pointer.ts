// Everything that answers the pointer: grid glow, hero letters, list previews.
import { $$, clamp, hasFinePointer, lerp, prefersReducedMotion, whileMoving, type Cleanup } from './core';

// Runs once. The glow is persisted across pages.
// A round window moves with the pointer while the lines inside move the opposite way. Only transforms change, so nothing repaints.
export function initGridGlow() {
  if (!hasFinePointer()) return;
  const overlay = document.querySelector<HTMLElement>('[data-grid-overlay]');
  const glow = overlay?.querySelector<HTMLElement>('[data-glow]');
  const lines = glow?.firstElementChild as HTMLElement | null | undefined;
  if (!overlay || !glow || !lines) return;

  let radius = 0, tx = 0, ty = 0, x = 0, y = 0, started = false;
  const measure = () => {
    radius = glow.offsetWidth / 2;
    lines.style.width = `${overlay.clientWidth}px`;
  };
  measure();
  window.addEventListener('resize', measure);

  const start = whileMoving(() => {
    x = lerp(x, tx, 0.14);
    y = lerp(y, ty, 0.14);
    glow.style.transform = `translate3d(${(x - radius).toFixed(1)}px, ${(y - radius).toFixed(1)}px, 0)`;
    lines.style.transform = `translate3d(${(radius - x).toFixed(1)}px, ${(radius - y).toFixed(1)}px, 0)`;
    return Math.abs(tx - x) > 0.2 || Math.abs(ty - y) > 0.2;
  });
  window.addEventListener('pointermove', (e) => {
    tx = e.clientX;
    ty = e.clientY;
    if (!started) {
      started = true;
      x = tx;
      y = ty;
      glow.classList.add('is-on');
    }
    start();
  }, { passive: true });
}

// Hero letters get heavier near the pointer, using the variable weight axis.
export function initProximity(): Cleanup {
  const host = document.querySelector<HTMLElement>('[data-proximity]');
  if (!host || !hasFinePointer() || prefersReducedMotion()) return () => {};

  type Char = { el: HTMLElement; x: number; y: number; wght: number };
  let chars: Char[] = [];
  const REST = 500, PEAK = 900, RADIUS = 260;

  const measure = () => {
    chars = $$('.char', host).map((el) => {
      const r = el.getBoundingClientRect();
      return { el, x: r.left + r.width / 2, y: r.top + r.height / 2 + window.scrollY, wght: REST };
    });
  };
  // Lines are built and settled shortly after page load.
  const timer = window.setTimeout(measure, 400);
  window.addEventListener('resize', measure);

  let mx = -9999, my = -9999;
  const start = whileMoving(() => {
    let busy = false;
    for (const c of chars) {
      const near = clamp(1 - Math.hypot(c.x - mx, c.y - my) / RADIUS);
      const goal = REST + (PEAK - REST) * near * near;
      const next = lerp(c.wght, goal, 0.14);
      if (Math.abs(next - c.wght) > 0.5) {
        c.wght = next;
        c.el.style.setProperty('--wght', next.toFixed(0));
        busy = true;
      }
    }
    return busy;
  });
  const onMove = (e: PointerEvent) => {
    if (window.scrollY > window.innerHeight) return;
    mx = e.clientX;
    my = e.clientY + window.scrollY;
    start();
  };
  const onLeave = () => {
    mx = -9999;
    start();
  };
  window.addEventListener('pointermove', onMove, { passive: true });
  document.addEventListener('pointerleave', onLeave);

  return () => {
    window.clearTimeout(timer);
    window.removeEventListener('resize', measure);
    window.removeEventListener('pointermove', onMove);
    document.removeEventListener('pointerleave', onLeave);
  };
}

// Rows with data-preview-src show a floating screenshot that follows the pointer.
export function initPreviews(): Cleanup {
  const box = document.querySelector<HTMLElement>('[data-preview]');
  const img = box?.querySelector('img');
  if (!box || !img || !hasFinePointer()) return () => {};
  let tx = 0, ty = 0, x = 0, y = 0, on = false, minX = 0;

  const start = whileMoving(() => {
    const goal = Math.max(tx, minX);
    x = lerp(x, goal, 0.12);
    y = lerp(y, ty, 0.12);
    box.style.transform = `translate3d(${x.toFixed(1)}px, ${y.toFixed(1)}px, 0)`;
    return on && (Math.abs(goal - x) > 0.2 || Math.abs(ty - y) > 0.2);
  });
  const onOver = (e: Event) => {
    const row = (e.target as Element).closest<HTMLElement>('[data-preview-src]');
    if (!row || getComputedStyle(row).getPropertyValue('--preview-on').trim() === '0') {
      on = false;
    } else {
      if (img.getAttribute('src') !== row.dataset.previewSrc) img.src = row.dataset.previewSrc!;
      // Stay to the right of the project name, so the colour change stays visible.
      const name = row.querySelector('.brand-name');
      if (name) {
        const range = document.createRange();
        range.selectNodeContents(name);
        minX = range.getBoundingClientRect().right;
      }
      on = true;
      start();
    }
    box.classList.toggle('is-on', on);
  };
  const onMove = (e: PointerEvent) => {
    tx = e.clientX;
    ty = e.clientY;
    if (on) start();
  };
  document.addEventListener('pointerover', onOver);
  window.addEventListener('pointermove', onMove, { passive: true });
  return () => {
    document.removeEventListener('pointerover', onOver);
    window.removeEventListener('pointermove', onMove);
  };
}
