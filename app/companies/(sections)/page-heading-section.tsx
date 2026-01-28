import Image from "@/components/ui/image";
import pageHeadingData from "@/data/companies-page-heading.json";

export default function PageHeadingSection() {
  return (
    <section className="w-full">
      <div className="relative flex min-h-[500px] lg:min-h-[600px] w-full flex-col gap-6 bg-cover bg-center bg-no-repeat items-start justify-center px-4 sm:px-6 lg:px-10 xl:px-20 py-16 sm:py-20 lg:py-24 overflow-hidden">
        <Image
          src={pageHeadingData.image.src}
          alt={pageHeadingData.image.alt}
          fill
          className="object-cover brightness-75"
          priority
        />
        <div className="absolute inset-0 bg-linear-to-r from-black/60 to-black/40" />
        <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col gap-4 text-left">
          <h1 className="text-white text-4xl font-black leading-tight tracking-tight sm:text-5xl md:text-6xl max-w-3xl">
            {pageHeadingData.title}
          </h1>
          <p className="text-white/90 text-base font-normal leading-normal sm:text-lg max-w-2xl">
            {pageHeadingData.description}
          </p>
        </div>
      </div>
    </section>
  );
}

