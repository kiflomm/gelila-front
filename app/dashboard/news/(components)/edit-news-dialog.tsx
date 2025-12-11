"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { NewsForm } from "./news-form";
import type { NewsItem, UpdateNewsData } from "@/api/news";

interface EditNewsDialogProps {
  news: NewsItem;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: UpdateNewsData) => Promise<void>;
  isSubmitting?: boolean;
}

export function EditNewsDialog({
  news,
  open,
  onOpenChange,
  onSubmit,
  isSubmitting = false,
}: EditNewsDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[calc(100%-2rem)] sm:max-w-3xl md:max-w-5xl lg:max-w-6xl max-h-[90vh] overflow-y-auto overflow-x-hidden">
        <DialogHeader>
          <DialogTitle>Edit News Article</DialogTitle>
          <DialogDescription>
            Update the news article details. All fields are optional except those marked with *.
          </DialogDescription>
        </DialogHeader>
        <NewsForm
          news={news}
          onSubmit={onSubmit}
          onCancel={() => onOpenChange(false)}
          isSubmitting={isSubmitting}
        />
      </DialogContent>
    </Dialog>
  );
}

