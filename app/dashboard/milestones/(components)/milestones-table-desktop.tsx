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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Edit, Trash2, Search, MoreHorizontal } from "lucide-react";
import type { MilestoneItem } from "@/api/milestones";

interface MilestonesTableDesktopProps {
  milestones: MilestoneItem[];
  onEdit: (milestone: MilestoneItem) => void;
  onDelete: (milestone: MilestoneItem) => void;
}

export function MilestonesTableDesktop({
  milestones,
  onEdit,
  onDelete,
}: MilestonesTableDesktopProps) {
  if (milestones.length === 0) {
    return (
      <div className="rounded-2xl bg-muted/20 backdrop-blur-sm overflow-hidden shadow-sm w-full">
        <div className="overflow-x-auto w-full">
          <Table className="w-full table-fixed">
            <TableHeader>
              <TableRow className="border-0 hover:bg-transparent">
                <TableHead className="font-semibold text-muted-foreground h-12 bg-muted/30 w-[10%]">
                  <span className="text-xs">Year</span>
                </TableHead>
                <TableHead className="font-semibold text-muted-foreground h-12 bg-muted/30 w-[20%]">
                  <span className="text-xs">Title</span>
                </TableHead>
                <TableHead className="font-semibold text-muted-foreground h-12 bg-muted/30 w-[50%]">
                  <span className="text-xs">Description</span>
                </TableHead>
                <TableHead className="font-semibold text-muted-foreground h-12 bg-muted/30 w-[10%]">
                  <span className="text-xs">Order</span>
                </TableHead>
                <TableHead className="text-right font-semibold text-muted-foreground h-12 bg-muted/30 w-[10%]">
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
                      No milestones match your search
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
              <TableHead className="font-semibold text-muted-foreground h-12 bg-muted/30 w-[10%]">
                <span className="text-xs">Year</span>
              </TableHead>
              <TableHead className="font-semibold text-muted-foreground h-12 bg-muted/30 w-[20%]">
                <span className="text-xs">Title</span>
              </TableHead>
              <TableHead className="font-semibold text-muted-foreground h-12 bg-muted/30 w-[50%]">
                <span className="text-xs">Description</span>
              </TableHead>
              <TableHead className="font-semibold text-muted-foreground h-12 bg-muted/30 w-[10%]">
                <span className="text-xs">Order</span>
              </TableHead>
              <TableHead className="text-right font-semibold text-muted-foreground h-12 bg-muted/30 w-[10%]">
                <span className="text-xs">Actions</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {milestones.map((item) => (
              <TableRow
                key={item.id}
                className="border-0 hover:bg-muted/30 transition-colors"
              >
                <TableCell className="font-medium py-3">
                  <span className="text-xs font-semibold">
                    {item.year}
                  </span>
                </TableCell>
                <TableCell className="py-3 overflow-hidden">
                  <span className="text-xs font-semibold line-clamp-2 truncate">
                    {item.title}
                  </span>
                </TableCell>
                <TableCell className="py-3 overflow-hidden">
                  <span className="text-xs text-muted-foreground line-clamp-2 truncate">
                    {item.description}
                  </span>
                </TableCell>
                <TableCell className="py-3">
                  <span className="text-xs text-muted-foreground">
                    {item.orderIndex}
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
                          className="cursor-pointer text-destructive focus:text-destructive"
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

