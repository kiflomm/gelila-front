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

      <div className="w-full max-w-5xl mx-auto px-6 sm:px-8 lg:px-12 xl:px-16">
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
            <h3 className="text-2xl md:text-3xl lg:text-4xl font-black text-[#181411] dark:text-white mb-6 sm:mb-8">
              Operating Routes
            </h3>
            <div className="flex flex-wrap justify-center gap-4 sm:gap-5 lg:gap-6">
              {company.routes.map((route, index) => {
                const [origin, destination] = route.split(" → ");
                return (
                  <div
                    key={index}
                    className="group relative w-full sm:w-[calc(50%-0.625rem)] lg:w-[calc(25%-1.125rem)] max-w-[320px] sm:max-w-none p-4 sm:p-5 rounded-2xl bg-linear-to-br from-white via-white to-gray-50/50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800/50 border border-gray-200/80 dark:border-gray-700/50 hover:border-primary/60 dark:hover:border-primary/50 hover:shadow-xl hover:shadow-primary/5 dark:hover:shadow-primary/10 transition-all duration-300 overflow-hidden"
                  >
                    {/* Subtle background gradient on hover */}
                    <div className="absolute inset-0 bg-linear-to-br from-primary/0 to-primary/0 group-hover:from-primary/5 group-hover:to-transparent transition-all duration-300 pointer-events-none"></div>
                    
                    {/* Route Content */}
                    <div className="relative z-10">
                      {/* Modern Bus Icon */}
                      <div className="mb-4 sm:mb-5 flex items-center justify-center">
                        <div className="relative">
                          <div className="absolute inset-0 bg-primary/10 rounded-full blur-md group-hover:bg-primary/20 transition-colors duration-300"></div>
                          <svg
                            width="36"
                            height="36"
                            viewBox="0 0 36 36"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            className="relative text-primary group-hover:scale-110 group-hover:rotate-1 transition-all duration-300"
                          >
                            {/* Route line behind bus */}
                            <path
                              d="M2 18 L34 18"
                              stroke="currentColor"
                              strokeWidth="1.5"
                              strokeDasharray="2 2"
                              className="opacity-20"
                            />
                            
                            {/* Bus body with gradient effect */}
                            <rect
                              x="6"
                              y="10"
                              width="24"
                              height="15"
                              rx="2.5"
                              fill={`url(#busGradient-${index})`}
                              className="opacity-95"
                            />
                            <rect
                              x="6"
                              y="10"
                              width="24"
                              height="15"
                              rx="2.5"
                              stroke="currentColor"
                              strokeWidth="1.8"
                              className="opacity-90"
                            />
                            
                            {/* Front windshield */}
                            <rect
                              x="7"
                              y="12"
                              width="5"
                              height="4"
                              rx="0.8"
                              fill="currentColor"
                              className="opacity-85"
                            />
                            
                            {/* Side windows with frames */}
                            <rect
                              x="13"
                              y="12"
                              width="5.5"
                              height="5"
                              rx="0.8"
                              fill="currentColor"
                              className="opacity-90"
                            />
                            <rect
                              x="13.5"
                              y="12.5"
                              width="4.5"
                              height="4"
                              rx="0.5"
                              fill="currentColor"
                              className="opacity-60"
                            />
                            
                            <rect
                              x="19.5"
                              y="12"
                              width="5.5"
                              height="5"
                              rx="0.8"
                              fill="currentColor"
                              className="opacity-90"
                            />
                            <rect
                              x="20"
                              y="12.5"
                              width="4.5"
                              height="4"
                              rx="0.5"
                              fill="currentColor"
                              className="opacity-60"
                            />
                            
                            {/* Door line */}
                            <line
                              x1="25.5"
                              y1="10"
                              x2="25.5"
                              y2="25"
                              stroke="currentColor"
                              strokeWidth="1.2"
                              className="opacity-50"
                            />
                            
                            {/* Wheels with rim detail */}
                            <circle
                              cx="11"
                              cy="27"
                              r="3"
                              fill="currentColor"
                              className="opacity-30"
                            />
                            <circle
                              cx="11"
                              cy="27"
                              r="2"
                              fill="currentColor"
                              className="opacity-50"
                            />
                            <circle
                              cx="11"
                              cy="27"
                              r="1"
                              fill="currentColor"
                              className="opacity-70"
                            />
                            
                            <circle
                              cx="25"
                              cy="27"
                              r="3"
                              fill="currentColor"
                              className="opacity-30"
                            />
                            <circle
                              cx="25"
                              cy="27"
                              r="2"
                              fill="currentColor"
                              className="opacity-50"
                            />
                            <circle
                              cx="25"
                              cy="27"
                              r="1"
                              fill="currentColor"
                              className="opacity-70"
                            />
                            
                            {/* Route destination indicator (small flag) */}
                            <path
                              d="M28 8 L28 12 L30 10 Z"
                              fill="currentColor"
                              className="opacity-60"
                            />
                            
                            {/* Gradient definition */}
                            <defs>
                              <linearGradient id={`busGradient-${index}`} x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" stopColor="currentColor" stopOpacity="0.2" />
                                <stop offset="50%" stopColor="currentColor" stopOpacity="0.1" />
                                <stop offset="100%" stopColor="currentColor" stopOpacity="0.05" />
                              </linearGradient>
                            </defs>
                          </svg>
                        </div>
                      </div>

                      {/* Origin */}
                      <div className="mb-3">
                        <div className="flex items-center gap-2 mb-2">
                          <div className="shrink-0 size-2.5 rounded-full bg-primary ring-2 ring-primary/30 shadow-sm"></div>
                          <span className="text-[10px] sm:text-xs font-semibold text-primary uppercase tracking-wider">
                            From
                          </span>
                        </div>
                        <p className="text-sm sm:text-base font-bold text-[#181411] dark:text-white leading-tight pl-5">
                          {origin}
                        </p>
                      </div>

                      {/* Modern Route Arrow */}
                      <div className="flex items-center justify-center my-3 sm:my-4">
                        <svg
                          width="32"
                          height="20"
                          viewBox="0 0 32 20"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          className="text-primary/70 group-hover:text-primary transition-colors duration-300"
                        >
                          {/* Route path with dashed line */}
                          <path
                            d="M1 10 L22 10"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeDasharray="3 2"
                            className="opacity-40"
                          />
                          
                          {/* Solid route line */}
                          <path
                            d="M1 10 L22 10"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            className="opacity-70"
                          />
                          
                          {/* Arrow head with filled design */}
                          <path
                            d="M20 5 L26 10 L20 15"
                            stroke="currentColor"
                            strokeWidth="2.2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            fill="currentColor"
                            className="group-hover:translate-x-0.5 transition-transform duration-300"
                          />
                          
                          {/* Inner arrow highlight */}
                          <path
                            d="M21 7 L24 10 L21 13"
                            fill="currentColor"
                            className="opacity-30"
                          />
                                                  {/* Destination point */}
                          <circle
                            cx="28"
                            cy="10"
                            r="2"
                            fill="currentColor"
                            className="opacity-60 group-hover:opacity-90 transition-opacity duration-300"
                          />
                          <circle
                            cx="28"
                            cy="10"
                            r="1"
                            fill="currentColor"
                            className="opacity-90"
                          />
                          
                          {/* Origin point */}
                          <circle
                            cx="1"
                            cy="10"
                            r="1.5"
                            fill="currentColor"
                            className="opacity-50"
                          />
                        </svg>
                      </div>

                      {/* Destination */}
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <div className="shrink-0 size-2.5 rounded-full bg-emerald-500 ring-2 ring-emerald-500/30 shadow-sm"></div>
                          <span className="text-[10px] sm:text-xs font-semibold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">
                            To
                          </span>
                        </div>
                        <p className="text-sm sm:text-base font-bold text-[#181411] dark:text-white leading-tight pl-5">
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
          <div className="mt-12 sm:mt-16">
            <h3 className="text-xl md:text-2xl font-bold text-[#181411] dark:text-white mb-4">
              Onboard Amenities
            </h3>
            <div className="grid grid-cols-2 gap-2">
              {company.amenities.map((amenity, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-gray-50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-800"
                >
                  <svg
                    className="size-3.5 text-primary shrink-0"
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
                  <span className="text-xs md:text-sm text-[#495057] dark:text-white/80">
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
          <div className="mt-12 sm:mt-16">
            <div className="flex items-center gap-3 mb-5">
              <div className="p-2 rounded-lg bg-primary/10 dark:bg-primary/20">
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
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-[#181411] dark:text-white">
                Contact Information
              </h3>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-5">
              {/* Ticket Offices */}
              {company.contactInfo.ticketOffices &&
                company.contactInfo.ticketOffices.length > 0 && (
                  <div className="space-y-3">
                    <h4 className="text-base md:text-lg font-semibold text-[#181411] dark:text-white mb-3">
                      Ticket Offices
                    </h4>
                    
                    <div className="space-y-2">
                      {company.contactInfo.ticketOffices.map(
                        (office, index) => (
                          <div
                            key={index}
                            className="group relative p-3 sm:p-4 rounded-xl bg-linear-to-br from-white to-gray-50/50 dark:from-gray-900 dark:to-gray-800/50 border border-gray-200/60 dark:border-gray-700/50 hover:border-primary/40 dark:hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300"
                          >
                            <div className="flex items-start gap-3">
                              <div className="shrink-0 mt-0.5 p-1.5 rounded-lg bg-primary/10 dark:bg-primary/20">
                                <svg
                                  className="size-4 text-primary"
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
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-[#181411] dark:text-white mb-2 leading-tight">
                                  {office.location}
                                </p>
                                <a
                                  href={`tel:${office.phone.replace(/\s/g, "")}`}
                                  className="inline-flex items-center gap-2 text-primary hover:text-primary/80 font-semibold text-sm transition-colors group"
                                >
                                  <svg
                                    className="size-4 shrink-0"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth={2}
                                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                                    />
                                  </svg>
                                  <span className="group-hover:underline">{office.phone}</span>
                                </a>
                              </div>
                            </div>
                          </div>
                        )
                      )}
                    </div>
                  </div>
                )}

              {/* Head Office */}
              {company.contactInfo.headOffice && (
                <div className="space-y-3">
                  <h4 className="text-base md:text-lg font-semibold text-[#181411] dark:text-white mb-3">
                    Head Office
                  </h4>
                  
                  <div className="group relative p-3 sm:p-4 rounded-xl bg-linear-to-br from-white to-gray-50/50 dark:from-gray-900 dark:to-gray-800/50 border border-gray-200/60 dark:border-gray-700/50 hover:border-primary/40 dark:hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300">
                    <div className="flex items-start gap-3 mb-3">
                      <div className="shrink-0 mt-0.5 p-1.5 rounded-lg bg-primary/10 dark:bg-primary/20">
                        <svg
                          className="size-4 text-primary"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                          />
                        </svg>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-[#181411] dark:text-white mb-2">
                          {company.contactInfo.headOffice.name}
                        </p>
                        <div className="flex items-start gap-2 text-xs text-[#495057] dark:text-white/70">
                          <svg
                            className="size-3.5 shrink-0 mt-0.5 text-gray-400 dark:text-gray-500"
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
                          <span className="leading-relaxed">
                            {company.contactInfo.headOffice.address}, {company.contactInfo.headOffice.city}
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap gap-2 pt-2 border-t border-gray-200/50 dark:border-gray-700/50">
                      {company.contactInfo.headOffice.phones.map(
                        (phone, index) => (
                          <a
                            key={index}
                            href={`tel:${phone.replace(/\s/g, "")}`}
                            className="inline-flex items-center gap-2 text-primary hover:text-primary/80 font-semibold text-sm transition-colors group"
                          >
                            <svg
                              className="size-3.5 shrink-0"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                              />
                            </svg>
                            <span className="group-hover:underline">{phone}</span>
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
