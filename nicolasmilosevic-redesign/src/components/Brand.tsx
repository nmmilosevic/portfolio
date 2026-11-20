import { getBrand } from "@/lib/logos";

// Visual size per mark, so wide wordmarks and square marks read at the same weight.
const logoH: Record<string, number> = { Somfy: 40, Zestia: 44, Vibe: 32, "360Learning": 36, AXA: 52 };

export default function Brand({ name, scale = 1 }: { name: string; scale?: number }) {
  const b = getBrand(name);
  const h = Math.round((logoH[name] ?? 40) * scale);
  if (b.mask)
    return (
      <span
        role="img"
        aria-label={`${name} logo`}
        className="brand-mask block bg-ink"
        style={{ height: h, aspectRatio: "376 / 112", WebkitMaskImage: `url(${b.mask})`, maskImage: `url(${b.mask})` }}
      />
    );
  return <span role="img" aria-label={`${name} logo`} className="brand-logo block text-ink" style={{ height: h }} dangerouslySetInnerHTML={{ __html: b.svg ?? "" }} />;
}

