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
import { Input } from "@/components/ui/input";
import { Eye, Trash2, Search, ShoppingCart, Mail, Phone, Calendar, Building2, MoreVertical } from "lucide-react";
import { cn } from "@/lib/utils";
import type { QuoteRequest } from "@/api/orders";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface OrdersTableProps {
  orders: QuoteRequest[];
  isLoading: boolean;
  onViewDetails: (order: QuoteRequest) => void;
  onDelete: (order: QuoteRequest) => void;
}

export function OrdersTable({
  orders,
  isLoading,
  onViewDetails,
  onDelete,
}: OrdersTableProps) {
  const [searchQuery, setSearchQuery] = useState("");

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-500/10 text-yellow-700 dark:text-yellow-400 border-yellow-500/20";
      case "reviewing":
        return "bg-blue-500/10 text-blue-700 dark:text-blue-400 border-blue-500/20";
      case "quoted":
        return "bg-green-500/10 text-green-700 dark:text-green-400 border-green-500/20";
      case "rejected":
        return "bg-red-500/10 text-red-700 dark:text-red-400 border-red-500/20";
      case "completed":
        return "bg-purple-500/10 text-purple-700 dark:text-purple-400 border-purple-500/20";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const filteredOrders = orders.filter((order) => {
    if (!searchQuery) return true;
    const query = searchQuery.toLowerCase();
    return (
      order.fullName.toLowerCase().includes(query) ||
      order.email.toLowerCase().includes(query) ||
      order.productServiceInterest.toLowerCase().includes(query) ||
      (order.companyName && order.companyName.toLowerCase().includes(query)) ||
      order.status.toLowerCase().includes(query)
    );
  });

  if (isLoading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-12 w-full max-w-md rounded-xl" />
        <div className="hidden md:block rounded-xl bg-muted/20 p-3 space-y-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <Skeleton key={i} className="h-12 w-full rounded-lg" />
          ))}
        </div>
        <div className="md:hidden space-y-2">
          {Array.from({ length: 3 }).map((_, i) => (
            <Skeleton key={i} className="h-48 w-full rounded-xl" />
          ))}
        </div>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="text-center py-12 sm:py-20">
        <div className="mx-auto w-16 h-16 sm:w-20 sm:h-20 rounded-xl sm:rounded-2xl bg-muted/30 flex items-center justify-center mb-4 sm:mb-6">
          <ShoppingCart className="size-8 sm:size-10 text-muted-foreground" />
        </div>
        <h3 className="text-lg sm:text-xl font-semibold mb-2">No quote requests found</h3>
        <p className="text-sm sm:text-base text-muted-foreground px-4">
          Quote requests will appear here once customers submit them.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3 sm:space-y-4 min-w-0 max-w-full overflow-x-hidden">
      {/* Search */}
      <div className="relative w-full min-w-0">
        <Input
          type="text"
          placeholder="Search by name, email, product/service, or company..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-9 h-10 rounded-lg bg-background border-border min-w-0 text-sm"
        />
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground shrink-0" />
      </div>

      {/* Mobile View - Cards */}
      <div className="md:hidden space-y-2">
        {filteredOrders.map((order) => (
          <div
            key={order.id}
            className="rounded-lg bg-card border border-border p-3 space-y-2.5 min-w-0"
          >
            <div className="flex items-start justify-between gap-2 min-w-0">
              <div className="space-y-0.5 min-w-0 flex-1">
                <h3 className="font-semibold text-sm truncate">{order.fullName}</h3>
                <p className="text-xs text-muted-foreground truncate">{order.email}</p>
              </div>
              <Badge className={cn("shrink-0 text-[10px] px-1.5 py-0.5", getStatusColor(order.status))}>
                {order.status}
              </Badge>
            </div>

            <div className="space-y-1.5 text-xs min-w-0">
              <div className="flex items-center gap-1.5 text-muted-foreground min-w-0">
                <ShoppingCart className="size-3 shrink-0" />
                <span className="truncate text-xs">{order.productServiceInterest}</span>
              </div>
              {order.phone && (
                <div className="flex items-center gap-1.5 text-muted-foreground min-w-0">
                  <Phone className="size-3 shrink-0" />
                  <span className="truncate text-xs">{order.phone}</span>
                </div>
              )}
              {order.companyName && (
                <div className="flex items-center gap-1.5 text-muted-foreground min-w-0">
                  <Building2 className="size-3 shrink-0" />
                  <span className="truncate text-xs">{order.companyName}</span>
                </div>
              )}
              <div className="flex items-center gap-1.5 text-muted-foreground min-w-0">
                <Calendar className="size-3 shrink-0" />
                <span className="truncate text-xs">{formatDate(order.createdAt)}</span>
              </div>
            </div>

            <div className="flex items-center gap-2 pt-2 border-t border-border">
              <Button
                variant="outline"
                size="sm"
                onClick={() => onViewDetails(order)}
                className="flex-1 text-xs h-8"
              >
                <Eye className="size-3 mr-1" />
                View
              </Button>
              <Button
                variant="destructive"
                size="sm"
                onClick={() => onDelete(order)}
                className="flex-1 text-xs h-8"
              >
                <Trash2 className="size-3 mr-1" />
                Delete
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* Desktop View */}
      <div className="hidden md:block rounded-lg bg-muted/20 p-3 backdrop-blur-sm overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="border-border/50 hover:bg-transparent">
              <TableHead className="w-[50px] h-10 text-xs font-medium">ID</TableHead>
              <TableHead className="h-10 text-xs font-medium">Name</TableHead>
              <TableHead className="h-10 text-xs font-medium">Email</TableHead>
              <TableHead className="h-10 text-xs font-medium">Product/Service</TableHead>
              <TableHead className="w-[100px] h-10 text-xs font-medium">Status</TableHead>
              <TableHead className="w-[120px] h-10 text-xs font-medium">Date</TableHead>
              <TableHead className="w-[60px] h-10 text-right text-xs font-medium">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredOrders.map((order) => (
              <TableRow key={order.id} className="border-border/50 h-12">
                <TableCell className="font-medium text-xs py-2">{order.id}</TableCell>
                <TableCell className="py-2">
                  <div className="space-y-0.5">
                    <div className="font-medium text-sm">{order.fullName}</div>
                    {order.companyName && (
                      <div className="text-xs text-muted-foreground flex items-center gap-1">
                        <Building2 className="size-3" />
                        <span className="truncate max-w-[150px]">{order.companyName}</span>
                      </div>
                    )}
                  </div>
                </TableCell>
                <TableCell className="py-2">
                  <div className="flex items-center gap-1.5">
                    <Mail className="size-3.5 text-muted-foreground shrink-0" />
                    <span className="text-xs truncate max-w-[180px]">{order.email}</span>
                  </div>
                </TableCell>
                <TableCell className="py-2">
                  <div className="max-w-[200px] truncate text-xs">
                    {order.productServiceInterest}
                  </div>
                </TableCell>
                <TableCell className="py-2">
                  <Badge className={cn("text-[10px] px-1.5 py-0.5", getStatusColor(order.status))}>
                    {order.status}
                  </Badge>
                </TableCell>
                <TableCell className="py-2">
                  <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <Calendar className="size-3 shrink-0" />
                    {formatDate(order.createdAt)}
                  </div>
                </TableCell>
                <TableCell className="text-right py-2">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 w-8 p-0"
                      >
                        <MoreVertical className="size-4" />
                        <span className="sr-only">Open menu</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-40">
                      <DropdownMenuItem onClick={() => onViewDetails(order)}>
                        <Eye className="size-4 mr-2" />
                        View Details
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => onDelete(order)}
                        className="text-destructive focus:text-destructive"
                      >
                        <Trash2 className="size-4 mr-2" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {filteredOrders.length === 0 && searchQuery && (
        <div className="text-center py-8">
          <p className="text-sm text-muted-foreground">No orders found matching your search.</p>
        </div>
      )}
    </div>
  );
}

