import { Building2, Users, TrendingUp, Award } from "lucide-react";

const stats = [
  {
    icon: Building2,
    value: "5+",
    label: "Industrial Sectors",
    description: "Diverse manufacturing capabilities",
  },
  {
    icon: Users,
    value: "5,000+",
    label: "Employees",
    description: "Dedicated professionals",
  },
  {
    icon: TrendingUp,
    value: "$50M+",
    label: "Invested",
    description: "In technology and infrastructure",
  },
  {
    icon: Award,
    value: "25+",
    label: "Years",
    description: "Of industrial excellence",
  },
];

export default function StatsSection() {
  return (
    <section className="py-10 sm:py-16">
      <div className="text-center mb-12">
        <h2 className="text-[#181411] dark:text-white text-3xl font-bold leading-tight tracking-tight mb-4">
          By The Numbers
        </h2>
        <p className="text-[#8c755f] dark:text-white/70 text-base max-w-2xl mx-auto">
          Our impact and growth in numbers that reflect our commitment to excellence.
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div
              key={index}
              className="flex flex-col items-center text-center gap-3 p-6 rounded-xl border border-primary/20 bg-white dark:bg-black/20"
            >
              <div className="flex items-center justify-center size-14 bg-primary/20 rounded-full text-primary mb-2">
                <Icon className="size-7" />
              </div>
              <p className="text-[#181411] dark:text-white text-4xl font-black">
                {stat.value}
              </p>
              <p className="text-[#181411] dark:text-white text-lg font-semibold">
                {stat.label}
              </p>
              <p className="text-[#8c755f] dark:text-white/70 text-sm">
                {stat.description}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}

