"use client";

import { useEffect, useState } from "react";

/**
 * Hook that tracks which section is currently in the viewport
 * Uses IntersectionObserver for performance
 * 
 * @param sectionIds - Array of section IDs to observe
 * @returns The ID of the currently active section, or null
 */
export function useScrollSpy(sectionIds: string[]): string | null {
  const [activeSection, setActiveSection] = useState<string | null>(null);

  useEffect(() => {
    // Check if we're in the browser
    if (typeof window === "undefined") return;

    const observers: IntersectionObserver[] = [];

    // Create an observer for each section
    sectionIds.forEach((sectionId) => {
      const element = document.getElementById(sectionId);
      if (!element) return;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            // When a section enters the viewport (crosses the 20% threshold from top)
            if (entry.isIntersecting) {
              setActiveSection(sectionId);
            }
          });
        },
        {
          // Trigger when section crosses 20% from top of viewport
          // This means the section is considered "active" when it's in the center area
          rootMargin: "-20% 0px -80% 0px",
          threshold: 0,
        }
      );

      observer.observe(element);
      observers.push(observer);
    });

    // Cleanup function
    return () => {
      observers.forEach((observer) => observer.disconnect());
    };
  }, [sectionIds]);

  return activeSection;
}

