"use client"

import { useSyncExternalStore } from "react"

// Lets anything on the page wait for the preloader to finish before
// playing its entrance.
let done = false
const listeners = new Set<() => void>()

export function markPreloaderDone() {
  done = true
  listeners.forEach((listener) => listener())
}

function subscribe(listener: () => void) {
  listeners.add(listener)
  return () => listeners.delete(listener)
}

export function usePreloaderDone() {
  return useSyncExternalStore(
    subscribe,
    () => done,
    () => false
  )
}
