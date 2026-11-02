// Scroll-triggered reveals: text lines, supporting text, images, counters.
import { $$, durationMs, prefersReducedMotion, type Cleanup } from './core';

// Builds one clipped .line per rendered line of text. Screen readers get the plain text.
function split(el: HTMLElement) {
  const text = el.dataset.text ?? (el.textContent ?? '').trim().replace(/\s+/g, ' ');
  el.dataset.text = text;
  const withChars = el.dataset.split === 'chars';

  el.textContent = '';
  const sr = document.createElement('span');
  sr.className = 'sr-only';
  sr.textContent = text;
  const visual = document.createElement('span');
  visual.setAttribute('aria-hidden', 'true');
  visual.style.display = 'block';
  el.append(sr, visual);

  const words = text.split(' ').map((word) => {
    const span = document.createElement('span');
    span.className = 'word';
    if (withChars) {
      for (const char of word) {
        const c = document.createElement('span');
        c.className = 'char';
        c.textContent = char;
        span.append(c);
      }
    } else {
      span.textContent = word;
    }
    visual.append(span, ' ');
    return span;
  });

  const lines: HTMLElement[][] = [];
  let top: number | null = null;
  for (const word of words) {
    if (word.offsetTop !== top) {
      lines.push([]);
      top = word.offsetTop;
    }
    lines[lines.length - 1].push(word);
  }

  visual.textContent = '';
  lines.forEach((lineWords, i) => {
    const line = document.createElement('span');
    line.className = 'line';
    const inner = document.createElement('span');
    inner.className = 'line-inner';
    inner.style.setProperty('--line-index', String(i));
    lineWords.forEach((w, j) => inner.append(w, j < lineWords.length - 1 ? ' ' : ''));
    line.append(inner);
    visual.append(line);
  });
  el.classList.add('is-split');
}

// Where each strip starts, in % of the image: one strip per grid column the image covers at this screen size.
function stripEdges(el: HTMLElement) {
  const { left, width } = el.getBoundingClientRect();
  const inner = $$('[data-grid-overlay] .rest > span')
    .map((column) => column.getBoundingClientRect())
    .filter((column) => column.width > 0 && column.left > left + 2 && column.left < left + width - 2)
    .map((column) => ((column.left - left) / width) * 100);
  return [0, ...inner, 100];
}

// Strips in the page colour cover the image, then shrink along the columns. Only transforms animate, so nothing repaints.
export function openBlinds(el: HTMLElement) {
  el.querySelector(':scope > .blinds')?.remove();
  const edges = stripEdges(el);
  const blinds = document.createElement('div');
  blinds.className = 'blinds';
  blinds.setAttribute('aria-hidden', 'true');
  for (let i = 0; i < edges.length - 1; i++) {
    const strip = document.createElement('span');
    strip.style.left = `${edges[i]}%`;
    strip.style.width = `calc(${edges[i + 1] - edges[i]}% + 1px)`;
    blinds.append(strip);
  }
  el.append(blinds);
  el.classList.add('is-in');
  requestAnimationFrame(() => requestAnimationFrame(() => blinds.classList.add('is-open')));
  window.setTimeout(() => {
    blinds.remove();
    el.classList.add('is-done');
  }, durationMs('slow') + 80);
}

export function initReveals(delay = 0): Cleanup {
  const reduced = prefersReducedMotion();
  const splits = $$('[data-split]');
  const fades = $$('[data-fade]');
  const images = $$('.reveal:not(.is-done)');
  const counters = $$('[data-count]');

  if (reduced) {
    images.forEach((el) => el.classList.add('is-in', 'is-done'));
    return () => {};
  }

  splits.forEach((el) => {
    split(el);
    el.style.setProperty('--split-delay', `${delay}ms`);
  });
  counters.forEach((el) => (el.textContent = '0' + (el.dataset.suffix ?? '')));

  const show = (el: HTMLElement) => {
    if (el.classList.contains('reveal')) return openBlinds(el);
    el.classList.add('is-in');
    if (el.dataset.count) animateCount(el);
  };

  const io = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        show(entry.target as HTMLElement);
        io.unobserve(entry.target);
      }
    },
    { rootMargin: '0px 0px -8% 0px', threshold: 0.01 },
  );
  [...splits, ...fades, ...images, ...counters].forEach((el) => io.observe(el));

  // Line breaks depend on width, so split again if the width changes.
  let width = window.innerWidth;
  const onResize = () => {
    if (window.innerWidth === width) return;
    width = window.innerWidth;
    splits.forEach(split);
  };
  window.addEventListener('resize', onResize);

  return () => {
    io.disconnect();
    window.removeEventListener('resize', onResize);
  };
}

function animateCount(el: HTMLElement) {
  const target = Number(el.dataset.count);
  const suffix = el.dataset.suffix ?? '';
  const start = performance.now();
  const duration = durationMs('slow') * 1.4;
  const step = (now: number) => {
    const t = Math.min(1, (now - start) / duration);
    const eased = 1 - (1 - t) ** 4;
    el.textContent = Math.round(target * eased) + suffix;
    if (t < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
}
