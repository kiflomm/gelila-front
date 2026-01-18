"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useDashboardStats } from "@/hooks/use-dashboard";
import Link from "next/link";

const typeColors = {
  order: "default",
  news: "secondary",
  job: "outline",
  application: "default",
} as const;

const getTypeLabel = (type: string) => {
  const labels: Record<string, string> = {
    order: "Order",
    news: "News",
    job: "Job",
    application: "Application",
  };
  return labels[type] || type;
};

const getTypeUrl = (type: string, id: number) => {
  const urls: Record<string, string> = {
    order: `/dashboard/orders`,
    news: `/dashboard/news`,
    job: `/dashboard/jobs`,
    application: `/dashboard/jobs/applications`,
  };
  return urls[type] || "#";
};

export function RecentActivity() {
  const { data, isLoading } = useDashboardStats();

  if (isLoading) {
    return (
      <Card className="py-2 sm:py-3">
        <CardHeader className="px-3 sm:px-4 pt-3 sm:pt-4 pb-1.5 sm:pb-2">
          <div className="h-3.5 sm:h-4 w-32 sm:w-40 bg-muted rounded animate-pulse mb-1" />
          <div className="h-2.5 sm:h-3 w-48 sm:w-64 bg-muted rounded animate-pulse" />
        </CardHeader>
        <CardContent className="px-3 sm:px-4 pb-3 sm:pb-4">
          <div className="space-y-2">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="h-16 sm:h-10 bg-muted rounded animate-pulse" />
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!data || data.recentActivity.length === 0) {
    return (
      <Card className="py-2 sm:py-3">
        <CardHeader className="px-3 sm:px-4 pt-3 sm:pt-4 pb-1.5 sm:pb-2">
          <CardTitle className="text-sm sm:text-base">Recent Activity</CardTitle>
          <CardDescription className="text-[10px] sm:text-xs">
            Latest activities across all entities.
          </CardDescription>
        </CardHeader>
        <CardContent className="px-3 sm:px-4 pb-3 sm:pb-4">
          <p className="text-xs sm:text-sm text-muted-foreground text-center py-6 sm:py-8">
            No recent activity
          </p>
        </CardContent>
      </Card>
    );
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <Card className="py-2 sm:py-3">
      <CardHeader className="px-3 sm:px-4 pt-3 sm:pt-4 pb-1.5 sm:pb-2">
        <CardTitle className="text-sm sm:text-base">Recent Activity</CardTitle>
        <CardDescription className="text-[10px] sm:text-xs">
          Latest activities across all entities.
        </CardDescription>
      </CardHeader>
      <CardContent className="px-0 sm:px-4 pb-3 sm:pb-4">
        {/* Mobile: Card layout */}
        <div className="block sm:hidden space-y-2 px-3">
          {data.recentActivity.map((activity) => (
            <div
              key={`${activity.type}-${activity.id}`}
              className="border rounded-lg p-3 space-y-2"
            >
              <div className="flex items-center justify-between">
                <Badge
                  variant={
                    typeColors[activity.type as keyof typeof typeColors] ||
                    "default"
                  }
                  className="text-[9px] px-1.5 py-0.5"
                >
                  {getTypeLabel(activity.type)}
                </Badge>
                <span className="text-[10px] text-muted-foreground">
                  {formatDate(activity.createdAt)}
                </span>
              </div>
              <div>
                <h4 className="text-xs font-medium mb-1 line-clamp-1">
                  {activity.title}
                </h4>
                <p className="text-[10px] text-muted-foreground line-clamp-2">
                  {activity.description}
                </p>
              </div>
              <Link href={getTypeUrl(activity.type, activity.id)} className="block">
                <Button variant="ghost" size="sm" className="h-6 text-[10px] w-full">
                  View Details
                </Button>
              </Link>
            </div>
          ))}
        </div>

        {/* Desktop: Table layout */}
        <div className="hidden sm:block overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="h-8 text-xs">Type</TableHead>
                <TableHead className="h-8 text-xs">Title</TableHead>
                <TableHead className="h-8 text-xs">Description</TableHead>
                <TableHead className="h-8 text-xs">Date</TableHead>
                <TableHead className="h-8 text-right text-xs">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.recentActivity.map((activity) => (
                <TableRow key={`${activity.type}-${activity.id}`} className="h-10">
                  <TableCell className="py-2">
                    <Badge
                      variant={
                        typeColors[activity.type as keyof typeof typeColors] ||
                        "default"
                      }
                      className="text-[10px] px-1.5 py-0"
                    >
                      {getTypeLabel(activity.type)}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-xs font-medium py-2">
                    {activity.title}
                  </TableCell>
                  <TableCell className="text-xs py-2 max-w-[120px] overflow-hidden">
                    <span className="truncate block">
                      {activity.description.length > 10
                        ? `${activity.description.substring(0, 10)}...`
                        : activity.description}
                    </span>
                  </TableCell>
                  <TableCell className="text-xs py-2">
                    {formatDate(activity.createdAt)}
                  </TableCell>
                  <TableCell className="text-right py-2">
                    <Link href={getTypeUrl(activity.type, activity.id)}>
                      <Button variant="ghost" size="sm" className="h-7 text-xs">
                        View
                      </Button>
                    </Link>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
