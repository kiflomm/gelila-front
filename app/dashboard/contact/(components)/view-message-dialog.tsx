"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Mail, Phone, Calendar, MessageSquare } from "lucide-react";
import type { ContactMessage } from "@/api/contact";

interface ViewMessageDialogProps {
  message: ContactMessage | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ViewMessageDialog({
  message,
  open,
  onOpenChange,
}: ViewMessageDialogProps) {
  if (!message) return null;

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[95vw] sm:max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-lg sm:text-xl">{message.subject}</DialogTitle>
          <DialogDescription className="text-sm">
            Contact message from {message.name}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Contact Information */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold">Contact Information</h3>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <span className="font-medium min-w-[80px]">Name:</span>
                <span>{message.name}</span>
              </div>
              {message.email && (
                <div className="flex items-center gap-2">
                  <Mail className="size-4 text-muted-foreground" />
                  <span className="font-medium min-w-[80px]">Email:</span>
                  <a
                    href={`mailto:${message.email}`}
                    className="text-primary hover:underline"
                  >
                    {message.email}
                  </a>
                </div>
              )}
              <div className="flex items-center gap-2">
                <Phone className="size-4 text-muted-foreground" />
                <span className="font-medium min-w-[80px]">Phone:</span>
                <a
                  href={`tel:${message.phone}`}
                  className="text-primary hover:underline"
                >
                  {message.phone}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="size-4 text-muted-foreground" />
                <span className="font-medium min-w-[80px]">Date:</span>
                <span>{formatDate(message.createdAt)}</span>
              </div>
            </div>
          </div>

          {/* Message Content */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <MessageSquare className="size-4 text-muted-foreground" />
              <h3 className="text-sm font-semibold">Message</h3>
            </div>
            <div className="rounded-lg bg-muted/30 p-4 text-sm whitespace-pre-wrap">
              {message.message}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}












