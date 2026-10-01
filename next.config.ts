import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  images: {
    // One high quality level for every photo: full-bleed and scaled-up
    // (parallax/zoom) images look soft at the default 75.
    qualities: [90],
  },
}

export default nextConfig
