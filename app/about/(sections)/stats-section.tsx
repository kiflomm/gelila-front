import { Building2, Users, TrendingUp, Calendar } from "lucide-react";
import statsData from "@/data/about-stats.json";

// Icon mapping
const iconMap: Record<string, typeof Building2> = {
  Building2,
  Users,
  TrendingUp,
  Calendar,
};

export default function StatsSection() {
  return (
    <section className="py-12 sm:py-20 relative">
      <div className="absolute inset-0 bg-linear-to-b from-transparent via-background-light/50 dark:via-black/20 to-transparent -z-10"></div>
      <div className="text-center mb-16">
        <h2 className="text-[#181411] dark:text-white text-3xl md:text-4xl font-black leading-tight tracking-tight mb-4">
          {statsData.title}
        </h2>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {statsData.stats.map((stat, index) => {
          const Icon = iconMap[stat.icon] || Building2;
          return (
            <div
              key={index}
              className="group relative flex flex-col items-start text-left p-8 rounded-2xl bg-white dark:bg-gray-900 border border-border shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden"
            >
              {/* Gradient background on hover */}
              <div
                className={`absolute inset-0 bg-linear-to-br ${stat.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}
              ></div>

              {/* Decorative corner accent */}
              <div
                className={`absolute top-0 right-0 w-24 h-24 bg-linear-to-br ${stat.gradient} opacity-5 rounded-bl-full`}
              ></div>

              <div className="relative z-10 w-full">
                {/* Icon */}
                <div
                  className={`flex items-center justify-center size-14 rounded-xl ${stat.iconBg} ${stat.iconColor} mb-6 group-hover:scale-110 transition-transform duration-300`}
                >
                  <Icon className="size-7" />
                </div>

                {/* Value */}
                <p
                  className={`text-5xl md:text-6xl font-black mb-2 bg-linear-to-br ${stat.gradient} bg-clip-text text-transparent`}
                >
                  {stat.value}
                </p>

                {/* Label */}
                <p className="text-[#495057] dark:text-white/70 text-base font-semibold">
                  {stat.label}
                </p>

                {/* Bottom accent line */}
                <div
                  className={`mt-6 h-1 w-16 bg-linear-to-r ${stat.gradient} rounded-full`}
                ></div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
