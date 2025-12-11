import { Skeleton } from "@/components/ui/skeleton";
import { JobCard } from "./job-card";
import type { Job } from "@/api/jobs";

interface JobListingsGridProps {
  jobs: Job[];
  isLoading: boolean;
  onViewDetail: (job: Job) => void;
}

const ITEMS_PER_PAGE = 6;

export function JobListingsGrid({
  jobs,
  isLoading,
  onViewDetail,
}: JobListingsGridProps) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {Array.from({ length: 6 }).map((_, index) => (
          <div
            key={index}
            className="border rounded-xl p-6 bg-white dark:bg-[#212529]/30 border-[#F8F9FA] dark:border-white/10 flex flex-col gap-4"
          >
            {/* Title */}
            <Skeleton className="h-7 w-3/4" />
            
            {/* Badges */}
            <div className="flex flex-wrap gap-2">
              <Skeleton className="h-6 w-20 rounded-full" />
              <Skeleton className="h-6 w-24 rounded-full" />
              <Skeleton className="h-6 w-16 rounded-full" />
            </div>

            {/* Description */}
            <div className="flex flex-col gap-2 grow">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-5/6" />
            </div>

            {/* Button */}
            <Skeleton className="h-10 w-full rounded-lg mt-4" />
          </div>
        ))}
      </div>
    );
  }

  if (jobs.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-[#6C757D] dark:text-[#F8F9FA]/70 text-lg">
          No jobs found matching your criteria.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
      {jobs.map((job) => (
        <JobCard key={job.id} job={job} onViewDetail={onViewDetail} />
      ))}
    </div>
  );
}

