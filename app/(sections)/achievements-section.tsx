import achievementsData from "@/data/achievements.json";

export default function AchievementsSection() {
  return (
    <section className="py-10 sm:py-16 px-4 sm:px-6 lg:px-10">
      <h2 className="text-[#181411] dark:text-white text-3xl font-bold leading-tight tracking-tight pb-8 text-center">
        Industrial Milestones & Achievements
      </h2>
      <div className="max-w-4xl mx-auto">
        {/* Timeline Component */}
          <div className="relative pl-8 border-l-2 border-primary/30">
            {achievementsData.milestones.map((milestone, index) => (
              <div
                key={index}
                className={`mb-10 ml-4 ${
                  index === achievementsData.milestones.length - 1 ? "" : ""
                }`}
              >
                <div className="absolute w-4 h-4 bg-primary rounded-full -left-2.5 border-2 border-background-light dark:border-background-dark" />
                <time className="mb-1 text-sm font-normal leading-none text-[#8c755f] dark:text-white/60 block">
                  {milestone.year}
                </time>
                <h3 className="text-lg font-semibold text-[#181411] dark:text-white mb-2">
                  {milestone.title}
                </h3>
                <p className="text-base font-normal text-[#495057] dark:text-white/80">
                  {milestone.description}
                </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
