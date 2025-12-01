import Image from "next/image";

export default function PageHeadingSection() {
  return (
    <section className="w-full">
      <div className="relative flex min-h-[500px] lg:min-h-[600px] w-full flex-col gap-6 bg-cover bg-center bg-no-repeat items-start justify-center px-4 sm:px-6 lg:px-10 xl:px-20 py-16 sm:py-20 lg:py-24 overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2070&auto=format&fit=crop"
          alt="Modern corporate office building representing Gelila Manufacturing's headquarters and business excellence"
          fill
          className="object-cover brightness-75"
          priority
        />
        <div className="absolute inset-0 bg-linear-to-r from-black/60 to-black/40" />
        <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col gap-4 text-left">
          <h1 className="text-white text-4xl font-black leading-tight tracking-tight sm:text-5xl md:text-6xl max-w-3xl">
            About Gelila Manufacturing
          </h1>
          <p className="text-white/90 text-base font-normal leading-normal sm:text-lg max-w-2xl">
            A diversified Ethiopian industrial and service company, originally
            founded in 2004 in Adwa City, Tigray Region. Today, we operate
            across footwear manufacturing, food processing, public bus
            transportation, and are developing major new projects in bus
            assembly and textile manufacturing.
          </p>
        </div>
      </div>
    </section>
  );
}
