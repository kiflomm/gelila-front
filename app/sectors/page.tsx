import HeroSection from "./(sections)/hero-section";
import FilterableSectorsSection from "./(sections)/filterable-sectors-section";

export default function SectorsPage() {
  return (
    <>
      <HeroSection />
      <div className="px-2 sm:px-4 md:px-6 lg:px-10 xl:px-20 py-6 sm:py-8 md:py-10 lg:py-12 xl:py-16 flex flex-1 justify-center">
        <div className="layout-content-container flex flex-col w-full max-w-7xl">
          <FilterableSectorsSection />
        </div>
      </div>
    </>
  );
}
