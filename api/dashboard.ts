import { axiosProtectedClient } from "@/lib/axios-client";

export interface MonthlyData {
  month: string;
  count: number;
}

export interface StatusDistribution {
  status: string;
  count: number;
}

export interface CategoryDistribution {
  category: string;
  count: number;
}

export interface DepartmentDistribution {
  department: string;
  count: number;
}

export interface RecentActivityItem {
  type: string;
  id: number;
  title: string;
  description: string;
  createdAt: string;
}

export interface DashboardSummary {
  totalOrders: number;
  activeJobs: number;
  publishedNews: number;
  totalApplications: number;
  totalContactMessages: number;
  totalSectors: number;
  totalImports: number;
  totalExports: number;
}

export interface DashboardTrends {
  orders: MonthlyData[];
  news: MonthlyData[];
  jobs: MonthlyData[];
  applications: MonthlyData[];
}

export interface DashboardDistributions {
  ordersByStatus: StatusDistribution[];
  newsByCategory: CategoryDistribution[];
  jobsByDepartment: DepartmentDistribution[];
}

export interface DashboardStatistics {
  summary: DashboardSummary;
  trends: DashboardTrends;
  distributions: DashboardDistributions;
  recentActivity: RecentActivityItem[];
}

export const dashboardApi = {
  getDashboardStatistics: async (): Promise<DashboardStatistics> => {
    const response = await axiosProtectedClient.get("/dashboard/statistics");
    return response.data;
  },
};

