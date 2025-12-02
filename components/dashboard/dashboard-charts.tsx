"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
} from "recharts";

const productionData = [
  { month: "January", production: 3200, target: 3500 },
  { month: "February", production: 2800, target: 3500 },
  { month: "March", production: 4100, target: 3500 },
  { month: "April", production: 3600, target: 3500 },
  { month: "May", production: 3800, target: 3500 },
  { month: "June", production: 4200, target: 3500 },
  { month: "July", production: 4500, target: 3500 },
];

const sectorData = [
  { name: "Footwear", value: 12400, fill: "#f97b06" },
  { name: "Food Processing", value: 8900, fill: "#8b5cf6" },
  { name: "Bus Assembly", value: 3200, fill: "#10b981" },
  { name: "Textiles", value: 1080, fill: "#3b82f6" },
];

const productionConfig = {
  production: {
    label: "Production Units",
    color: "#f97b06",
  },
  target: {
    label: "Target",
    color: "#10b981",
  },
};

export function RevenueChart() {
  return (
    <Card className="py-3">
      <CardHeader className="px-4 pt-4 pb-2">
        <CardTitle className="text-base">Production Overview</CardTitle>
        <CardDescription className="text-xs">
          Monthly production units vs target goals
        </CardDescription>
      </CardHeader>
      <CardContent className="px-4 pb-4">
        <ChartContainer config={productionConfig} className="h-[200px]">
          <AreaChart
            data={productionData}
            margin={{ top: 5, right: 20, left: 0, bottom: 0 }}
          >
            <defs>
              <linearGradient id="colorProduction" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#f97b06" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#f97b06" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorTarget" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
            <XAxis
              dataKey="month"
              className="text-xs"
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              className="text-xs"
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => `${value}`}
            />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Area
              type="monotone"
              dataKey="production"
              stroke="#f97b06"
              fillOpacity={1}
              fill="url(#colorProduction)"
            />
            <Area
              type="monotone"
              dataKey="target"
              stroke="#10b981"
              strokeDasharray="5 5"
              fillOpacity={0.3}
              fill="url(#colorTarget)"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}

export function SalesChart() {
  return (
    <Card className="py-3">
      <CardHeader className="px-4 pt-4 pb-2">
        <CardTitle className="text-base">Production by Sector</CardTitle>
        <CardDescription className="text-xs">
          Total production units across manufacturing sectors
        </CardDescription>
      </CardHeader>
      <CardContent className="px-4 pb-4">
        <ChartContainer config={{}} className="h-[200px]">
          <BarChart
            data={sectorData}
            margin={{ top: 10, right: 20, left: 10, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
            <XAxis
              dataKey="name"
              className="text-xs"
              tickLine={false}
              axisLine={false}
            />
            <YAxis className="text-xs" tickLine={false} axisLine={false} />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Bar dataKey="value" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
