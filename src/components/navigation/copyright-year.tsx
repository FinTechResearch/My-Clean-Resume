"use client";

import { useSyncExternalStore } from "react";

/**
 * The current year.
 *
 * Rendered through `useSyncExternalStore` so the value is read on the
 * client without being baked into a prerendered page, and without a
 * state update inside an effect. The server snapshot keeps the markup
 * stable during hydration.
 */
const FALLBACK = "2026";

function subscribe() {
  // The year only changes once a year; there is nothing to subscribe to.
  return () => {};
}

export function CopyrightYear({ fallback = FALLBACK }: { fallback?: string }) {
  const year = useSyncExternalStore(
    subscribe,
    () => String(new Date().getFullYear()),
    () => fallback,
  );

  return <>{year}</>;
}
