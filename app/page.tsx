import type { Metadata } from "next";
import Header from "@/components/header";
import Footer from "@/components/footer";
import HeroSection from "./(sections)/hero-section";
import PortfolioSection from "./(sections)/portfolio-section";
import AchievementsSection from "./(sections)/achievements-section";
import LeadershipSection from "./(sections)/leadership-section";
import LatestNewsSection from "./(sections)/latest-news-section";
import { siteConfig } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Home",
  description:
    "Gelila Manufacturing PLC - A leading Ethiopian industrial group specializing in footwear manufacturing, food processing, public bus transportation, and large-scale manufacturing projects. Discover our commitment to excellence and innovation.",
  keywords: [
    "Gelila Manufacturing",
    "Ethiopian manufacturing",
    "footwear Ethiopia",
    "food processing Ethiopia",
    "bus transportation Ethiopia",
    "industrial manufacturing",
    "Ethiopia manufacturing company",
  ],
  openGraph: {
    title: "Gelila Manufacturing PLC - Leading Ethiopian Industrial Group",
    description:
      "A diversified Ethiopian industrial and service company engaged in footwear manufacturing, food processing, public bus transportation, and the development of new large-scale manufacturing projects.",
    url: siteConfig.url,
    siteName: siteConfig.name,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: "Gelila Manufacturing PLC",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Gelila Manufacturing PLC - Leading Ethiopian Industrial Group",
    description:
      "A diversified Ethiopian industrial and service company engaged in footwear manufacturing, food processing, public bus transportation, and the development of new large-scale manufacturing projects.",
    images: [siteConfig.ogImage],
  },
  alternates: {
    canonical: "/",
  },
};

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
              <LeadershipSection showMissionVision={false} />
              <LatestNewsSection />
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </div>
  );
}
