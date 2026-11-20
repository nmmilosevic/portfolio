import data from "@content/content.json";

export type Img = {
  src: string;
  alt: string;
  width: number;
  height: number;
  chapter?: number;
  kind?: string;
};
export type Outcome = { value: string; label: string };
export type Chapter = { title: string; body: string[] };
export type Project = {
  slug: string;
  name: string;
  kind: string;
  years: string;
  current?: boolean;
  color: string;
  summary: string;
  tagline: string;
  facts: Record<string, string>;
  intro: string;
  owned: string[];
  team: string;
  outcomes: Outcome[];
  chapters: Chapter[];
  gallery: Img[];
};

type AboutPage = {
  heading: string;
  metaDescription: string;
  intro: string[];
  howIWork: { title: string; items: { title: string; body: string }[] };
  stats: Outcome[];
  experience: { title: string; items: { company: string; role: string; period: string; href: string }[] };
  whatIDo: { title: string; items: string[] };
  whatIUse: { title: string; items: string[] };
};
type SystemPage = {
  heading: string;
  metaDescription: string;
  intro: string;
  projectColours: { name: string; hex: string }[];
  image: Img;
};

export const person = data.person;
export const home = data.home;
export const projects = data.projects as Project[];
export const about = data.pages.find((p) => p.slug === "about") as unknown as AboutPage;
export const system = data.pages.find((p) => p.slug === "system") as unknown as SystemPage;
export const nav = data.nav as { label: string; href: string }[];
export const contact = {
  status: data.home.contact.status,
  title: data.home.contact.title,
  label: data.home.contact.cta.label,
  href: data.home.contact.cta.href,
};

export const getProject = (slug: string) => projects.find((p) => p.slug === slug);
export const nextProject = (slug: string) => {
  const i = projects.findIndex((p) => p.slug === slug);
  return projects[(i + 1) % projects.length];
};

/** Panel tone for a screen frame: the product's own colour, or its neutral (a little of it in the base). */
export const tone = (hex: string, strength: "brand" | "neutral") =>
  strength === "brand" ? hex : `color-mix(in srgb, ${hex} 14%, #fbfbfd)`;

/** True when white text reads better than ink on this colour. */
export const isDark = (hex: string) => {
  const n = parseInt(hex.replace("#", ""), 16);
  const lin = (v: number) => ((v /= 255) <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4);
  const L = 0.2126 * lin((n >> 16) & 255) + 0.7152 * lin((n >> 8) & 255) + 0.0722 * lin(n & 255);
  return L < 0.18;
};
