import Header from "@/components/header";
import PageHeadingSection from "./(sections)/page-heading-section";
import StorySection from "./(sections)/story-section";
import VisionMissionSection from "./(sections)/vision-mission-section";
import ValuesSection from "./(sections)/values-section";
import StatsSection from "./(sections)/stats-section";

export default function AboutPage() {
  return (
    <>
      <div className="relative">
        <Header />
        <PageHeadingSection />
      </div>
      <div className="px-4 sm:px-10 lg:px-20 py-12 sm:py-16 lg:py-24">
        <div className="layout-content-container flex flex-col w-full max-w-6xl mx-auto">
          <StorySection />
          <VisionMissionSection />
          <ValuesSection />
          <StatsSection />
        </div>
      </div>
    </>
  );
}
