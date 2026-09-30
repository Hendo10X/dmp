"use client"

import { useSyncExternalStore } from "react"

// Tracks the home preloader so the rest of the site can wait for it.
// "idle": no preloader on this page (or not mounted yet).
// "running": the preloader is covering the page.
// "done": it has played once this visit; it won't play again.
type Status = "idle" | "running" | "done"

let status: Status = "idle"
const listeners = new Set<() => void>()

function set(next: Status) {
  status = next
  listeners.forEach((listener) => listener())
}

export const getPreloaderStatus = () => status
export const markPreloaderRunning = () => set("running")
export const markPreloaderDone = () => set("done")

function subscribe(listener: () => void) {
  listeners.add(listener)
  return () => listeners.delete(listener)
}

// True once the preloader has finished. Home hero entrance waits on this.
export function usePreloaderDone() {
  return useSyncExternalStore(
    subscribe,
    () => status === "done",
    () => false
  )
}

// True whenever nothing is covering the page: pages without a preloader
// settle immediately after hydration.
export function useIntroSettled() {
  return useSyncExternalStore(
    subscribe,
    () => status !== "running",
    () => false
  )
}
