"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import type { CreateSocialMediaData, UpdateSocialMediaData } from "@/api/social-media";

const socialMediaSchema = z.object({
  name: z.string().min(1, "Name is required"),
  label: z.string().min(1, "Label is required"),
  href: z.string().url("Must be a valid URL"),
  icon: z.string().min(1, "Icon is required"),
  isActive: z.boolean().default(true),
  orderIndex: z.number().int().min(0).default(0),
});

type SocialMediaFormValues = z.infer<typeof socialMediaSchema>;

interface SocialMediaFormProps {
  initialData?: Partial<CreateSocialMediaData>;
  onSubmit: (data: CreateSocialMediaData | UpdateSocialMediaData) => Promise<void>;
  onCancel: () => void;
  isSubmitting?: boolean;
}

const ICON_OPTIONS = ["Facebook", "Twitter", "Linkedin", "Instagram", "Youtube"];

export function SocialMediaForm({
  initialData,
  onSubmit,
  onCancel,
  isSubmitting = false,
}: SocialMediaFormProps) {
  const form = useForm<SocialMediaFormValues>({
    resolver: zodResolver(socialMediaSchema),
    defaultValues: {
      name: initialData?.name || "",
      label: initialData?.label || "",
      href: initialData?.href || "",
      icon: initialData?.icon || "",
      isActive: initialData?.isActive ?? true,
      orderIndex: initialData?.orderIndex ?? 0,
    },
  });

  const handleSubmit = async (values: SocialMediaFormValues) => {
    await onSubmit(values);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4 sm:space-y-5 md:space-y-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Facebook" {...field} />
              </FormControl>
              <FormDescription>
                Internal name for the social media platform
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="label"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Label</FormLabel>
              <FormControl>
                <Input placeholder="Facebook" {...field} />
              </FormControl>
              <FormDescription>
                Display label shown to users
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="href"
          render={({ field }) => (
            <FormItem>
              <FormLabel>URL</FormLabel>
              <FormControl>
                <Input placeholder="https://facebook.com/gelila" {...field} />
              </FormControl>
              <FormDescription>
                Full URL to the social media profile
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="icon"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Icon</FormLabel>
              <FormControl>
                <select
                  {...field}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <option value="">Select an icon</option>
                  {ICON_OPTIONS.map((icon) => (
                    <option key={icon} value={icon}>
                      {icon}
                    </option>
                  ))}
                </select>
              </FormControl>
              <FormDescription>
                Icon name matching Lucide React icons
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="orderIndex"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Order Index</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  {...field}
                  onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
                />
              </FormControl>
              <FormDescription>
                Order for displaying links (lower numbers appear first)
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="isActive"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4 sm:p-5 md:p-6">
              <div className="space-y-0.5 pr-4">
                <FormLabel className="text-base sm:text-lg">Active</FormLabel>
                <FormDescription className="text-sm">
                  Whether this link is displayed on the website
                </FormDescription>
              </div>
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
            </FormItem>
          )}
        />

        <div className="flex flex-col sm:flex-row justify-end gap-2 sm:gap-3 pt-2 sm:pt-4">
          <Button 
            type="button" 
            variant="outline" 
            onClick={onCancel} 
            disabled={isSubmitting}
            className="w-full sm:w-auto"
          >
            Cancel
          </Button>
          <Button 
            type="submit" 
            disabled={isSubmitting}
            className="w-full sm:w-auto"
          >
            {isSubmitting ? "Saving..." : "Save"}
          </Button>
        </div>
      </form>
    </Form>
  );
}

