import { Target, Award, Users, Zap } from "lucide-react";

const values = [
  {
    icon: Target,
    title: "Excellence",
    description:
      "We strive for the highest standards in every product we manufacture and every service we deliver.",
  },
  {
    icon: Award,
    title: "Quality",
    description:
      "ISO 9001 certified, we maintain rigorous quality control processes across all our operations.",
  },
  {
    icon: Users,
    title: "People First",
    description:
      "Our team is our greatest asset. We invest in our people and create opportunities for growth.",
  },
  {
    icon: Zap,
    title: "Innovation",
    description:
      "Embracing new technologies and processes to stay at the forefront of industrial manufacturing.",
  },
];

export default function ValuesSection() {
  return (
    <section className="py-10 sm:py-16 bg-white dark:bg-black/20 rounded-xl">
      <div className="text-center mb-12">
        <h2 className="text-[#181411] dark:text-white text-3xl font-bold leading-tight tracking-tight mb-4">
          Our Core Values
        </h2>
        <p className="text-[#8c755f] dark:text-white/70 text-base max-w-2xl mx-auto">
          The principles that guide everything we do and shape our commitment to
          excellence.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {values.map((value, index) => {
          const Icon = value.icon;
          return (
            <div
              key={index}
              className="flex flex-col gap-4 p-6 rounded-xl border border-primary/20 bg-background-light dark:bg-black/20 hover:shadow-lg transition-shadow"
            >
              <div className="flex items-center justify-center size-16 bg-primary/20 rounded-full text-primary">
                <Icon className="size-8" />
              </div>
              <h3 className="text-[#181411] dark:text-white text-xl font-bold">
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

