import { axiosProtectedClient } from "@/lib/axios-client";

export interface PortfolioSector {
  id: string;
  title: string;
  description: string;
  image: string;
  alt: string;
}

export interface PortfolioData {
  sectors: PortfolioSector[];
}

export const portfolioApi = {
  getPortfolio: async (): Promise<PortfolioData> => {
    // In a real app: return axiosClient.get("/portfolio").then(res => res.data);
    const portfolioData = await import("@/data/portfolio.json");
    return portfolioData.default;
  },
};
