// Entry point. Runs once, then re-inits page modules after each navigation.
import { $$, durationMs, onScrollFrame, prefersReducedMotion, type Cleanup } from './core';
import { initReveals, revealImage } from './reveal';
import { initWords } from './scrollfx';
import { initGridGlow, initPreviews, initProximity } from './pointer';

const root = document.documentElement;
let gridOn = false;
let cleanups: Cleanup[] = [];
let navigated = false;

/* Controls in the persistent chrome use delegation, so they survive page swaps. */
function setGrid(on: boolean) {
  gridOn = on;
  root.classList.toggle('grid-on', on);
  $$('[data-grid-toggle]').forEach((b) => b.setAttribute('aria-pressed', String(on)));
}

document.addEventListener('click', (e) => {
  const el = e.target as Element;
  if (el.closest('[data-grid-toggle]')) setGrid(!gridOn);
  // Home links on the home page glide back to the top instead of reloading it.
  if (el.closest('a[href="/"]') && location.pathname === '/') {
    e.preventDefault();
    history.replaceState(history.state, '', '/');
    window.scrollTo({ top: 0, behavior: prefersReducedMotion() ? 'auto' : 'smooth' });
    return;
  }
  const anchor = el.closest<HTMLAnchorElement>('a[href^="/#"]');
  if (anchor && location.pathname === '/') {
    e.preventDefault();
    const id = anchor.getAttribute('href')!.slice(1);
    document.querySelector(id)?.scrollIntoView({ behavior: prefersReducedMotion() ? 'auto' : 'smooth' });
  }
}, true);

window.addEventListener('keydown', (e) => {
  if (e.shiftKey && e.key.toLowerCase() === 'g' && !(e.target as Element).closest('input, textarea')) setGrid(!gridOn);
});

initGridGlow();

/* Header hides on the way down, returns on the way up. */
let lastY = 0;
onScrollFrame(() => {
  const y = window.scrollY;
  if (Math.abs(y - lastY) < 6) return;
  document.querySelector('[data-header]')?.classList.toggle('is-hidden', y > lastY && y > 120);
  lastY = y;
});

/* First visit: columns lift when fonts and hero images are really ready. */
async function runIntro() {
  const loader = document.querySelector<HTMLElement>('[data-loader]');
  if (!root.classList.contains('has-intro') || !loader) return;
  $$('.loader-columns span', loader).forEach((s, i) => s.style.setProperty('--i', String(i)));
  const count = loader.querySelector('[data-loader-count]')!;
  const images = $$<HTMLImageElement>('img[fetchpriority="high"]');
  const tasks: Promise<unknown>[] = [document.fonts.ready, ...images.map((img) => img.decode().catch(() => {}))];
  let done = 0, shown = 0;
  tasks.forEach((t) => t.then(() => { done++; }));
  const startedAt = performance.now();

  await new Promise<void>((resolve) => {
    const step = () => {
      const elapsed = performance.now() - startedAt;
      const target = Math.min(done / tasks.length, Math.min(1, elapsed / 800)) * 100;
      shown += (target - shown) * 0.16;
      count.textContent = String(Math.round(shown));
      if ((shown > 99.2 && elapsed > 800) || elapsed > 3200) return resolve();
      requestAnimationFrame(step);
    };
    step();
  });

  count.textContent = '100';
  try { sessionStorage.setItem('intro', '1'); } catch {}
  loader.classList.add('is-leaving');
  window.setTimeout(() => root.classList.remove('has-intro'), durationMs('page') + 500);
}

/* Mobile has no hover, so the footer call to action fills with colour once it is on screen.
   Width counts too: some phones and narrow windows still report a fine pointer. */
function initTouchCta(): Cleanup {
  const cta = document.querySelector('[data-cta]');
  if (!cta) return () => {};
  const noHover = matchMedia('(hover: none), (pointer: coarse), (max-width: 900px)');
  const io = new IntersectionObserver(([entry]) => cta.classList.toggle('is-lit', entry.isIntersecting && noHover.matches), { threshold: 0.55 });
  io.observe(cta);
  return () => io.disconnect();
}

function initClock(): Cleanup {
  const clocks = $$('[data-clock]');
  if (!clocks.length) return () => {};
  const render = () => clocks.forEach((el) => {
    const time = new Intl.DateTimeFormat('en-GB', { hour: '2-digit', minute: '2-digit', timeZone: el.dataset.tz }).format(new Date());
    el.textContent = `Spain, ${time}`;
  });
  render();
  const id = window.setInterval(render, 20000);
  return () => window.clearInterval(id);
}

