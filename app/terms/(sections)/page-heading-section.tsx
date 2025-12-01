export default function PageHeadingSection() {
  return (
    <div className="flex flex-col items-center text-center gap-4 sm:gap-6 mb-8 sm:mb-10 md:mb-12 lg:mb-16 px-2 sm:px-4 md:px-6">
      <h1 className="text-[#181411] dark:text-white text-3xl sm:text-4xl md:text-5xl font-black leading-tight tracking-[-0.033em]">
        Terms of Service
      </h1>
      <p className="text-[#8c755f] dark:text-white/70 text-sm sm:text-base md:text-lg font-normal leading-normal max-w-2xl px-2">
        Please read these terms carefully before using our website and services.
      </p>
    </div>
  );
}
