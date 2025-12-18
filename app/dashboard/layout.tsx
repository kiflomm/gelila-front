import type { Metadata } from "next";
import Link from "next/link";
import {
  SidebarProvider,
  SidebarInset,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/dashboard/app-sidebar";
import { Separator } from "@/components/ui/separator";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { User, LogOut, Settings } from "lucide-react";
import { ProtectedRoute } from "@/components/auth/protected-route";
import { DashboardUserMenu } from "@/components/dashboard/dashboard-user-menu";

export const metadata: Metadata = {
  title: "Manufacturing Dashboard - Gelila Manufacturing PLC",
  description:
    "Manufacturing operations dashboard for Gelila Manufacturing PLC - Production, Inventory, Orders, and Quality Control",
  robots: {
    index: false,
    follow: true,
  },
};

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ProtectedRoute>
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          <header className="sticky top-0 z-40 flex h-12 sm:h-14 shrink-0 items-center gap-2 sm:gap-3 border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60 px-2 sm:px-4">
            <div className="flex items-center gap-2 sm:gap-3 flex-1 min-w-0">
              <SidebarTrigger className="-ml-1 size-7 sm:size-8 hover:bg-accent transition-colors" />
              <Separator orientation="vertical" className="h-4 sm:h-5 hidden sm:block" />
              <Breadcrumb>
                <BreadcrumbList className="gap-1 sm:gap-1.5">
                  <BreadcrumbItem className="hidden md:block">
                    <BreadcrumbLink asChild>
                      <Link
                        href="/dashboard"
                        className="text-xs sm:text-sm text-muted-foreground hover:text-foreground transition-colors"
                      >
                        Dashboard
                      </Link>
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator className="hidden md:block text-muted-foreground" />
                  <BreadcrumbItem>
                    <BreadcrumbPage className="text-xs sm:text-sm font-medium text-foreground">
                      Overview
                    </BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
            </div>
            <div className="flex items-center gap-1 sm:gap-2">
              <DashboardUserMenu />
            </div>
          </header>
          <div className="flex flex-1 flex-col gap-2 sm:gap-3 p-2 sm:p-3 md:p-4 lg:p-5">
            {children}
          </div>
        </SidebarInset>
      </SidebarProvider>
    </ProtectedRoute>
  );
}
