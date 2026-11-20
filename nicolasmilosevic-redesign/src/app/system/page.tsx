import type { Metadata } from "next";
import Image from "next/image";
import NameMark from "@/components/NameMark";
import Button from "@/components/Button";
import ContactCard from "@/components/ContactCard";
import { system } from "@/lib/content";

export const metadata: Metadata = { title: "Design system", description: system.metaDescription };

const principles = [
  { title: "Screens first", body: "The screens are the work. They sit uncropped on a light panel tinted with the product’s colour, with no device frames." },
  { title: "Glass for controls only", body: "Only the top bar, the back button and the image controls are glass, and only over content, so the blur shows." },
  { title: "One blue", body: "The accent is for the main button, the active page and one detail per drawing. Everything else stays grey." },
];
const colours = [
  { name: "--base", hex: "#FBFBFD", use: "Page background" },
  { name: "--ink", hex: "#1D1D1F", use: "Main text and logos" },
  { name: "--ink-2", hex: "#86868B", use: "Secondary text" },
  { name: "--hair", hex: "rgba(0,0,0,.08)", use: "Hairlines" },
  { name: "--accent", hex: "#2623F9", use: "Primary button, active page" },
];
const type = [
  { role: "Large title", spec: "56–80px, 600, −0.02em", cls: "t-large", size: "clamp(36px, 3vw + 16px, 64px)" },
  { role: "Title", spec: "34–48px, 600, −0.02em", cls: "t-title" },
  { role: "Headline", spec: "24px, 500", cls: "t-headline" },
  { role: "Body", spec: "17px, 400", cls: "t-body" },
  { role: "Caption", spec: "13px, 500", cls: "t-caption" },
];
const motion = [
  ["Press", "scale .96 and back", "0.35s"],
  ["Hover", "fill a little brighter, chevron 2px", "0.3s"],
  ["Top bar", "full to compact on scroll", "0.5s"],
  ["Titles", "words come out of a blur, one by one", "1.1s"],
  ["Cards and text", "rise 32px out of a light blur", "0.9s"],
];
const components = [
  ["Button", "Primary, secondary and tertiary, all with the same hover", "Button.tsx"],
  ["Screen", "A panel in the product’s tone with the screen centred and uncropped", "Screen.tsx"],
  ["Dock", "The floating top bar, compact while you scroll down", "Dock.tsx"],
  ["Gallery", "Case-study screens with captions, opening large on click", "Gallery.tsx"],
  ["ContactCard", "The card that closes every page", "ContactCard.tsx"],
];

