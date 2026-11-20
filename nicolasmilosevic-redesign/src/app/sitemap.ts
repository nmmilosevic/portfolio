import type { MetadataRoute } from "next";
import { projects } from "@/lib/content";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://nicolasmilosevic.com";
  return ["/", "/about/", "/system/", ...projects.map((p) => `/work/${p.slug}/`)].map((path) => ({ url: base + path }));
}
