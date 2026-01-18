import achievementsDataFallback from "@/data/achievements.json";

async function getMilestones() {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || "";
  try {
    const response = await fetch(`${apiUrl}/milestones`, {
      cache: "no-store",
    });
    if (!response.ok) {
      return null;
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching milestones:", error);
    return null;
  }
}

export default async function AchievementsSection() {
  // Fetch milestones from API
  let milestones = null;
  try {
    milestones = await getMilestones();
  } catch (error) {
    console.error("Failed to fetch milestones:", error);
  }

  // Use API data if available, otherwise fallback to static JSON
  const milestonesData = milestones || achievementsDataFallback.milestones;

  // Sort by orderIndex then year
  const sortedMilestones = [...milestonesData].sort((a, b) => {
    const orderDiff = (a.orderIndex || 0) - (b.orderIndex || 0);
    if (orderDiff !== 0) return orderDiff;
    return a.year.localeCompare(b.year);
  });

  return (
    <section className="py-10 sm:py-16 px-4 sm:px-6 lg:px-10">
      <h2 className="text-[#181411] dark:text-white text-3xl font-bold leading-tight tracking-tight pb-8 text-center">
        Industrial Milestones & Achievements
      </h2>
      <div className="max-w-4xl mx-auto">
        {/* Timeline Component */}
        <div className="relative pl-8 border-l-2 border-primary/30">
          {sortedMilestones.map((milestone, index) => (
            <div
              key={milestone.id || index}
              className={`mb-10 ml-4 ${
                index === sortedMilestones.length - 1 ? "" : ""
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
