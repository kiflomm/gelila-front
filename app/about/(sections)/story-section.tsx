import Image from "next/image";
import { Factory, TrendingUp, Users } from "lucide-react";

export default function StorySection() {
  return (
    <section className="py-16 sm:py-24 lg:py-32 relative">
      <div className="absolute inset-0 bg-linear-to-b from-transparent via-background-light/50 dark:via-black/20 to-transparent -z-10"></div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 xl:gap-24 items-start">
        <div className="flex flex-col gap-10 order-2 lg:order-1 px-4 sm:px-6 lg:px-0">
          <div className="flex flex-col gap-5">
            <div className="inline-flex items-center gap-2 text-primary text-sm font-semibold mb-1 px-3 py-1.5 rounded-full bg-primary/10 dark:bg-primary/20 w-fit">
              <div className="size-1.5 rounded-full bg-primary"></div>
              <span>Our Journey</span>
            </div>
            <h2 className="text-[#181411] dark:text-white text-3xl md:text-4xl lg:text-5xl font-black leading-tight tracking-tight">
              Building Ethiopia's Industrial Legacy
            </h2>
          </div>
          <div className="flex flex-col gap-7 text-[#495057] dark:text-white/80 text-base md:text-lg leading-relaxed">
            <p className="text-lg md:text-xl font-medium text-[#181411] dark:text-white">
              Founded in 2004 in Adwa City, Tigray Region, Gelila Manufacturing
              PLC was originally established by its visionary founder Mr. Berhe
              Assefa as a footwear manufacturer, building its reputation through
              quality craftsmanship and reliable delivery.
            </p>
            <p className="pl-4 border-l-2 border-primary/20 dark:border-primary/30">
              As the company expanded into new industries, it was officially
              re-registered as Gelila Manufacturing PLC on December 07, 2022,
              reflecting its diversified operations and national ambitions.
              Today, Gelila operates established business units in footwear
              manufacturing, food processing, and public bus transportation,
              while simultaneously developing major new projects in bus assembly
              and textile & apparel manufacturing.
            </p>
            <p>
              Each division represents our commitment to quality, innovation,
              and sustainable practices. From our original footwear production
              to our growing fleet of luxury buses, from our flour and biscuit
              processing to our upcoming bus assembly plant in Mekele and
              textile factory in Adwa, we continue to build on our foundation of
              excellence.
            </p>
            <p className="font-medium pt-2">
              Our journey continues as we invest in technology, expand our
              capabilities, and build strategic partnerships like our
              collaboration with Foton International for bus assembly technology
              transfer.
            </p>
          </div>
        </div>
        <div className="flex flex-col gap-8 order-1 lg:order-2 px-4 sm:px-6 lg:px-0">
          <div className="relative w-full aspect-4/3 rounded-2xl overflow-hidden bg-gray-100 dark:bg-gray-900 shadow-2xl border border-border p-1">
            <div className="relative w-full h-full rounded-xl overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1581092160562-40aa08e78837?q=80&w=2070&auto=format&fit=crop"
                alt="Modern manufacturing facility with advanced machinery and production lines"
                fill
                className="object-cover transition-transform duration-700 hover:scale-105"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/20 to-transparent"></div>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-5">
            <div className="flex flex-col gap-2 p-6 rounded-xl bg-white dark:bg-gray-900 border border-border shadow-sm hover:shadow-md transition-shadow duration-300">
              <p className="text-3xl lg:text-4xl font-black text-[#181411] dark:text-white">
                5+
              </p>
              <p className="text-sm text-[#8c755f] dark:text-white/70 font-medium">
                Sectors
              </p>
            </div>
            <div className="flex flex-col gap-2 p-6 rounded-xl bg-white dark:bg-gray-900 border border-border shadow-sm hover:shadow-md transition-shadow duration-300">
              <p className="text-3xl lg:text-4xl font-black text-[#181411] dark:text-white">
                5K+
              </p>
              <p className="text-sm text-[#8c755f] dark:text-white/70 font-medium">
                Employees
              </p>
            </div>
            <div className="flex flex-col gap-2 p-6 rounded-xl bg-white dark:bg-gray-900 border border-border shadow-sm hover:shadow-md transition-shadow duration-300">
              <p className="text-3xl lg:text-4xl font-black text-[#181411] dark:text-white">
                20+
              </p>
              <p className="text-sm text-[#8c755f] dark:text-white/70 font-medium">
                Years
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
