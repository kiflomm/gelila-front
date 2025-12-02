"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const recentOrders = [
  {
    id: "PROD-001",
    sector: "Footwear",
    product: "Men's Leather Shoes",
    quantity: "1,200 pairs",
    status: "completed",
    date: "2024-01-15",
  },
  {
    id: "PROD-002",
    sector: "Food Processing",
    product: "Wheat Flour",
    quantity: "50 tons",
    status: "quality-check",
    date: "2024-01-14",
  },
  {
    id: "PROD-003",
    sector: "Bus Assembly",
    product: "Electric Bus",
    quantity: "2 units",
    status: "in-production",
    date: "2024-01-14",
  },
  {
    id: "PROD-004",
    sector: "Textile",
    product: "Cotton Fabric",
    quantity: "800 meters",
    status: "shipped",
    date: "2024-01-13",
  },
  {
    id: "PROD-005",
    sector: "Food Processing",
    product: "Biscuits",
    quantity: "5,000 packs",
    status: "completed",
    date: "2024-01-13",
  },
];

const statusColors = {
  completed: "default",
  "quality-check": "secondary",
  "in-production": "outline",
  shipped: "default",
} as const;

export function RecentActivity() {
  return (
    <Card className="py-3">
      <CardHeader className="px-4 pt-4 pb-2">
        <CardTitle className="text-base">
          Recent Production Activities
        </CardTitle>
        <CardDescription className="text-xs">
          Latest production orders and manufacturing activities.
        </CardDescription>
      </CardHeader>
      <CardContent className="px-4 pb-4">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="h-8 text-xs">Order ID</TableHead>
              <TableHead className="h-8 text-xs">Sector</TableHead>
              <TableHead className="h-8 text-xs">Product</TableHead>
              <TableHead className="h-8 text-xs">Quantity</TableHead>
              <TableHead className="h-8 text-xs">Status</TableHead>
              <TableHead className="h-8 text-xs">Date</TableHead>
              <TableHead className="h-8 text-right text-xs">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {recentOrders.map((order) => (
              <TableRow key={order.id} className="h-10">
                <TableCell className="text-xs font-medium py-2">
                  {order.id}
                </TableCell>
                <TableCell className="text-xs py-2">{order.sector}</TableCell>
                <TableCell className="text-xs py-2">{order.product}</TableCell>
                <TableCell className="text-xs py-2">{order.quantity}</TableCell>
                <TableCell className="py-2">
                  <Badge
                    variant={
                      statusColors[order.status as keyof typeof statusColors]
                    }
                    className="text-[10px] px-1.5 py-0"
                  >
                    {order.status
                      .split("-")
                      .map(
                        (word) => word.charAt(0).toUpperCase() + word.slice(1)
                      )
                      .join(" ")}
                  </Badge>
                </TableCell>
                <TableCell className="text-xs py-2">{order.date}</TableCell>
                <TableCell className="text-right py-2">
                  <Button variant="ghost" size="sm" className="h-7 text-xs">
                    View
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
