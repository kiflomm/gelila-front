"use client";

import { useState } from "react";
import { Search, Package, Edit, Trash2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { Product, Sector } from "@/api/sectors";

interface ProductsTableProps {
  products: Product[];
  sectors: Sector[];
  isLoading: boolean;
  onEdit: (product: Product) => void;
  onDelete: (product: Product) => void;
}

export function ProductsTable({
  products,
  sectors,
  isLoading,
  onEdit,
  onDelete,
}: ProductsTableProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [sectorFilter, setSectorFilter] = useState<string>("all");

  const sectorsMap = new Map(sectors.map((s) => [s.id, s]));

  const filteredProducts = products.filter((product) => {
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      if (
        !product.name.toLowerCase().includes(query) &&
        !product.description.toLowerCase().includes(query)
      ) {
        return false;
      }
    }
    if (sectorFilter !== "all") {
      if (product.sectorId !== parseInt(sectorFilter)) {
        return false;
      }
    }
    return true;
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

  if (products.length === 0) {
    return (
      <div className="text-center py-20">
        <div className="mx-auto w-20 h-20 rounded-2xl bg-muted/30 flex items-center justify-center mb-6">
          <Package className="size-10 text-muted-foreground" />
        </div>
        <h3 className="text-xl font-semibold mb-2">No products found</h3>
        <p className="text-muted-foreground">
          Get started by creating your first product!
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
          <Input
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>
        <Select value={sectorFilter} onValueChange={setSectorFilter}>
          <SelectTrigger className="w-full sm:w-[200px]">
            <SelectValue placeholder="Filter by sector" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Sectors</SelectItem>
            {sectors.map((sector) => (
              <SelectItem key={sector.id} value={sector.id.toString()}>
                {sector.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Sector</TableHead>
              <TableHead>Order</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredProducts.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                  No products found matching your filters.
                </TableCell>
              </TableRow>
            ) : (
              filteredProducts.map((product) => (
                <TableRow key={product.id}>
                  <TableCell className="font-medium">{product.name}</TableCell>
                  <TableCell className="max-w-md truncate">{product.description}</TableCell>
                  <TableCell>{sectorsMap.get(product.sectorId)?.name || "Unknown"}</TableCell>
                  <TableCell>{product.order ?? 0}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => onEdit(product)}
                      >
                        <Edit className="size-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => onDelete(product)}
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

