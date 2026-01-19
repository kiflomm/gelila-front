import { axiosProtectedClient } from "@/lib/axios-client";

export interface ApplicationEmailTemplate {
  id: number;
  templateKey: "confirmation" | "notification" | "accepted" | "rejected";
  name: string;
  subject: string;
  greeting: string;
  body: string;
  closing: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface UpdateApplicationEmailTemplateData {
  name?: string;
  subject?: string;
  greeting?: string;
  body?: string;
  closing?: string;
  isActive?: boolean;
}

export interface PreviewEmailTemplateData {
  sampleData?: Record<string, string | number>;
}

export interface PreviewEmailTemplateResponse {
  subject: string;
  html: string;
  text: string;
}

/**
 * Get all application email templates
 */
export async function getApplicationEmailTemplates(): Promise<ApplicationEmailTemplate[]> {
  const response = await axiosProtectedClient.get<ApplicationEmailTemplate[]>(
    "/careers/application-email-templates"
  );
  return response.data;
}

/**
 * Update an application email template
 */
export async function updateApplicationEmailTemplate(
  templateKey: "confirmation" | "notification" | "accepted" | "rejected",
  data: UpdateApplicationEmailTemplateData
): Promise<ApplicationEmailTemplate> {
  const response = await axiosProtectedClient.patch<ApplicationEmailTemplate>(
    `/careers/application-email-templates/${templateKey}`,
    data
  );
  return response.data;
}

/**
 * Preview an email template with sample data
 */
export async function previewApplicationEmailTemplate(
  templateKey: "confirmation" | "notification" | "accepted" | "rejected",
  data?: PreviewEmailTemplateData
): Promise<PreviewEmailTemplateResponse> {
  const response = await axiosProtectedClient.post<PreviewEmailTemplateResponse>(
    `/careers/application-email-templates/${templateKey}/preview`,
    data || {}
  );
  return response.data;
}

