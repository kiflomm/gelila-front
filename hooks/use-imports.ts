import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { importsApi, type Import, type ImportProduct, type ImportPageConfig, type ImportCommitment, type CreateImportData, type UpdateImportData, type UpdatePageConfigData, type CreateCommitmentData, type UpdateCommitmentData, type CreateImportProductData, type UpdateImportProductData } from "@/api/imports";

export function useImports() {
  return useQuery({
    queryKey: ["imports"],
    queryFn: () => importsApi.getAllImports(),
  });
}

export function useImportBySlug(slug: string) {
  return useQuery({
    queryKey: ["imports", slug],
    queryFn: () => importsApi.getImportBySlug(slug),
    enabled: !!slug,
  });
}

export function usePageConfig() {
  return useQuery({
    queryKey: ["imports", "page-config"],
    queryFn: () => importsApi.getPageConfig(),
  });
}

// Admin hooks
export function useAdminImports() {
  return useQuery({
    queryKey: ["imports", "admin", "all"],
    queryFn: () => importsApi.getAllImportsForAdmin(),
  });
}

export function useCreateImport() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: CreateImportData) => importsApi.createImport(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["imports"] });
    },
  });
}

export function useUpdateImport() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: UpdateImportData }) =>
      importsApi.updateImport(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["imports"] });
    },
  });
}

export function useDeleteImport() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => importsApi.deleteImport(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["imports"] });
    },
  });
}

export function useUpdatePageConfig() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: UpdatePageConfigData) => importsApi.updatePageConfig(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["imports", "page-config"] });
    },
  });
}

export function useCreateCommitment() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: CreateCommitmentData) => importsApi.createCommitment(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["imports", "page-config"] });
    },
  });
}

export function useUpdateCommitment() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: UpdateCommitmentData }) =>
      importsApi.updateCommitment(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["imports", "page-config"] });
    },
  });
}

export function useDeleteCommitment() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => importsApi.deleteCommitment(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["imports", "page-config"] });
    },
  });
}

export function useCreateImportProduct() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ importId, data }: { importId: number; data: CreateImportProductData }) =>
      importsApi.createImportProduct(importId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["imports"] });
    },
  });
}

export function useUpdateImportProduct() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ importId, productId, data }: { importId: number; productId: number; data: UpdateImportProductData }) =>
      importsApi.updateImportProduct(importId, productId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["imports"] });
    },
  });
}

export function useDeleteImportProduct() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ importId, productId }: { importId: number; productId: number }) =>
      importsApi.deleteImportProduct(importId, productId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["imports"] });
    },
  });
}

