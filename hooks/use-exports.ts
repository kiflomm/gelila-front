import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { exportsApi, type Export, type ExportProduct, type CreateExportData, type UpdateExportData, type CreateExportProductData, type UpdateExportProductData } from "@/api/exports";

export function useExports() {
  return useQuery({
    queryKey: ["exports"],
    queryFn: () => exportsApi.getAllExports(),
  });
}

export function useExportBySlug(slug: string) {
  return useQuery({
    queryKey: ["exports", slug],
    queryFn: () => exportsApi.getExportBySlug(slug),
    enabled: !!slug,
  });
}

// Admin hooks
export function useAdminExports() {
  return useQuery({
    queryKey: ["exports", "admin", "all"],
    queryFn: () => exportsApi.getAllExportsForAdmin(),
  });
}

export function useCreateExport() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: CreateExportData) => exportsApi.createExport(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["exports"] });
    },
  });
}

export function useUpdateExport() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: UpdateExportData }) =>
      exportsApi.updateExport(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["exports"] });
    },
  });
}

export function useDeleteExport() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => exportsApi.deleteExport(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["exports"] });
    },
  });
}

export function useCreateExportProduct() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ exportId, data }: { exportId: number; data: CreateExportProductData }) =>
      exportsApi.createExportProduct(exportId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["exports"] });
    },
  });
}

export function useUpdateExportProduct() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ exportId, productId, data }: { exportId: number; productId: number; data: UpdateExportProductData }) =>
      exportsApi.updateExportProduct(exportId, productId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["exports"] });
    },
  });
}

export function useDeleteExportProduct() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ exportId, productId }: { exportId: number; productId: number }) =>
      exportsApi.deleteExportProduct(exportId, productId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["exports"] });
    },
  });
}

