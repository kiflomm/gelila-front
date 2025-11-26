import Header from "@/components/header";
import Footer from "@/components/footer";
import HeroSection from "./(sections)/hero-section";
import PortfolioSection from "./(sections)/portfolio-section";
import AchievementsSection from "./(sections)/achievements-section";

export default function HomePage() {
  return (
    <div className="relative flex h-auto min-h-screen w-full flex-col group/design-root overflow-x-hidden">
      <div className="layout-container flex h-full grow flex-col">
        <Header />
        <main className="px-4 sm:px-10 lg:px-20 py-10 lg:py-16 flex flex-1 justify-center">
          <div className="layout-content-container flex flex-col w-full max-w-7xl">
            <HeroSection />
            <PortfolioSection />
            <AchievementsSection />
          </div>
        </main>
        <Footer />
      </div>
    </div>
  );
}
