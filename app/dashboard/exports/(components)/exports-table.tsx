"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Edit, Trash2, Search, Globe } from "lucide-react";
import { Input } from "@/components/ui/input";
import { type Export } from "@/api/exports";
import Image from "next/image";

interface ExportsTableProps {
  exports: Export[];
  isLoading: boolean;
  onEdit: (exportItem: Export) => void;
  onDelete: (exportItem: Export) => void;
}

export function ExportsTable({
  exports,
  isLoading,
  onEdit,
  onDelete,
}: ExportsTableProps) {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredExports = exports.filter((exportItem) => {
    if (!searchQuery) return true;
    const query = searchQuery.toLowerCase();
    return (
      exportItem.title.toLowerCase().includes(query) ||
      exportItem.description.toLowerCase().includes(query) ||
      exportItem.destinationRegion.toLowerCase().includes(query) ||
      exportItem.slug.toLowerCase().includes(query)
    );
  });

  const getImageUrl = (imageUrl: string | null | undefined): string => {
    if (!imageUrl) return "";
    if (imageUrl.startsWith('http://') || imageUrl.startsWith('https://')) {
      return imageUrl;
    }
    const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL || '';
    const baseUrl = apiBaseUrl.replace('/api/v1', '').replace(/\/$/, '');
    const cleanImageUrl = imageUrl.startsWith('/') ? imageUrl : `/${imageUrl}`;
    return `${baseUrl}${cleanImageUrl}`;
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-14 w-full max-w-md rounded-2xl" />
        <div className="hidden md:block rounded-2xl bg-muted/20 p-4 space-y-3">
          {Array.from({ length: 5 }).map((_, i) => (
            <Skeleton key={i} className="h-16 w-full rounded-xl" />
          ))}
        </div>
      </div>
    );
  }

  if (exports.length === 0) {
    return (
      <div className="text-center py-20">
        <div className="mx-auto w-20 h-20 rounded-2xl bg-muted/30 flex items-center justify-center mb-6">
          <Globe className="size-10 text-muted-foreground" />
        </div>
        <h3 className="text-xl font-semibold mb-2">No exports found</h3>
        <p className="text-muted-foreground">
          Get started by creating your first export item!
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search exports..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10 rounded-2xl"
        />
      </div>

      <div className="rounded-2xl bg-muted/20 p-4">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Image</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Destination Region</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Slug</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredExports.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8">
                  No exports match your search.
                </TableCell>
              </TableRow>
            ) : (
              filteredExports.map((exportItem) => (
                <TableRow key={exportItem.id}>
                  <TableCell>
                    {exportItem.imageUrl ? (
                      <div className="relative w-16 h-16 rounded-lg overflow-hidden">
                        <Image
                          src={getImageUrl(exportItem.imageUrl)}
                          alt={exportItem.imageAlt || exportItem.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                    ) : (
                      <div className="w-16 h-16 rounded-lg bg-muted flex items-center justify-center">
                        <Globe className="h-6 w-6 text-muted-foreground" />
                      </div>
                    )}
                  </TableCell>
                  <TableCell className="font-medium">
                    <Link
                      href={`/dashboard/exports/${exportItem.slug}`}
                      className="hover:text-primary transition-colors"
                    >
                      {exportItem.title}
                    </Link>
                  </TableCell>
                  <TableCell>{exportItem.destinationRegion}</TableCell>
                  <TableCell>
                    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                      exportItem.status === 'operational' 
                        ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                        : exportItem.status === 'planned'
                        ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                        : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                    }`}>
                      {exportItem.status}
                    </span>
                  </TableCell>
                  <TableCell className="text-muted-foreground font-mono text-sm">
                    {exportItem.slug}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onEdit(exportItem)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onDelete(exportItem)}
                      >
                        <Trash2 className="h-4 w-4 text-destructive" />
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
  );
}

