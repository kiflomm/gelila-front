import { useQuery } from "@tanstack/react-query";
import { portfolioApi, type PortfolioData } from "@/api/portfolio";

export function usePortfolio() {
  return useQuery<PortfolioData>({
    queryKey: ["portfolio"],
    queryFn: () => portfolioApi.getPortfolio(),
  });
}
