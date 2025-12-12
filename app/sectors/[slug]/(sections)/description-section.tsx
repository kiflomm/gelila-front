interface Sector {
  id: string;
  name: string;
  title: string;
  description: string;
  location?: string;
  status?: string;
}

interface DescriptionSectionProps {
  sector: Sector;
}

export default function DescriptionSection({
  sector,
}: DescriptionSectionProps) {
  return (
    <section className="w-full py-8 sm:py-12 md:py-16">
      <div className="flex flex-col gap-4 sm:gap-5 md:gap-6 max-w-4xl">
        <div className="flex flex-col gap-2 sm:gap-3">
          <h2 className="text-[#181411] dark:text-white text-2xl sm:text-3xl md:text-4xl font-semibold leading-tight tracking-tight">
            {sector.title}
          </h2>
          {sector.name && sector.name !== sector.title && (
            <p className="text-[#6C757D] dark:text-white/60 text-base sm:text-lg font-normal leading-relaxed">
              {sector.name}
            </p>
          )}
        </div>
        <div className="pt-2">
          <p className="text-[#424242] dark:text-white/80 text-base sm:text-lg leading-relaxed">
            {sector.description}
          </p>
        </div>
      </div>
    </section>
  );
}
