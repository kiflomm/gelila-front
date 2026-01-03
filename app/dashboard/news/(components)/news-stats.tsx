"use client";

import { Skeleton } from "@/components/ui/skeleton";

interface NewsStatsProps {
  stats: {
    total: number;
    published: number;
    drafts: number;
    categories: number;
  } | null;
  isLoading: boolean;
}

export function NewsStats({ stats, isLoading }: NewsStatsProps) {
  if (isLoading) {
    return (
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className="rounded-2xl bg-muted/30 p-6 backdrop-blur-sm border border-border/50"
          >
            <div className="space-y-3">
              <Skeleton className="h-4 w-24 rounded-md" />
              <Skeleton className="h-9 w-16 rounded-md" />
              <Skeleton className="h-3 w-32 rounded-md" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (!stats) return null;

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
      <div className="rounded-2xl bg-muted/30 p-6 backdrop-blur-sm">
        <div className="space-y-2">
          <p className="text-sm font-medium text-muted-foreground">Total Articles</p>
          <p className="text-3xl font-bold">{stats.total}</p>
          <p className="text-xs text-muted-foreground">All news articles</p>
        </div>
      </div>

      <div className="rounded-2xl bg-muted/30 p-6 backdrop-blur-sm">
        <div className="space-y-2">
          <p className="text-sm font-medium text-muted-foreground">Published</p>
          <p className="text-3xl font-bold">{stats.published}</p>
          <p className="text-xs text-muted-foreground">Currently visible on news page</p>
        </div>
      </div>

      <div className="rounded-2xl bg-muted/30 p-6 backdrop-blur-sm">
        <div className="space-y-2">
          <p className="text-sm font-medium text-muted-foreground">Drafts</p>
          <p className="text-3xl font-bold">{stats.drafts}</p>
          <p className="text-xs text-muted-foreground">Unpublished articles</p>
        </div>
      </div>

      <div className="rounded-2xl bg-muted/30 p-6 backdrop-blur-sm">
        <div className="space-y-2">
          <p className="text-sm font-medium text-muted-foreground">Categories</p>
          <p className="text-3xl font-bold">{stats.categories}</p>
          <p className="text-xs text-muted-foreground">Unique categories</p>
        </div>
      </div>
    </div>
  );
}










