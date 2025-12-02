"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ArrowUpIcon,
  ArrowDownIcon,
  Factory,
  Package,
  ShoppingCart,
  TrendingUp,
} from "lucide-react";
import { cn } from "@/lib/utils";

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
  const isPositive = trend === "up";
  const TrendIcon = isPositive ? ArrowUpIcon : ArrowDownIcon;

  return (
    <Card className="py-3">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-1.5 px-4 pt-4">
        <CardTitle className="text-xs font-medium text-muted-foreground">
          {title}
        </CardTitle>
        {Icon && <Icon className="h-3.5 w-3.5 text-muted-foreground" />}
      </CardHeader>
      <CardContent className="px-4 pb-4">
        <div className="text-xl font-bold">{value}</div>
        <p
          className={cn(
            "text-[10px] flex items-center gap-0.5 mt-0.5",
            isPositive
              ? "text-green-600 dark:text-green-400"
              : "text-red-600 dark:text-red-400"
          )}
        >
          <TrendIcon className="h-2.5 w-2.5" />
          {Math.abs(change)}% {changeLabel || "from last month"}
        </p>
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

const defaultStats = [
  {
    title: "Total Production Units",
    value: "24,580",
    change: 12.5,
    changeLabel: "from last month",
    trend: "up" as const,
    icon: Factory,
  },
  {
    title: "Active Orders",
    value: "342",
    change: 8.2,
    changeLabel: "from last week",
    trend: "up" as const,
    icon: ShoppingCart,
  },
  {
    title: "Inventory Value",
    value: "ETB 12.4M",
    change: 5.8,
    changeLabel: "from last month",
    trend: "up" as const,
    icon: Package,
  },
  {
    title: "Production Efficiency",
    value: "94.2%",
    change: 3.1,
    changeLabel: "from last month",
    trend: "up" as const,
    icon: TrendingUp,
  },
];

export function StatsCards({ stats = defaultStats }: StatsCardsProps) {
  return (
    <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat, index) => (
        <StatCard key={index} {...stat} />
      ))}
    </div>
  );
}
