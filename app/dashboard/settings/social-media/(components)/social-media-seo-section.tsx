"use client";

import { useEffect } from "react";
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
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import type { SocialMediaSeo, CreateSocialMediaSeoData } from "@/api/social-media";

const seoSchema = z.object({
  twitter: z.string().url("Must be a valid URL").optional().or(z.literal("")),
  linkedin: z.string().url("Must be a valid URL").optional().or(z.literal("")),
});

type SeoFormValues = z.infer<typeof seoSchema>;

interface SocialMediaSeoSectionProps {
  seoData: SocialMediaSeo[];
  isLoading: boolean;
  onUpdate: (data: CreateSocialMediaSeoData) => Promise<void>;
  isSubmitting: boolean;
}

export function SocialMediaSeoSection({
  seoData,
  isLoading,
  onUpdate,
  isSubmitting,
}: SocialMediaSeoSectionProps) {
  const twitterData = seoData.find((item) => item.platform === "twitter");
  const linkedinData = seoData.find((item) => item.platform === "linkedin");

  const form = useForm<SeoFormValues>({
    resolver: zodResolver(seoSchema),
    defaultValues: {
      twitter: "",
      linkedin: "",
    },
  });

  // Update form when data loads
  useEffect(() => {
    if (seoData.length > 0) {
      form.reset({
        twitter: twitterData?.url || "",
        linkedin: linkedinData?.url || "",
      });
    }
  }, [seoData, twitterData, linkedinData, form]);

  const handleSubmit = async (values: SeoFormValues) => {
    if (values.twitter) {
      await onUpdate({ platform: "twitter", url: values.twitter });
    }
    if (values.linkedin) {
      await onUpdate({ platform: "linkedin", url: values.linkedin });
    }
  };

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <Skeleton className="h-6 w-48" />
          <Skeleton className="h-4 w-96 mt-2" />
        </CardHeader>
        <CardContent className="space-y-4">
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>SEO Social Media Links</CardTitle>
        <CardDescription>
          URLs used for SEO structured data (schema.org). These links appear in search engine results.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="twitter"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Twitter URL</FormLabel>
                  <FormControl>
                    <Input placeholder="https://twitter.com/gelila" {...field} />
                  </FormControl>
                  <FormDescription>
                    Twitter profile URL for SEO structured data
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="linkedin"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>LinkedIn URL</FormLabel>
                  <FormControl>
                    <Input placeholder="https://linkedin.com/company/gelila" {...field} />
                  </FormControl>
                  <FormDescription>
                    LinkedIn profile URL for SEO structured data
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Saving..." : "Save SEO Links"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}

