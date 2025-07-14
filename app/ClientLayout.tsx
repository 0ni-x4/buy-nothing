"use client";
import { useEffect } from "react";
import posthog from "./instrumentation-client";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    posthog.capture("site_visited", {
      url: window.location.href,
      referrer: document.referrer,
      userAgent: navigator.userAgent,
      timestamp: new Date().toISOString(),
    });
    // Track all button clicks
    const handler = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName === "BUTTON" || target.closest("button")) {
        posthog.capture("button_clicked", {
          text: target.textContent,
          class: target.className,
          url: window.location.href,
          timestamp: new Date().toISOString(),
        });
      }
    };
    document.addEventListener("click", handler);
    return () => document.removeEventListener("click", handler);
  }, []);
  return <>{children}</>;
} 