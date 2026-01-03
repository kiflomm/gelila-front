"use client";

import { useState } from "react";
import { TranslationWidget } from "./translation-widget";
import { LanguageSelector } from "./language-selector";

export function TranslationWidgetContainer() {
  const [widgetReady, setWidgetReady] = useState(false);

  const handleWidgetReady = () => {
    setWidgetReady(true);
  };

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-background-light/95 dark:bg-background-dark/95 backdrop-blur-sm border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-end h-10 sm:h-12">
          <LanguageSelector />
        </div>
      </div>
      <TranslationWidget onWidgetReady={handleWidgetReady} />
    </div>
  );
}

