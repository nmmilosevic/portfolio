import Link from "next/link";
import Brand from "./Brand";
import { ChevronRight } from "./Icons";

type Item = { company: string; role: string; period: string; href: string };

/** Experience: one row per role, thin lines between. Logo, role, dates; each row opens its case study. */
export default function ExperienceCards({ items }: { items: Item[] }) {
  return (
    <ul data-rise className="exp-list">
      {items.map((it) => (
        <li key={it.company}>
          <Link
            href={it.href}
            className="exp-card group grid items-center gap-4 py-6 md:grid-cols-12 md:gap-6 md:py-7"
          >
            <div className="flex h-14 items-center md:col-span-3">
              <Brand name={it.company} scale={0.8} />
            </div>
            <div className="md:col-span-6">
              <p className="t-body font-semibold transition-colors duration-300 group-hover:text-accent" style={{ fontSize: 20 }}>
                {it.company}
              </p>
              <p className="t-body text-ink-2">{it.role}</p>
            </div>
            <div className="flex items-center justify-between gap-4 md:col-span-3 md:justify-end">
              <p className="text-[15px] text-ink-2" style={{ fontVariantNumeric: "tabular-nums" }}>
                {it.period}
              </p>
              <span className="exp-arrow grid h-10 w-10 shrink-0 place-items-center rounded-full bg-surface text-ink" aria-hidden>
                <ChevronRight />
              </span>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
}
