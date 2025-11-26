"use client";

import { useState } from "react";
import FilterChipsSection from "./filter-chips-section";
import NewsGridSection from "./news-grid-section";

export default function FilterableNewsSection() {
  const [activeCategory, setActiveCategory] = useState("all");

  return (
    <>
      <FilterChipsSection
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
      />
      <NewsGridSection activeCategory={activeCategory} />
    </>
  );
}