export default function System() {
  return (
    <main id="content" className="relative">
      <NameMark />
      <section className="inset pt-40 md:pt-48">
        <h1 className="t-large mb-8">{system.heading}</h1>
        <p className="t-headline measure" style={{ fontWeight: 400 }}>
          Everything on this site is built from one set of tokens and a few components. They’re all on this page.
        </p>
      </section>

      <section className="inset pt-28 md:pt-36" aria-labelledby="principles">
        <h2 id="principles" className="t-title mb-12">
          Principles
        </h2>
        <div className="grid max-w-[1080px] gap-12 md:grid-cols-3">
          {principles.map((p) => (
            <div key={p.title} data-rise>
              <h3 className="t-headline mb-3 font-semibold" style={{ fontSize: 20 }}>
                {p.title}
              </h3>
              <p className="t-body text-ink-2">{p.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Glass and buttons over a real screen, so the blur shows */}
      <section className="pt-28 md:pt-36" aria-labelledby="glass">
        <div className="inset mb-10">
          <h2 id="glass" className="t-title mb-6">
            Glass and buttons
          </h2>
          <p className="t-body measure text-ink-2">
            Glass is white at 38% with a 16px blur, 200% saturation, a 1px light and two inner highlights. The primary button is solid blue. Buttons are 48px capsules.
          </p>
        </div>
        <div className="edge" data-rise>
          <div className="card aspect-[16/10]">
            <Image src={system.image.src} alt={system.image.alt} fill unoptimized sizes="100vw" className="object-cover" />
            <div className="absolute inset-x-4 bottom-4 flex flex-wrap items-center gap-3 md:inset-x-8 md:bottom-8">
              <Button href="https://linkedin.com/in/nicolasmilosevic" variant="primary">
                Primary
              </Button>
              <Button href="/system/" variant="secondary">
                Secondary
              </Button>
            </div>
          </div>
        </div>
        <div className="inset mt-6">
          <Button href="/about/" variant="tertiary">
            Tertiary
          </Button>
        </div>
      </section>

      <section className="inset pt-28 md:pt-36" aria-labelledby="colour">
        <h2 id="colour" className="t-title mb-10">
          Colour
        </h2>
        <ul className="grid max-w-[1080px] grid-cols-2 gap-x-3 gap-y-8 md:grid-cols-5">
          {colours.map((c) => (
            <li key={c.name} data-rise>
              <div className="tile mb-4 aspect-square" style={{ background: c.hex }} />
              <p className="t-body font-semibold">{c.name}</p>
              <p className="t-caption text-ink-2" style={{ fontSize: 15 }}>
                {c.hex}, {c.use.toLowerCase()}
              </p>
            </li>
          ))}
        </ul>
        <h3 className="t-headline mb-6 mt-16 font-semibold">Project colours</h3>
        <p className="t-body measure mb-8 text-ink-2">Each case study uses the colour people know from the product. Its screen panels mix 14% of that colour into the page background.</p>
        <ul className="grid max-w-[1080px] grid-cols-2 gap-x-3 gap-y-8 md:grid-cols-5">
          {system.projectColours.map((c) => (
            <li key={c.name} data-rise>
              <div className="tile mb-4 flex aspect-square items-end p-3" style={{ background: c.hex }}>
                <span className="tile h-1/3 w-full" style={{ background: `color-mix(in srgb, ${c.hex} 14%, #fbfbfd)`, borderRadius: 12 }} />
              </div>
              <p className="t-body font-semibold">{c.name}</p>
              <p className="t-caption text-ink-2" style={{ fontSize: 15 }}>
                {c.hex}
              </p>
            </li>
          ))}
        </ul>
      </section>

      <section className="inset pt-28 md:pt-36" aria-labelledby="type">
        <h2 id="type" className="t-title mb-4">
          Type
        </h2>
        <p className="t-body measure mb-10 text-ink-2">Manrope everywhere, in three weights. Size sets the hierarchy.</p>
        <ul className="max-w-[1080px]">
          {type.map((t) => (
            <li key={t.role} data-rise className="grid gap-2 py-6 md:grid-cols-12 md:items-baseline md:gap-6">
              <span className="t-caption text-ink-2 md:col-span-3" style={{ fontSize: 15 }}>
                {t.role}, {t.spec}
              </span>
              <span className={`${t.cls} md:col-span-9`} style={t.size ? { fontSize: t.size } : undefined}>
                Good systems outlive me
              </span>
            </li>
          ))}
        </ul>
      </section>

      <section className="inset pb-28 pt-28 md:pb-40 md:pt-36" aria-labelledby="motion">
        <div className="grid max-w-[1080px] gap-16 md:grid-cols-2">
          <div>
            <h2 id="motion" className="t-title mb-4">
              Motion
            </h2>
            <p className="t-body mb-8 text-ink-2">One easing for everything: cubic-bezier(.32,.72,0,1).</p>
            <dl className="" data-rise>
              {motion.map(([k, v, d]) => (
                <div key={k} className="flex items-baseline justify-between gap-6 py-4">
                  <dt className="t-body font-semibold">{k}</dt>
                  <dd className="t-body flex-1 text-ink-2">{v}</dd>
                  <dd className="t-body" style={{ fontVariantNumeric: "tabular-nums" }}>
                    {d}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
          <div>
            <h2 className="t-title mb-4">Components</h2>
            <p className="t-body mb-8 text-ink-2">Every page is built from these.</p>
            <dl className="" data-rise>
              {components.map(([n, w, f]) => (
                <div key={n} className=" py-4">
                  <dt className="t-body font-semibold">
                    {n} <span className="t-caption font-normal text-ink-2" style={{ fontSize: 15 }}>{f}</span>
                  </dt>
                  <dd className="t-body text-ink-2">{w}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      <ContactCard />
    </main>
  );
}
