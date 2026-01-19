import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getApplicationEmailTemplates,
  updateApplicationEmailTemplate,
  previewApplicationEmailTemplate,
  type ApplicationEmailTemplate,
  type UpdateApplicationEmailTemplateData,
  type PreviewEmailTemplateData,
  type PreviewEmailTemplateResponse,
} from "@/api/application-email-templates";

/**
 * Get all application email templates
 */
export function useApplicationEmailTemplates() {
  return useQuery<ApplicationEmailTemplate[]>({
    queryKey: ["application-email-templates"],
    queryFn: getApplicationEmailTemplates,
  });
}

/**
 * Update an application email template
 */
export function useUpdateApplicationEmailTemplate() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      templateKey,
      data,
    }: {
      templateKey: "confirmation" | "notification" | "accepted" | "rejected";
      data: UpdateApplicationEmailTemplateData;
    }) => updateApplicationEmailTemplate(templateKey, data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["application-email-templates"],
      });
    },
  });
}

/**
 * Preview an email template
 */
export function usePreviewApplicationEmailTemplate() {
  return useMutation({
    mutationFn: ({
      templateKey,
      data,
    }: {
      templateKey: "confirmation" | "notification" | "accepted" | "rejected";
      data?: PreviewEmailTemplateData;
    }) => previewApplicationEmailTemplate(templateKey, data),
  });
}

