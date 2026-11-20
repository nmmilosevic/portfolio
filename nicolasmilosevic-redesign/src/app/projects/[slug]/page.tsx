import Link from "next/link";
import { projects } from "@/lib/content";

// Old URLs from the previous site (/projects/<name>/) now live at /work/<name>/.
export const dynamicParams = false;
export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}
export const metadata = { robots: { index: false } };

export default async function OldProjectUrl({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const to = `/work/${slug}/`;
  return (
    <main className="inset pt-40">
      <meta httpEquiv="refresh" content={`0; url=${to}`} />
      <link rel="canonical" href={`https://nicolasmilosevic.com${to}`} />
      <p className="t-body">
        This page moved. <Link href={to}>Open the case study</Link>.
      </p>
    </main>
  );
}
