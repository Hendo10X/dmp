import { defineCliConfig } from "sanity/cli"

// The Sanity CLI does not read Next's .env.local itself.
try {
  process.loadEnvFile(".env.local")
} catch {
  // No .env.local: rely on the shell environment.
}

// Lets `npx sanity ...` (login, cors, exec) run from this folder.
export default defineCliConfig({
  api: {
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production",
  },
})
