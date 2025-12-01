import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function OpportunitiesSection() {
  return (
    <section className="py-16 md:py-24 bg-[#F8F9FA] dark:bg-background-dark">
      <div className="px-4 sm:px-10 lg:px-20">
        <div className="max-w-7xl mx-auto px-2 sm:px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 lg:gap-12">
            {/* Internship Programs */}
            <div className="flex flex-col items-center text-center md:flex-row md:text-left md:items-start gap-6 p-6 rounded-xl">
              <div className="shrink-0">
                <div className="flex items-center justify-center size-16 bg-primary/20 rounded-full text-primary">
                  <span className="material-symbols-outlined text-4xl">
                    school
                  </span>
                </div>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-[#212529] dark:text-[#F8F9FA] mb-2">
                  Internship Programs
                </h3>
                <p className="text-[#6C757D] dark:text-[#F8F9FA]/70 mb-4">
                  Kickstart your career with our hands-on internship programs.
                  Gain real-world experience, work with industry experts, and
                  contribute to meaningful projects.
                </p>
                <Link
                  href="/careers/internships"
                  className="font-bold text-primary hover:underline inline-flex items-center gap-1"
                >
                  Learn More
                  <ArrowRight className="size-4" />
                </Link>
              </div>
            </div>

            {/* Training & Development */}
            <div className="flex flex-col items-center text-center md:flex-row md:text-left md:items-start gap-6 p-6 rounded-xl">
              <div className="shrink-0">
                <div className="flex items-center justify-center size-16 bg-primary/20 rounded-full text-primary">
                  <span className="material-symbols-outlined text-4xl">
                    trending_up
                  </span>
                </div>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-[#212529] dark:text-[#F8F9FA] mb-2">
                  Training & Development
                </h3>
                <p className="text-[#6C757D] dark:text-[#F8F9FA]/70 mb-4">
                  We invest in our people. Access continuous learning
                  opportunities, professional certifications, and clear career
                  progression pathways to achieve your full potential.
                </p>
                <Link
                  href="/careers/training"
                  className="font-bold text-primary hover:underline inline-flex items-center gap-1"
                >
                  Explore Pathways
                  <ArrowRight className="size-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
