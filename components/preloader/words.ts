const vocabulary = [
  "performance",
  "strategy",
  "data",
  "athletes",
  "analytics",
  "innovation",
  "fans",
  "velocity",
  "insight",
  "venues",
  "growth",
  "precision",
  "broadcast",
  "momentum",
  "scouting",
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
