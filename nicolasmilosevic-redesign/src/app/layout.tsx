import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Dock from "@/components/Dock";
import Motion from "@/components/Motion";
import HoloFavicon from "@/components/HoloFavicon";
import Footer from "@/components/Footer";
import { home } from "@/lib/content";

// Manrope (SIL Open Font License), bundled so the build never depends on downloading it
const manrope = localFont({
  src: "../fonts/Manrope-latin.woff2",
  weight: "400 600",
  variable: "--font-manrope",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://nicolasmilosevic.com"),
  title: { default: home.title, template: "%s, Nicolas Milosevic" },
  description: home.description,
  icons: { apple: "/assets/apple-touch-icon.png" },
  openGraph: { images: ["/assets/share.png"], title: home.title, description: home.description },
};
export const viewport: Viewport = { themeColor: "#fbfbfd" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={manrope.variable} suppressHydrationWarning>
      <head>
        {/* the only favicon link: HoloFavicon animates this same element */}
        <link rel="icon" type="image/svg+xml" href="/assets/favicon.svg" data-holo="" />
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
      </head>
      <body>
        <a href="#content" className="sr-only focus:not-sr-only focus:fixed focus:left-3 focus:top-3 focus:z-[60] btn btn-secondary glass">
          Skip to content
        </a>
        {children}
        <Footer />
        <Dock />
        <Motion />
        <HoloFavicon />
      </body>
    </html>
  );
}
