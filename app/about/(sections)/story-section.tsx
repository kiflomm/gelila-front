import Image from "next/image";

export default function StorySection() {
  return (
    <section className="py-10 sm:py-16">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
        <div className="flex flex-col gap-6">
          <h2 className="text-[#181411] dark:text-white text-3xl font-bold leading-tight tracking-tight">
            Our Story
          </h2>
          <div className="flex flex-col gap-4 text-[#495057] dark:text-white/80 text-base leading-relaxed">
            <p>
              Founded in 1998, Gelila Manufacturing PLC emerged with a clear vision:
              to catalyze industrial growth in Ethiopia and become a cornerstone of
              the nation's manufacturing sector. What started as a modest operation
              has grown into a multi-sector industrial powerhouse.
            </p>
            <p>
              Over the past two decades, we've expanded our operations across
              footwear, food processing, bus assembly, textile manufacturing, and
              public transportation. Each division represents our commitment to
              quality, innovation, and sustainable practices.
            </p>
            <p>
              Today, we stand as one of Ethiopia's leading manufacturing companies,
              employing over 5,000 people and contributing significantly to the
              nation's industrial output. Our journey continues as we invest in
              technology, expand our capabilities, and build partnerships that drive
              progress.
            </p>
          </div>
        </div>
        <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden bg-gray-100 dark:bg-gray-900">
          <Image
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuB4i7laV2i-QVdbRf3idJagNz-tdiqPs5ymwV2wqvww1kUCGhUGeT3OWu-Kf0x8TQx2_6iJN7JMMCk2mFgPEJgxI6vTeyCqMAy17gOpaNPej9g8O6_fDs5dZ9_91B0VcpfhgXEHQJ87Gmbd9Vcv_uCh4u1ZLs5v1mLxoSHz-gPMAWU8yorGESPBohvA06K3XJ2iW9giI3W5-i0OnfbsAmtC-vBUyuahx69RMLdGJwNJrn-bhzrLraf-uJNJ8QsfxM8bT21hCdEdTGMM"
            alt="Modern manufacturing facility with advanced machinery"
            fill
            className="object-cover"
          />
        </div>
      </div>
    </section>
  );
}

