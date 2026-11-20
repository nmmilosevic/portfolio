import Link from "next/link";
import Button from "@/components/Button";
import Screen from "@/components/Screen";
import ContactCard from "@/components/ContactCard";
import { about, person, projects, tone } from "@/lib/content";
import { getLogos } from "@/lib/logos";
import ToolGrid from "@/components/ToolGrid";

export default function Home() {
  return (
    <main id="content">
      {/* 1. Hero */}
      <section className="inset pt-32 md:pt-48" aria-labelledby="hero-title">
        <h1 id="hero-title" className="t-large mb-6">
          {person.fullName}
        </h1>
        <p className="t-headline mb-4 max-w-[640px]" style={{ fontWeight: 400 }}>
          Senior product designer. I design product interfaces and the design systems behind them, and I stay with the team until they ship.
        </p>
        <p className="t-body mb-10 text-ink-2">Based in Spain and open to new projects.</p>
        <Button href={person.linkedin} variant="primary">
          Get in touch
        </Button>
        <div className="mt-16 md:mt-24">
          <ToolGrid title="Stack" logos={getLogos(about.whatIUse.items)} />
        </div>
      </section>

      {/* 2. Work */}
      <section id="work" className="wrap scroll-mt-6 pt-28 md:pt-36" aria-labelledby="work-title">
        <h2 id="work-title" className="t-title measure-title mb-10">
          Five products, from 2017 to today
        </h2>
        <ul className="grid grid-cols-1 gap-x-6 gap-y-12 md:grid-cols-2">
          {projects.map((p) => (
            <li key={p.slug} data-rise>
              <Link href={`/work/${p.slug}/`} className="group block">
                <Screen
                  img={p.gallery[0]}
                  bg={tone(p.color, "neutral")}
                  ratio="4 / 3"
                  radius="tile"
                  sizes="(min-width: 768px) 600px, 100vw"
                />
                <div className="mt-4">
                  <p className="t-headline font-semibold transition-colors duration-300 group-hover:text-accent" style={{ fontSize: 20 }}>
                    {p.name}
                  </p>
                  <p className="t-body text-ink-2">{p.summary}</p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {/* 3. About */}
      <section className="wrap py-28 md:py-40" aria-labelledby="about-title">
        <div data-rise className="measure">
          <h2 id="about-title" className="sr-only">
            About
          </h2>
          <p className="t-headline mb-10" style={{ fontWeight: 400 }}>
            {person.bio}
          </p>
          <Button href="/about/" variant="secondary">
            About me
          </Button>
        </div>
      </section>

      {/* 4. Contact */}
      <ContactCard />
    </main>
  );
}
