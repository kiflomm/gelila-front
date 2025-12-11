"use client";

import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Input } from "@/components/ui/input";
import { Eye, Trash2, FileText, Mail, Phone, Calendar, MoreVertical } from "lucide-react";
import { cn } from "@/lib/utils";
import type { JobApplication } from "@/api/jobs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface ApplicationsTableProps {
  applications: JobApplication[];
  isLoading: boolean;
  onUpdateStatus: (application: JobApplication) => void;
  onDelete: (application: JobApplication) => void;
  onViewResume: (application: JobApplication) => void;
}

export function ApplicationsTable({
  applications,
  isLoading,
  onUpdateStatus,
  onDelete,
  onViewResume,
}: ApplicationsTableProps) {
  const [searchQuery, setSearchQuery] = useState("");

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-500/10 text-yellow-700 dark:text-yellow-400 border-yellow-500/20";
      case "reviewing":
        return "bg-blue-500/10 text-blue-700 dark:text-blue-400 border-blue-500/20";
      case "accepted":
        return "bg-green-500/10 text-green-700 dark:text-green-400 border-green-500/20";
      case "rejected":
        return "bg-red-500/10 text-red-700 dark:text-red-400 border-red-500/20";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const filteredApplications = applications.filter((app) => {
    if (!searchQuery) return true;
    const query = searchQuery.toLowerCase();
    return (
      app.fullName.toLowerCase().includes(query) ||
      app.email.toLowerCase().includes(query) ||
      app.phone.toLowerCase().includes(query) ||
      app.job?.title.toLowerCase().includes(query) ||
      app.job?.department.toLowerCase().includes(query) ||
      app.status.toLowerCase().includes(query)
    );
  });

  if (isLoading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-14 w-full max-w-md rounded-2xl" />
        <div className="hidden md:block rounded-2xl bg-muted/20 p-4 space-y-3">
          {Array.from({ length: 5 }).map((_, i) => (
            <Skeleton key={i} className="h-16 w-full rounded-xl" />
          ))}
        </div>
        <div className="md:hidden space-y-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <Skeleton key={i} className="h-64 w-full rounded-2xl" />
          ))}
        </div>
      </div>
    );
  }

  if (applications.length === 0) {
    return (
      <div className="text-center py-12 sm:py-20">
        <div className="mx-auto w-16 h-16 sm:w-20 sm:h-20 rounded-xl sm:rounded-2xl bg-muted/30 flex items-center justify-center mb-4 sm:mb-6">
          <FileText className="size-8 sm:size-10 text-muted-foreground" />
        </div>
        <h3 className="text-lg sm:text-xl font-semibold mb-2">No applications found</h3>
        <p className="text-sm sm:text-base text-muted-foreground px-4">
          Job applications will appear here once candidates start applying.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4 sm:space-y-6 min-w-0 max-w-full overflow-x-hidden">
      {/* Search */}
      <div className="relative w-full min-w-0">
        <Input
          type="text"
          placeholder="Search applications..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-9 sm:pl-10 h-12 sm:h-14 rounded-xl sm:rounded-2xl bg-background border-border min-w-0 text-sm sm:text-base"
        />
        <FileText className="absolute left-3 top-1/2 -translate-y-1/2 size-4 sm:size-5 text-muted-foreground shrink-0" />
      </div>

      {/* Mobile View */}
      <div className="md:hidden space-y-3 sm:space-y-4">
        {filteredApplications.map((app) => (
          <div
            key={app.id}
            className="rounded-xl sm:rounded-2xl bg-muted/20 p-4 sm:p-6 space-y-3 sm:space-y-4 backdrop-blur-sm min-w-0"
          >
            <div className="flex items-start justify-between gap-3 sm:gap-4 min-w-0">
              <div className="space-y-1 min-w-0 flex-1">
                <h3 className="font-semibold text-base sm:text-lg truncate">{app.fullName}</h3>
                <p className="text-xs sm:text-sm text-muted-foreground truncate">{app.email}</p>
              </div>
              <Badge className={cn("shrink-0 text-[10px] xs:text-xs px-1.5 py-0.5", getStatusColor(app.status))}>
                {app.status}
              </Badge>
            </div>

            <div className="space-y-2 text-xs sm:text-sm min-w-0">
              <div className="flex items-center gap-2 text-muted-foreground min-w-0">
                <Phone className="size-3.5 sm:size-4 shrink-0" />
                <span className="truncate">{app.phone}</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground min-w-0">
                <Calendar className="size-3.5 sm:size-4 shrink-0" />
                <span className="truncate">{formatDate(app.createdAt)}</span>
              </div>
              {app.job && (
                <div className="pt-2 border-t border-border min-w-0">
                  <p className="font-medium truncate text-sm sm:text-base">{app.job.title}</p>
                  <p className="text-muted-foreground text-xs truncate">
                    {app.job.department} • {app.job.location}
                  </p>
                </div>
              )}
            </div>

            <div className="flex gap-2 pt-2 border-t border-border">
              <Button
                variant="outline"
                size="sm"
                onClick={() => onUpdateStatus(app)}
                className="flex-1 text-xs sm:text-sm h-8 sm:h-9"
              >
                <span className="hidden xs:inline">Update Status</span>
                <span className="xs:hidden">Update</span>
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => onViewResume(app)}
                className="h-8 sm:h-9 w-9 sm:w-10 p-0"
                title="View Resume"
              >
                <Eye className="size-4" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => onDelete(app)}
                className="h-8 sm:h-9 w-9 sm:w-10 p-0 text-destructive hover:text-destructive"
                title="Delete"
              >
                <Trash2 className="size-4" />
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* Desktop/Tablet Table */}
      <div className="hidden md:block rounded-lg bg-muted/20 p-1 backdrop-blur-sm min-w-0 w-full max-w-full overflow-hidden">
        <Table className="min-w-[800px] lg:min-w-[900px] xl:min-w-full">
          <TableHeader>
            <TableRow className="border-border hover:bg-transparent">
              <TableHead className="font-semibold min-w-[100px] h-7 px-2 py-1 text-[10px] uppercase tracking-wider">Name</TableHead>
              <TableHead className="font-semibold min-w-[160px] h-7 px-2 py-1 text-[10px] uppercase tracking-wider">Contact</TableHead>
              <TableHead className="font-semibold min-w-[180px] h-7 px-2 py-1 text-[10px] uppercase tracking-wider">Job Position</TableHead>
              <TableHead className="font-semibold min-w-[90px] h-7 px-2 py-1 text-[10px] uppercase tracking-wider">Status</TableHead>
              <TableHead className="font-semibold min-w-[90px] h-7 px-2 py-1 text-[10px] uppercase tracking-wider">Applied</TableHead>
              <TableHead className="font-semibold text-right min-w-[60px] h-7 px-2 py-1 text-[10px] uppercase tracking-wider">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredApplications.map((app) => (
              <TableRow
                key={app.id}
                className="border-border hover:bg-muted/40 transition-colors"
              >
                <TableCell className="font-medium min-w-0 px-2 py-1.5">
                  <div className="truncate text-xs">{app.fullName}</div>
                </TableCell>
                <TableCell className="min-w-0 px-2 py-1.5">
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-1 text-[11px] text-muted-foreground min-w-0">
                      <Mail className="size-2.5 shrink-0" />
                      <span className="truncate">{app.email}</span>
                    </div>
                    <div className="flex items-center gap-1 text-[11px] text-muted-foreground min-w-0">
                      <Phone className="size-2.5 shrink-0" />
                      <span className="truncate">{app.phone}</span>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="min-w-0 px-2 py-1.5">
                  {app.job ? (
                    <div className="min-w-0">
                      <div className="font-medium truncate text-xs">{app.job.title}</div>
                      <div className="text-[11px] text-muted-foreground truncate">
                        {app.job.department} • {app.job.location}
                      </div>
                    </div>
                  ) : (
                    <span className="text-muted-foreground text-xs">N/A</span>
                  )}
                </TableCell>
                <TableCell className="min-w-0 px-2 py-1.5">
                  <Badge className={cn("text-[10px] px-1.5 py-0 h-4 leading-4", getStatusColor(app.status))}>
                    {app.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-muted-foreground min-w-0 px-2 py-1.5">
                  <div className="truncate text-[11px]">{formatDate(app.createdAt)}</div>
                </TableCell>
                <TableCell className="text-right min-w-0 px-2 py-1.5">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-6 w-6 p-0"
                      >
                        <MoreVertical className="size-3.5" />
                        <span className="sr-only">Open menu</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => onUpdateStatus(app)}>
                        Update Status
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => onViewResume(app)}>
                        <Eye className="size-4 mr-2" />
                        View Resume
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => onDelete(app)}
                        variant="destructive"
                      >
                        <Trash2 className="size-4 mr-2" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {filteredApplications.length === 0 && searchQuery && (
        <div className="text-center py-8 sm:py-12">
          <p className="text-sm sm:text-base text-muted-foreground px-4">
            No applications found matching "{searchQuery}"
          </p>
        </div>
      )}
    </div>
  );
}

