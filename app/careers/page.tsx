"use client";

import { Suspense, useEffect } from "react";
import HeroSection from "./(sections)/hero-section";
import JobListingsSection from "./(sections)/job-listings-section";
import JobListingsSkeleton from "./(sections)/job-listings-skeleton";
import DepartmentsSection from "./(sections)/departments-section";
import OpportunitiesSection from "./(sections)/opportunities-section";

export default function CareersPage() {
  useEffect(() => {
    // Check if URL has hash fragment
    const hash = window.location.hash;
    if (hash === "#careers-section") {
      // Wait for content to render, then scroll
      setTimeout(() => {
        const element = document.getElementById("careers-section");
        if (element) {
          const headerHeight = 88; // Approximate header height
          const elementPosition = element.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerHeight;

          window.scrollTo({
            top: offsetPosition,
            behavior: "smooth",
          });
        }
      }, 100);
    }
  }, []);

  return (
    <>
      <HeroSection />
      <div className="px-4 sm:px-10 lg:px-20 py-10 lg:py-16 flex flex-1 justify-center">
        <div className="layout-content-container flex flex-col w-full max-w-7xl">
          <div id="careers-section" className="scroll-mt-24">
            <Suspense fallback={<JobListingsSkeleton />}>
              <JobListingsSection />
            </Suspense>
          </div>
          <DepartmentsSection />
          <OpportunitiesSection />
        </div>
      </div>
    </>
  );
}
