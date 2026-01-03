import Image from "next/image";
import Link from "next/link";
import navigationData from "@/data/navigation.json";

interface Company {
  slug: string;
  name: string;
  title: string;
  description: string;
  image: {
    src: string;
    alt: string;
  };
}

interface PageHeadingSectionProps {
  company: Company;
}

// Mapping between company slugs and their related sector slugs
const companyToSectorsMap: Record<string, string[]> = {
  "gelila-shoe": ["footwear", "textile-apparel"],
  "soloda-bus": ["bus-transport", "bus-assembly"],
  "gelila-food": ["food-processing"],
};

export default function PageHeadingSection({
  company,
}: PageHeadingSectionProps) {
  const sectorsData = navigationData.dropdowns.sectors;
  
  // Get related sector slugs for this company
  const relatedSectorSlugs = companyToSectorsMap[company.slug] || [];
  
  // Filter sectors to show only related ones
  const relatedSectors = sectorsData?.sections
    ? sectorsData.sections
        .map((section) => ({
          ...section,
          items: section.items.filter((item) => {
            const sectorSlug = item.href.replace("/sectors/", "");
            return relatedSectorSlugs.includes(sectorSlug);
          }),
        }))
        .filter((section) => section.items.length > 0)
    : [];

  return (
    <section className="w-full">
      <div className="relative flex min-h-[500px] lg:min-h-[600px] w-full flex-col gap-6 bg-cover bg-center bg-no-repeat items-start justify-center px-4 sm:px-6 lg:px-10 xl:px-20 py-16 sm:py-20 lg:py-24 overflow-hidden">
        <Image
          src={company.image.src}
          alt={company.image.alt}
          fill
          className="object-cover brightness-75"
          priority
        />
        <div className="absolute inset-0 bg-linear-to-r from-black/60 to-black/40" />
        <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col gap-6 text-left">
          <div className="flex flex-col gap-4">
          <h1 className="text-white text-4xl font-black leading-tight tracking-tight sm:text-5xl md:text-6xl max-w-3xl">
            {company.title}
          </h1>
          <p className="text-white/90 text-base font-normal leading-normal sm:text-lg max-w-2xl">
            {company.description}
          </p>
          </div>
          
          {/* Sectors Menu Grid - Only Related Sectors */}
          {relatedSectors.length > 0 && (
            <div className="flex flex-col gap-4 mt-2">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 max-w-4xl">
                {relatedSectors.map((section) =>
                  section.items.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="group relative px-4 py-3 sm:px-5 sm:py-3.5 rounded-lg bg-white/10 dark:bg-white/5 backdrop-blur-sm border border-white/20 dark:border-white/10 hover:bg-white/20 dark:hover:bg-white/10 hover:border-white/30 dark:hover:border-white/20 transition-all duration-300 hover:shadow-lg hover:shadow-white/10"
                    >
                      <span className="text-white text-sm sm:text-base font-medium leading-normal group-hover:text-white transition-colors">
                        {item.label}
                      </span>
                      <div className="absolute inset-0 rounded-lg bg-linear-to-r from-primary/0 to-primary/0 group-hover:from-primary/10 group-hover:to-transparent transition-all duration-300 pointer-events-none" />
                    </Link>
                  ))
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
