import Link from "next/link";
import type { ReactNode } from "react";
import { ChevronRight } from "./Icons";

type Props = {
  href: string;
  variant?: "primary" | "secondary" | "tertiary";
  children: ReactNode;
  className?: string;
};

export default function Button({ href, variant = "secondary", children, className = "" }: Props) {
  const external = href.startsWith("http");
  const cls = `btn btn-${variant} ${variant === "secondary" ? "glass" : ""} ${className}`;
  const inner = (
    <>
      <span>{children}</span>
      {variant === "tertiary" && <ChevronRight className="chev" />}
    </>
  );
  return external ? (
    <a href={href} className={cls} target="_blank" rel="noopener noreferrer">
      {inner}
    </a>
  ) : (
    <Link href={href} className={cls}>
      {inner}
    </Link>
  );
}
