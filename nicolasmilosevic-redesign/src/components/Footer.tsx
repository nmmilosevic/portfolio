import Link from "next/link";
import { nav, person } from "@/lib/content";

export default function Footer() {
  return (
    <footer className="inset flex flex-wrap items-center justify-between gap-x-8 gap-y-2 pb-12 pt-8 t-caption text-ink-2" style={{ fontSize: 15 }}>
      <p>© 2026 {person.fullName}, {person.location.split(",")[0]}</p>
      <ul className="flex flex-wrap gap-x-6">
        {nav.map((n) => (
          <li key={n.href}>
            <Link href={n.href} className="inline-flex h-11 items-center transition-colors duration-300 hover:text-ink">
              {n.label}
            </Link>
          </li>
        ))}
        <li>
          <a href={person.linkedin} target="_blank" rel="noopener noreferrer" className="inline-flex h-11 items-center transition-colors duration-300 hover:text-ink">
            LinkedIn
          </a>
        </li>
      </ul>
    </footer>
  );
}
