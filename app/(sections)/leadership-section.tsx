import {
  MapPin,
  Eye,
  Rocket,
  Award,
  Settings,
  Users,
  Lightbulb,
  CheckCircle,
  Star,
} from "lucide-react";
import leadershipData from "@/data/leadership.json";

// Icon mapping for core values
const iconMap: Record<string, typeof Award> = {
  Award: CheckCircle,
  Settings: Star,
  Lightbulb: Lightbulb,
  Users: Users,
};

export default function LeadershipSection() {
  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Our Leadership Section */}
      <div className="mb-10">
        <div className="flex items-center gap-3 mb-4">
          <div className="flex items-center justify-center size-10 rounded-full bg-primary">
            <MapPin className="size-5 text-white" />
          </div>
          <h2 className="text-[#181411] dark:text-white text-2xl sm:text-3xl font-bold">
            Our Leadership
          </h2>
        </div>
        <div className="rounded-lg bg-gray-50 dark:bg-gray-900/50 border-t-4 border-primary p-6">
          <p className="text-[#495057] dark:text-gray-300 text-base leading-relaxed">
            {
              leadershipData.leadership.founder.description.split(
                leadershipData.leadership.founder.name
              )[0]
            }
            <strong className="text-[#181411] dark:text-white font-semibold">
              {" "}
              {leadershipData.leadership.founder.name}{" "}
            </strong>
            {
              leadershipData.leadership.founder.description.split(
                leadershipData.leadership.founder.name
              )[1]
            }
          </p>
        </div>
      </div>

      {/* Vision and Mission Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
        {/* Vision Card */}
        <div className="rounded-lg bg-gray-50 dark:bg-gray-900/50 border-t-4 border-primary p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="flex items-center justify-center size-10 rounded-full bg-primary">
              <Eye className="size-5 text-white" />
            </div>
            <h3 className="text-[#181411] dark:text-white text-xl sm:text-2xl font-bold">
              {leadershipData.vision.title}
            </h3>
          </div>
          {leadershipData.vision.statements.map((statement, index) => (
            <p
              key={index}
              className="text-[#495057] dark:text-gray-300 text-base leading-relaxed"
            >
              {statement}
            </p>
          ))}
        </div>

        {/* Mission Card */}
        <div className="rounded-lg bg-gray-50 dark:bg-gray-900/50 border-t-4 border-primary p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="flex items-center justify-center size-10 rounded-full bg-primary">
              <Rocket className="size-5 text-white" />
            </div>
            <h3 className="text-[#181411] dark:text-white text-xl sm:text-2xl font-bold">
              {leadershipData.mission.title}
            </h3>
          </div>
          <ul className="space-y-2 text-[#495057] dark:text-gray-300 text-base leading-relaxed">
            {leadershipData.mission.statements.map((statement, index) => (
              <li key={index} className="flex items-start gap-2">
                <span className="text-primary shrink-0 mt-1">•</span>
                <span>{statement}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Core Values Section */}
      <div>
        <h3 className="text-[#181411] dark:text-white text-2xl sm:text-3xl font-bold mb-6 text-center">
          Core Values
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {leadershipData.coreValues.map((value, index) => {
            const Icon = iconMap[value.icon] || Award;
            return (
              <div
                key={index}
                className="rounded-lg bg-gray-50 dark:bg-gray-900/50 border-t-4 border-primary p-6"
              >
                <div className="flex items-center justify-center size-10 rounded-full bg-primary mb-4">
                  <Icon className="size-5 text-white" />
                </div>
                <h4 className="text-[#181411] dark:text-white text-lg font-bold mb-2">
                  {value.title}
                </h4>
                <p className="text-[#495057] dark:text-gray-300 text-sm leading-relaxed">
                  {value.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
