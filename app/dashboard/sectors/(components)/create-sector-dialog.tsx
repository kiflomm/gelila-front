"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { SectorForm } from "./sector-form";
import type { CreateSectorData, UpdateSectorData } from "@/api/sectors";

interface CreateSectorDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: CreateSectorData | UpdateSectorData) => Promise<void>;
  isSubmitting?: boolean;
}

export function CreateSectorDialog({
  open,
  onOpenChange,
  onSubmit,
  isSubmitting = false,
}: CreateSectorDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[calc(100%-2rem)] sm:max-w-3xl md:max-w-5xl max-h-[90vh] overflow-y-auto overflow-x-hidden">
        <DialogHeader>
          <DialogTitle>Create New Sector</DialogTitle>
          <DialogDescription>
            Add a new sector to the sectors page. Fill in all required fields.
          </DialogDescription>
        </DialogHeader>
        <SectorForm
          onSubmit={onSubmit}
          onCancel={() => onOpenChange(false)}
          isSubmitting={isSubmitting}
        />
      </DialogContent>
    </Dialog>
  );
}

