"use client";
import { useEffect } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Back and forward keep the scroll position; any other page change starts at the top.
let fromHistory = false;
if (typeof window !== "undefined") window.addEventListener("popstate", () => (fromHistory = true));

const TITLES = "main h1, main .t-title, main .t-large";
const TEXT = "main p.t-body, main p.t-headline, main .measure > p, main p.text-ink-2";
const CONTROLS = "main .btn";
const EASE = "expo.out";

/** Split a title into words, keeping the full text for screen readers. */
function splitWords(el: HTMLElement) {
  if (el.dataset.split) return [...el.querySelectorAll<HTMLElement>(".w")];
  const text = el.textContent ?? "";
  el.setAttribute("aria-label", text.trim());
  el.innerHTML = text
    .trim()
    .split(/\s+/)
    .map((w) => `<span class="w" aria-hidden="true">${w.replace(/</g, "&lt;")}</span>`)
    .join(" ");
  el.dataset.split = "1";
  return [...el.querySelectorAll<HTMLElement>(".w")];
}

export default function Motion() {
  const path = usePathname();

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    const lenis = new Lenis({ lerp: 0.14 });
    (window as unknown as { __lenis?: Lenis }).__lenis = lenis;
    lenis.on("scroll", ScrollTrigger.update);
    const tick = (t: number) => lenis.raf(t * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);
    return () => {
      gsap.ticker.remove(tick);
      lenis.destroy();
    };
  }, []);

  useEffect(() => {
    // Count pages seen in this visit, so a back button knows it can use history
    const w = window as unknown as { __pagesSeen?: number };
    w.__pagesSeen = (w.__pagesSeen ?? 0) + 1;
    // The smooth scroll keeps its own target: reset it too, or it glides back to the old position
    const lenis = (window as unknown as { __lenis?: Lenis }).__lenis;
    if (!fromHistory) {
      const target = window.location.hash ? document.querySelector<HTMLElement>(window.location.hash) : null;
      if (target) {
        requestAnimationFrame(() => {
          if (lenis) lenis.scrollTo(target, { immediate: true, force: true });
          else target.scrollIntoView();
        });
      } else {
        window.scrollTo(0, 0);
        lenis?.scrollTo(0, { immediate: true, force: true });
      }
    } else if (lenis) {
      // back / forward: the browser restores the position, the smooth scroll follows it
      requestAnimationFrame(() => {
        lenis.resize();
        lenis.scrollTo(window.scrollY, { immediate: true, force: true });
      });
    }
    fromHistory = false;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const mobile = window.matchMedia("(max-width: 767px)").matches;
    const blur = (px: number) => `blur(${mobile ? Math.round(px * 0.6) : px}px)`;
    const onView = (el: Element, fn: () => void) =>
      ScrollTrigger.create({ trigger: el, start: "top 90%", once: true, onEnter: fn });

    const ctx = gsap.context(() => {
      // Titles: words come out of a blur one after another
      gsap.utils.toArray<HTMLElement>(TITLES).forEach((el) => {
        if (el.closest(".sr-only") || el.classList.contains("sr-only")) return;
        if (reduce) {
          gsap.fromTo(el, { opacity: 0 }, { opacity: 1, duration: 0.4, scrollTrigger: { trigger: el, start: "top 90%", once: true } });
          return;
        }
        const words = splitWords(el);
        gsap.set(el, { opacity: 1 });
        gsap.set(words, { opacity: 0, filter: blur(16), y: "0.4em", scale: 0.97 });
        onView(el, () => {
          gsap.to(words, {
            opacity: 1,
            filter: "blur(0px)",
            y: 0,
            scale: 1,
            duration: 1.1,
            ease: EASE,
            stagger: 0.06,
            delay: 0.12,
            onComplete: () => gsap.set(words, { clearProps: "filter" }),
          });
        });
      });

      // A data-rise wrapper that only holds text lets its paragraphs move on their own
      const isTextBlock = (el: Element) => !el.classList.contains("tile") && !el.querySelector("img, svg, .tile, .card, ul, dl");

      // Body text and buttons: the same blur, softer, one paragraph after another
      const soft = (sel: string, d: { y: number; b: number; delay: number; stagger: number }) => {
        const all = gsap.utils.toArray<HTMLElement>(sel);
        const own = (el: HTMLElement) => {
          const box = el.closest("[data-rise]");
          return !el.closest(".tile") && (!box || isTextBlock(box));
        };
        // Text inside a card or a screen block moves with that block instead
        gsap.set(all.filter((el) => !own(el)), { opacity: 1 });
        const els = all.filter(own);
        gsap.set(els, { opacity: 0, y: reduce ? 0 : d.y, filter: reduce ? "none" : blur(d.b) });
        ScrollTrigger.batch(els, {
          start: "top 92%",
          once: true,
          onEnter: (batch) =>
            gsap.to(batch, {
              opacity: 1,
              y: 0,
              filter: "blur(0px)",
              duration: reduce ? 0.4 : 1,
              delay: reduce ? 0 : d.delay,
              stagger: reduce ? 0 : d.stagger,
              ease: EASE,
              clearProps: "filter,transform",
            }),
        });
      };
      soft(TEXT, { y: 18, b: 8, delay: 0.2, stagger: 0.12 });
      soft(CONTROLS, { y: 12, b: 6, delay: 0.35, stagger: 0.08 });

      // Cards, screens and grids: rise out of a light blur
      gsap.utils.toArray<HTMLElement>("[data-rise]").forEach((el) => {
        if (isTextBlock(el)) {
          gsap.set(el, { opacity: 1 });
          return;
        }
        gsap.fromTo(
          el,
          { opacity: 0, y: reduce ? 0 : mobile ? 16 : 32, filter: reduce ? "none" : blur(10) },
          {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            duration: reduce ? 0.4 : 0.9,
            ease: EASE,
            clearProps: "filter",
            scrollTrigger: { trigger: el, start: "top 92%", once: true },
          }
        );
      });
    });
    const r = requestAnimationFrame(() => ScrollTrigger.refresh());
    return () => {
      cancelAnimationFrame(r);
      ctx.revert();
    };
  }, [path]);

  return null;
}
