"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Layers,
  Home,
  Truck,
  Briefcase,
  FileText,
  Newspaper,
  MessageSquare,
  Globe,
  Wrench,
  Box,
  Sprout,
  Cpu,
  Shirt,
  Building2,
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
import { useAdminImports } from "@/hooks/use-imports";
import { useAdminSectors } from "@/hooks/use-sectors";
import { useAdminExports } from "@/hooks/use-exports";

// Icon mapping for imports based on title
const getImportIcon = (title: string) => {
  const titleLower = title.toLowerCase();
  if (titleLower.includes("machinery") || titleLower.includes("industrial")) {
    return Wrench;
  }
  if (titleLower.includes("consumer") || titleLower.includes("packaged")) {
    return Box;
  }
  if (titleLower.includes("agricultural") || titleLower.includes("agriculture")) {
    return Sprout;
  }
  if (titleLower.includes("electronics") || titleLower.includes("components")) {
    return Cpu;
  }
  if (titleLower.includes("textile") || titleLower.includes("garment")) {
    return Shirt;
  }
  if (titleLower.includes("building") || titleLower.includes("material")) {
    return Building2;
  }
  return Globe; // Default icon
};

// Icon mapping for sectors based on slug
const getSectorIcon = (slug: string) => {
  if (slug.includes("footwear")) return Layers;
  if (slug.includes("food")) return Package;
  if (slug.includes("textile") || slug.includes("apparel")) return Layers;
  if (slug.includes("bus") || slug.includes("transport")) return Truck;
  return Layers; // Default icon
};

// Icon mapping for exports based on title
const getExportIcon = (title: string) => {
  const titleLower = title.toLowerCase();
  if (titleLower.includes("shoe") || titleLower.includes("sole") || titleLower.includes("footwear")) {
    return Package;
  }
  if (titleLower.includes("textile") || titleLower.includes("garment")) {
    return Shirt;
  }
  if (titleLower.includes("electronics") || titleLower.includes("components")) {
    return Cpu;
  }
  if (titleLower.includes("building") || titleLower.includes("material")) {
    return Building2;
  }
  return Globe; // Default icon
};

export function AppSidebar() {
  const pathname = usePathname();
  const { data: sectors = [], isLoading: sectorsLoading } = useAdminSectors();
  const { data: imports = [], isLoading: importsLoading } = useAdminImports();
  const { data: exports = [], isLoading: exportsLoading } = useAdminExports();

  // Build sectors menu items dynamically
  const sectorsItems = sectors.map((sector) => ({
    title: sector.title,
    url: `/dashboard/sectors/${sector.slug}`,
    icon: getSectorIcon(sector.slug),
  }));

  // Build imports menu items dynamically
  const importsItems = imports.map((importItem) => ({
    title: importItem.title,
    url: `/dashboard/imports/${importItem.slug}`,
    icon: getImportIcon(importItem.title),
  }));

  // Build exports menu items dynamically
  const exportsItems = exports.map((exportItem) => ({
    title: exportItem.title,
    url: `/dashboard/exports/${exportItem.slug}`,
    icon: getExportIcon(exportItem.title),
  }));

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
          title: "Orders",
          url: "/dashboard/orders",
          icon: ShoppingCart,
        },
      ],
    },
    {
      title: "Sectors",
      items: sectorsItems,
    },
    {
      title: "Imports",
      items: importsItems,
    },
    {
      title: "Exports",
      items: exportsItems,
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
        {
          title: "News",
          url: "/dashboard/news",
          icon: Newspaper,
        },
        {
          title: "Contact Messages",
          url: "/dashboard/contact",
          icon: MessageSquare,
        },
      ],
    },
  ];

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
                {group.items.length === 0 ? (
                  <SidebarMenuItem>
                    <div className="px-2 py-1.5 text-xs text-muted-foreground">
                      Loading...
                    </div>
                  </SidebarMenuItem>
                ) : (
                  group.items.map((item) => {
                    const Icon = item.icon;
                    // Check if active: exact match or if it's a sector/import/export and pathname starts with the base path
                    const isActive = pathname === item.url || 
                      (group.title === "Sectors" && pathname.startsWith("/dashboard/sectors/") && pathname !== "/dashboard/sectors") ||
                      (group.title === "Imports" && pathname.startsWith("/dashboard/imports/") && pathname !== "/dashboard/imports") ||
                      (group.title === "Exports" && pathname.startsWith("/dashboard/exports/") && pathname !== "/dashboard/exports");
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
                  })
                )}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
    </Sidebar>
  );
}
