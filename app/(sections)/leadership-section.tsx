"use client";

import {
  Eye,
  Rocket,
  Award,
  Users,
  Lightbulb,
  CheckCircle,
  Star,
  User,
} from "lucide-react";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { leadershipApi, type LeadershipItem } from "@/api/leadership";
import leadershipData from "@/data/leadership.json";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";

// Icon mapping for core values
const iconMap: Record<string, typeof Award> = {
  Award: CheckCircle,
  Settings: Star,
  Lightbulb: Lightbulb,
  Users: Users,
};

interface LeadershipSectionProps {
  showMissionVision?: boolean;
}

function getImageUrl(photoUrl: string | null | undefined): string {
  if (!photoUrl) return '';
  if (photoUrl.startsWith('http://') || photoUrl.startsWith('https://')) {
    return photoUrl;
  }
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL || '';
  if (photoUrl.startsWith('/uploads')) {
    return `${apiBaseUrl.replace('/api/v1', '')}${photoUrl}`;
  }
  return photoUrl.startsWith('/') ? `${apiBaseUrl}${photoUrl}` : `${apiBaseUrl}/${photoUrl}`;
}

export default function LeadershipSection({
  showMissionVision = true,
}: LeadershipSectionProps) {
  const { data: leadership = [], isLoading } = useQuery({
    queryKey: ["leadership", "public"],
    queryFn: () => leadershipApi.getLeadership(),
  });
  const [api, setApi] = useState<CarouselApi>();
  const showArrows = leadership.length > 3;

  return (
    <section className="py-16 sm:py-24 lg:py-32 relative">
      <div className="absolute inset-0 bg-linear-to-b from-transparent via-background-light/50 dark:via-black/20 to-transparent -z-10"></div>
      <div className="flex flex-col gap-12">
        {/* Section Header */}
        <div className="flex flex-col gap-5">
          <div className="inline-flex items-center gap-2 text-primary text-sm font-semibold mb-1 px-3 py-1.5 rounded-full bg-primary/10 dark:bg-primary/20 w-fit">
            <div className="size-1.5 rounded-full bg-primary"></div>
            <span>Leadership & Values</span>
          </div>
          <h2 className="text-[#181411] dark:text-white text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black leading-tight tracking-tight">
            Our Leadership
          </h2>
          <p className="text-[#495057] dark:text-white/80 text-base md:text-lg leading-relaxed max-w-3xl">
            Guided by visionary leadership and strong values, we are committed
            to excellence in manufacturing and contributing to Ethiopia's
            industrial growth.
          </p>
        </div>

        {/* Leadership Cards */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="rounded-xl border border-primary/10 dark:border-primary/20 bg-white dark:bg-black/20 p-4 animate-pulse"
              >
                <div className="w-[150px] h-[150px] rounded-full bg-muted mb-3 mx-auto"></div>
                <div className="h-5 bg-muted rounded mb-2"></div>
                <div className="h-3 bg-muted rounded mb-3 w-3/4 mx-auto"></div>
                <div className="h-3 bg-muted rounded"></div>
              </div>
            ))}
          </div>
        ) : leadership.length > 0 ? (
          <div className="relative">
            <Carousel
              opts={{
                align: "start",
                loop: false,
              }}
              setApi={setApi}
              className="w-full"
            >
              <CarouselContent className="-ml-2 md:-ml-4">
                {leadership.map((person: LeadershipItem) => (
                  <CarouselItem key={person.id} className="pl-2 md:pl-4 basis-full md:basis-1/2 lg:basis-1/3">
                    <div className="rounded-xl border border-primary/10 dark:border-primary/20 bg-white dark:bg-black/20 overflow-hidden hover:border-primary/30 dark:hover:border-primary/40 transition-all duration-500 hover:shadow-xl hover:shadow-primary/10 hover:-translate-y-1 p-4 flex flex-col items-center text-center">
                      <div className="relative w-[150px] h-[150px] rounded-full overflow-hidden bg-muted mb-3 flex items-center justify-center shrink-0">
                        {person.photoUrl ? (
                          <img
                            src={getImageUrl(person.photoUrl)}
                            alt={person.photoAlt || person.fullName}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              e.currentTarget.style.display = 'none';
                              const parent = e.currentTarget.parentElement;
                              if (parent) {
                                const fallback = parent.querySelector('.photo-fallback');
                                if (fallback) {
                                  (fallback as HTMLElement).style.display = 'flex';
                                }
                              }
                            }}
                          />
                        ) : null}
                        <div className={`photo-fallback absolute inset-0 flex items-center justify-center ${person.photoUrl ? 'hidden' : ''}`}>
                          <User className="size-16 text-muted-foreground" />
                        </div>
                      </div>
                      <h3 className="text-[#181411] dark:text-white text-lg font-bold mb-1">
                        {person.fullName}
                      </h3>
                      <p className="text-primary text-xs font-semibold mb-2">
                        {person.officialTitle}
                      </p>
                      <p className="text-[#495057] dark:text-white/80 text-xs leading-relaxed">
                        {person.bio}
                      </p>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              {showArrows && (
                <>
                  <CarouselPrevious className="left-2 md:-left-14 h-10 w-10 bg-white/90 dark:bg-gray-900/90 hover:bg-white dark:hover:bg-gray-800 border-2 border-primary/30 hover:border-primary shadow-lg" />
                  <CarouselNext className="right-2 md:-right-14 h-10 w-10 bg-white/90 dark:bg-gray-900/90 hover:bg-white dark:hover:bg-gray-800 border-2 border-primary/30 hover:border-primary shadow-lg" />
                </>
              )}
            </Carousel>
          </div>
        ) : (
          <div className="rounded-2xl border border-primary/10 dark:border-primary/20 bg-white dark:bg-black/20 overflow-hidden hover:border-primary/30 dark:hover:border-primary/40 transition-all duration-500 hover:shadow-2xl hover:shadow-primary/10 hover:-translate-y-2 p-6">
            <h3 className="text-[#181411] dark:text-white text-xl font-bold mb-4">
              Founder & CEO
            </h3>
            <p className="text-[#495057] dark:text-white/80 text-base leading-relaxed">
              {
                leadershipData.leadership.founder.description.split(
                  leadershipData.leadership.founder.name
                )[0]
              }
              <strong className="text-[#181411] dark:text-white font-semibold">
                {leadershipData.leadership.founder.name}
              </strong>
              {
                leadershipData.leadership.founder.description.split(
                  leadershipData.leadership.founder.name
                )[1]
              }
            </p>
          </div>
        )}

        {/* Vision and Mission Cards */}
        {showMissionVision && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Vision Card */}
            <div className="rounded-2xl border border-primary/10 dark:border-primary/20 bg-white dark:bg-black/20 overflow-hidden hover:border-primary/30 dark:hover:border-primary/40 transition-all duration-500 hover:shadow-2xl hover:shadow-primary/10 hover:-translate-y-2 p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="flex items-center justify-center size-10 rounded-full bg-primary">
                  <Eye className="size-5 text-white" />
                </div>
                <h3 className="text-[#181411] dark:text-white text-xl font-bold">
                  {leadershipData.vision.title}
                </h3>
              </div>
              {leadershipData.vision.statements.map((statement, index) => (
                <p
                  key={index}
                  className="text-[#495057] dark:text-white/80 text-base leading-relaxed"
                >
                  {statement}
                </p>
              ))}
            </div>

            {/* Mission Card */}
            <div className="rounded-2xl border border-primary/10 dark:border-primary/20 bg-white dark:bg-black/20 overflow-hidden hover:border-primary/30 dark:hover:border-primary/40 transition-all duration-500 hover:shadow-2xl hover:shadow-primary/10 hover:-translate-y-2 p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="flex items-center justify-center size-10 rounded-full bg-primary">
                  <Rocket className="size-5 text-white" />
                </div>
                <h3 className="text-[#181411] dark:text-white text-xl font-bold">
                  {leadershipData.mission.title}
                </h3>
              </div>
              <ul className="space-y-2 text-[#495057] dark:text-white/80 text-base leading-relaxed">
                {leadershipData.mission.statements.map((statement, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="text-primary shrink-0 mt-1">•</span>
                    <span>{statement}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {/* Core Values Section */}
        <div className="flex flex-col gap-6">
          <h3 className="text-[#181411] dark:text-white text-2xl sm:text-3xl font-bold">
            Core Values
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {leadershipData.coreValues.map((value, index) => {
              const Icon = iconMap[value.icon] || Award;
              return (
                <div
                  key={index}
                  className="rounded-2xl border border-primary/10 dark:border-primary/20 bg-white dark:bg-black/20 overflow-hidden hover:border-primary/30 dark:hover:border-primary/40 transition-all duration-500 hover:shadow-2xl hover:shadow-primary/10 hover:-translate-y-2 p-6"
                >
                  <div className="flex items-center justify-center size-10 rounded-full bg-primary mb-4">
                    <Icon className="size-5 text-white" />
                  </div>
                  <h4 className="text-[#181411] dark:text-white text-lg font-bold mb-2">
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
