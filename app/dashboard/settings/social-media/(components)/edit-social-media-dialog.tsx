"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { SocialMediaForm } from "./social-media-form";
import type { SocialMediaLink, UpdateSocialMediaData } from "@/api/social-media";

interface EditSocialMediaDialogProps {
  socialMedia: SocialMediaLink;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: UpdateSocialMediaData) => Promise<void>;
  isSubmitting?: boolean;
}

export function EditSocialMediaDialog({
  socialMedia,
  open,
  onOpenChange,
  onSubmit,
  isSubmitting = false,
}: EditSocialMediaDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[calc(100%-2rem)] sm:max-w-md md:max-w-lg lg:max-w-xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Social Media Link</DialogTitle>
          <DialogDescription>
            Update the social media link information.
          </DialogDescription>
        </DialogHeader>
        <SocialMediaForm
          initialData={{
            name: socialMedia.name,
            label: socialMedia.label,
            href: socialMedia.href,
            icon: socialMedia.icon,
            isActive: socialMedia.isActive,
            orderIndex: socialMedia.orderIndex,
          }}
          onSubmit={onSubmit}
          onCancel={() => onOpenChange(false)}
          isSubmitting={isSubmitting}
        />
      </DialogContent>
    </Dialog>
  );
}

