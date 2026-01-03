"use client";

import { useEffect } from "react";
import GoogleTranslate from "next-google-translate-widget";

interface TranslationWidgetProps {
  onWidgetReady?: () => void;
}

export function TranslationWidget({ onWidgetReady }: TranslationWidgetProps) {
  useEffect(() => {
    // Override removeChild globally to prevent Google Translate errors
    const originalRemoveChild = Node.prototype.removeChild;
    Node.prototype.removeChild = function <T extends Node>(child: T): T {
      try {
        // Only remove if the child is actually a child of this node
        if (this.contains && this.contains(child)) {
          return originalRemoveChild.call(this, child) as T;
        }
        // If child is not a child, just return it (prevent error)
        return child;
      } catch (error) {
        // Silently ignore any errors and return the child
        return child;
      }
    };

    // Suppress error events from Google Translate
    const errorHandler = (event: ErrorEvent) => {
      const error = event.error;
      if (
        error &&
        (error.name === "NotFoundError" || 
         error.message?.includes("removeChild") ||
         error.message?.includes("not a child"))
      ) {
        event.preventDefault();
        event.stopPropagation();
        return false;
      }
    };

    // Suppress unhandled promise rejections
    const unhandledRejectionHandler = (event: PromiseRejectionEvent) => {
      const reason = event.reason;
      if (
        reason?.name === "NotFoundError" ||
        reason?.message?.includes("removeChild") ||
        reason?.message?.includes("not a child")
      ) {
        event.preventDefault();
      }
    };

    window.addEventListener("error", errorHandler, true);
    window.addEventListener("unhandledrejection", unhandledRejectionHandler);

    // Callback when widget is ready
    const timer = setTimeout(() => {
      onWidgetReady?.();
    }, 1000);

    return () => {
      clearTimeout(timer);
      window.removeEventListener("error", errorHandler, true);
      window.removeEventListener("unhandledrejection", unhandledRejectionHandler);
      // Restore original removeChild
      Node.prototype.removeChild = originalRemoveChild;
    };
  }, [onWidgetReady]);

  // Position off-screen but keep in DOM so Google Translate can manipulate it
  return (
    <div
      style={{
        position: "fixed",
        left: "-9999px",
        top: "-9999px",
        visibility: "hidden",
        opacity: 0,
        pointerEvents: "none",
        width: "1px",
        height: "1px",
        overflow: "hidden",
      }}
    >
      <GoogleTranslate pageLanguage="en" includedLanguages="en,am,ti" />
    </div>
  );
}

