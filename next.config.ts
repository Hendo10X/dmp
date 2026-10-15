import path from "node:path"
import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  images: {
    // One high quality level for every photo: full-bleed and scaled-up
    // (parallax/zoom) images look soft at the default 75.
    qualities: [90],
  },
  // Pin the project root: a stray package-lock.json in the user's home folder
  // otherwise makes Turbopack guess the wrong workspace root.
  turbopack: {
    root: path.join(__dirname),
  },
}

export default nextConfig
