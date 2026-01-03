"use client";

import { useEffect } from "react";
import HeroSection from "./(sections)/hero-section";
import ContactFormSection from "./(sections)/contact-form-section";
import ContactInfoSection from "./(sections)/contact-info-section";
import LocationMapSection from "./(sections)/location-map-section";

export default function ContactPage() {
  useEffect(() => {
    // Check if URL has hash fragment
    const hash = window.location.hash;
    if (hash === "#contact-form") {
      // Wait for content to render, then scroll
      setTimeout(() => {
        const element = document.getElementById("contact-form");
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
        <div className="layout-content-container flex flex-col w-full max-w-7xl gap-4 sm:gap-5 lg:gap-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-5 lg:gap-6">
            <div className="lg:col-span-2">
              <ContactFormSection />
            </div>
            <div>
              <ContactInfoSection />
            </div>
          </div>
          <LocationMapSection />
        </div>
      </div>
    </>
  );
}
