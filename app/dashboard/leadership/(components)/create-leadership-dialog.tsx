"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { LeadershipForm } from "./leadership-form";
import type { CreateLeadershipData, UpdateLeadershipData } from "@/api/leadership";

interface CreateLeadershipDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: CreateLeadershipData | UpdateLeadershipData) => Promise<void>;
  isSubmitting?: boolean;
}

export function CreateLeadershipDialog({
  open,
  onOpenChange,
  onSubmit,
  isSubmitting = false,
}: CreateLeadershipDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[calc(100%-2rem)] sm:max-w-3xl md:max-w-5xl lg:max-w-6xl max-h-[90vh] overflow-y-auto overflow-x-hidden">
        <DialogHeader>
          <DialogTitle>Create New Leadership Person</DialogTitle>
          <DialogDescription>
            Add a new leadership person to the leadership section. Fill in all required fields.
          </DialogDescription>
        </DialogHeader>
        <LeadershipForm
          onSubmit={onSubmit}
          onCancel={() => onOpenChange(false)}
          isSubmitting={isSubmitting}
        />
      </DialogContent>
    </Dialog>
  );
}

