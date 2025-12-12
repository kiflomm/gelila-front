import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { sectorsApi, type Sector, type Product, type CreateSectorData, type UpdateSectorData, type CreateProductData, type UpdateProductData } from "@/api/sectors";

export function useSectors() {
  return useQuery<Sector[]>({
    queryKey: ["sectors"],
    queryFn: () => sectorsApi.getSectors(),
  });
}

export function useSectorBySlug(slug: string) {
  return useQuery<Sector>({
    queryKey: ["sectors", slug],
    queryFn: () => sectorsApi.getSectorBySlug(slug),
    enabled: !!slug,
  });
}

export function useProductsBySectorId(sectorId: number | undefined) {
  return useQuery<Product[]>({
    queryKey: ["products", "sector", sectorId],
    queryFn: () => sectorsApi.getProductsBySectorId(sectorId!),
    enabled: !!sectorId,
  });
}

export function useProductById(id: number | undefined) {
  return useQuery<Product>({
    queryKey: ["products", id],
    queryFn: () => sectorsApi.getProductById(id!),
    enabled: !!id,
  });
}

// Admin hooks
export function useAdminSectors() {
  return useQuery<Sector[]>({
    queryKey: ["sectors", "admin", "all"],
    queryFn: () => sectorsApi.getAllSectorsForAdmin(),
  });
}

export function useAdminProducts() {
  return useQuery<Product[]>({
    queryKey: ["products", "admin", "all"],
    queryFn: () => sectorsApi.getAllProductsForAdmin(),
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
    mutationFn: (data: CreateProductData) => sectorsApi.createProduct(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });
}

export function useUpdateProduct() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: UpdateProductData }) =>
      sectorsApi.updateProduct(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });
}

export function useDeleteProduct() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (id: number) => sectorsApi.deleteProduct(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });
}

