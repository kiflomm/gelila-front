"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { LeadershipForm } from "./leadership-form";
import type { LeadershipItem, CreateLeadershipData, UpdateLeadershipData } from "@/api/leadership";

interface EditLeadershipDialogProps {
  leadership: LeadershipItem;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: UpdateLeadershipData) => Promise<void>;
  isSubmitting?: boolean;
}

export function EditLeadershipDialog({
  leadership,
  open,
  onOpenChange,
  onSubmit,
  isSubmitting = false,
}: EditLeadershipDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[calc(100%-2rem)] sm:max-w-3xl md:max-w-5xl lg:max-w-6xl max-h-[90vh] overflow-y-auto overflow-x-hidden">
        <DialogHeader>
          <DialogTitle>Edit Leadership Person</DialogTitle>
          <DialogDescription>
            Update the leadership person information. All fields are optional.
          </DialogDescription>
        </DialogHeader>
        <LeadershipForm
          leadership={leadership}
          onSubmit={onSubmit as (data: CreateLeadershipData | UpdateLeadershipData) => Promise<void>}
          onCancel={() => onOpenChange(false)}
          isSubmitting={isSubmitting}
        />
      </DialogContent>
    </Dialog>
  );
}

