"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { NewsForm } from "./news-form";
import type { CreateNewsData, UpdateNewsData } from "@/api/news";

interface CreateNewsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: CreateNewsData | UpdateNewsData) => Promise<void>;
  isSubmitting?: boolean;
}

export function CreateNewsDialog({
  open,
  onOpenChange,
  onSubmit,
  isSubmitting = false,
}: CreateNewsDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[calc(100%-2rem)] sm:max-w-3xl md:max-w-5xl lg:max-w-6xl max-h-[90vh] overflow-y-auto overflow-x-hidden">
        <DialogHeader>
          <DialogTitle>Create New News Article</DialogTitle>
          <DialogDescription>
            Add a new news article to the news page. Fill in all required fields.
          </DialogDescription>
        </DialogHeader>
        <NewsForm
          onSubmit={onSubmit}
          onCancel={() => onOpenChange(false)}
          isSubmitting={isSubmitting}
        />
      </DialogContent>
    </Dialog>
  );
}

