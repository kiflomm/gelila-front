import {
  Target,
  Rocket,
  Award,
  Settings,
  Users,
  Lightbulb,
  UserCircle,
} from "lucide-react";

const coreValues = [
  {
    icon: Award,
    title: "Integrity",
    description: "We operate with honesty and professionalism.",
  },
  {
    icon: Settings,
    title: "Quality",
    description:
      "We maintain strict quality standards in products and services.",
  },
  {
    icon: Lightbulb,
    title: "Innovation",
    description: "We adopt modern technologies for continuous improvement.",
  },
  {
    icon: Users,
    title: "Teamwork",
    description:
      "We believe in collaborative growth with our employees and partners.",
  },
];

export default function LeadershipSection() {
  return (
    <section className="py-10 sm:py-16 px-4 sm:px-6 lg:px-10">
      {/* Our Leadership Section */}
      <div className="mb-10 sm:mb-12">
        <div className="flex items-center gap-3 mb-4">
          <div className="flex items-center justify-center size-10 rounded-xl bg-primary/10 dark:bg-primary/20">
            <UserCircle className="size-5 text-primary" />
          </div>
          <h2 className="text-[#181411] dark:text-white text-2xl sm:text-3xl font-black leading-tight tracking-tight">
            Our Leadership
          </h2>
        </div>
        <p className="text-[#495057] dark:text-white/80 text-base sm:text-lg leading-relaxed">
          Gelila Manufacturing PLC is founded and led by{" "}
          <strong className="text-[#181411] dark:text-white font-semibold">
            Mr. Berhe Assefa
          </strong>
          , an entrepreneur with decades of experience in manufacturing and
          industrial operations. His vision continues to guide the company's
          growth and diversification.
        </p>
      </div>

      {/* Vision, Mission & Core Values Section */}
      <div>
        <h2 className="text-[#181411] dark:text-white text-2xl sm:text-3xl font-black leading-tight tracking-tight mb-8 sm:mb-10 text-center">
          Vision, Mission & Core Values
        </h2>

        {/* Vision Section */}
        <div className="mb-8 sm:mb-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="flex items-center justify-center size-10 rounded-xl bg-primary/10 dark:bg-primary/20">
              <Target className="size-5 text-primary" />
            </div>
            <h3 className="text-[#181411] dark:text-white text-xl sm:text-2xl font-black leading-tight tracking-tight">
              Vision
            </h3>
          </div>
          <p className="text-[#495057] dark:text-white/80 text-base sm:text-lg leading-relaxed mb-3">
            To become a leading Ethiopian industrial group known for innovation,
            quality manufacturing, and reliable service delivery in Africa.
          </p>
          <p className="text-[#495057] dark:text-white/80 text-sm sm:text-base leading-relaxed">
            To be a leading manufacturing and service providing company in
            Ethiopia.
          </p>
        </div>

        {/* Mission Section */}
        <div className="mb-8 sm:mb-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="flex items-center justify-center size-10 rounded-xl bg-primary/10 dark:bg-primary/20">
              <Rocket className="size-5 text-primary" />
            </div>
            <h3 className="text-[#181411] dark:text-white text-xl sm:text-2xl font-black leading-tight tracking-tight">
              Mission
            </h3>
          </div>
          <ul className="flex flex-col gap-3 text-[#495057] dark:text-white/80 text-sm sm:text-base leading-relaxed">
            <li className="flex items-start gap-2">
              <span className="text-primary shrink-0 mt-1">•</span>
              <span>
                To produce competitive, high-quality products in footwear, food,
                and textiles for domestic and export markets.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary shrink-0 mt-1">•</span>
              <span>
                To provide safe and reliable public transport services.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary shrink-0 mt-1">•</span>
              <span>
                Delivering quality products and services that uplift lives,
                empower communities, and protect the environment.
              </span>
            </li>
          </ul>
        </div>

        {/* Core Values Section */}
        <div>
          <div className="flex items-center gap-3 mb-6">
            <div className="flex items-center justify-center size-10 rounded-xl bg-primary/10 dark:bg-primary/20">
              <Award className="size-5 text-primary" />
            </div>
            <h3 className="text-[#181411] dark:text-white text-xl sm:text-2xl font-black leading-tight tracking-tight">
              Core Values
            </h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {coreValues.map((value, index) => {
              const Icon = value.icon;
              return (
                <div
                  key={index}
                  className="flex flex-col gap-3 p-4 sm:p-5 rounded-lg border border-primary/10 dark:border-primary/20 bg-white dark:bg-black/20"
                >
                  <div className="flex items-center justify-center size-10 rounded-xl bg-primary/10 dark:bg-primary/20">
                    <Icon className="size-5 text-primary" />
                  </div>
                  <h4 className="text-[#181411] dark:text-white text-base sm:text-lg font-bold">
                    {value.title}
                  </h4>
                  <p className="text-[#495057] dark:text-white/80 text-sm leading-relaxed">
                    {value.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
