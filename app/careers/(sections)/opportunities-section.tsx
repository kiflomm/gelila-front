import opportunitiesData from "@/data/careers-opportunities.json";

export default function OpportunitiesSection() {
  return (
    <section className="py-16 md:py-24 bg-[#F8F9FA] dark:bg-background-dark">
      <div className="px-4 sm:px-10 lg:px-20">
        <div className="max-w-7xl mx-auto px-2 sm:px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 lg:gap-12">
            {opportunitiesData.opportunities.map((opportunity, index) => (
              <div
                key={index}
                className="flex flex-col items-center text-center md:flex-row md:text-left md:items-start gap-6 p-6 rounded-xl"
              >
                <div className="shrink-0">
                  <div className="flex items-center justify-center size-16 bg-primary/20 rounded-full text-primary">
                    <span className="material-symbols-outlined text-4xl">
                      {opportunity.icon}
                    </span>
                  </div>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-[#212529] dark:text-[#F8F9FA] mb-2">
                    {opportunity.title}
                  </h3>
                  <p className="text-[#6C757D] dark:text-[#F8F9FA]/70">
                    {opportunity.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
