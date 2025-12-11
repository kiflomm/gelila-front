"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/stores/auth-store";
import { NewsFormFields } from "./news-form-fields";
import { NewsImageUpload } from "./news-image-upload";
import {
  createNewsSchema,
  updateNewsSchema,
  type NewsFormData,
} from "../schemas/news-form.schemas";
import type { NewsItem, CreateNewsData, UpdateNewsData } from "@/api/news";

interface NewsFormProps {
  news?: NewsItem;
  onSubmit: (data: CreateNewsData | UpdateNewsData) => Promise<void>;
  onCancel?: () => void;
  isSubmitting?: boolean;
}

export function NewsForm({ news, onSubmit, onCancel, isSubmitting = false }: NewsFormProps) {
  const user = useAuthStore((state) => state.user);

  // Auto-generate author name from logged-in user
  const authorName = user ? `${user.firstName} ${user.lastName}` : "";

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<NewsFormData>({
    resolver: zodResolver(news ? updateNewsSchema : createNewsSchema),
    defaultValues: news
      ? {
          title: news.title,
          slug: news.slug,
          content: news.content,
          categoryId: news.categoryId,
          isPublished: news.isPublished ?? false,
        }
      : {
          isPublished: false,
        },
  });

  const onSubmitForm = async (data: NewsFormData) => {
    const submitData: CreateNewsData | UpdateNewsData = {
      title: data.title,
      slug: data.slug,
      content: data.content,
      categoryId: data.categoryId,
      authorName: authorName,
      isPublished: data.isPublished,
      // Only include image if it's a File instance (new upload)
      // For updates, if no new image is uploaded, don't send image field
      image: data.image instanceof File ? data.image : undefined,
    };
    await onSubmit(submitData);
  };

  return (
    <form onSubmit={handleSubmit(onSubmitForm)} className="space-y-4 min-w-0">
      <NewsFormFields control={control} errors={errors} news={news} />
      <NewsImageUpload
        control={control}
        errors={errors}
        news={news}
        isRequired={!news}
      />
      <div className="flex justify-end gap-3 pt-4">
        {onCancel && (
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
        )}
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Saving..." : news ? "Update News" : "Create News"}
        </Button>
      </div>
    </form>
  );
}

