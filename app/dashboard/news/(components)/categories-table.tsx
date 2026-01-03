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
import { Edit, Trash2, Tag, MoreHorizontal } from "lucide-react";
import type { NewsCategory } from "@/api/news";

interface CategoriesTableProps {
  categories: NewsCategory[];
  onEdit: (category: NewsCategory) => void;
  onDelete: (category: NewsCategory) => void;
}

export function CategoriesTable({
  categories,
  onEdit,
  onDelete,
}: CategoriesTableProps) {
  if (categories.length === 0) {
    return (
      <>
        {/* Mobile Empty State */}
        <div className="md:hidden text-center py-16 rounded-2xl bg-muted/20 backdrop-blur-sm">
          <div className="flex flex-col items-center gap-3">
            <div className="w-16 h-16 rounded-full bg-muted/50 flex items-center justify-center">
              <Tag className="size-6 text-muted-foreground/50" />
            </div>
            <p className="text-muted-foreground font-medium">
              No categories found
            </p>
            <p className="text-sm text-muted-foreground">
              Create your first category!
            </p>
          </div>
        </div>

        {/* Desktop Empty State */}
        <div className="hidden md:block rounded-2xl bg-muted/20 backdrop-blur-sm overflow-hidden shadow-sm w-full">
          <div className="overflow-x-auto w-full">
            <Table className="w-full table-fixed">
              <TableHeader>
                <TableRow className="border-0 hover:bg-transparent">
                  <TableHead className="font-semibold text-muted-foreground h-12 bg-muted/30 w-[25%]">
                    <span className="text-xs">Name</span>
                  </TableHead>
                  <TableHead className="font-semibold text-muted-foreground h-12 bg-muted/30 w-[20%]">
                    <span className="text-xs">Slug</span>
                  </TableHead>
                  <TableHead className="font-semibold text-muted-foreground h-12 bg-muted/30 w-[40%]">
                    <span className="text-xs">Description</span>
                  </TableHead>
                  <TableHead className="text-right font-semibold text-muted-foreground h-12 bg-muted/30 w-[15%]">
                    <span className="text-xs">Actions</span>
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow className="border-0 hover:bg-transparent">
                  <TableCell colSpan={4} className="text-center py-16 border-0">
                    <p className="text-muted-foreground">
                      No categories found. Create your first category!
                    </p>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      {/* Mobile Card View */}
      <div className="md:hidden space-y-3">
        {categories.map((category) => (
          <div
            key={category.id}
            className="rounded-2xl bg-card border border-border/50 p-5 shadow-sm hover:shadow-md transition-all hover:border-primary/30"
          >
            <div className="flex items-start justify-between gap-3 mb-4">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-2">
                  <Badge variant="secondary" className="text-sm">
                    {category.name}
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground font-mono mb-2">
                  {category.slug}
                </p>
                {category.description && (
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {category.description}
                  </p>
                )}
              </div>
            </div>

            <div className="flex gap-2 pt-3 border-t border-border/50">
              <Button
                variant="outline"
                size="sm"
                onClick={() => onEdit(category)}
                className="flex-1 h-9 hover:bg-primary/10 hover:text-primary hover:border-primary/30 transition-colors"
              >
                <Edit className="size-4 mr-2" />
                Edit
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => onDelete(category)}
                className="flex-1 h-9 hover:bg-destructive/10 hover:text-destructive hover:border-destructive/30 transition-colors"
              >
                <Trash2 className="size-4 mr-2" />
                Delete
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* Desktop Table View */}
      <div className="hidden md:block rounded-2xl bg-muted/20 backdrop-blur-sm overflow-hidden shadow-sm w-full">
        <div className="overflow-x-auto w-full">
          <Table className="w-full table-fixed">
            <TableHeader>
              <TableRow className="border-0 hover:bg-transparent">
                <TableHead className="font-semibold text-muted-foreground h-12 bg-muted/30 w-[25%]">
                  <span className="text-xs">Name</span>
                </TableHead>
                <TableHead className="font-semibold text-muted-foreground h-12 bg-muted/30 w-[20%]">
                  <span className="text-xs">Slug</span>
                </TableHead>
                <TableHead className="font-semibold text-muted-foreground h-12 bg-muted/30 w-[40%]">
                  <span className="text-xs">Description</span>
                </TableHead>
                <TableHead className="text-right font-semibold text-muted-foreground h-12 bg-muted/30 w-[15%]">
                  <span className="text-xs">Actions</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {categories.map((category) => (
                <TableRow
                  key={category.id}
                  className="border-0 hover:bg-muted/30 transition-colors"
                >
                  <TableCell className="font-medium py-3 overflow-hidden">
                    <Badge variant="secondary" className="text-xs">
                      {category.name}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-xs text-muted-foreground font-mono py-3 overflow-hidden">
                    <span className="truncate block">{category.slug}</span>
                  </TableCell>
                  <TableCell className="text-xs text-muted-foreground py-3 overflow-hidden">
                    <span className="truncate block">
                      {category.description || "-"}
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
                            onClick={() => onEdit(category)}
                            className="cursor-pointer"
                          >
                            <Edit className="size-4 mr-2" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => onDelete(category)}
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
    </>
  );
}






