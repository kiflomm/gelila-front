export default function PageHeadingSection() {
  return (
    <div className="flex flex-wrap justify-between gap-4 sm:gap-6 px-2 sm:px-4 md:px-6 py-4 sm:py-6 mb-4 sm:mb-6">
      <div className="flex flex-col gap-2 sm:gap-3 w-full">
        <h1 className="text-[#212121] dark:text-white text-2xl sm:text-3xl md:text-4xl font-black leading-tight tracking-[-0.033em]">
          Our Industrial Sectors
        </h1>
        <p className="text-[#424242] dark:text-gray-400 text-sm sm:text-base font-normal leading-normal">
          Explore our diverse range of high-quality products across multiple
          industries.
        </p>
      </div>
    </div>
  );
}
