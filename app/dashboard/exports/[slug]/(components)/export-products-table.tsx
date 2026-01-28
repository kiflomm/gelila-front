"use client";

import { useState } from "react";
import { Search, Package, Edit, Trash2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Image from "@/components/ui/image";
import { type ExportProduct } from "@/api/exports";

interface ExportProductsTableProps {
  products: ExportProduct[];
  onEdit: (product: ExportProduct) => void;
  onDelete: (product: ExportProduct) => void;
}

export function ExportProductsTable({
  products,
  onEdit,
  onDelete,
}: ExportProductsTableProps) {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredProducts = products.filter((product) => {
    if (!searchQuery) return true;
    const query = searchQuery.toLowerCase();
    return (
      product.name.toLowerCase().includes(query) ||
      product.description.toLowerCase().includes(query)
    );
  });

  if (products.length === 0) {
    return (
      <div className="text-center py-20 bg-card rounded-lg border">
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
    <div className="space-y-6">
      <div className="relative group">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-muted-foreground group-focus-within:text-primary transition-colors z-10" />
        <Input
          placeholder="Search products..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-11 pr-20 h-14 rounded-2xl bg-muted/30 backdrop-blur-sm border-0 shadow-sm focus-visible:ring-2 focus-visible:ring-primary/20 focus-visible:bg-muted/50 transition-all"
        />
        {searchQuery && (
          <div className="absolute right-4 top-1/2 -translate-y-1/2">
            <Badge variant="secondary" className="text-xs bg-background/80 backdrop-blur-sm">
              {filteredProducts.length} result{filteredProducts.length !== 1 ? "s" : ""}
            </Badge>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredProducts.map((product) => (
          <div
            key={product.id}
            className="bg-card rounded-lg border p-4 hover:shadow-md transition-shadow"
          >
            <div className="relative aspect-video w-full bg-muted rounded-md mb-4 overflow-hidden">
              {product.imageUrl ? (
                <Image
                  src={
                    product.imageUrl.startsWith("http")
                      ? product.imageUrl
                      : `${process.env.NEXT_PUBLIC_API_URL?.replace("/api/v1", "") || ""}${product.imageUrl}`
                  }
                  alt={product.imageAlt || product.name}
                  fill
                  className="object-cover"
                  unoptimized
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <Package className="size-12 text-muted-foreground" />
                </div>
              )}
            </div>
            <h3 className="font-semibold mb-2">{product.name}</h3>
            <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
              {product.description}
            </p>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => onEdit(product)}
                className="flex-1"
              >
                <Edit className="size-4 mr-2" />
                Edit
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => onDelete(product)}
                className="flex-1 text-destructive hover:text-destructive"
              >
                <Trash2 className="size-4 mr-2" />
                Delete
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

