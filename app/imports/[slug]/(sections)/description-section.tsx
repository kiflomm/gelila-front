interface ImportItem {
  id: string;
  title: string;
  heroDescription?: string;
  description: string;
  sourceRegion: string;
  status?: string;
}

interface DescriptionSectionProps {
  importItem: ImportItem;
}

export default function DescriptionSection({
  importItem,
}: DescriptionSectionProps) {
  return (
    <section className="w-full py-8 sm:py-12 md:py-16">
      <div className="flex flex-col gap-4 sm:gap-5 md:gap-6 max-w-4xl">
        <div className="flex flex-col gap-2 sm:gap-3">
          <h2 className="text-[#181411] dark:text-white text-2xl sm:text-3xl md:text-4xl font-semibold leading-tight tracking-tight">
            {importItem.title}
          </h2>
          {importItem.sourceRegion && (
            <p className="text-[#6C757D] dark:text-white/60 text-base sm:text-lg font-normal leading-relaxed">
              Sourced from {importItem.sourceRegion}
            </p>
          )}
        </div>
        <div className="pt-2">
          <p className="text-[#424242] dark:text-white/80 text-base sm:text-lg leading-relaxed">
            {importItem.description}
          </p>
        </div>
      </div>
    </section>
  );
}

