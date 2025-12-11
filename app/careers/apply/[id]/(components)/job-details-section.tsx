import type { Job } from "@/api/jobs";
import { safeHtml } from "@/lib/html-utils";

interface JobDetailsSectionProps {
  job: Job;
}

export default function JobDetailsSection({ job }: JobDetailsSectionProps) {
  return (
    <section className="py-8 md:py-12 border-b border-[#F8F9FA] dark:border-white/10">
      <div className="px-4 sm:px-10 lg:px-20">
        <div className="max-w-3xl mx-auto">
          {/* Job Title */}
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#212529] dark:text-[#F8F9FA] mb-6">
            {job.title}
          </h1>

          {/* Job Meta Information */}
          <div className="flex flex-wrap gap-4 mb-8">
            <div className="text-sm text-[#6C757D] dark:text-[#F8F9FA]/70">
              <span className="font-medium">{job.department}</span>
            </div>
            <div className="text-sm text-[#6C757D] dark:text-[#F8F9FA]/70">
              <span className="font-medium">{job.location}</span>
            </div>
            <div className="text-sm text-[#6C757D] dark:text-[#F8F9FA]/70">
              <span className="font-medium">{job.type}</span>
            </div>
          </div>

          {/* Job Description */}
          <div className="prose prose-sm dark:prose-invert max-w-none 
            prose-headings:font-semibold prose-p:my-3 prose-ul:my-3 prose-ol:my-3
            prose-li:my-1 prose-a:text-primary prose-a:underline
            text-[#6C757D] dark:text-[#F8F9FA]/70 leading-relaxed
            [&_strong]:font-bold [&_strong]:text-[#212529] dark:[&_strong]:text-[#F8F9FA]
            [&_b]:font-bold [&_b]:text-[#212529] dark:[&_b]:text-[#F8F9FA]
            [&_em]:italic [&_i]:italic
            [&_u]:underline
            [&_s]:line-through [&_strike]:line-through
            [&_h1]:text-2xl [&_h1]:font-bold [&_h1]:mt-4 [&_h1]:mb-2 [&_h1]:text-[#212529] dark:[&_h1]:text-[#F8F9FA]
            [&_h2]:text-xl [&_h2]:font-bold [&_h2]:mt-4 [&_h2]:mb-2 [&_h2]:text-[#212529] dark:[&_h2]:text-[#F8F9FA]
            [&_h3]:text-lg [&_h3]:font-bold [&_h3]:mt-3 [&_h3]:mb-2 [&_h3]:text-[#212529] dark:[&_h3]:text-[#F8F9FA]
            [&_ul]:list-disc [&_ul]:ml-6 [&_ul]:my-2 [&_ul]:space-y-1
            [&_ol]:list-decimal [&_ol]:ml-6 [&_ol]:my-2 [&_ol]:space-y-1
            [&_li]:my-1 [&_li]:leading-relaxed
            [&_a]:text-primary [&_a]:underline [&_a]:hover:text-primary/80 [&_a]:transition-colors
            [&_blockquote]:border-l-4 [&_blockquote]:border-primary/30 [&_blockquote]:pl-4 [&_blockquote]:py-2 [&_blockquote]:my-4 [&_blockquote]:italic [&_blockquote]:bg-muted/30 [&_blockquote]:rounded-r"
            dangerouslySetInnerHTML={{ __html: safeHtml(job.description) }}
          />
        </div>
      </div>
    </section>
  );
}

