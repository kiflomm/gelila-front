import { StatsCards } from "@/components/dashboard/stats-cards";
import {
  RevenueChart,
  SalesChart,
} from "@/components/dashboard/dashboard-charts";
import { RecentActivity } from "@/components/dashboard/recent-activity";

export default function DashboardPage() {
  return (
    <div className="flex flex-1 flex-col gap-3">
      <div className="mb-1">
        <h1 className="text-xl sm:text-2xl font-bold tracking-tight">
          Manufacturing Dashboard
        </h1>
        <p className="text-sm text-muted-foreground mt-0.5">
          Overview of production operations, inventory, and manufacturing
          activities across all sectors.
        </p>
      </div>
      <StatsCards />
      <div className="grid gap-3 md:grid-cols-2">
        <RevenueChart />
        <SalesChart />
      </div>
      <RecentActivity />
    </div>
  );
}
