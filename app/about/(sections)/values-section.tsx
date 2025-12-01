import { Award, Settings, Users, Lightbulb } from "lucide-react";

const values = [
  {
    icon: Award,
    title: "Excellence",
    description:
      "Excellence is the cornerstone of everything we do. We strive for the highest standards in every product we manufacture and every service we deliver.",
    iconColor: "text-[#181411] dark:text-white",
  },
  {
    icon: Settings,
    title: "Quality",
    description:
      "Our commitment to quality drives our operations. ISO 9001 certified, we maintain rigorous quality control processes across all our operations.",
    iconColor: "text-[#181411] dark:text-white",
  },
  {
    icon: Users,
    title: "People First",
    description:
      "We believe that people come first. Our team is our greatest asset, and we invest in our people and create opportunities for growth.",
    iconColor: "text-[#181411] dark:text-white",
  },
  {
    icon: Lightbulb,
    title: "Innovation",
    description:
      "Innovation is at the heart of our evolution. We embrace new technologies and processes to stay at the forefront of industrial manufacturing.",
    iconColor: "text-[#181411] dark:text-white",
  },
];

export default function ValuesSection() {
  return (
    <section className="py-12 sm:py-20 relative">
      <div className="absolute inset-0 bg-linear-to-b from-transparent via-background-light/30 dark:via-black/10 to-transparent -z-10"></div>
      <div className="text-center mb-16">
        <h2 className="text-[#181411] dark:text-white text-3xl md:text-4xl font-black leading-tight tracking-tight mb-4">
          Core Values
        </h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {values.map((value, index) => {
          const Icon = value.icon;
          return (
            <div
              key={index}
              className="flex flex-col gap-4 p-6 rounded-lg border border-border bg-white dark:bg-gray-900 shadow-sm"
            >
              <div
                className={`flex items-center justify-center size-12 ${value.iconColor}`}
              >
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
