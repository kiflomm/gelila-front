"use client";

import { Controller, Control, FieldErrors } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { RichTextEditor } from "@/components/ui/rich-text-editor";
import { useAdminCategories } from "@/hooks/use-news";
import type { NewsFormData } from "../schemas/news-form.schemas";

interface NewsFormFieldsProps {
  control: Control<NewsFormData>;
  errors: FieldErrors<NewsFormData>;
  news?: { title?: string; slug?: string; content?: string; categoryId?: number; isPublished?: boolean };
}

export function NewsFormFields({ control, errors, news }: NewsFormFieldsProps) {
  const { data: categories = [] } = useAdminCategories();

  return (
    <>
      <div className="space-y-2">
        <Label htmlFor="title">
          Title <span className="text-destructive">*</span>
        </Label>
        <Controller
          name="title"
          control={control}
          render={({ field }) => (
            <Input
              id="title"
              {...field}
              placeholder="e.g., Gelila Manufacturing Announces Q3 Production Milestones"
              aria-invalid={errors.title ? "true" : "false"}
            />
          )}
        />
        {errors.title && (
          <p className="text-sm text-destructive">{errors.title.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="content">
          Content <span className="text-destructive">*</span>
        </Label>
        <Controller
          name="content"
          control={control}
          render={({ field }) => (
            <RichTextEditor
              value={field.value || ""}
              onChange={field.onChange}
              placeholder="Write the full content of the news article..."
            />
          )}
        />
        {errors.content && (
          <p className="text-sm text-destructive">{errors.content.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="categoryId">
          Category <span className="text-destructive">*</span>
        </Label>
        <Controller
          name="categoryId"
          control={control}
          render={({ field }) => (
            <Select
              value={field.value?.toString()}
              onValueChange={(value) => field.onChange(parseInt(value))}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((cat) => (
                  <SelectItem key={cat.id} value={cat.id.toString()}>
                    {cat.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        />
        {errors.categoryId && (
          <p className="text-sm text-destructive">{errors.categoryId.message}</p>
        )}
      </div>

      <div className="flex items-center space-x-2">
        <Controller
          name="isPublished"
          control={control}
          render={({ field }) => (
            <Checkbox
              id="isPublished"
              checked={field.value}
              onCheckedChange={field.onChange}
            />
          )}
        />
        <Label htmlFor="isPublished" className="cursor-pointer">
          Publish immediately
        </Label>
      </div>
    </>
  );
}

