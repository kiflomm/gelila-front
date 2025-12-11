"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Factory,
  Package,
  ShoppingCart,
  Layers,
  ClipboardCheck,
  BarChart3,
  Settings,
  Home,
  Truck,
  Briefcase,
  FileText,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

const menuItems = [
  {
    title: "Main",
    items: [
      {
        title: "Dashboard",
        url: "/dashboard",
        icon: LayoutDashboard,
      },
    ],
  },
  {
    title: "Operations",
    items: [
      {
        title: "Production",
        url: "/dashboard/production",
        icon: Factory,
      },
      {
        title: "Inventory",
        url: "/dashboard/inventory",
        icon: Package,
      },
      {
        title: "Orders",
        url: "/dashboard/orders",
        icon: ShoppingCart,
      },
    ],
  },
  {
    title: "Sectors",
    items: [
      {
        title: "Footwear",
        url: "/dashboard/sectors/footwear",
        icon: Layers,
      },
      {
        title: "Food Processing",
        url: "/dashboard/sectors/food",
        icon: Package,
      },
      {
        title: "Bus Assembly",
        url: "/dashboard/sectors/bus",
        icon: Truck,
      },
      {
        title: "Textile",
        url: "/dashboard/sectors/textile",
        icon: Layers,
      },
    ],
  },
  {
    title: "Quality & Reports",
    items: [
      {
        title: "Quality Control",
        url: "/dashboard/quality",
        icon: ClipboardCheck,
      },
      {
        title: "Analytics",
        url: "/dashboard/analytics",
        icon: BarChart3,
      },
    ],
  },
  {
    title: "Content",
    items: [
      {
        title: "Jobs",
        url: "/dashboard/jobs",
        icon: Briefcase,
      },
      {
        title: "Applications",
        url: "/dashboard/jobs/applications",
        icon: FileText,
      },
    ],
  },
  {
    title: "Settings",
    items: [
      {
        title: "Settings",
        url: "/dashboard/settings",
        icon: Settings,
      },
    ],
  },
];

export function AppSidebar() {
  const pathname = usePathname();

  return (
    <Sidebar variant="inset">
      <SidebarHeader className="p-2">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild size="sm">
              <Link href="/">
                <div className="flex aspect-square size-6 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                  <Home className="size-3.5" />
                </div>
                <div className="grid flex-1 text-left text-xs leading-tight">
                  <span className="truncate font-semibold">Gelila</span>
                  <span className="truncate text-[10px] text-muted-foreground">
                    Dashboard
                  </span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent className="gap-1">
        {menuItems.map((group) => (
          <SidebarGroup key={group.title} className="p-1">
            <SidebarGroupLabel className="px-2 py-1 text-[10px] font-medium">
              {group.title}
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu className="gap-0.5">
                {group.items.map((item) => {
                  const Icon = item.icon;
                  const isActive = pathname === item.url;
                  return (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton
                        asChild
                        isActive={isActive}
                        tooltip={item.title}
                        size="sm"
                      >
                        <Link href={item.url}>
                          <Icon className="size-3.5" />
                          <span className="text-xs">{item.title}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  );
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
    </Sidebar>
  );
}
