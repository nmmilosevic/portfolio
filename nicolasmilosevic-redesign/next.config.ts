import type { NextConfig } from "next";

// Static export for GitHub Pages: every page is plain HTML in out/.
const nextConfig: NextConfig = {
  output: "export",
  // local previews build elsewhere so they don't clash with a running dev server
  ...(process.env.NEXT_DIST_DIR ? { distDir: process.env.NEXT_DIST_DIR } : {}),
  trailingSlash: true,
  images: { unoptimized: true },
};

export default nextConfig;
