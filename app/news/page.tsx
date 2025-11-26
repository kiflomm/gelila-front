import PageHeadingSection from "./(sections)/page-heading-section";
import FilterChipsSection from "./(sections)/filter-chips-section";
import NewsGridSection from "./(sections)/news-grid-section";
import PaginationSection from "./(sections)/pagination-section";

export default function NewsPage() {
  return (
    <>
      <PageHeadingSection />
      <FilterChipsSection />
      <NewsGridSection />
      <PaginationSection />
    </>
  );
}
