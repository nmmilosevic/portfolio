"use client";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import type { Img } from "@/lib/content";
import Screen from "./Screen";
import { ChevronLeft, ChevronRight, Close } from "./Icons";

type LenisLike = { stop: () => void; start: () => void };
const lenis = () => (window as unknown as { __lenis?: LenisLike }).__lenis;

/**
 * Screens of one chapter: one goes full width, two sit side by side,
 * more fall into a 2 × 2 grid. Each has its caption, and opens large on click.
 */
export default function Gallery({ imgs, bg }: { imgs: Img[]; bg: string }) {
  const [open, setOpen] = useState<number | null>(null);
  const single = imgs.length === 1;

  const close = useCallback(() => setOpen(null), []);
  const step = useCallback(
    (d: 1 | -1) => setOpen((n) => (n === null ? n : (n + d + imgs.length) % imgs.length)),
    [imgs.length]
  );

  useEffect(() => {
    if (open === null) return;
    lenis()?.stop();
    document.documentElement.style.overflow = "hidden";
    const k = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", k);
    return () => {
      window.removeEventListener("keydown", k);
      document.documentElement.style.overflow = "";
      lenis()?.start();
    };
  }, [open, close, step]);

  if (!imgs.length) return null;
  const cur = open === null ? null : imgs[open];

  return (
    <>
      <ul className={`edge grid gap-x-3 gap-y-8 ${single ? "" : "md:grid-cols-2"}`}>
        {imgs.map((g, n) => (
          <li key={g.src} data-rise>
            <button
              type="button"
              onClick={() => setOpen(n)}
              className="zoom-trigger block w-full cursor-zoom-in text-left"
              aria-label={`Open larger: ${g.alt}`}
            >
              <Screen img={g} bg={bg} ratio={single ? "16 / 9" : "4 / 3"} sizes={single ? "1200px" : "600px"} />
            </button>
            <p className="t-caption mt-3 px-1 text-ink-2" style={{ fontSize: 15 }}>
              {g.alt}
            </p>
          </li>
        ))}
      </ul>

      {cur &&
        createPortal(
        <div
          role="dialog"
          aria-modal="true"
          aria-label={cur.alt}
          className="lightbox fixed inset-0 z-[70] flex flex-col items-center justify-center px-4 pb-6 pt-20 md:px-12"
          onClick={close}
          data-lenis-prevent=""
        >
          <div className="lightbox-img relative h-full w-full max-w-[1600px]">
            <Image src={cur.src} alt={cur.alt} fill unoptimized sizes="100vw" className="object-contain" />
          </div>
          <p className="t-body mt-4 text-center text-ink-2">{cur.alt}</p>
          <button type="button" onClick={close} className="icon-btn glass fixed right-4 top-4 md:right-6 md:top-6" aria-label="Close" autoFocus>
            <Close />
          </button>
          {imgs.length > 1 && (
            <div className="fixed bottom-6 right-4 flex gap-2 md:right-6" onClick={(e) => e.stopPropagation()}>
              <button type="button" className="icon-btn glass" onClick={() => step(-1)} aria-label="Previous image">
                <ChevronLeft />
              </button>
              <button type="button" className="icon-btn glass" onClick={() => step(1)} aria-label="Next image">
                <ChevronRight />
              </button>
            </div>
          )}
        </div>,
          document.body
        )}
    </>
  );
}
