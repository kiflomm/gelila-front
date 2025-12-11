import { Suspense } from "react";
import HeroSection from "./(sections)/hero-section";
import JobListingsSection from "./(sections)/job-listings-section";
import JobListingsSkeleton from "./(sections)/job-listings-skeleton";
import DepartmentsSection from "./(sections)/departments-section";
import OpportunitiesSection from "./(sections)/opportunities-section";

export default function CareersPage() {
  return (
    <>
      <HeroSection />
      <div className="px-4 sm:px-10 lg:px-20 py-10 lg:py-16 flex flex-1 justify-center">
        <div className="layout-content-container flex flex-col w-full max-w-7xl">
          <Suspense fallback={<JobListingsSkeleton />}>
            <JobListingsSection />
          </Suspense>
          <DepartmentsSection />
          <OpportunitiesSection />
        </div>
      </div>
    </>
  );
}
