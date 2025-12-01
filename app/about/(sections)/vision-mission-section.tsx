import { Target, Rocket, CheckCircle2 } from "lucide-react";

export default function VisionMissionSection() {
  return (
    <section className="py-12 sm:py-20 relative">
      <div className="absolute inset-0 bg-linear-to-b from-transparent via-background-light/30 dark:via-black/10 to-transparent -z-10"></div>

      {/* Vision Section */}
      <div className="mb-16 sm:mb-20">
        <div className="flex items-center gap-3 mb-6">
          <div className="flex items-center justify-center size-12 rounded-xl bg-primary/10 dark:bg-primary/20">
            <Target className="size-6 text-primary" />
          </div>
          <h2 className="text-[#181411] dark:text-white text-3xl md:text-4xl font-black leading-tight tracking-tight">
            Our Vision
          </h2>
        </div>
        <div className="pl-0 sm:pl-16">
          <p className="text-[#495057] dark:text-white/80 text-lg md:text-xl leading-relaxed mb-4">
            To become a leading Ethiopian industrial group known for innovation,
            quality manufacturing, and reliable service delivery in Africa.
          </p>
          <p className="text-[#495057] dark:text-white/80 text-base md:text-lg leading-relaxed">
            To be a leading manufacturing and service providing company in
            Ethiopia.
          </p>
        </div>
      </div>

      {/* Mission Section */}
      <div className="mb-16 sm:mb-20">
        <div className="flex items-center gap-3 mb-6">
          <div className="flex items-center justify-center size-12 rounded-xl bg-primary/10 dark:bg-primary/20">
            <Rocket className="size-6 text-primary" />
          </div>
          <h2 className="text-[#181411] dark:text-white text-3xl md:text-4xl font-black leading-tight tracking-tight">
            Our Mission
          </h2>
        </div>
        <div className="pl-0 sm:pl-16">
          <ul className="flex flex-col gap-4 text-[#495057] dark:text-white/80 text-base md:text-lg leading-relaxed">
            <li className="flex items-start gap-3">
              <CheckCircle2 className="size-5 text-primary shrink-0 mt-1" />
              <span>
                To produce competitive, high-quality products in footwear, food,
                and textiles for domestic and export markets.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="size-5 text-primary shrink-0 mt-1" />
              <span>
                To provide safe and reliable public transport services.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="size-5 text-primary shrink-0 mt-1" />
              <span>
                Delivering quality products and services that uplift lives,
                empower communities, and protect the environment.
              </span>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
