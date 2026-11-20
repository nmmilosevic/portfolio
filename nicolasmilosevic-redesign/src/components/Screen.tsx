import Image from "next/image";
import type { Img } from "@/lib/content";

type Props = {
  img: Img;
  bg: string;
  ratio?: string; // CSS aspect-ratio of the card
  radius?: "card" | "tile";
  className?: string;
  priority?: boolean;
  sizes?: string;
  children?: React.ReactNode;
};

/** A full card in the product's tone, the screen centred inside with 7% padding, never cropped. */
export default function Screen({
  img,
  bg,
  ratio = "16 / 9",
  radius = "card",
  className = "",
  priority,
  sizes = "100vw",
  children,
}: Props) {
  return (
    <div className={`${radius} ${className}`} style={{ background: bg, aspectRatio: ratio }}>
      <div className="screen-pad">
        <Image src={img.src} alt={img.alt} fill unoptimized priority={priority} sizes={sizes} />
      </div>
      {children}
    </div>
  );
}
