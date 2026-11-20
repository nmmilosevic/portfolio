import fs from "node:fs";
import path from "node:path";

const files: Record<string, string> = {
  Figma: "figma",
  Cursor: "cursor",
  Codex: "codex",
  Claude: "claude",
  Framer: "framer",
  Notion: "notion",
  "Affinity Studio": "affinity-studio",
  GitHub: "github",
  Vercel: "vercel",
};

// Official brand colours. Figma's mark uses its five colours, in path order.
const brandColor: Record<string, string> = {
  Figma: "#F24E1E",
  Cursor: "#000000",
  Codex: "#000000",
  Claude: "#D97757",
  Framer: "#0055FF",
  Notion: "#000000",
  "Affinity Studio": "#222324",
  Krea: "#000000",
  GitHub: "#181717",
  Vercel: "#000000",
};
// Tools that only publish a bitmap mark: drawn as a mask in their colour.
const maskFiles: Record<string, string> = { Krea: "/assets/brands/krea.png" };
const figmaFills = ["#F24E1E", "#FF7262", "#A259FF", "#1ABCFE", "#0ACF83"];

/** Official marks, read at build time, in their brand colours. */
export function getLogos(names: string[]) {
  return names.map((name) => {
    const file = files[name];
    let svg = file ? fs.readFileSync(path.join(process.cwd(), "src/assets/logos", `${file}.svg`), "utf8") : "";
    if (name === "Figma") {
      let i = 0;
      svg = svg.replace(/<(path|circle)\b/g, (m) => `${m} fill="${figmaFills[i++ % figmaFills.length]}"`);
    }
    return {
      name,
      mask: maskFiles[name],
      color: brandColor[name] ?? "currentColor",
      svg: svg.replace("<svg ", '<svg aria-hidden="true" width="100%" height="100%" '),
    };
  });
}

const brandFiles: Record<string, string> = {
  Somfy: "somfy",
  Vibe: "vibe",
  "360Learning": "360learning",
  AXA: "axa",
};

/** Company marks in one colour. Zestia only publishes a bitmap, so it is drawn as a mask. */
export function getBrand(name: string): { svg?: string; mask?: string } {
  if (name === "Zestia") return { mask: "/assets/brands/zestia.webp" };
  const file = brandFiles[name];
  if (!file) return {};
  const svg = fs.readFileSync(path.join(process.cwd(), "src/assets/brands", `${file}.svg`), "utf8");
  return { svg: svg.replace(/<svg\b/, '<svg aria-hidden="true" width="100%" height="100%"') };
}
