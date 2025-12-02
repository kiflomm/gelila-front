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
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="sticky top-0 z-40 flex h-14 shrink-0 items-center gap-3 border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60 px-4">
          <div className="flex items-center gap-3 flex-1 min-w-0">
            <SidebarTrigger className="-ml-1 size-8 hover:bg-accent transition-colors" />
            <Separator orientation="vertical" className="h-5" />
            <Breadcrumb>
              <BreadcrumbList className="gap-1.5">
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink asChild>
                    <Link
                      href="/dashboard"
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      Dashboard
                    </Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block text-muted-foreground" />
                <BreadcrumbItem>
                  <BreadcrumbPage className="text-sm font-medium text-foreground">
                    Overview
                  </BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
          <div className="flex items-center gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="relative h-9 w-9 rounded-full hover:ring-2 hover:ring-primary/20 transition-all"
                >
                  <Avatar className="h-9 w-9 ring-2 ring-border">
                    <AvatarImage src="/avatar.png" alt="User" />
                    <AvatarFallback className="text-xs font-semibold bg-muted text-foreground">
                      GM
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">
                      Admin User
                    </p>
                    <p className="text-xs leading-none text-muted-foreground">
                      admin@gelila.com
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-3 p-3 md:p-4 lg:p-5">
          {children}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
