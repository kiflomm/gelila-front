import PageHeadingSection from "./(sections)/page-heading-section";
import ContactFormSection from "./(sections)/contact-form-section";
import ContactInfoSection from "./(sections)/contact-info-section";

export default function ContactPage() {
  return (
    <>
      <PageHeadingSection />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-12 px-2 sm:px-4 md:px-6">
        <div className="lg:col-span-2">
          <ContactFormSection />
        </div>
        <div>
          <ContactInfoSection />
        </div>
      </div>
    </>
  );
}
