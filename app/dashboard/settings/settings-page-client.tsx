"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useAuthStore } from "@/stores/auth-store";
import { useChangePassword, useUpdateProfile } from "@/hooks/use-profile";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";

const profileSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters long"),
  lastName: z.string().min(2, "Last name must be at least 2 characters long"),
});

type ProfileFormValues = z.infer<typeof profileSchema>;

const passwordSchema = z
  .object({
    currentPassword: z.string().min(6, "Current password must be at least 6 characters long"),
    newPassword: z.string().min(8, "New password must be at least 8 characters long"),
    confirmNewPassword: z.string().min(8, "Confirm password must be at least 8 characters long"),
  })
  .refine((data) => data.newPassword === data.confirmNewPassword, {
    message: "Passwords do not match",
    path: ["confirmNewPassword"],
  });

type PasswordFormValues = z.infer<typeof passwordSchema>;

export function SettingsPageClient() {
  const user = useAuthStore((state) => state.user);
  const [activeTab, setActiveTab] = useState<"profile" | "security">("profile");

  const updateProfileMutation = useUpdateProfile();
  const changePasswordMutation = useChangePassword();

  const profileForm = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      firstName: user?.firstName ?? "",
      lastName: user?.lastName ?? "",
    },
  });

  const passwordForm = useForm<PasswordFormValues>({
    resolver: zodResolver(passwordSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmNewPassword: "",
    },
  });

  const handleProfileSubmit = async (values: ProfileFormValues) => {
    try {
      await updateProfileMutation.mutateAsync(values);
      toast.success("Profile updated successfully");
    } catch (error: any) {
      const description =
        error?.response?.data?.message ??
        error?.message ??
        "An unexpected error occurred while updating your profile";
      toast.error("Failed to update profile", { description });
    }
  };

  const handlePasswordSubmit = async (values: PasswordFormValues) => {
    try {
      await changePasswordMutation.mutateAsync({
        currentPassword: values.currentPassword,
        newPassword: values.newPassword,
      });
      toast.success("Password changed successfully");
      passwordForm.reset();
    } catch (error: any) {
      const backendMessage = error?.response?.data?.message;
      const description =
        typeof backendMessage === "string"
          ? backendMessage
          : error?.message ?? "An unexpected error occurred while changing your password";

      toast.error("Failed to change password", { description });
    }
  };

  return (
    <div className="flex flex-1 flex-col min-w-0 rounded-2xl border bg-card/40 px-4 py-5 shadow-sm sm:px-6 sm:py-6 lg:px-8 lg:py-8">
      <div className="flex flex-col gap-3 border-b pb-4 sm:pb-5 md:pb-6">
        <div className="space-y-1">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tight">
            Account Settings
          </h1>
          <p className="max-w-2xl text-sm text-muted-foreground">
            Manage your personal information, password, and security preferences in one place.
          </p>
        </div>
      </div>

      <Tabs
        value={activeTab}
        onValueChange={(value) => setActiveTab(value as typeof activeTab)}
        className="mt-4 flex flex-col gap-6 lg:mt-6 lg:flex-row"
      >
        <div className="w-full lg:w-60">
          <TabsList className="flex w-full flex-row justify-start gap-2 rounded-xl bg-muted/80 p-1 lg:flex-col lg:gap-1 lg:bg-transparent lg:p-0">
            <TabsTrigger
              value="profile"
              className="flex-1 justify-start rounded-lg px-3 py-2 text-sm font-medium data-[state=active]:bg-background data-[state=active]:text-primary data-[state=active]:shadow-sm lg:w-full"
            >
              Profile
            </TabsTrigger>
            <TabsTrigger
              value="security"
              className="flex-1 justify-start rounded-lg px-3 py-2 text-sm font-medium data-[state=active]:bg-background data-[state=active]:text-primary data-[state=active]:shadow-sm lg:w-full"
            >
              Security
            </TabsTrigger>
          </TabsList>
        </div>

        <Separator className="hidden lg:block" orientation="vertical" />

        <div className="flex-1 space-y-6">
          <TabsContent value="profile" className="space-y-6">
            <Card className="border-none bg-background/80 shadow-sm ring-1 ring-border/50">
              <CardHeader>
                <CardTitle>Profile Information</CardTitle>
                <CardDescription>
                  Update your basic account information used across the dashboard.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...profileForm}>
                  <form
                    onSubmit={profileForm.handleSubmit(handleProfileSubmit)}
                    className="grid gap-4 max-w-xl"
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <FormField
                        control={profileForm.control}
                        name="firstName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>First name</FormLabel>
                            <FormControl>
                              <Input placeholder="First name" autoComplete="given-name" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={profileForm.control}
                        name="lastName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Last name</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Last name"
                                autoComplete="family-name"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <Button
                      type="submit"
                      className="w-full sm:w-auto"
                      disabled={updateProfileMutation.isPending}
                    >
                      {updateProfileMutation.isPending ? "Saving..." : "Save changes"}
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="security" className="space-y-6">
            <Card className="border-none bg-background/80 shadow-sm ring-1 ring-border/50">
              <CardHeader>
                <CardTitle>Change Password</CardTitle>
                <CardDescription>
                  Choose a strong password that you don&apos;t reuse on other websites.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...passwordForm}>
                  <form
                    onSubmit={passwordForm.handleSubmit(handlePasswordSubmit)}
                    className="grid gap-4 max-w-xl"
                  >
                    <FormField
                      control={passwordForm.control}
                      name="currentPassword"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Current password</FormLabel>
                          <FormControl>
                            <Input
                              type="password"
                              autoComplete="current-password"
                              placeholder="Enter current password"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <FormField
                        control={passwordForm.control}
                        name="newPassword"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>New password</FormLabel>
                            <FormControl>
                              <Input
                                type="password"
                                autoComplete="new-password"
                                placeholder="Enter new password"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={passwordForm.control}
                        name="confirmNewPassword"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Confirm new password</FormLabel>
                            <FormControl>
                              <Input
                                type="password"
                                autoComplete="new-password"
                                placeholder="Re-enter new password"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <Button
                      type="submit"
                      className="w-full sm:w-auto"
                      disabled={changePasswordMutation.isPending}
                    >
                      {changePasswordMutation.isPending ? "Updating..." : "Update password"}
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
}


