import PageHeadingSection from "./(sections)/page-heading-section";
import FilterableNewsSection from "./(sections)/filterable-news-section";
import PaginationSection from "./(sections)/pagination-section";

export default function NewsPage() {
  return (
    <>
      <PageHeadingSection />
      <FilterableNewsSection />
      <PaginationSection />
    </>
  );
}
