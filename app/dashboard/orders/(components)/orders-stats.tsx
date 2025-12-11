"use client";

import { Skeleton } from "@/components/ui/skeleton";

interface OrdersStatsProps {
  stats: {
    total: number;
    pending: number;
    quoted: number;
    completed: number;
  } | null;
  isLoading: boolean;
}

export function OrdersStats({ stats, isLoading }: OrdersStatsProps) {
  if (isLoading) {
    return (
      <div className="grid gap-3 sm:gap-4 grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className="rounded-lg bg-muted/30 p-3 sm:p-4 backdrop-blur-sm"
          >
            <div className="space-y-1.5">
              <Skeleton className="h-3 w-16" />
              <Skeleton className="h-7 w-12" />
              <Skeleton className="h-2.5 w-24" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (!stats) return null;

  return (
    <div className="grid gap-3 sm:gap-4 grid-cols-2 lg:grid-cols-4">
      <div className="rounded-lg bg-muted/30 p-3 sm:p-4 backdrop-blur-sm">
        <div className="space-y-1.5">
          <p className="text-xs sm:text-sm font-medium text-muted-foreground">Total Requests</p>
          <p className="text-2xl sm:text-3xl font-bold">{stats.total}</p>
          <p className="text-[10px] sm:text-xs text-muted-foreground">All quote requests</p>
        </div>
      </div>

      <div className="rounded-lg bg-muted/30 p-3 sm:p-4 backdrop-blur-sm">
        <div className="space-y-1.5">
          <p className="text-xs sm:text-sm font-medium text-muted-foreground">Pending</p>
          <p className="text-2xl sm:text-3xl font-bold">{stats.pending}</p>
          <p className="text-[10px] sm:text-xs text-muted-foreground">Awaiting review</p>
        </div>
      </div>

      <div className="rounded-lg bg-muted/30 p-3 sm:p-4 backdrop-blur-sm">
        <div className="space-y-1.5">
          <p className="text-xs sm:text-sm font-medium text-muted-foreground">Quoted</p>
          <p className="text-2xl sm:text-3xl font-bold">{stats.quoted}</p>
          <p className="text-[10px] sm:text-xs text-muted-foreground">Quotes sent</p>
        </div>
      </div>

      <div className="rounded-lg bg-muted/30 p-3 sm:p-4 backdrop-blur-sm">
        <div className="space-y-1.5">
          <p className="text-xs sm:text-sm font-medium text-muted-foreground">Completed</p>
          <p className="text-2xl sm:text-3xl font-bold">{stats.completed}</p>
          <p className="text-[10px] sm:text-xs text-muted-foreground">Orders completed</p>
        </div>
      </div>
    </div>
  );
}

