import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Globe, Package, Truck, CheckCircle } from "lucide-react";
import importsCommitmentData from "@/data/imports-commitment.json";
import exportsCommitmentData from "@/data/exports-commitment.json";

export default function OverviewSection() {
  return (
    <section className="py-12 px-4">
      <div className="flex flex-col gap-8 lg:gap-12">
        {/* Section Header */}
        <div className="flex flex-col gap-4 text-center max-w-3xl mx-auto">
          <h2 className="text-[#181411] dark:text-white text-2xl sm:text-3xl lg:text-4xl font-bold leading-tight tracking-[-0.015em]">
            Our Trade Services
          </h2>
          <p className="text-[#6c757d] dark:text-gray-400 text-base sm:text-lg font-normal leading-relaxed">
            Explore our comprehensive import and export services designed to meet your global trade needs.
          </p>
        </div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Imports Column */}
          <div className="flex flex-col gap-6 p-6 sm:p-8 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-background-dark/50 hover:shadow-lg transition-shadow">
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-lg bg-primary/10">
                  <Package className="text-primary size-6" />
                </div>
                <h3 className="text-[#181411] dark:text-white text-xl sm:text-2xl font-bold leading-tight tracking-[-0.015em]">
                  Imports
                </h3>
              </div>
              <p className="text-[#6c757d] dark:text-gray-400 text-base font-normal leading-relaxed">
                {importsCommitmentData.description}
              </p>
            </div>

            {/* Key Highlights */}
            <div className="flex flex-col gap-3">
              <h4 className="text-[#181411] dark:text-white text-sm font-semibold uppercase tracking-wider">
                Key Features
              </h4>
              <ul className="flex flex-col gap-2">
                {importsCommitmentData.commitments.slice(0, 3).map((commitment) => (
                  <li key={commitment.id} className="flex items-start gap-2">
                    <CheckCircle className="text-primary size-5 shrink-0 mt-0.5" />
                    <span className="text-[#6c757d] dark:text-gray-400 text-sm font-normal leading-normal">
                      {commitment.title}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Call to Action */}
            <Link href="/imports" className="mt-auto">
              <Button className="w-full group">
                Explore Imports
                <ArrowRight className="ml-2 size-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>

          {/* Exports Column */}
          <div className="flex flex-col gap-6 p-6 sm:p-8 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-background-dark/50 hover:shadow-lg transition-shadow">
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-lg bg-primary/10">
                  <Globe className="text-primary size-6" />
                </div>
                <h3 className="text-[#181411] dark:text-white text-xl sm:text-2xl font-bold leading-tight tracking-[-0.015em]">
                  Exports
                </h3>
              </div>
              <p className="text-[#6c757d] dark:text-gray-400 text-base font-normal leading-relaxed">
                {exportsCommitmentData.description}
              </p>
            </div>

            {/* Key Highlights */}
            <div className="flex flex-col gap-3">
              <h4 className="text-[#181411] dark:text-white text-sm font-semibold uppercase tracking-wider">
                Key Features
              </h4>
              <ul className="flex flex-col gap-2">
                {exportsCommitmentData.commitments.slice(0, 3).map((commitment) => (
                  <li key={commitment.id} className="flex items-start gap-2">
                    <CheckCircle className="text-primary size-5 shrink-0 mt-0.5" />
                    <span className="text-[#6c757d] dark:text-gray-400 text-sm font-normal leading-normal">
                      {commitment.title}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Call to Action */}
            <Link href="/exports" className="mt-auto">
              <Button className="w-full group">
                Explore Exports
                <ArrowRight className="ml-2 size-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

