// Words that light up with scroll. Block parallax is pure CSS: see [data-parallax] in motion.css.
import { $$, clamp, onScrollFrame, prefersReducedMotion, type Cleanup } from './core';

export function initWords(): Cleanup {
  const blocks = $$('[data-words]');
  if (!blocks.length || prefersReducedMotion()) return () => {};
  const items = blocks.map((block) => {
    const text = (block.textContent ?? '').trim().replace(/\s+/g, ' ');
    block.textContent = '';
    const words = text.split(' ').map((word) => {
      const span = document.createElement('span');
      span.textContent = word;
      block.append(span, ' ');
      return { span, value: '' };
    });
    return { block, words };
  });

  const update = () => {
    const vh = window.innerHeight;
    for (const { block, words } of items) {
      const rect = block.getBoundingClientRect();
      if (rect.bottom < -vh || rect.top > vh * 2) continue;
      // Inside a section that flips the page, the words start when the flip starts (its top reaching mid-screen),
      // then turn white one by one as you scroll, until the end of the paragraph is well on screen.
      const host = block.closest('[data-surface-trigger]');
      const start = host ? vh / 2 + (rect.top - host.getBoundingClientRect().top) : vh * 0.82;
      const end = Math.min(vh * 0.6 - rect.height, start - vh * 0.35);
      const lit = clamp((start - rect.top) / (start - end)) * (words.length + 4);
      words.forEach((word, i) => {
        const value = (0.2 + 0.8 * clamp(lit - i)).toFixed(2);
        if (word.value !== value) {
          word.value = value;
          word.span.style.opacity = value;
        }
      });
    }
  };
  const off = onScrollFrame(update);
  window.addEventListener('resize', update);
  return () => {
    off();
    window.removeEventListener('resize', update);
  };
}
