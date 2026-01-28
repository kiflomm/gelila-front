import Link from "next/link";
import Image from "@/components/ui/image";
import companiesData from "@/data/companies/companies.json";

export default function SubsidiariesSection() {
  return (
    <section className="py-16 sm:py-24 lg:py-32 relative">
      <div className="absolute inset-0 bg-linear-to-b from-transparent via-background-light/50 dark:via-black/20 to-transparent -z-10"></div>
      <div className="flex flex-col gap-12">
        <div className="flex flex-col gap-5">
          <div className="inline-flex items-center gap-2 text-primary text-sm font-semibold mb-1 px-3 py-1.5 rounded-full bg-primary/10 dark:bg-primary/20 w-fit">
            <div className="size-1.5 rounded-full bg-primary"></div>
            <span>Our Companies</span>
          </div>
          <h2 className="text-[#181411] dark:text-white text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black leading-tight tracking-tight">
            Subsidiary Companies
          </h2>
          <p className="text-[#495057] dark:text-white/80 text-base md:text-lg leading-relaxed max-w-3xl">
            Gelila Manufacturing PLC operates through its subsidiary companies,
            each specializing in distinct sectors and contributing to our
            diverse portfolio.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {companiesData.companies.map((company) => (
            <Link
              key={company.slug}
              href={`/companies/${company.slug}`}
              className="group relative flex flex-col rounded-2xl border border-primary/10 dark:border-primary/20 bg-white dark:bg-black/20 overflow-hidden hover:border-primary/30 dark:hover:border-primary/40 transition-all duration-500 hover:shadow-2xl hover:shadow-primary/10 hover:-translate-y-2"
            >
              {/* Image Container with Overlay */}
              <div className="relative w-full aspect-4/3 overflow-hidden bg-gray-100 dark:bg-gray-900">
                <Image
                  src={company.image.src}
                  alt={company.image.alt}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                {/* Gradient Overlay on Hover */}
                <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>

              {/* Content */}
              <div className="flex flex-col gap-3 p-6">
                <div className="inline-flex items-center gap-2 text-primary text-xs font-semibold px-2 py-1 rounded-full bg-primary/10 dark:bg-primary/20 w-fit">
                  {company.badge}
                </div>
                <h3 className="text-[#181411] dark:text-white text-xl font-bold leading-tight group-hover:text-primary transition-colors">
                  {company.title}
                </h3>
                <p className="text-[#495057] dark:text-white/70 text-sm leading-relaxed line-clamp-2">
                  {company.description}
                </p>
                {company.location && (
                  <p className="text-[#6C757D] dark:text-white/60 text-xs font-medium">
                    {company.location}
                  </p>
                )}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

