export default function DepartmentsSection() {
  const departments = [
    "Human Resource Administration & General Services",
    "Supply Chain Logistics",
    "Finance",
    "Marketing & Sales",
  ];

  return (
    <section className="py-12 sm:py-16 md:py-20">
      <div className="flex flex-col gap-6 sm:gap-8">
        <div className="text-center sm:text-left">
          <h2 className="text-[#181411] dark:text-white text-2xl sm:text-3xl md:text-4xl font-bold leading-tight tracking-tight mb-3 sm:mb-4">
            Our Departments
          </h2>
          <p className="text-[#6C757D] dark:text-white/70 text-sm sm:text-base leading-relaxed">
            For your information, currently we have the following departments:
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 md:gap-6">
          {departments.map((department, index) => (
            <div
              key={index}
              className="flex items-center gap-3 p-4 sm:p-5 rounded-lg border border-primary/10 dark:border-primary/20 bg-white dark:bg-black/20 hover:border-primary/30 dark:hover:border-primary/40 transition-colors"
            >
              <div className="flex items-center justify-center size-10 sm:size-12 shrink-0 bg-primary/10 dark:bg-primary/20 rounded-lg">
                <span className="text-primary text-lg sm:text-xl font-bold">
                  {index + 1}
                </span>
              </div>
              <p className="text-[#181411] dark:text-white text-sm sm:text-base font-medium leading-relaxed">
                {department}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
