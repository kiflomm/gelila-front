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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Edit, Trash2, Search, FileText, CheckCircle2, XCircle, MoreHorizontal } from "lucide-react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import type { NewsItem } from "@/api/news";
import { formatDate } from "@/app/news/[slug]/utils";

interface NewsTableProps {
  news: NewsItem[];
  isLoading: boolean;
  onEdit: (news: NewsItem) => void;
  onDelete: (news: NewsItem) => void;
}

export function NewsTable({
  news,
  isLoading,
  onEdit,
  onDelete,
}: NewsTableProps) {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredNews = news.filter((item) => {
    if (!searchQuery) return true;
    const query = searchQuery.toLowerCase();
    return (
      item.title.toLowerCase().includes(query) ||
      item.description.toLowerCase().includes(query) ||
      item.category?.name.toLowerCase().includes(query) ||
      item.authorName.toLowerCase().includes(query)
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

  if (news.length === 0) {
    return (
      <div className="text-center py-20">
        <div className="mx-auto w-20 h-20 rounded-2xl bg-muted/30 flex items-center justify-center mb-6">
          <FileText className="size-10 text-muted-foreground" />
        </div>
        <h3 className="text-xl font-semibold mb-2">No news articles found</h3>
        <p className="text-muted-foreground">
          Get started by creating your first news article!
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="relative group">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-muted-foreground group-focus-within:text-primary transition-colors z-10" />
        <Input
          placeholder="Search by title, description, category, or author..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-11 pr-20 h-14 rounded-2xl bg-muted/30 backdrop-blur-sm border-0 shadow-sm focus-visible:ring-2 focus-visible:ring-primary/20 focus-visible:bg-muted/50 transition-all"
        />
        {searchQuery && (
          <div className="absolute right-4 top-1/2 -translate-y-1/2">
            <Badge variant="secondary" className="text-xs bg-background/80 backdrop-blur-sm">
              {filteredNews.length} result{filteredNews.length !== 1 ? "s" : ""}
            </Badge>
          </div>
        )}
      </div>

      {/* Mobile Card View */}
      <div className="md:hidden space-y-3">
        {filteredNews.length === 0 ? (
          <div className="text-center py-16 rounded-2xl bg-muted/20 backdrop-blur-sm">
            <div className="flex flex-col items-center gap-3">
              <div className="w-16 h-16 rounded-full bg-muted/50 flex items-center justify-center">
                <Search className="size-6 text-muted-foreground/50" />
              </div>
              <p className="text-muted-foreground font-medium">
                No news articles match your search
              </p>
              <p className="text-sm text-muted-foreground">
                Try adjusting your search terms
              </p>
            </div>
          </div>
        ) : (
          filteredNews.map((item) => (
            <div
              key={item.id}
              className="rounded-2xl bg-card border border-border/50 p-5 shadow-sm hover:shadow-md transition-all hover:border-primary/30"
            >
              <div className="flex items-start justify-between gap-3 mb-4">
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-base mb-2 line-clamp-2 text-foreground">
                    {item.title}
                  </h3>
                  {item.description && (
                    <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                      {item.description}
                    </p>
                  )}
                  <div className="flex flex-wrap gap-2 mb-3">
                    <Badge variant="secondary" className="text-xs">
                      {item.category?.name || "Uncategorized"}
                    </Badge>
                    <Badge
                      variant={item.isPublished ? "default" : "secondary"}
                      className={cn(
                        "gap-1.5 font-medium border-0 text-xs",
                        item.isPublished
                          ? "bg-green-500/10 text-green-700 dark:text-green-400"
                          : "bg-muted text-muted-foreground"
                      )}
                    >
                      {item.isPublished ? (
                        <>
                          <CheckCircle2 className="size-3" />
                          Published
                        </>
                      ) : (
                        <>
                          <XCircle className="size-3" />
                          Draft
                        </>
                      )}
                    </Badge>
                  </div>
                </div>
              </div>

              <div className="space-y-2.5 mb-4">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <span className="font-medium">Author:</span>
                  <span className="truncate">{item.authorName}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <span className="font-medium">Published:</span>
                  <span className="truncate">
                    {formatDate(item.publishedAt || item.createdAt || "")}
                  </span>
                </div>
              </div>

              <div className="flex gap-2 pt-3 border-t border-border/50">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onEdit(item)}
                  className="flex-1 h-9 hover:bg-primary/10 hover:text-primary hover:border-primary/30 transition-colors"
                >
                  <Edit className="size-4 mr-2" />
                  Edit
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onDelete(item)}
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
      <div className="hidden md:block rounded-2xl bg-muted/20 backdrop-blur-sm overflow-hidden shadow-sm w-full">
        <div className="overflow-x-auto w-full">
          <Table className="w-full table-fixed">
              <TableHeader>
                <TableRow className="border-0 hover:bg-transparent">
                  <TableHead className="font-semibold text-muted-foreground h-12 bg-muted/30 w-[35%] sm:w-[30%]">
                    <span className="text-xs">Title</span>
                  </TableHead>
                  <TableHead className="font-semibold text-muted-foreground h-12 bg-muted/30 w-[20%] sm:w-[15%]">
                    <span className="text-xs">Category</span>
                  </TableHead>
                  <TableHead className="font-semibold text-muted-foreground h-12 bg-muted/30 w-[15%] hidden lg:table-cell">
                    <span className="text-xs">Author</span>
                  </TableHead>
                  <TableHead className="font-semibold text-muted-foreground h-12 bg-muted/30 w-[15%] hidden md:table-cell">
                    <span className="text-xs">Published</span>
                  </TableHead>
                  <TableHead className="font-semibold text-muted-foreground h-12 bg-muted/30 w-[15%] sm:w-[10%]">
                    <span className="text-xs">Status</span>
                  </TableHead>
                  <TableHead className="text-right font-semibold text-muted-foreground h-12 bg-muted/30 w-[20%] sm:w-[15%]">
                    <span className="text-xs">Actions</span>
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredNews.length === 0 ? (
                  <TableRow className="border-0 hover:bg-transparent">
                    <TableCell colSpan={6} className="text-center py-16 border-0">
                      <div className="flex flex-col items-center gap-3">
                        <div className="w-16 h-16 rounded-full bg-muted/50 flex items-center justify-center">
                          <Search className="size-6 text-muted-foreground/50" />
                        </div>
                        <p className="text-muted-foreground font-medium">
                          No news articles match your search
                        </p>
                      </div>
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredNews.map((item) => (
                    <TableRow
                      key={item.id}
                      className="border-0 hover:bg-muted/30 transition-colors"
                    >
                      <TableCell className="font-medium py-3 overflow-hidden">
                        <div className="flex flex-col gap-0.5 min-w-0">
                          <span className="text-xs font-semibold line-clamp-2 leading-tight truncate">
                            {item.title}
                          </span>
                          <span className="text-[10px] text-muted-foreground line-clamp-1 hidden sm:block truncate">
                            {item.description}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell className="py-3 overflow-hidden">
                        <Badge variant="secondary" className="text-[10px] px-1.5 py-0.5">
                          <span className="truncate block">
                            {item.category?.name || "Uncategorized"}
                          </span>
                        </Badge>
                      </TableCell>
                      <TableCell className="text-xs text-muted-foreground py-3 hidden lg:table-cell overflow-hidden">
                        <span className="truncate block">
                          {item.authorName}
                        </span>
                      </TableCell>
                      <TableCell className="text-xs text-muted-foreground py-3 hidden md:table-cell overflow-hidden">
                        <span className="truncate block">
                          {formatDate(item.publishedAt || item.createdAt || "")}
                        </span>
                      </TableCell>
                      <TableCell className="py-3">
                        <Badge
                          variant={item.isPublished ? "default" : "secondary"}
                          className={cn(
                            "gap-1 font-medium border-0 text-[10px] px-1.5 py-0.5",
                            item.isPublished
                              ? "bg-green-500/10 text-green-700 dark:text-green-400"
                              : "bg-muted text-muted-foreground"
                          )}
                        >
                          {item.isPublished ? (
                            <>
                              <CheckCircle2 className="size-2.5" />
                              <span className="hidden sm:inline">Published</span>
                            </>
                          ) : (
                            <>
                              <XCircle className="size-2.5" />
                              <span className="hidden sm:inline">Draft</span>
                            </>
                          )}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right py-3">
                        {/* Mobile: Show buttons */}
                        <div className="flex justify-end gap-1.5 md:hidden">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => onEdit(item)}
                            className="h-7 px-2 hover:bg-primary/10 hover:text-primary hover:border-primary/30"
                          >
                            <Edit className="size-3" />
                            <span className="ml-1 text-xs">Edit</span>
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => onDelete(item)}
                            className="h-7 px-2 hover:bg-destructive/10 hover:text-destructive hover:border-destructive/30"
                          >
                            <Trash2 className="size-3" />
                            <span className="ml-1 text-xs">Delete</span>
                          </Button>
                        </div>
                        {/* Desktop: Show dropdown */}
                        <div className="hidden md:flex justify-end">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-7 w-7 p-0 hover:bg-muted"
                              >
                                <MoreHorizontal className="size-4" />
                                <span className="sr-only">Open menu</span>
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem
                                onClick={() => onEdit(item)}
                                className="cursor-pointer"
                              >
                                <Edit className="size-4 mr-2" />
                                Edit
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() => onDelete(item)}
                                variant="destructive"
                                className="cursor-pointer text-destructive focus:text-destructive focus:bg-destructive/10"
                              >
                                <Trash2 className="size-4 mr-2" />
                                Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
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

