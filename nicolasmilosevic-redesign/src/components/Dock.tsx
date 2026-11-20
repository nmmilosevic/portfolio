"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { contact, nav as allNav, person } from "@/lib/content";

// The top navigation leaves out the design system page (still linked in the footer).
const nav = allNav.filter((n) => n.href !== "/system/");
import { Close, Menu } from "./Icons";
import { useOnDark } from "./useOnDark";

export default function Dock() {
  const path = usePathname();
  const [compact, setCompact] = useState(false);
  const [open, setOpen] = useState(false);
  const [shown, setShown] = useState(false);
  const last = useRef(0);
  const navRef = useRef<HTMLElement>(null);
  const dark = useOnDark(navRef, [path]);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      // Hidden at the top of the page, shown as soon as you scroll
      setShown(y > 80);
      const d = y - last.current;
      if (Math.abs(d) > 6) {
        setCompact(d > 0 && y > 120);
        last.current = y;
      }
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [path]);

  useEffect(() => setOpen(false), [path]);
  useEffect(() => {
    if (!open) return;
    const k = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", k);
    return () => window.removeEventListener("keydown", k);
  }, [open]);

  const isActive = (href: string) =>
    href === "/" ? path === "/" || path.startsWith("/work") : path.startsWith(href.replace(/\/$/, ""));

  const item = (n: { label: string; href: string }, big = false) => (
    <Link
      key={n.href}
      href={n.href}
      aria-current={isActive(n.href) ? "page" : undefined}
      className={`dock-link inline-flex items-center rounded-full ${
        big ? "h-12 px-4 text-[24px] font-semibold tracking-[-0.02em]" : "h-11 px-4 t-caption"
      } ${isActive(n.href) ? (dark ? "text-white" : "text-accent") : dark ? "text-white" : "text-ink"}`}
    >
      {n.label}
    </Link>
  );

  const cta = (
    <a
      href={contact.href}
      target="_blank"
      rel="noopener noreferrer"
      className="btn btn-primary ml-1"
      style={{ height: 44, padding: "0 20px", fontSize: 13 }}
    >
      {contact.label}
    </a>
  );

  return (
    <div
      className="dock-wrap pointer-events-none fixed inset-x-0 top-0 z-50 flex justify-center px-3 pt-[max(12px,env(safe-area-inset-top))]"
      data-hidden={!shown && !open ? "" : undefined}
    >
      <nav
        ref={navRef}
        aria-label="Main"
        data-on-dark={dark ? "" : undefined}
        className="dock glass pointer-events-auto rounded-[30px] p-2"
        data-compact={compact && !open ? "" : undefined}
        style={{ cornerShape: "squircle" } as React.CSSProperties}
      >
        {/* Desktop: labels in a row */}
        <div className="hidden items-center md:flex">
          {nav.map((n) => item(n))}
          {cta}
        </div>

        {/* Mobile: name + menu button, expands into a sheet */}
        <div className="md:hidden">
          <div className="flex w-[min(86vw,360px)] items-center justify-between">
            <Link href="/" className={`inline-flex h-11 items-center px-4 t-caption ${dark ? "text-white" : "text-ink"}`} style={{ fontSize: 15 }}>
              {person.fullName}
            </Link>
            <button
              type="button"
              className={`icon-btn ${dark ? "!text-white" : ""}`}
              style={{ background: "transparent", width: 44, height: 44 }}
              aria-expanded={open}
              aria-controls="dock-sheet"
              aria-label={open ? "Close menu" : "Open menu"}
              onClick={() => setOpen((o) => !o)}
            >
              {open ? <Close /> : <Menu />}
            </button>
          </div>
          <div id="dock-sheet" hidden={!open} className="dock-sheet px-2 pb-3 pt-4">
            <ul className="flex flex-col gap-1">
              {nav.map((n) => (
                <li key={n.href}>{item(n, true)}</li>
              ))}
            </ul>
            <div className="mt-4 px-2">
              <a href={contact.href} target="_blank" rel="noopener noreferrer" className="btn btn-primary w-full">
                {contact.label}
              </a>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}
