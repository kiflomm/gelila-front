interface ContentSectionProps {
  content: string;
}

export default function ContentSection({ content }: ContentSectionProps) {
  return (
    <article className="news-content prose prose-lg dark:prose-invert max-w-none">
      <div
        className="text-zinc-700 dark:text-zinc-300 leading-relaxed"
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </article>
  );
}
