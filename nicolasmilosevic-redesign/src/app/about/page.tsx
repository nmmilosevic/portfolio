import type { Metadata } from "next";
import ContactCard from "@/components/ContactCard";
import { about } from "@/lib/content";
import ExperienceCards from "@/components/ExperienceCards";
import DoCards, { HowCards } from "@/components/DoCards";
import StatCards from "@/components/StatCards";

export const metadata: Metadata = { title: "About", description: about.metaDescription };

export default function About() {
  return (
    <main id="content" className="relative">

      <section className="inset pt-40 md:pt-48" aria-labelledby="about-title">
        <h1 id="about-title" className="t-large measure-title mb-12" style={{ fontSize: "clamp(36px, 2.6vw + 18px, 60px)" }}>
          {about.heading}
        </h1>
        <div data-rise className="measure">
          {about.intro.map((t, i) => (
            <p key={i} className={i === 0 ? "t-headline mb-6" : "t-body mb-5 text-ink"} style={i === 0 ? { fontWeight: 400 } : undefined}>
              {t}
            </p>
          ))}
        </div>
      </section>

      <section className="inset pt-20 md:pt-24" aria-label="In numbers">
        <StatCards stats={about.stats} />
      </section>

      <section className="inset pt-28 md:pt-40" aria-labelledby="how">
        <h2 id="how" className="t-title mb-12">
          {about.howIWork.title}
        </h2>
        <HowCards items={about.howIWork.items} />
      </section>

      <section className="inset pt-28 md:pt-40" aria-labelledby="do">
        <h2 id="do" className="t-title mb-10">
          {about.whatIDo.title}
        </h2>
        <DoCards items={about.whatIDo.items} />
      </section>

      <section className="inset pb-28 pt-28 md:pb-40 md:pt-40" aria-labelledby="exp">
        <h2 id="exp" className="t-title mb-10">
          {about.experience.title}
        </h2>
        <ExperienceCards items={about.experience.items} />
      </section>

      <ContactCard />
    </main>
  );
}
