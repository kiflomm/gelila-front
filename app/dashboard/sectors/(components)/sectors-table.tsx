"use client";

import { useState } from "react";
import { Search, Building2, Edit, Trash2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { Sector } from "@/api/sectors";

interface SectorsTableProps {
  sectors: Sector[];
  isLoading: boolean;
  onEdit: (sector: Sector) => void;
  onDelete: (sector: Sector) => void;
}

export function SectorsTable({
  sectors,
  isLoading,
  onEdit,
  onDelete,
}: SectorsTableProps) {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredSectors = sectors.filter((sector) => {
    if (!searchQuery) return true;
    const query = searchQuery.toLowerCase();
    return (
      sector.name.toLowerCase().includes(query) ||
      sector.title.toLowerCase().includes(query) ||
      sector.location.toLowerCase().includes(query) ||
      sector.status.toLowerCase().includes(query)
    );
  });

  if (isLoading) {
    return (
      <div className="space-y-4">
        <div className="h-10 w-full bg-gray-200 dark:bg-gray-800 rounded animate-pulse" />
        <div className="space-y-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="h-16 w-full bg-gray-200 dark:bg-gray-800 rounded animate-pulse" />
          ))}
        </div>
      </div>
    );
  }

  if (sectors.length === 0) {
    return (
      <div className="text-center py-20">
        <div className="mx-auto w-20 h-20 rounded-2xl bg-muted/30 flex items-center justify-center mb-6">
          <Building2 className="size-10 text-muted-foreground" />
        </div>
        <h3 className="text-xl font-semibold mb-2">No sectors found</h3>
        <p className="text-muted-foreground">
          Get started by creating your first sector!
        </p>
      </div>
    );
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "operational":
        return "bg-green-500/10 text-green-700 dark:text-green-400";
      case "planned":
        return "bg-blue-500/10 text-blue-700 dark:text-blue-400";
      case "project":
        return "bg-yellow-500/10 text-yellow-700 dark:text-yellow-400";
      default:
        return "bg-gray-500/10 text-gray-700 dark:text-gray-400";
    }
  };

  return (
    <div className="space-y-4">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
        <Input
          placeholder="Search sectors..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-9"
        />
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Published</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredSectors.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                  No sectors found matching your search.
                </TableCell>
              </TableRow>
            ) : (
              filteredSectors.map((sector) => (
                <TableRow key={sector.id}>
                  <TableCell className="font-medium">{sector.name}</TableCell>
                  <TableCell>{sector.title}</TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(sector.status)}>
                      {sector.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{sector.location}</TableCell>
                  <TableCell>
                    <Badge variant={sector.isPublished ? "default" : "secondary"}>
                      {sector.isPublished ? "Published" : "Draft"}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => onEdit(sector)}
                      >
                        <Edit className="size-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => onDelete(sector)}
                      >
                        <Trash2 className="size-4 text-destructive" />
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

