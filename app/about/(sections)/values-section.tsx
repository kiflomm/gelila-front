import { Award, Settings, Users, Lightbulb } from "lucide-react";
import valuesData from "@/data/about-values.json";

// Icon mapping
const iconMap: Record<string, typeof Award> = {
  Award,
  Settings,
  Lightbulb,
  Users,
};

export default function ValuesSection() {
  return (
    <section className="py-12 sm:py-20 relative">
      <div className="absolute inset-0 bg-linear-to-b from-transparent via-background-light/30 dark:via-black/10 to-transparent -z-10"></div>
      <div className="text-center mb-16">
        <h2 className="text-[#181411] dark:text-white text-3xl md:text-4xl font-black leading-tight tracking-tight mb-4">
          {valuesData.title}
        </h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {valuesData.values.map((value, index) => {
          const Icon = iconMap[value.icon] || Award;
          return (
            <div
              key={index}
              className="flex flex-col gap-4 p-6 rounded-lg border border-border bg-white dark:bg-gray-900 shadow-sm"
            >
              <div className="flex items-center justify-center size-12 text-[#181411] dark:text-white">
                <Icon className="size-6" />
              </div>
              <h3 className="text-[#181411] dark:text-white text-lg font-bold">
                {value.title}
              </h3>
              <p className="text-[#495057] dark:text-white/80 text-sm leading-relaxed">
                {value.description}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
