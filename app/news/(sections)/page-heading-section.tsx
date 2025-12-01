export default function PageHeadingSection() {
  return (
    <div className="flex flex-col items-center text-center gap-4 sm:gap-6 mb-8 sm:mb-10 md:mb-12 lg:mb-16 px-2 sm:px-4 md:px-6">
      <h1 className="text-zinc-900 dark:text-zinc-100 text-3xl sm:text-4xl md:text-5xl font-black leading-tight tracking-[-0.033em]">
        News & Updates from Gelila
      </h1>
      <p className="text-zinc-600 dark:text-zinc-400 text-sm sm:text-base md:text-lg font-normal leading-normal max-w-2xl px-2">
        Stay informed with the latest news, press releases, and corporate
        milestones from Gelila Manufacturing.
      </p>
    </div>
  );
}
