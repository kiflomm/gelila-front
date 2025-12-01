import Header from "@/components/header";
import Footer from "@/components/footer";
import HeroSection from "./(sections)/hero-section";
import PortfolioSection from "./(sections)/portfolio-section";
import AchievementsSection from "./(sections)/achievements-section";
import LeadershipSection from "./(sections)/leadership-section";

export default function HomePage() {
  return (
    <div className="relative flex h-auto min-h-screen w-full flex-col group/design-root overflow-x-hidden">
      <div className="layout-container flex h-full grow flex-col">
        <main className="flex flex-1 flex-col">
          <div className="relative">
            <Header />
            <HeroSection />
          </div>
          <div className="px-4 sm:px-10 lg:px-20 py-10 lg:py-16 flex flex-1 justify-center">
            <div className="layout-content-container flex flex-col w-full max-w-7xl">
              <PortfolioSection />
              <AchievementsSection />
              <LeadershipSection />
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </div>
  );
}
