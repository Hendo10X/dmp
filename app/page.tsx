import { Preloader } from "@/components/preloader/preloader"

// Main page intentionally empty for now — only the preloader is built.
export default function Page() {
  return (
    <>
      <Preloader />
      <main className="min-h-svh" />
    </>
  )
}
