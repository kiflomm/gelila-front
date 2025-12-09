"use client";

import { useRouter } from "next/navigation";
import { toast } from "sonner";
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
import { useAuthStore, useAuthActions } from "@/stores/auth-store";
import { logoutUser } from "@/api/auth";

export function DashboardUserMenu() {
  const router = useRouter();
  const { user, isLoading } = useAuthStore();
  const { logout } = useAuthActions();

  const handleLogout = async () => {
    try {
      // Call logout API first
      await logoutUser();
      // Clear local state
      logout();
      toast.success("Logged out successfully");
      router.push("/login");
    } catch (error) {
      // Even if API call fails, clear local state
      logout();
      toast.success("Logged out successfully");
      router.push("/login");
    }
  };

  const getInitials = () => {
    if (!user) return "U";
    const first = user.firstName?.[0] || "";
    const last = user.lastName?.[0] || "";
    return `${first}${last}`.toUpperCase() || "U";
  };

  const getUserName = () => {
    if (!user) return "User";
    return `${user.firstName} ${user.lastName}`.trim() || "User";
  };

  const getUserEmail = () => {
    return user?.email || "";
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="relative h-9 w-9 rounded-full hover:ring-2 hover:ring-primary/20 transition-all"
          disabled={isLoading}
        >
          <Avatar className="h-9 w-9 ring-2 ring-border">
            <AvatarImage src="/avatar.png" alt={getUserName()} />
            <AvatarFallback className="text-xs font-semibold bg-muted text-foreground">
              {getInitials()}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{getUserName()}</p>
            <p className="text-xs leading-none text-muted-foreground">
              {getUserEmail()}
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
        <DropdownMenuItem onClick={handleLogout} disabled={isLoading}>
          <LogOut className="mr-2 h-4 w-4" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

