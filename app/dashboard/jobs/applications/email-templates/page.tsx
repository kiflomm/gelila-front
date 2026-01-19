"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Loader2, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { useApplicationEmailTemplates } from "@/hooks/use-application-email-templates";
import { ApplicationEmailTemplateForm } from "./(components)/application-email-template-form";
import type { ApplicationEmailTemplate } from "@/api/application-email-templates";

const TEMPLATE_DESCRIPTIONS: Record<
  ApplicationEmailTemplate["templateKey"],
  string
> = {
  confirmation: "Sent to applicants when they submit an application",
  notification: "Sent to admin/HR when a new application is received",
  accepted: "Sent to applicants when their application is accepted",
  rejected: "Sent to applicants when their application is rejected",
};

export default function EmailTemplatesPage() {
  const { data: templates, isLoading } = useApplicationEmailTemplates();
  const [editingTemplate, setEditingTemplate] =
    useState<ApplicationEmailTemplate | null>(null);

  if (isLoading) {
    return (
      <div className="flex flex-1 flex-col gap-6 min-w-0 overflow-x-hidden">
        <div className="space-y-1 min-w-0">
          <Skeleton className="h-8 w-64" />
          <Skeleton className="h-4 w-96" />
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-48 w-full" />
          ))}
        </div>
      </div>
    );
  }

  if (editingTemplate) {
    return (
      <ApplicationEmailTemplateForm
        template={editingTemplate}
        onCancel={() => setEditingTemplate(null)}
        onSuccess={() => {
          setEditingTemplate(null);
          toast.success("Email template updated successfully!");
        }}
      />
    );
  }

  return (
    <div className="flex flex-1 flex-col gap-6 min-w-0 overflow-x-hidden">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="space-y-1 min-w-0">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight flex items-center gap-2">
            <Mail className="size-6 sm:size-7 md:size-8" />
            Email Templates
          </h1>
          <p className="text-sm text-muted-foreground">
            Manage email templates sent for job applications
          </p>
        </div>
      </div>

      {/* Templates Grid */}
      <div className="grid gap-4 md:grid-cols-2">
        {templates?.map((template) => (
          <div
            key={template.id}
            className="bg-card rounded-lg border p-6 space-y-4"
          >
            <div className="flex items-start justify-between">
              <div className="space-y-1">
                <h3 className="text-lg font-semibold">{template.name}</h3>
                <p className="text-sm text-muted-foreground">
                  {TEMPLATE_DESCRIPTIONS[template.templateKey]}
                </p>
              </div>
              <Badge variant={template.isActive ? "default" : "secondary"}>
                {template.isActive ? "Active" : "Inactive"}
              </Badge>
            </div>

            <div className="space-y-2">
              <div>
                <p className="text-xs font-medium text-muted-foreground">
                  Subject
                </p>
                <p className="text-sm">{template.subject}</p>
              </div>
              <div>
                <p className="text-xs font-medium text-muted-foreground">
                  Preview
                </p>
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {template.greeting} {template.body.substring(0, 100)}...
                </p>
              </div>
            </div>

            <Button
              variant="outline"
              className="w-full"
              onClick={() => setEditingTemplate(template)}
            >
              Edit Template
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}

