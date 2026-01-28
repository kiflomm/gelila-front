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
import { Edit, Trash2, Search, MoreHorizontal, User } from "lucide-react";
import type { LeadershipItem } from "@/api/leadership";
import Image from "@/components/ui/image";

interface LeadershipTableDesktopProps {
  leadership: LeadershipItem[];
  onEdit: (leadership: LeadershipItem) => void;
  onDelete: (leadership: LeadershipItem) => void;
}

function getImageUrl(photoUrl: string | null | undefined): string {
  if (!photoUrl) return '';
  if (photoUrl.startsWith('http://') || photoUrl.startsWith('https://')) {
    return photoUrl;
  }
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL || '';
  if (photoUrl.startsWith('/uploads')) {
    return `${apiBaseUrl.replace('/api/v1', '')}${photoUrl}`;
  }
  return photoUrl.startsWith('/') ? `${apiBaseUrl}${photoUrl}` : `${apiBaseUrl}/${photoUrl}`;
}

export function LeadershipTableDesktop({
  leadership,
  onEdit,
  onDelete,
}: LeadershipTableDesktopProps) {
  if (leadership.length === 0) {
    return (
      <div className="rounded-2xl bg-muted/20 backdrop-blur-sm overflow-hidden shadow-sm w-full">
        <div className="overflow-x-auto w-full">
          <Table className="w-full table-fixed">
            <TableHeader>
              <TableRow className="border-0 hover:bg-transparent">
                <TableHead className="font-semibold text-muted-foreground h-12 bg-muted/30 w-[15%]">
                  <span className="text-xs">Photo</span>
                </TableHead>
                <TableHead className="font-semibold text-muted-foreground h-12 bg-muted/30 w-[25%]">
                  <span className="text-xs">Full Name</span>
                </TableHead>
                <TableHead className="font-semibold text-muted-foreground h-12 bg-muted/30 w-[25%]">
                  <span className="text-xs">Official Title</span>
                </TableHead>
                <TableHead className="font-semibold text-muted-foreground h-12 bg-muted/30 w-[30%]">
                  <span className="text-xs">Bio</span>
                </TableHead>
                <TableHead className="text-right font-semibold text-muted-foreground h-12 bg-muted/30 w-[5%]">
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
                      No leadership persons match your search
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
              <TableHead className="font-semibold text-muted-foreground h-12 bg-muted/30 w-[15%]">
                <span className="text-xs">Photo</span>
              </TableHead>
              <TableHead className="font-semibold text-muted-foreground h-12 bg-muted/30 w-[25%]">
                <span className="text-xs">Full Name</span>
              </TableHead>
              <TableHead className="font-semibold text-muted-foreground h-12 bg-muted/30 w-[25%]">
                <span className="text-xs">Official Title</span>
              </TableHead>
              <TableHead className="font-semibold text-muted-foreground h-12 bg-muted/30 w-[30%]">
                <span className="text-xs">Bio</span>
              </TableHead>
              <TableHead className="text-right font-semibold text-muted-foreground h-12 bg-muted/30 w-[5%]">
                <span className="text-xs">Actions</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {leadership.map((item) => (
              <TableRow
                key={item.id}
                className="border-0 hover:bg-muted/30 transition-colors"
              >
                <TableCell className="py-3">
                  <div className="relative w-12 h-12 rounded-full overflow-hidden bg-muted flex items-center justify-center">
                    {item.photoUrl ? (
                      <Image
                        src={getImageUrl(item.photoUrl)}
                        alt={item.photoAlt || item.fullName}
                        fill
                        className="object-cover"
                        unoptimized={
                          getImageUrl(item.photoUrl).includes("localhost") ||
                          getImageUrl(item.photoUrl).includes("api.gelilamanufacturingplc.com")
                        }
                        onError={(e) => {
                          const target = e.currentTarget as HTMLImageElement;
                          target.style.display = "none";
                          const parent = target.parentElement;
                          if (parent) {
                            const fallback = parent.querySelector(".photo-fallback");
                            if (fallback) (fallback as HTMLElement).style.display = "flex";
                          }
                        }}
                      />
                    ) : null}
                    <div className={`photo-fallback absolute inset-0 flex items-center justify-center ${item.photoUrl ? 'hidden' : ''}`}>
                      <User className="size-6 text-muted-foreground" />
                    </div>
                  </div>
                </TableCell>
                <TableCell className="font-medium py-3 overflow-hidden">
                  <span className="text-xs font-semibold line-clamp-2 leading-tight truncate">
                    {item.fullName}
                  </span>
                </TableCell>
                <TableCell className="py-3 overflow-hidden">
                  <span className="text-xs text-muted-foreground line-clamp-2 truncate">
                    {item.officialTitle}
                  </span>
                </TableCell>
                <TableCell className="py-3 overflow-hidden">
                  <span className="text-xs text-muted-foreground line-clamp-2 truncate">
                    {item.bio}
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

