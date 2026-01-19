"use client";

import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { ArrowLeft, Eye, Save, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import * as z from "zod";
import { useUpdateApplicationEmailTemplate } from "@/hooks/use-application-email-templates";
import { ApplicationEmailTemplatePreview } from "./application-email-template-preview";
import type {
  ApplicationEmailTemplate,
  UpdateApplicationEmailTemplateData,
} from "@/api/application-email-templates";

const TEMPLATE_VARIABLES: Record<
  ApplicationEmailTemplate["templateKey"],
  { name: string; description: string }[]
> = {
  confirmation: [
    { name: "fullName", description: "Applicant's full name" },
    { name: "jobTitle", description: "Job position title" },
  ],
  notification: [
    { name: "jobTitle", description: "Job position title" },
    { name: "applicantName", description: "Applicant's full name" },
    { name: "applicantEmail", description: "Applicant's email address" },
    { name: "applicantPhone", description: "Applicant's phone number" },
    { name: "applicationId", description: "Application ID number" },
  ],
  accepted: [
    { name: "fullName", description: "Applicant's full name" },
    { name: "jobTitle", description: "Job position title" },
  ],
  rejected: [
    { name: "fullName", description: "Applicant's full name" },
    { name: "jobTitle", description: "Job position title" },
  ],
};

const emailTemplateSchema = z.object({
  name: z.string().min(3).max(200),
  subject: z.string().min(5).max(200),
  greeting: z.string().min(3).max(500),
  body: z.string().min(10).max(5000),
  closing: z.string().min(3).max(500),
  isActive: z.boolean(),
});

type EmailTemplateFormData = z.infer<typeof emailTemplateSchema>;

interface ApplicationEmailTemplateFormProps {
  template: ApplicationEmailTemplate;
  onCancel: () => void;
  onSuccess: () => void;
}

export function ApplicationEmailTemplateForm({
  template,
  onCancel,
  onSuccess,
}: ApplicationEmailTemplateFormProps) {
  const [showPreview, setShowPreview] = useState(false);
  const updateMutation = useUpdateApplicationEmailTemplate();
  const variables = TEMPLATE_VARIABLES[template.templateKey];

  const {
    handleSubmit,
    control,
    register,
    watch,
    formState: { errors },
  } = useForm<EmailTemplateFormData>({
    resolver: zodResolver(emailTemplateSchema),
    defaultValues: {
      name: template.name,
      subject: template.subject,
      greeting: template.greeting,
      body: template.body,
      closing: template.closing,
      isActive: template.isActive,
    },
  });

  const formValues = watch();

  // Validate required variables
  const validateVariables = (text: string): string[] => {
    const missing: string[] = [];
    for (const variable of variables) {
      const pattern = new RegExp(`\\{\\{${variable.name}\\}\\}`, "g");
      if (!pattern.test(text)) {
        missing.push(variable.name);
      }
    }
    return missing;
  };

  const onSubmit = async (data: EmailTemplateFormData) => {
    // Validate variables
    const combinedText = `${data.subject} ${data.greeting} ${data.body} ${data.closing}`;
    const missingVariables = validateVariables(combinedText);

    if (missingVariables.length > 0) {
      toast.error("Missing required variables", {
        description: `Please include: ${missingVariables
          .map((v) => `{{${v}}}`)
          .join(", ")}`,
      });
      return;
    }

    try {
      const updateData: UpdateApplicationEmailTemplateData = {
        name: data.name,
        subject: data.subject,
        greeting: data.greeting,
        body: data.body,
        closing: data.closing,
        isActive: data.isActive,
      };

      await updateMutation.mutateAsync({
        templateKey: template.templateKey,
        data: updateData,
      });

      onSuccess();
    } catch (error: any) {
      toast.error("Failed to update email template", {
        description: error.response?.data?.message || error.message,
      });
    }
  };

  return (
    <div className="flex flex-1 flex-col gap-6 min-w-0 overflow-x-hidden">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={onCancel}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div className="space-y-1">
          <h1 className="text-2xl sm:text-3xl font-bold">Edit Email Template</h1>
          <p className="text-sm text-muted-foreground">{template.name}</p>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Variable Reference */}
        <div className="bg-muted/50 rounded-lg p-4 space-y-2">
          <h3 className="text-sm font-semibold">Available Variables</h3>
          <p className="text-xs text-muted-foreground">
            Use these variables in your template (e.g., {`{{${variables[0]?.name}}}`})
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2">
            {variables.map((variable) => (
              <div key={variable.name} className="flex items-start gap-2">
                <code className="text-xs bg-background px-2 py-1 rounded">
                  {`{{${variable.name}}}`}
                </code>
                <span className="text-xs text-muted-foreground">
                  {variable.description}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Form Fields */}
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">
              Template Name <span className="text-destructive">*</span>
            </Label>
            <Input id="name" {...register("name")} />
            {errors.name && (
              <p className="text-sm text-destructive">{errors.name.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="subject">
              Subject <span className="text-destructive">*</span>
            </Label>
            <Input
              id="subject"
              {...register("subject")}
              placeholder="e.g., Application Received: {{jobTitle}}"
            />
            {errors.subject && (
              <p className="text-sm text-destructive">{errors.subject.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="greeting">
              Greeting <span className="text-destructive">*</span>
            </Label>
            <Input
              id="greeting"
              {...register("greeting")}
              placeholder="e.g., Dear {{fullName}},"
            />
            {errors.greeting && (
              <p className="text-sm text-destructive">{errors.greeting.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="body">
              Body <span className="text-destructive">*</span>
            </Label>
            <Textarea
              id="body"
              {...register("body")}
              rows={8}
              placeholder="Enter the main email body content..."
            />
            {errors.body && (
              <p className="text-sm text-destructive">{errors.body.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="closing">
              Closing <span className="text-destructive">*</span>
            </Label>
            <Textarea
              id="closing"
              {...register("closing")}
              rows={3}
              placeholder="e.g., Best regards,<br>Gelila Manufacturing PLC HR Team"
            />
            {errors.closing && (
              <p className="text-sm text-destructive">{errors.closing.message}</p>
            )}
          </div>

          <div className="flex items-center gap-2">
            <Controller
              name="isActive"
              control={control}
              render={({ field }) => (
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              )}
            />
            <Label htmlFor="isActive">Template is active</Label>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => setShowPreview(true)}
          >
            <Eye className="h-4 w-4 mr-2" />
            Preview
          </Button>
          <div className="flex-1" />
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="submit" disabled={updateMutation.isPending}>
            {updateMutation.isPending ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save className="h-4 w-4 mr-2" />
                Save Changes
              </>
            )}
          </Button>
        </div>
      </form>

      {/* Preview Modal */}
      {showPreview && (
        <ApplicationEmailTemplatePreview
          template={template}
          formValues={formValues}
          onClose={() => setShowPreview(false)}
        />
      )}
    </div>
  );
}

