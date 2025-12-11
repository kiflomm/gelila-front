"use client";

import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import type { JobApplication } from "@/api/jobs";

interface UpdateStatusDialogProps {
  application: JobApplication | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (status: 'pending' | 'reviewing' | 'accepted' | 'rejected') => void;
  isSubmitting?: boolean;
}

export function UpdateStatusDialog({
  application,
  open,
  onOpenChange,
  onSubmit,
  isSubmitting = false,
}: UpdateStatusDialogProps) {
  const [status, setStatus] = useState<'pending' | 'reviewing' | 'accepted' | 'rejected'>(
    application?.status || 'pending'
  );

  // Update status when application changes
  useEffect(() => {
    if (application) {
      setStatus(application.status);
    }
  }, [application]);

  const handleSubmit = () => {
    onSubmit(status);
  };

  if (!application) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[95vw] sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-lg sm:text-xl">Update Application Status</DialogTitle>
          <DialogDescription className="text-sm">
            Update the status for {application.fullName}'s application
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="status">Status</Label>
            <Select
              value={status}
              onValueChange={(value: 'pending' | 'reviewing' | 'accepted' | 'rejected') =>
                setStatus(value)
              }
            >
              <SelectTrigger id="status">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="reviewing">Reviewing</SelectItem>
                <SelectItem value="accepted">Accepted</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="text-sm text-muted-foreground">
            <p className="font-medium mb-1">Application Details:</p>
            <ul className="space-y-1 list-disc list-inside">
              <li>Name: {application.fullName}</li>
              <li>Email: {application.email}</li>
              {application.job && <li>Position: {application.job.title}</li>}
            </ul>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)} disabled={isSubmitting}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={isSubmitting}>
            {isSubmitting ? "Updating..." : "Update Status"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

