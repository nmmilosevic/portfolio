import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Screen from "@/components/Screen";
import Gallery from "@/components/Gallery";
import BackLink from "@/components/BackLink";
import Brand from "@/components/Brand";
import { ChevronRight } from "@/components/Icons";
import { ownedArt, ownedKind } from "@/components/Art";
import { getProject, nextProject, projects, tone } from "@/lib/content";

export const dynamicParams = false;
export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const p = getProject((await params).slug);
  return p ? { title: p.name, description: p.tagline } : {};
}

export default async function CaseStudy({ params }: { params: Promise<{ slug: string }> }) {
  const p = getProject((await params).slug);
  if (!p) notFound();
  const next = nextProject(p.slug);
  const hero = p.gallery[0];
  const neutral = tone(p.color, "neutral");
  const facts: [string, string][] = [
    ["Role", p.facts.Role],
    ["Year", p.facts.Period],
    ["Domain", p.facts.Domain],
  ];

  return (
    <main id="content">

      {/* Hero: text first, then the key screen on the card surface */}
      <section className="inset pt-24 md:pt-32" aria-labelledby="cs-title">
        <BackLink />
        <h1 id="cs-title" className="t-large mb-6">
          {p.name}
        </h1>
        <p className="t-headline mb-12 max-w-[640px]" style={{ fontWeight: 400 }}>
          {p.summary}
        </p>
        <dl className="grid max-w-[900px] grid-cols-1 gap-6 sm:grid-cols-3">
          {facts.map(([k, v]) => (
            <div key={k}>
              <dt className="text-[15px] font-medium text-ink-2">{k}</dt>
              <dd className="t-body mt-1">{v}</dd>
            </div>
          ))}
        </dl>
      </section>
      <section className="pt-12 md:pt-16" aria-label={`${p.name}, main screen`}>
        <Gallery imgs={[hero]} bg={neutral} />
      </section>

      {/* Problem */}
      <section className="inset pt-28 md:pt-40" aria-labelledby="problem">
        <div data-rise className="measure">
          <h2 id="problem" className="t-title mb-8">
            {p.tagline}
          </h2>
          <p className="t-body mb-5">{p.intro}</p>
          <p className="t-body text-ink-2">{p.team}</p>
        </div>
      </section>

      {/* Process: what was owned */}
      <section className="inset pt-24 md:pt-32" aria-labelledby="owned">
        <h2 id="owned" className="t-title mb-10" style={{ fontSize: "clamp(28px, 1.4vw + 18px, 40px)" }}>
          What I owned
        </h2>
        <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {p.owned.map((o) => (
            <li key={o} data-rise className="tile card-line flex flex-col">
              <div className="grid h-[144px] place-items-center px-6 text-ink">
                <div className="w-full max-w-[180px]">{ownedArt(ownedKind(o))}</div>
              </div>
              <p className="t-headline px-6 pb-6 font-semibold" style={{ fontSize: 20, lineHeight: 1.3 }}>
                {o}
              </p>
            </li>
          ))}
        </ul>
      </section>

      {/* Solution: chapters with their screens */}
      <section className="pt-24 md:pt-32" aria-label="Solution">
        {p.chapters.map((ch, i) => {
          const imgs = p.gallery.filter((g, gi) => g.chapter === i && gi !== 0);
          return (
            <div key={ch.title} className={i ? "pt-24 md:pt-32" : ""}>
              <div data-rise className="inset mb-10">
                <div className="measure">
                  <h3 className="t-title mb-6" style={{ fontSize: "clamp(28px, 1.4vw + 18px, 40px)" }}>
                    {ch.title}
                  </h3>
                  {ch.body.map((b) => (
                    <p key={b} className="t-body mb-4 last:mb-0">
                      {b}
                    </p>
                  ))}
                </div>
              </div>

              <Gallery imgs={imgs} bg={neutral} />
            </div>
          );
        })}
      </section>

      {/* Outcome, only when the site states numbers */}
      {p.outcomes.length > 0 && (
        <section className="inset pt-28 md:pt-40" aria-labelledby="outcome">
          <h2 id="outcome" className="sr-only">
            Outcome
          </h2>
          <dl data-rise className="grid max-w-[900px] gap-x-12 gap-y-10 md:grid-cols-2">
            {p.outcomes.map((o) => (
              <div key={o.label}>
                <dt className="t-metric">{o.value}</dt>
                <dd className="t-body mt-3 max-w-[320px] text-ink-2">{o.label}</dd>
              </div>
            ))}
          </dl>
        </section>
      )}

      {/* Next case study */}
      <section className="edge pb-3 pt-28 md:pt-40" aria-label="Next case study">
        <Link href={`/work/${next.slug}/`} data-rise className="next-card group tile card-line grid items-center gap-8 p-6 md:grid-cols-12 md:gap-6 md:p-10">
          <div className="md:col-span-5">
            <p className="mb-6 text-[15px] font-medium text-ink-2">Next case study</p>
            <div className="mb-6">
              <Brand name={next.name} scale={0.9} />
            </div>
            <p className="t-headline mb-8 max-w-[420px] font-semibold">{next.tagline}</p>
            <span className="next-arrow grid h-12 w-12 place-items-center rounded-full bg-accent text-white" aria-hidden>
              <ChevronRight />
            </span>
          </div>
          <div className="md:col-span-7">
            <Screen img={next.gallery[0]} bg={tone(next.color, "neutral")} ratio="16 / 10" radius="tile" sizes="(min-width: 768px) 700px, 100vw" />
          </div>
        </Link>
      </section>
    </main>
  );
}
