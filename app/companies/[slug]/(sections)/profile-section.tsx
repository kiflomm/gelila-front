import Image from "next/image";

type ParagraphType = "normal" | "highlight" | "quote" | "emphasis";

interface Paragraph {
  type: ParagraphType;
  content: string;
}

interface Company {
  slug: string;
  name: string;
  title: string;
  badge: string;
  description: string;
  location?: string;
  paragraphs: Array<{
    type: string;
    content: string;
  }>;
  image: {
    src: string;
    alt: string;
  };
  routes?: string[];
  amenities?: string[];
  products?: Array<{
    name: string;
    description: string;
  }>;
  packaging?: string[];
  markets?: string[];
  facilityInfo?: {
    location: string;
    facilitySize: string;
    dailyCapacity: string;
  };
  contactInfo?: {
    ticketOffices?: Array<{
      location: string;
      phone: string;
    }>;
    headOffice?: {
      name: string;
      address: string;
      city: string;
      phones: string[];
    };
  };
}

interface ProfileSectionProps {
  company: Company;
}

export default function ProfileSection({ company }: ProfileSectionProps) {
  return (
    <section className="w-full py-12 sm:py-16 lg:py-20 relative bg-white dark:bg-background-dark">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-linear-to-b from-transparent via-background-light/30 dark:via-black/10 to-transparent -z-10"></div>

      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
        {/* Header Section */}
        <div className="mb-12 sm:mb-16 lg:mb-20">
          <div className="flex flex-col gap-6">
            <div className="inline-flex items-center gap-2 text-primary text-sm font-semibold px-4 py-2 rounded-full bg-primary/10 dark:bg-primary/20 w-fit">
              <div className="size-2 rounded-full bg-primary animate-pulse"></div>
              <span>{company.badge}</span>
            </div>
            <div className="flex flex-col gap-4">
              <h2 className="text-[#181411] dark:text-white text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black leading-tight tracking-tight max-w-4xl">
                {company.title}
              </h2>
              {company.location && (
                <div className="flex items-center gap-2">
                  <svg
                    className="size-5 text-primary"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  <p className="text-[#6C757D] dark:text-white/60 text-base sm:text-lg font-medium">
                    {company.location}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Hero Image Section - Full Width */}
        <div className="mb-12 sm:mb-16 lg:mb-20">
          <div className="relative w-full aspect-video lg:aspect-[21/8] rounded-2xl lg:rounded-3xl overflow-hidden bg-gray-100 dark:bg-gray-900 shadow-2xl border border-gray-200 dark:border-gray-800 group">
            <Image
              src={company.image.src}
              alt={company.image.alt}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              priority
              unoptimized={company.image.src.includes("unsplash.com")}
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/40 via-transparent to-transparent"></div>
            <div className="absolute inset-0 bg-linear-to-r from-primary/5 via-transparent to-transparent"></div>
          </div>
        </div>

        {/* Content Section - Full Width */}
        <div className="max-w-none">
          <div className="prose prose-lg dark:prose-invert max-w-none">
            <div className="flex flex-col gap-8 sm:gap-10 lg:gap-12">
              {company.paragraphs.map((paragraph, index) => {
                const paragraphType = paragraph.type as ParagraphType;
                const className =
                  paragraphType === "highlight"
                    ? "text-xl md:text-2xl lg:text-3xl font-semibold text-[#181411] dark:text-white leading-relaxed"
                    : paragraphType === "quote"
                    ? "text-lg md:text-xl lg:text-2xl text-[#495057] dark:text-white/90 leading-relaxed pl-6 md:pl-8 border-l-4 border-primary/40 dark:border-primary/50 italic font-medium bg-gray-50 dark:bg-gray-900/50 py-6 px-6 md:px-8 rounded-r-xl"
                    : paragraphType === "emphasis"
                    ? "text-lg md:text-xl text-[#495057] dark:text-white/90 leading-relaxed font-semibold"
                    : "text-base md:text-lg lg:text-xl text-[#495057] dark:text-white/80 leading-relaxed";
                return (
                  <div
                    key={index}
                    className={paragraphType === "quote" ? "" : ""}
                  >
                    <p className={className}>{paragraph.content}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Routes Section */}
        {company.routes && company.routes.length > 0 && (
          <div className="mt-16 sm:mt-20 lg:mt-24">
            <h3 className="text-2xl md:text-3xl lg:text-4xl font-black text-[#181411] dark:text-white mb-8 sm:mb-10">
              Operating Routes
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {company.routes.map((route, index) => {
                const [origin, destination] = route.split(" → ");
                return (
                  <div
                    key={index}
                    className="group relative p-6 sm:p-8 rounded-2xl bg-linear-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-900/50 border border-gray-200 dark:border-gray-800 hover:border-primary/50 dark:hover:border-primary/50 hover:shadow-xl transition-all duration-300 overflow-hidden"
                  >
                    {/* Background decorative SVG */}
                    <div className="absolute inset-0 opacity-5 group-hover:opacity-10 transition-opacity">
                      <svg
                        className="w-full h-full"
                        viewBox="0 0 200 200"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M50 100 L150 100 M100 50 L100 150"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          className="text-primary"
                        />
                        <circle
                          cx="50"
                          cy="100"
                          r="8"
                          fill="currentColor"
                          className="text-primary"
                        />
                        <circle
                          cx="150"
                          cy="100"
                          r="8"
                          fill="currentColor"
                          className="text-primary"
                        />
                      </svg>
                    </div>

                    {/* Route Content */}
                    <div className="relative z-10">
                      {/* Bus Icon */}
                      <div className="mb-6 flex items-center justify-center">
                        <div className="relative">
                          <svg
                            width="64"
                            height="64"
                            viewBox="0 0 64 64"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            className="text-primary group-hover:scale-110 transition-transform duration-300"
                          >
                            {/* Bus body */}
                            <rect
                              x="8"
                              y="20"
                              width="48"
                              height="24"
                              rx="2"
                              fill="currentColor"
                              className="opacity-20"
                            />
                            <rect
                              x="8"
                              y="20"
                              width="48"
                              height="24"
                              rx="2"
                              stroke="currentColor"
                              strokeWidth="2"
                            />
                            {/* Windows */}
                            <rect
                              x="14"
                              y="26"
                              width="10"
                              height="8"
                              rx="1"
                              fill="currentColor"
                            />
                            <rect
                              x="26"
                              y="26"
                              width="10"
                              height="8"
                              rx="1"
                              fill="currentColor"
                            />
                            <rect
                              x="38"
                              y="26"
                              width="10"
                              height="8"
                              rx="1"
                              fill="currentColor"
                            />
                            {/* Wheels */}
                            <circle
                              cx="18"
                              cy="48"
                              r="4"
                              fill="currentColor"
                              className="opacity-60"
                            />
                            <circle
                              cx="46"
                              cy="48"
                              r="4"
                              fill="currentColor"
                              className="opacity-60"
                            />
                            {/* Route line animation */}
                            <path
                              d="M4 34 L60 34"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeDasharray="4 4"
                              className="opacity-40 animate-pulse"
                            />
                          </svg>
                        </div>
                      </div>

                      {/* Origin */}
                      <div className="mb-4">
                        <div className="flex items-center gap-3 mb-2">
                          <div className="shrink-0 size-3 rounded-full bg-primary ring-4 ring-primary/20"></div>
                          <span className="text-sm font-semibold text-primary uppercase tracking-wide">
                            From
                          </span>
                        </div>
                        <p className="text-lg md:text-xl font-bold text-[#181411] dark:text-white pl-6">
                          {origin}
                        </p>
                      </div>

                      {/* Route Arrow */}
                      <div className="flex items-center justify-center my-4">
                        <svg
                          width="40"
                          height="24"
                          viewBox="0 0 40 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          className="text-primary"
                        >
                          <path
                            d="M0 12 L32 12 M24 6 L32 12 L24 18"
                            stroke="currentColor"
                            strokeWidth="2.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="group-hover:translate-x-1 transition-transform duration-300"
                          />
                          <circle
                            cx="36"
                            cy="12"
                            r="2"
                            fill="currentColor"
                            className="animate-pulse"
                          />
                        </svg>
                      </div>

                      {/* Destination */}
                      <div>
                        <div className="flex items-center gap-3 mb-2">
                          <div className="shrink-0 size-3 rounded-full bg-green-500 ring-4 ring-green-500/20"></div>
                          <span className="text-sm font-semibold text-green-600 dark:text-green-400 uppercase tracking-wide">
                            To
                          </span>
                        </div>
                        <p className="text-lg md:text-xl font-bold text-[#181411] dark:text-white pl-6">
                          {destination}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Amenities Section */}
        {company.amenities && company.amenities.length > 0 && (
          <div className="mt-16 sm:mt-20 lg:mt-24">
            <h3 className="text-2xl md:text-3xl lg:text-4xl font-black text-[#181411] dark:text-white mb-8 sm:mb-10">
              Onboard Amenities
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4">
              {company.amenities.map((amenity, index) => (
                <div
                  key={index}
                  className="flex items-start gap-3 p-4 rounded-lg bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 hover:shadow-md transition-shadow"
                >
                  <svg
                    className="size-5 text-primary shrink-0 mt-0.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span className="text-sm md:text-base text-[#495057] dark:text-white/80">
                    {amenity}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Products Section */}
        {company.products && company.products.length > 0 && (
          <div className="mt-16 sm:mt-20 lg:mt-24">
            <h3 className="text-2xl md:text-3xl lg:text-4xl font-black text-[#181411] dark:text-white mb-8 sm:mb-10">
              Product Range
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {company.products.map((product, index) => (
                <div
                  key={index}
                  className="group relative p-6 sm:p-8 rounded-2xl bg-linear-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-900/50 border border-gray-200 dark:border-gray-800 hover:border-primary/50 dark:hover:border-primary/50 hover:shadow-xl transition-all duration-300"
                >
                  {/* Product Icon */}
                  <div className="mb-4 flex items-center justify-center">
                    <svg
                      width="56"
                      height="56"
                      viewBox="0 0 56 56"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="text-primary group-hover:scale-110 transition-transform duration-300"
                    >
                      <rect
                        x="8"
                        y="16"
                        width="40"
                        height="28"
                        rx="2"
                        fill="currentColor"
                        className="opacity-10"
                      />
                      <rect
                        x="8"
                        y="16"
                        width="40"
                        height="28"
                        rx="2"
                        stroke="currentColor"
                        strokeWidth="2"
                      />
                      <path
                        d="M18 24 L38 24 M18 32 L38 32 M18 40 L38 40"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        className="opacity-60"
                      />
                    </svg>
                  </div>
                  <h4 className="text-xl md:text-2xl font-bold text-[#181411] dark:text-white mb-3">
                    {product.name}
                  </h4>
                  <p className="text-base text-[#495057] dark:text-white/80 leading-relaxed">
                    {product.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Packaging Section */}
        {company.packaging && company.packaging.length > 0 && (
          <div className="mt-16 sm:mt-20 lg:mt-24">
            <h3 className="text-2xl md:text-3xl lg:text-4xl font-black text-[#181411] dark:text-white mb-8 sm:mb-10">
              Packaging Options
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
              {company.packaging.map((size, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center justify-center p-6 rounded-xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 hover:border-primary/50 dark:hover:border-primary/50 hover:shadow-lg transition-all duration-300"
                >
                  <svg
                    width="48"
                    height="48"
                    viewBox="0 0 48 48"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="text-primary mb-3"
                  >
                    <rect
                      x="8"
                      y="12"
                      width="32"
                      height="28"
                      rx="2"
                      fill="currentColor"
                      className="opacity-10"
                    />
                    <rect
                      x="8"
                      y="12"
                      width="32"
                      height="28"
                      rx="2"
                      stroke="currentColor"
                      strokeWidth="2"
                    />
                    <path
                      d="M24 12 L24 40"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                  </svg>
                  <span className="text-lg md:text-xl font-bold text-[#181411] dark:text-white">
                    {size}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Markets Section */}
        {company.markets && company.markets.length > 0 && (
          <div className="mt-16 sm:mt-20 lg:mt-24">
            <h3 className="text-2xl md:text-3xl lg:text-4xl font-black text-[#181411] dark:text-white mb-8 sm:mb-10">
              Markets We Serve
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5">
              {company.markets.map((market, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 p-4 rounded-lg bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 hover:border-primary/50 dark:hover:border-primary/50 hover:shadow-md transition-all"
                >
                  <svg
                    className="size-5 text-primary shrink-0"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <span className="text-base text-[#495057] dark:text-white/80 font-medium">
                    {market}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Facility Info Section */}
        {company.facilityInfo && (
          <div className="mt-16 sm:mt-20 lg:mt-24">
            <h3 className="text-2xl md:text-3xl lg:text-4xl font-black text-[#181411] dark:text-white mb-8 sm:mb-10">
              Facility Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
              <div className="p-6 sm:p-8 rounded-2xl bg-linear-to-br from-primary/5 to-primary/10 dark:from-primary/10 dark:to-primary/20 border border-primary/20 dark:border-primary/30">
                <div className="flex items-center gap-3 mb-4">
                  <svg
                    className="size-8 text-primary"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  <h4 className="text-lg font-bold text-[#181411] dark:text-white">
                    Location
                  </h4>
                </div>
                <p className="text-base text-[#495057] dark:text-white/80">
                  {company.facilityInfo.location}
                </p>
              </div>

              <div className="p-6 sm:p-8 rounded-2xl bg-linear-to-br from-primary/5 to-primary/10 dark:from-primary/10 dark:to-primary/20 border border-primary/20 dark:border-primary/30">
                <div className="flex items-center gap-3 mb-4">
                  <svg
                    className="size-8 text-primary"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z"
                    />
                  </svg>
                  <h4 className="text-lg font-bold text-[#181411] dark:text-white">
                    Facility Size
                  </h4>
                </div>
                <p className="text-base text-[#495057] dark:text-white/80">
                  {company.facilityInfo.facilitySize}
                </p>
              </div>

              <div className="p-6 sm:p-8 rounded-2xl bg-linear-to-br from-primary/5 to-primary/10 dark:from-primary/10 dark:to-primary/20 border border-primary/20 dark:border-primary/30">
                <div className="flex items-center gap-3 mb-4">
                  <svg
                    className="size-8 text-primary"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                  <h4 className="text-lg font-bold text-[#181411] dark:text-white">
                    Daily Capacity
                  </h4>
                </div>
                <p className="text-base text-[#495057] dark:text-white/80">
                  {company.facilityInfo.dailyCapacity}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Contact Information Section */}
        {company.contactInfo && (
          <div className="mt-16 sm:mt-20 lg:mt-24">
            <h3 className="text-2xl md:text-3xl lg:text-4xl font-black text-[#181411] dark:text-white mb-8 sm:mb-10">
              Contact Information
            </h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10">
              {/* Ticket Offices */}
              {company.contactInfo.ticketOffices &&
                company.contactInfo.ticketOffices.length > 0 && (
                  <div>
                    <h4 className="text-xl md:text-2xl font-bold text-[#181411] dark:text-white mb-6">
                      Ticket Offices
                    </h4>
                    <div className="flex flex-col gap-4">
                      {company.contactInfo.ticketOffices.map(
                        (office, index) => (
                          <div
                            key={index}
                            className="p-5 rounded-xl bg-gray-50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-800"
                          >
                            <p className="text-base md:text-lg font-semibold text-[#181411] dark:text-white mb-2">
                              {office.location}
                            </p>
                            <a
                              href={`tel:${office.phone.replace(/\s/g, "")}`}
                              className="text-primary hover:text-primary/80 font-medium text-base md:text-lg transition-colors"
                            >
                              {office.phone}
                            </a>
                          </div>
                        )
                      )}
                    </div>
                  </div>
                )}

              {/* Head Office */}
              {company.contactInfo.headOffice && (
                <div>
                  <h4 className="text-xl md:text-2xl font-bold text-[#181411] dark:text-white mb-6">
                    Head Office
                  </h4>
                  <div className="p-5 rounded-xl bg-gray-50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-800">
                    <p className="text-base md:text-lg font-semibold text-[#181411] dark:text-white mb-2">
                      {company.contactInfo.headOffice.name}
                    </p>
                    <p className="text-base text-[#495057] dark:text-white/80 mb-4">
                      {company.contactInfo.headOffice.address}
                      <br />
                      {company.contactInfo.headOffice.city}
                    </p>
                    <div className="flex flex-col gap-2">
                      {company.contactInfo.headOffice.phones.map(
                        (phone, index) => (
                          <a
                            key={index}
                            href={`tel:${phone.replace(/\s/g, "")}`}
                            className="text-primary hover:text-primary/80 font-medium text-base md:text-lg transition-colors"
                          >
                            {phone}
                          </a>
                        )
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
