import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { sectorsApi, type Sector, type Product, type CreateSectorData, type UpdateSectorData, type CreateProductData, type UpdateProductData } from "@/api/sectors";

export function useSectors() {
  return useQuery({
    queryKey: ["sectors"],
    queryFn: () => sectorsApi.getAllSectors(),
  });
}

export function useSectorBySlug(slug: string) {
  return useQuery<Sector>({
    queryKey: ["sectors", slug],
    queryFn: () => sectorsApi.getSectorBySlug(slug),
    enabled: !!slug,
  });
}

// Admin hooks
export function useAdminSectors() {
  return useQuery<Sector[]>({
    queryKey: ["sectors", "admin", "all"],
    queryFn: () => sectorsApi.getAllSectorsForAdmin(),
  });
}

export function useCreateSector() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (data: CreateSectorData) => sectorsApi.createSector(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["sectors"] });
    },
  });
}

export function useUpdateSector() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: UpdateSectorData }) =>
      sectorsApi.updateSector(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["sectors"] });
    },
  });
}

export function useDeleteSector() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (id: number) => sectorsApi.deleteSector(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["sectors"] });
    },
  });
}

export function useCreateProduct() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ sectorId, data }: { sectorId: number; data: CreateProductData }) =>
      sectorsApi.createProduct(sectorId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["sectors"] });
    },
  });
}

export function useUpdateProduct() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ sectorId, productId, data }: { sectorId: number; productId: number; data: UpdateProductData }) =>
      sectorsApi.updateProduct(sectorId, productId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["sectors"] });
    },
  });
}

export function useDeleteProduct() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ sectorId, productId }: { sectorId: number; productId: number }) =>
      sectorsApi.deleteProduct(sectorId, productId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["sectors"] });
    },
  });
}

