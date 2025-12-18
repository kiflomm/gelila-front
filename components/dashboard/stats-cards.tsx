"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ShoppingCart,
  Briefcase,
  Newspaper,
  Users,
} from "lucide-react";
import { useDashboardStats } from "@/hooks/use-dashboard";

interface StatCardProps {
  title: string;
  value: string;
  change: number;
  changeLabel?: string;
  icon?: React.ComponentType<{ className?: string }>;
  trend?: "up" | "down";
}

export function StatCard({
  title,
  value,
  change,
  changeLabel,
  icon: Icon,
  trend = "up",
}: StatCardProps) {
  return (
    <Card className="py-2 sm:py-3">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-1 sm:pb-1.5 px-3 sm:px-4 pt-3 sm:pt-4">
        <CardTitle className="text-[10px] sm:text-xs font-medium text-muted-foreground leading-tight">
          {title}
        </CardTitle>
        {Icon && <Icon className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-muted-foreground flex-shrink-0" />}
      </CardHeader>
      <CardContent className="px-3 sm:px-4 pb-3 sm:pb-4">
        <div className="text-lg sm:text-xl font-bold break-words">{value}</div>
      </CardContent>
    </Card>
  );
}

interface StatsCardsProps {
  stats?: Array<{
    title: string;
    value: string;
    change: number;
    changeLabel?: string;
    icon?: React.ComponentType<{ className?: string }>;
    trend?: "up" | "down";
  }>;
}

export function StatsCards({ stats }: StatsCardsProps) {
  const { data, isLoading } = useDashboardStats();

  if (isLoading) {
    return (
      <div className="grid gap-2 sm:gap-3 grid-cols-2 md:grid-cols-2 lg:grid-cols-4">
        {[1, 2, 3, 4].map((i) => (
          <Card key={i} className="py-2 sm:py-3 animate-pulse">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-1 sm:pb-1.5 px-3 sm:px-4 pt-3 sm:pt-4">
              <div className="h-3 w-20 sm:w-24 bg-muted rounded" />
              <div className="h-3 w-3 sm:h-3.5 sm:w-3.5 bg-muted rounded" />
            </CardHeader>
            <CardContent className="px-3 sm:px-4 pb-3 sm:pb-4">
              <div className="h-5 sm:h-6 w-16 sm:w-20 bg-muted rounded" />
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (!data) {
    return null;
  }

  const displayStats = stats || [
    {
      title: "Total Orders",
      value: data.summary.totalOrders.toLocaleString(),
      change: 0,
      changeLabel: "quote requests",
      trend: "up" as const,
      icon: ShoppingCart,
    },
    {
      title: "Active Jobs",
      value: data.summary.activeJobs.toLocaleString(),
      change: 0,
      changeLabel: "open positions",
      trend: "up" as const,
      icon: Briefcase,
    },
    {
      title: "Published News",
      value: data.summary.publishedNews.toLocaleString(),
      change: 0,
      changeLabel: "articles",
      trend: "up" as const,
      icon: Newspaper,
    },
    {
      title: "Total Applications",
      value: data.summary.totalApplications.toLocaleString(),
      change: 0,
      changeLabel: "job applications",
      trend: "up" as const,
      icon: Users,
    },
  ];

  return (
    <div className="grid gap-2 sm:gap-3 grid-cols-2 md:grid-cols-2 lg:grid-cols-4">
      {displayStats.map((stat, index) => (
        <StatCard key={index} {...stat} />
      ))}
    </div>
  );
}
