import { Suspense } from "react";
import HeroSection from "./(sections)/hero-section";
import JobListingsSection from "./(sections)/job-listings-section";
import DepartmentsSection from "./(sections)/departments-section";
import OpportunitiesSection from "./(sections)/opportunities-section";

export default function CareersPage() {
  return (
    <>
      <HeroSection />
      <div className="px-4 sm:px-10 lg:px-20 py-10 lg:py-16 flex flex-1 justify-center">
        <div className="layout-content-container flex flex-col w-full max-w-7xl">
          <Suspense
            fallback={<div className="py-12 text-center">Loading jobs...</div>}
          >
            <JobListingsSection />
          </Suspense>
          <DepartmentsSection />
          <OpportunitiesSection />
        </div>
      </div>
    </>
  );
}
