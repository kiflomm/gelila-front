"use client";

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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Edit, Trash2, Search, MoreHorizontal } from "lucide-react";
import type { NewsItem } from "@/api/news";
import { formatDate } from "@/app/news/[slug]/utils";

interface NewsTableDesktopProps {
  news: NewsItem[];
  onEdit: (news: NewsItem) => void;
  onDelete: (news: NewsItem) => void;
}

export function NewsTableDesktop({
  news,
  onEdit,
  onDelete,
}: NewsTableDesktopProps) {
  if (news.length === 0) {
    return (
      <div className="rounded-2xl bg-muted/20 backdrop-blur-sm overflow-hidden shadow-sm w-full">
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
                <TableHead className="text-right font-semibold text-muted-foreground h-12 bg-muted/30 w-[20%] sm:w-[15%]">
                  <span className="text-xs">Actions</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow className="border-0 hover:bg-transparent">
                <TableCell colSpan={5} className="text-center py-16 border-0">
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
            </TableBody>
          </Table>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-2xl bg-muted/20 backdrop-blur-sm overflow-hidden shadow-sm w-full">
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
                <TableHead className="text-right font-semibold text-muted-foreground h-12 bg-muted/30 w-[20%] sm:w-[15%]">
                  <span className="text-xs">Actions</span>
                </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {news.map((item) => (
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
                <TableCell className="text-right py-3">
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
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}












