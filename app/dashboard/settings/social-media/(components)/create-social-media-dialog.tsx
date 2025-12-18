"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { SocialMediaForm } from "./social-media-form";
import type { CreateSocialMediaData } from "@/api/social-media";

interface CreateSocialMediaDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: CreateSocialMediaData) => Promise<void>;
  isSubmitting?: boolean;
}

export function CreateSocialMediaDialog({
  open,
  onOpenChange,
  onSubmit,
  isSubmitting = false,
}: CreateSocialMediaDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[calc(100%-2rem)] sm:max-w-md md:max-w-lg lg:max-w-xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add Social Media Link</DialogTitle>
          <DialogDescription>
            Add a new social media link to display on your website.
          </DialogDescription>
        </DialogHeader>
        <SocialMediaForm
          onSubmit={onSubmit}
          onCancel={() => onOpenChange(false)}
          isSubmitting={isSubmitting}
        />
      </DialogContent>
    </Dialog>
  );
}

