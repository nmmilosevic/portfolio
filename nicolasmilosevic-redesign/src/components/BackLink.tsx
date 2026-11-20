"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChevronLeft } from "./Icons";

/** Back to the projects. Uses the browser history when you came from this site, so the home keeps its scroll position. */
export default function BackLink() {
  const router = useRouter();
  return (
    <Link
      href="/#work"
      className="btn btn-secondary mb-10"
      style={{ height: 44, paddingLeft: 14, paddingRight: 20, fontSize: 15 }}
      onClick={(e) => {
        const seen = (window as unknown as { __pagesSeen?: number }).__pagesSeen ?? 0;
        if (seen > 1) {
          e.preventDefault();
          router.back();
        }
      }}
    >
      <ChevronLeft className="chev" />
      <span>Back</span>
    </Link>
  );
}
