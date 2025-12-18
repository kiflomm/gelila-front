"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { NewsTable } from "./news-table";
import { CategoriesSection } from "./categories-section";
import type { NewsItem } from "@/api/news";

interface NewsPageContentProps {
  newsData: NewsItem[] | undefined;
  isLoading: boolean;
  onEdit: (news: NewsItem) => void;
  onDelete: (news: NewsItem) => void;
}

export function NewsPageContent({
  newsData,
  isLoading,
  onEdit,
  onDelete,
}: NewsPageContentProps) {
  return (
    <Tabs defaultValue="news" className="space-y-6">
      <TabsList>
        <TabsTrigger value="news">News Articles</TabsTrigger>
        <TabsTrigger value="categories">Categories</TabsTrigger>
      </TabsList>

      <TabsContent value="news" className="space-y-6">
        <NewsTable
          news={newsData || []}
          isLoading={isLoading}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      </TabsContent>

      <TabsContent value="categories">
        <CategoriesSection />
      </TabsContent>
    </Tabs>
  );
}


