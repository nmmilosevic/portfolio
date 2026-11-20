import Link from "next/link";
import { person } from "@/lib/content";

/** The name, small at the top left. It scrolls away with the page. */
export default function NameMark({ onDark = false }: { onDark?: boolean }) {
  return (
    <div className="absolute left-0 right-0 top-0 z-30 inset pt-8 max-md:hidden">
      <Link
        href="/"
        className={`t-caption inline-flex h-11 items-center ${onDark ? "text-white" : "text-ink"}`}
        style={{ fontSize: 15 }}
      >
        {person.fullName}
      </Link>
    </div>
  );
}
