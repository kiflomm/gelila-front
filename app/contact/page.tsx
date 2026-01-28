import HeroSection from "./(sections)/hero-section";
import ContactFormSection from "./(sections)/contact-form-section";
import ContactInfoSection from "./(sections)/contact-info-section";
import LocationMapSection from "./(sections)/location-map-section";
import { ScrollToContactFormOnHash } from "./(sections)/scroll-to-contact-form";

export default function ContactPage() {
  return (
    <>
      <ScrollToContactFormOnHash />
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
