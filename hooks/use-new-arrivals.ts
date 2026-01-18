import { useQuery } from "@tanstack/react-query";
import { sectorsApi, type ProductWithSector } from "@/api/sectors";

export function useNewArrivals(limit: number = 10) {
  return useQuery<ProductWithSector[]>({
    queryKey: ["new-arrivals", limit],
    queryFn: () => sectorsApi.getNewestProducts(limit),
  });
}