/* Play case study videos only while they are on screen. */
function initVideos(): Cleanup {
  const videos = $$<HTMLVideoElement>('video[data-autoplay]');
  if (prefersReducedMotion()) {
    videos.forEach((v) => (v.controls = true));
    return () => {};
  }
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      const v = e.target as HTMLVideoElement;
      if (e.isIntersecting) v.play().catch(() => {});
      else v.pause();
    });
  }, { threshold: 0.2 });
  videos.forEach((v) => io.observe(v));
  return () => io.disconnect();
}

/* /system page: accent hue slider and motion replays. */
function initSystemPage(): Cleanup {
  const slider = document.querySelector<HTMLInputElement>('[data-hue]');
  const output = document.querySelector<HTMLElement>('[data-hue-value]');
  const reset = document.querySelector<HTMLButtonElement>('[data-hue-reset]');
  const initial = slider?.defaultValue;
  const apply = (value: string) => {
    root.style.setProperty('--color-accent-hue', value);
    if (output) output.textContent = value;
  };
  if (slider) {
    let stored: string | null = null;
    try { stored = localStorage.getItem('accent-hue'); } catch {}
    if (stored) { slider.value = stored; apply(stored); }
    slider.addEventListener('input', () => {
      apply(slider.value);
      try { localStorage.setItem('accent-hue', slider.value); } catch {}
    });
    reset?.addEventListener('click', () => {
      slider.value = initial!;
      apply(initial!);
      try { localStorage.removeItem('accent-hue'); } catch {}
    });
  }
  const replays = $$<HTMLButtonElement>('[data-replay]');
  const onReplay = (e: Event) => {
    const host = (e.currentTarget as HTMLElement).closest<HTMLElement>('[data-replay-host]');
    if (!host) return;
    const targets = $$('[data-split], .reveal', host);
    // Jump to the hidden state with no transition, so the replay starts from the real beginning.
    host.classList.add('motion-reset');
    targets.forEach((el) => el.classList.remove('is-in', 'is-done'));
    void host.offsetWidth;
    host.classList.remove('motion-reset');
    requestAnimationFrame(() => requestAnimationFrame(() => {
      targets.forEach((el) => (el.classList.contains('reveal') ? revealImage(el) : el.classList.add('is-in')));
    }));
  };
  replays.forEach((b) => b.addEventListener('click', onReplay));
  return () => replays.forEach((b) => b.removeEventListener('click', onReplay));
}

/* Only the card you clicked morphs, into the project cover. Going back home, nothing flies across the page. */
let morphName: string | null = null;
const setMorph = (el: HTMLElement | null | undefined, name: string) => {
  if (!el) return false;
  el.style.viewTransitionName = name;
  return true;
};

document.addEventListener('astro:before-preparation', (event) => {
  const e = event as Event & { sourceElement?: Element };
  morphName = null;
  const source = e.sourceElement?.querySelector<HTMLElement>('[data-morph]');
  if (source && source.offsetWidth > 0) {
    morphName = source.dataset.morph!;
    setMorph(source, morphName);
  }
});

document.addEventListener('astro:after-swap', () => {
  navigated = true;
  // A project cover is in place as soon as it arrives from a link, so it must not reveal again.
  $$('[data-cover]').forEach((el) => el.classList.add('is-in', 'is-done'));
  if (morphName) {
    const target = document.querySelector<HTMLElement>(`[data-cover][data-morph="${morphName}"]`);
    if (target) {
      target.classList.add('is-in', 'is-done');
      setMorph(target, morphName);
      window.setTimeout(() => (target.style.viewTransitionName = ''), durationMs('page') + 600);
    }
  }
  setGrid(gridOn);
});

document.addEventListener('astro:before-swap', () => {
  cleanups.forEach((fn) => fn());
  cleanups = [];
});

let firstLoad = true;
document.addEventListener('astro:page-load', async () => {
  const isFirst = firstLoad;
  firstLoad = false;
  lastY = window.scrollY;
  document.querySelector('[data-header]')?.classList.remove('is-hidden');

  cleanups.push(initTouchCta(), initClock(), initVideos(), initSystemPage(), initPreviews());

  await document.fonts.ready;
  if (isFirst) await runIntro();
  cleanups.push(initWords(), initReveals(navigated ? 280 : 0), initProximity());
});
