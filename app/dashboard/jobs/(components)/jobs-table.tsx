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
import { Edit, Trash2, Search, MapPin, Building2, Clock, CheckCircle2, XCircle, Briefcase } from "lucide-react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import type { Job } from "@/api/jobs";

interface JobsTableProps {
  jobs: Job[];
  isLoading: boolean;
  onEdit: (job: Job) => void;
  onDelete: (job: Job) => void;
}

export function JobsTable({
  jobs,
  isLoading,
  onEdit,
  onDelete,
}: JobsTableProps) {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredJobs = jobs.filter((job) => {
    if (!searchQuery) return true;
    const query = searchQuery.toLowerCase();
    // Strip HTML from description for search
    const descriptionText = job.description?.replace(/<[^>]*>/g, "").toLowerCase() || "";
    return (
      job.title.toLowerCase().includes(query) ||
      job.department.toLowerCase().includes(query) ||
      job.location.toLowerCase().includes(query) ||
      job.type.toLowerCase().includes(query) ||
      descriptionText.includes(query)
    );
  });

  if (isLoading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-14 w-full max-w-md rounded-2xl" />
        {/* Mobile skeleton */}
        <div className="md:hidden space-y-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <Skeleton key={i} className="h-48 w-full rounded-2xl" />
          ))}
        </div>
        {/* Desktop skeleton */}
        <div className="hidden md:block rounded-2xl bg-muted/20 p-4 space-y-3">
          {Array.from({ length: 5 }).map((_, i) => (
            <Skeleton key={i} className="h-16 w-full rounded-xl" />
          ))}
        </div>
      </div>
    );
  }

  if (jobs.length === 0) {
    return (
      <div className="text-center py-20">
        <div className="mx-auto w-20 h-20 rounded-2xl bg-muted/30 flex items-center justify-center mb-6">
          <Briefcase className="size-10 text-muted-foreground" />
        </div>
        <h3 className="text-xl font-semibold mb-2">No jobs found</h3>
        <p className="text-muted-foreground">
          Get started by creating your first job posting!
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Borderless Search Bar */}
      <div className="relative group">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-muted-foreground group-focus-within:text-primary transition-colors z-10" />
        <Input
          placeholder="Search by title, department, location, or type..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-11 pr-20 h-14 rounded-2xl bg-muted/30 backdrop-blur-sm border-0 shadow-sm focus-visible:ring-2 focus-visible:ring-primary/20 focus-visible:bg-muted/50 transition-all"
        />
        {searchQuery && (
          <div className="absolute right-4 top-1/2 -translate-y-1/2">
            <Badge variant="secondary" className="text-xs bg-background/80 backdrop-blur-sm">
              {filteredJobs.length} result{filteredJobs.length !== 1 ? "s" : ""}
            </Badge>
          </div>
        )}
      </div>

      {/* Mobile Card View */}
      <div className="md:hidden space-y-3">
        {filteredJobs.length === 0 ? (
          <div className="text-center py-16 rounded-2xl bg-muted/20 backdrop-blur-sm">
            <div className="flex flex-col items-center gap-3">
              <div className="w-16 h-16 rounded-full bg-muted/50 flex items-center justify-center">
                <Search className="size-6 text-muted-foreground/50" />
              </div>
              <p className="text-muted-foreground font-medium">
                No jobs match your search
              </p>
              <p className="text-sm text-muted-foreground">
                Try adjusting your search terms
              </p>
            </div>
          </div>
        ) : (
          filteredJobs.map((job) => (
            <div
              key={job.id}
              className="rounded-2xl bg-card border border-border/50 p-5 shadow-sm hover:shadow-md transition-all hover:border-primary/30"
            >
              <div className="flex items-start justify-between gap-3 mb-4">
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-base mb-2 line-clamp-2 text-foreground">
                    {job.title}
                  </h3>
                  <div className="flex flex-wrap gap-2 mb-3">
                    <Badge
                      variant={job.isActive !== false ? "default" : "secondary"}
                      className={cn(
                        "gap-1.5 font-medium border-0 text-xs",
                        job.isActive !== false
                          ? "bg-green-500/10 text-green-700 dark:text-green-400"
                          : "bg-muted text-muted-foreground"
                      )}
                    >
                      {job.isActive !== false ? (
                        <>
                          <CheckCircle2 className="size-3" />
                          Active
                        </>
                      ) : (
                        <>
                          <XCircle className="size-3" />
                          Inactive
                        </>
                      )}
                    </Badge>
                  </div>
                </div>
              </div>

              <div className="space-y-2.5 mb-4">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Building2 className="size-4 shrink-0 text-muted-foreground/70" />
                  <span className="truncate">{job.department}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <MapPin className="size-4 shrink-0 text-muted-foreground/70" />
                  <span className="truncate">{job.location}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Clock className="size-4 shrink-0 text-muted-foreground/70" />
                  <span className="truncate">{job.type}</span>
                </div>
              </div>

              <div className="flex gap-2 pt-3 border-t border-border/50">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onEdit(job)}
                  className="flex-1 h-9 hover:bg-primary/10 hover:text-primary hover:border-primary/30 transition-colors"
                >
                  <Edit className="size-4 mr-2" />
                  Edit
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onDelete(job)}
                  className="flex-1 h-9 hover:bg-destructive/10 hover:text-destructive hover:border-destructive/30 transition-colors"
                >
                  <Trash2 className="size-4 mr-2" />
                  Delete
                </Button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Desktop Table View */}
      <div className="hidden md:block rounded-2xl bg-muted/20 backdrop-blur-sm overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <Table className="min-w-full">
            <TableHeader>
              <TableRow className="border-0 hover:bg-transparent">
                <TableHead className="font-semibold text-muted-foreground h-14 bg-muted/30 min-w-[200px]">
                  <span className="text-xs sm:text-sm">Job Title</span>
                </TableHead>
                <TableHead className="font-semibold text-muted-foreground h-14 bg-muted/30 min-w-[120px]">
                  <div className="flex items-center gap-2">
                    <Building2 className="size-3.5 shrink-0" />
                    <span className="text-xs sm:text-sm">Department</span>
                  </div>
                </TableHead>
                <TableHead className="font-semibold text-muted-foreground h-14 bg-muted/30 min-w-[120px]">
                  <div className="flex items-center gap-2">
                    <MapPin className="size-3.5 shrink-0" />
                    <span className="text-xs sm:text-sm">Location</span>
                  </div>
                </TableHead>
                <TableHead className="font-semibold text-muted-foreground h-14 bg-muted/30 min-w-[100px]">
                  <div className="flex items-center gap-2">
                    <Clock className="size-3.5 shrink-0" />
                    <span className="text-xs sm:text-sm">Type</span>
                  </div>
                </TableHead>
                <TableHead className="font-semibold text-muted-foreground h-14 bg-muted/30 min-w-[100px]">
                  <span className="text-xs sm:text-sm">Status</span>
                </TableHead>
                <TableHead className="text-right font-semibold text-muted-foreground h-14 bg-muted/30 min-w-[160px]">
                  <span className="text-xs sm:text-sm">Actions</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredJobs.length === 0 ? (
                <TableRow className="border-0 hover:bg-transparent">
                  <TableCell colSpan={6} className="text-center py-16 border-0">
                    <div className="flex flex-col items-center gap-3">
                      <div className="w-16 h-16 rounded-full bg-muted/50 flex items-center justify-center">
                        <Search className="size-6 text-muted-foreground/50" />
                      </div>
                      <p className="text-muted-foreground font-medium">
                        No jobs match your search
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Try adjusting your search terms
                      </p>
                    </div>
                  </TableCell>
                </TableRow>
              ) : (
                filteredJobs.map((job, index) => (
                  <TableRow
                    key={job.id}
                    className={cn(
                      "border-0 transition-all hover:bg-muted/40 group",
                      index !== filteredJobs.length - 1 && "border-b border-border/20"
                    )}
                  >
                    <TableCell className="h-16 min-w-[200px] max-w-[300px]">
                      <div className="font-semibold text-sm sm:text-base group-hover:text-primary transition-colors truncate">
                        {job.title}
                      </div>
                    </TableCell>
                    <TableCell className="h-16 min-w-[120px]">
                      <div className="flex items-center gap-2">
                        <Building2 className="size-3.5 text-muted-foreground shrink-0" />
                        <span className="text-sm truncate">{job.department}</span>
                      </div>
                    </TableCell>
                    <TableCell className="h-16 min-w-[120px]">
                      <div className="flex items-center gap-2">
                        <MapPin className="size-3.5 text-muted-foreground shrink-0" />
                        <span className="text-sm truncate">{job.location}</span>
                      </div>
                    </TableCell>
                    <TableCell className="h-16 min-w-[100px]">
                      <div className="flex items-center gap-2">
                        <Clock className="size-3.5 text-muted-foreground shrink-0" />
                        <span className="text-sm truncate">{job.type}</span>
                      </div>
                    </TableCell>
                    <TableCell className="h-16 min-w-[100px]">
                      <Badge
                        variant={job.isActive !== false ? "default" : "secondary"}
                        className={cn(
                          "gap-1.5 font-medium border-0 shrink-0",
                          job.isActive !== false
                            ? "bg-green-500/10 text-green-700 dark:text-green-400"
                            : "bg-muted text-muted-foreground"
                        )}
                      >
                        {job.isActive !== false ? (
                          <>
                            <CheckCircle2 className="size-3" />
                            Active
                          </>
                        ) : (
                          <>
                            <XCircle className="size-3" />
                            Inactive
                          </>
                        )}
                      </Badge>
                    </TableCell>
                    <TableCell className="h-16 min-w-[160px]">
                      <div className="flex justify-end gap-1 sm:gap-2 shrink-0">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => onEdit(job)}
                          className="h-8 px-2 sm:px-3 hover:bg-primary/10 hover:text-primary transition-colors"
                        >
                          <Edit className="size-3.5 sm:mr-1.5" />
                          <span className="hidden sm:inline">Edit</span>
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => onDelete(job)}
                          className="h-8 px-2 sm:px-3 hover:bg-destructive/10 hover:text-destructive transition-colors"
                        >
                          <Trash2 className="size-3.5 sm:mr-1.5" />
                          <span className="hidden sm:inline">Delete</span>
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}

