"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
} from "recharts";
import { useDashboardStats } from "@/hooks/use-dashboard";

const trendsConfig = {
  orders: {
    label: "Orders",
    color: "#f97b06",
  },
  news: {
    label: "News",
    color: "#8b5cf6",
  },
  jobs: {
    label: "Jobs",
    color: "#10b981",
  },
  applications: {
    label: "Applications",
    color: "#3b82f6",
  },
};

export function RevenueChart() {
  const { data, isLoading } = useDashboardStats();

  if (isLoading) {
    return (
      <Card className="py-3">
        <CardHeader className="px-4 pt-4 pb-2">
          <div className="h-4 w-32 bg-muted rounded animate-pulse mb-1" />
          <div className="h-3 w-48 bg-muted rounded animate-pulse" />
        </CardHeader>
        <CardContent className="px-4 pb-4">
          <div className="h-[200px] bg-muted rounded animate-pulse" />
        </CardContent>
      </Card>
    );
  }

  if (!data) {
    return null;
  }

  // Combine orders, news, and jobs trends for the chart
  // Create a map of all unique months
  const allMonths = new Set<string>();
  data.trends.orders.forEach((item) => allMonths.add(item.month));
  data.trends.news.forEach((item) => allMonths.add(item.month));
  data.trends.jobs.forEach((item) => allMonths.add(item.month));

  // Create maps for quick lookup
  const ordersMap = new Map(
    data.trends.orders.map((item) => [item.month, item.count])
  );
  const newsMap = new Map(
    data.trends.news.map((item) => [item.month, item.count])
  );
  const jobsMap = new Map(
    data.trends.jobs.map((item) => [item.month, item.count])
  );

  // Sort months and create chart data
  const sortedMonths = Array.from(allMonths).sort((a, b) => {
    const dateA = new Date(a);
    const dateB = new Date(b);
    return dateA.getTime() - dateB.getTime();
  });

  const chartData = sortedMonths.map((month) => ({
    month,
    orders: ordersMap.get(month) || 0,
    news: newsMap.get(month) || 0,
    jobs: jobsMap.get(month) || 0,
  }));

  const config = {
    orders: trendsConfig.orders,
    news: trendsConfig.news,
    jobs: trendsConfig.jobs,
  };

  return (
    <Card className="py-2 sm:py-3">
      <CardHeader className="px-3 sm:px-4 pt-3 sm:pt-4 pb-1.5 sm:pb-2">
        <CardTitle className="text-sm sm:text-base">Activity Trends</CardTitle>
        <CardDescription className="text-[10px] sm:text-xs">
          Monthly trends for orders, news, and jobs
        </CardDescription>
      </CardHeader>
      <CardContent className="px-2 sm:px-4 pb-3 sm:pb-4 overflow-x-auto">
        <ChartContainer config={config} className="h-[180px] sm:h-[200px] min-w-[300px]">
          <AreaChart
            data={chartData}
            margin={{ top: 5, right: 10, left: -5, bottom: chartData.length > 6 ? 50 : 30 }}
          >
            <defs>
              <linearGradient id="colorOrders" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#f97b06" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#f97b06" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorNews" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorJobs" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10b981" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
            <XAxis
              dataKey="month"
              className="text-[10px] sm:text-xs"
              tickLine={false}
              axisLine={false}
              angle={-45}
              textAnchor="end"
              height={chartData.length > 6 ? 70 : 50}
              interval={chartData.length > 6 ? "preserveStartEnd" : 0}
              tick={{ fontSize: 10 }}
            />
            <YAxis
              className="text-[10px] sm:text-xs"
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => `${value}`}
              width={30}
            />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Area
              type="monotone"
              dataKey="orders"
              stroke="#f97b06"
              fillOpacity={1}
              fill="url(#colorOrders)"
            />
            <Area
              type="monotone"
              dataKey="news"
              stroke="#8b5cf6"
              fillOpacity={1}
              fill="url(#colorNews)"
            />
            <Area
              type="monotone"
              dataKey="jobs"
              stroke="#10b981"
              fillOpacity={1}
              fill="url(#colorJobs)"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}

export function SalesChart() {
  const { data, isLoading } = useDashboardStats();

  if (isLoading) {
    return (
      <Card className="py-3">
        <CardHeader className="px-4 pt-4 pb-2">
          <div className="h-4 w-32 bg-muted rounded animate-pulse mb-1" />
          <div className="h-3 w-48 bg-muted rounded animate-pulse" />
        </CardHeader>
        <CardContent className="px-4 pb-4">
          <div className="h-[200px] bg-muted rounded animate-pulse" />
        </CardContent>
      </Card>
    );
  }

  if (!data) {
    return null;
  }

  // Use orders by status for the bar chart
  const chartData = data.distributions.ordersByStatus.map((item, index) => {
    const colors = ["#f97b06", "#8b5cf6", "#10b981", "#3b82f6", "#ef4444"];
    return {
      name: item.status.charAt(0).toUpperCase() + item.status.slice(1),
      value: item.count,
      fill: colors[index % colors.length],
    };
  });

  return (
    <Card className="py-2 sm:py-3">
      <CardHeader className="px-3 sm:px-4 pt-3 sm:pt-4 pb-1.5 sm:pb-2">
        <CardTitle className="text-sm sm:text-base">Orders by Status</CardTitle>
        <CardDescription className="text-[10px] sm:text-xs">
          Distribution of quote requests by status
        </CardDescription>
      </CardHeader>
      <CardContent className="px-2 sm:px-4 pb-3 sm:pb-4 overflow-x-auto">
        <ChartContainer config={{}} className="h-[180px] sm:h-[200px] min-w-[250px]">
          <BarChart
            data={chartData}
            margin={{ top: 10, right: 10, left: 0, bottom: chartData.length > 4 ? 50 : 30 }}
          >
            <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
            <XAxis
              dataKey="name"
              className="text-[10px] sm:text-xs"
              tickLine={false}
              axisLine={false}
              angle={chartData.length > 4 ? -45 : 0}
              textAnchor={chartData.length > 4 ? "end" : "middle"}
              height={chartData.length > 4 ? 60 : 30}
              tick={{ fontSize: 10 }}
            />
            <YAxis className="text-[10px] sm:text-xs" tickLine={false} axisLine={false} width={30} />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Bar dataKey="value" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
