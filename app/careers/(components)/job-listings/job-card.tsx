import Link from "next/link";
import { Button } from "@/components/ui/button";
import type { Job } from "@/api/jobs";

interface JobCardProps {
  job: Job;
  onViewDetail: (job: Job) => void;
}

export function JobCard({ job, onViewDetail }: JobCardProps) {
  return (
    <div className="border rounded-xl p-6 bg-white dark:bg-[#212529]/30 border-[#F8F9FA] dark:border-white/10 flex flex-col gap-4 hover:shadow-lg hover:border-primary/50 dark:hover:border-primary/50 transition-all">
      <h3 className="text-xl font-bold text-[#212529] dark:text-[#F8F9FA]">
        {job.title}
      </h3>
      <div className="flex flex-wrap gap-2">
        <span className="text-xs font-medium bg-primary/20 text-primary py-1 px-2 rounded-full">
          {job.department}
        </span>
        <span className="text-xs font-medium bg-[#F8F9FA] dark:bg-background-dark text-[#6C757D] py-1 px-2 rounded-full">
          {job.location}
        </span>
        <span className="text-xs font-medium bg-[#F8F9FA] dark:bg-background-dark text-[#6C757D] py-1 px-2 rounded-full">
          {job.type}
        </span>
      </div>
      <div className="text-[#6C757D] dark:text-[#F8F9FA]/70 text-sm leading-relaxed grow line-clamp-3">
        {job.description.replace(/<[^>]*>/g, "").substring(0, 150)}
        {job.description.replace(/<[^>]*>/g, "").length > 150 && "..."}
      </div>
      <div className="flex flex-col gap-2 mt-4">
        <Button
          type="button"
          variant="outline"
          onClick={() => onViewDetail(job)}
          className="w-full text-xs h-8 px-3 border-muted hover:bg-muted/50"
        >
          See Detail
        </Button>
        <Button
          asChild
          className="flex! w-full max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-primary! text-white text-sm font-bold leading-normal tracking-[0.015em] hover:opacity-90! transition-opacity hover:bg-primary!"
        >
          <Link href={`/careers/apply/${job.id}`}>
            <span className="truncate">Apply Now</span>
          </Link>
        </Button>
      </div>
    </div>
  );
}

