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
              Founded in 1998, Gelila Manufacturing PLC emerged with a clear
              vision: to catalyze industrial growth in Ethiopia and become a
              cornerstone of the nation's manufacturing sector.
            </p>
            <p className="pl-4 border-l-2 border-primary/20 dark:border-primary/30">
              What started as a modest operation has grown into a multi-sector
              industrial powerhouse. Over the past two decades, we've expanded
              our operations across footwear, food processing, bus assembly,
              textile manufacturing, and public transportation.
            </p>
            <p>
              Each division represents our commitment to quality, innovation,
              and sustainable practices. Today, we stand as one of Ethiopia's
              leading manufacturing companies, employing over 5,000 people and
              contributing significantly to the nation's industrial output.
            </p>
            <p className="font-medium pt-2">
              Our journey continues as we invest in technology, expand our
              capabilities, and build partnerships that drive progress.
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
                25+
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
