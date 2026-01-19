"use client";

import { useState } from "react";
import { X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { usePreviewApplicationEmailTemplate } from "@/hooks/use-application-email-templates";
import type { ApplicationEmailTemplate } from "@/api/application-email-templates";

interface ApplicationEmailTemplatePreviewProps {
  template: ApplicationEmailTemplate;
  formValues: {
    name: string;
    subject: string;
    greeting: string;
    body: string;
    closing: string;
    isActive: boolean;
  };
  onClose: () => void;
}

export function ApplicationEmailTemplatePreview({
  template,
  formValues,
  onClose,
}: ApplicationEmailTemplatePreviewProps) {
  const [previewMode, setPreviewMode] = useState<"html" | "text">("html");
  const previewMutation = usePreviewApplicationEmailTemplate();

  // Generate sample data based on template type
  const getSampleData = () => {
    const baseData: Record<string, string | number> = {
      fullName: "John Doe",
      jobTitle: "Software Engineer",
      applicantName: "Jane Smith",
      applicantEmail: "jane@example.com",
      applicantPhone: "+251911234567",
      applicationId: 123,
    };

    // Filter to only include variables that might be in the template
    const allVars = [
      "fullName",
      "jobTitle",
      "applicantName",
      "applicantEmail",
      "applicantPhone",
      "applicationId",
    ];
    return Object.fromEntries(
      Object.entries(baseData).filter(([key]) => allVars.includes(key))
    );
  };

  const handlePreview = async () => {
    try {
      await previewMutation.mutateAsync({
        templateKey: template.templateKey,
        data: { sampleData: getSampleData() },
      });
    } catch (error: any) {
      console.error("Preview error:", error);
    }
  };

  // Simple variable replacement for preview
  const replaceVariables = (text: string): string => {
    const sampleData = getSampleData();
    let result = text;
    Object.entries(sampleData).forEach(([key, value]) => {
      const pattern = new RegExp(`\\{\\{${key}\\}\\}`, "g");
      result = result.replace(pattern, String(value));
    });
    return result;
  };

  const previewSubject = replaceVariables(formValues.subject);
  const previewGreeting = replaceVariables(formValues.greeting);
  const previewBody = replaceVariables(formValues.body);
  const previewClosing = replaceVariables(formValues.closing);

  const previewHtml = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      ${previewGreeting ? `<p>${previewGreeting}</p>` : ""}
      ${previewBody
        .split("\n")
        .map((para) => (para.trim() ? `<p>${para.trim()}</p>` : ""))
        .join("")}
      ${previewClosing ? `<p>${previewClosing.replace(/\n/g, "<br>")}</p>` : ""}
    </div>
  `;

  const previewText = `
${previewGreeting || ""}

${previewBody}

${previewClosing.replace(/<br\s*\/?>/gi, "\n").replace(/<[^>]+>/g, "")}
  `.trim();

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Email Preview</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* Preview Mode Toggle */}
          <div className="flex items-center gap-2">
            <Button
              variant={previewMode === "html" ? "default" : "outline"}
              size="sm"
              onClick={() => setPreviewMode("html")}
            >
              HTML Preview
            </Button>
            <Button
              variant={previewMode === "text" ? "default" : "outline"}
              size="sm"
              onClick={() => setPreviewMode("text")}
            >
              Plain Text
            </Button>
          </div>

          {/* Subject */}
          <div className="space-y-2">
            <p className="text-sm font-medium">Subject:</p>
            <p className="text-sm bg-muted p-2 rounded">{previewSubject}</p>
          </div>

          {/* Content Preview */}
          <div className="space-y-2">
            <p className="text-sm font-medium">Content:</p>
            {previewMode === "html" ? (
              <div
                className="bg-muted p-4 rounded border min-h-[300px]"
                dangerouslySetInnerHTML={{ __html: previewHtml }}
              />
            ) : (
              <pre className="bg-muted p-4 rounded border min-h-[300px] whitespace-pre-wrap text-sm">
                {previewText}
              </pre>
            )}
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={onClose}>
              Close
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

