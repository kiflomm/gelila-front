"use client";

import { useEffect } from "react";

export function ScrollToContactFormOnHash() {
  useEffect(() => {
    const hash = window.location.hash;
    if (hash === "#contact-form") {
      // Wait for content to render, then scroll
      const timeoutId = window.setTimeout(() => {
        const element = document.getElementById("contact-form");
        if (element) {
          const headerHeight = 88; // Approximate header height
          const elementPosition = element.getBoundingClientRect().top;
          const offsetPosition =
            elementPosition + window.pageYOffset - headerHeight;

          window.scrollTo({
            top: offsetPosition,
            behavior: "smooth",
          });
        }
      }, 100);

      return () => window.clearTimeout(timeoutId);
    }
  }, []);

  return null;
}

