const vocabulary = [
  "possibilities",
  "investment",
  "strategy",
  "markets",
  "growth",
  "partnerships",
  "Nigeria",
  "insight",
  "venues",
  "broadcast",
  "Africa",
  "capital",
  "industry",
  "momentum",
  "opportunity",
]

// The reel scrolls through the vocabulary a few times and settles on the
// brand word. Trailing words keep the reel filled below the slit.
export const BRAND_WORD = "DMP"

export const words = [
  ...vocabulary,
  ...vocabulary,
  ...vocabulary,
  BRAND_WORD,
  ...vocabulary.slice(0, 6),
]

export const brandIndex = vocabulary.length * 3
