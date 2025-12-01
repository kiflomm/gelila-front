import HeroSection from "./(sections)/hero-section";
import CommitmentSection from "./(sections)/commitment-section";
import ExportPortfolioSection from "./(sections)/export-portfolio-section";

export default function ExportsPage() {
  return (
    <>
      <HeroSection />
      <div className="px-4 sm:px-10 lg:px-20 py-10 lg:py-16 flex flex-1 justify-center">
        <div className="layout-content-container flex flex-col w-full max-w-7xl">
          <CommitmentSection />
          <ExportPortfolioSection />
        </div>
      </div>
    </>
  );
}
