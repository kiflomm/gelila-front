"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { Job } from "@/api/jobs";
import { safeHtml } from "@/lib/html-utils";

interface JobDetailDialogProps {
  job: Job | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function JobDetailDialog({
  job,
  open,
  onOpenChange,
}: JobDetailDialogProps) {
  if (!job) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[calc(100%-2rem)] sm:max-w-3xl md:max-w-4xl lg:max-w-5xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">{job.title}</DialogTitle>
          <DialogDescription>
            <div className="flex flex-wrap gap-2 mt-2">
              <span className="text-xs font-medium bg-primary/20 text-primary py-1 px-2 rounded-full">
                {job.department}
              </span>
              <span className="text-xs font-medium bg-muted text-muted-foreground py-1 px-2 rounded-full">
                {job.location}
              </span>
              <span className="text-xs font-medium bg-muted text-muted-foreground py-1 px-2 rounded-full">
                {job.type}
              </span>
            </div>
          </DialogDescription>
        </DialogHeader>
        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-3">Job Description</h3>
          <div
            className="max-w-none text-[#6C757D] dark:text-[#F8F9FA]/70 leading-relaxed
              [&_p]:my-3 [&_p]:leading-relaxed
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
      </DialogContent>
    </Dialog>
  );
}

