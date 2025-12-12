"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { SectorForm } from "./sector-form";
import type { Sector, UpdateSectorData } from "@/api/sectors";

interface EditSectorDialogProps {
  sector: Sector;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: UpdateSectorData) => Promise<void>;
  isSubmitting?: boolean;
}

export function EditSectorDialog({
  sector,
  open,
  onOpenChange,
  onSubmit,
  isSubmitting = false,
}: EditSectorDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[calc(100%-2rem)] sm:max-w-3xl md:max-w-5xl max-h-[90vh] overflow-y-auto overflow-x-hidden">
        <DialogHeader>
          <DialogTitle>Edit Sector</DialogTitle>
          <DialogDescription>
            Update the sector information. All changes will be reflected on the sectors page.
          </DialogDescription>
        </DialogHeader>
        <SectorForm
          sector={sector}
          onSubmit={onSubmit}
          onCancel={() => onOpenChange(false)}
          isSubmitting={isSubmitting}
        />
      </DialogContent>
    </Dialog>
  );
}

