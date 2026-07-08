"use client";

import { useEffect } from "react";

/** Registers the PWA service worker once the page is interactive. */
export function RegisterServiceWorker() {
  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.register("/sw.js").catch(() => {
        // Non-fatal: the app works fine without offline support.
      });
    }
  }, []);

  return null;
}
