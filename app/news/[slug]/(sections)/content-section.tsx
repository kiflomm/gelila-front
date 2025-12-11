interface ContentSectionProps {
  content: string;
}

export default function ContentSection({ content }: ContentSectionProps) {
  return (
    <article className="news-content w-full">
      <div
        className="w-full max-w-none text-zinc-700 dark:text-zinc-300 leading-relaxed
          prose prose-lg dark:prose-invert
          prose-headings:font-bold prose-headings:text-zinc-900 dark:prose-headings:text-zinc-100
          prose-p:my-4 prose-p:leading-relaxed prose-p:break-words prose-p:overflow-wrap-anywhere prose-p:word-break-break-word
          prose-strong:font-bold prose-strong:text-zinc-900 dark:prose-strong:text-zinc-100
          prose-b:font-bold prose-b:text-zinc-900 dark:prose-b:text-zinc-100
          prose-em:italic prose-i:italic
          prose-u:underline
          prose-s:line-through
          prose-h1:text-3xl prose-h1:font-bold prose-h1:mt-8 prose-h1:mb-4 prose-h1:text-zinc-900 dark:prose-h1:text-zinc-100 prose-h1:break-words
          prose-h2:text-2xl prose-h2:font-bold prose-h2:mt-6 prose-h2:mb-3 prose-h2:text-zinc-900 dark:prose-h2:text-zinc-100 prose-h2:break-words
          prose-h3:text-xl prose-h3:font-bold prose-h3:mt-5 prose-h3:mb-2 prose-h3:text-zinc-900 dark:prose-h3:text-zinc-100 prose-h3:break-words
          prose-h4:text-lg prose-h4:font-bold prose-h4:mt-4 prose-h4:mb-2 prose-h4:text-zinc-900 dark:prose-h4:text-zinc-100 prose-h4:break-words
          prose-ul:list-disc prose-ul:ml-6 prose-ul:my-4 prose-ul:space-y-2
          prose-ol:list-decimal prose-ol:ml-6 prose-ol:my-4 prose-ol:space-y-2
          prose-li:my-1 prose-li:leading-relaxed prose-li:break-words
          prose-a:text-primary prose-a:underline prose-a:hover:text-primary/80 prose-a:transition-colors prose-a:break-all
          prose-blockquote:border-l-4 prose-blockquote:border-primary/30 prose-blockquote:pl-4 prose-blockquote:py-2 prose-blockquote:my-4 prose-blockquote:italic prose-blockquote:bg-muted/30 prose-blockquote:rounded-r prose-blockquote:break-words
          prose-code:text-sm prose-code:bg-muted prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:font-mono prose-code:break-all
          prose-pre:bg-muted prose-pre:p-4 prose-pre:rounded-lg prose-pre:overflow-x-auto prose-pre:break-all
          prose-img:rounded-lg prose-img:my-4 prose-img:max-w-full prose-img:h-auto prose-img:w-auto
          prose-hr:my-8 prose-hr:border-zinc-300 dark:prose-hr:border-zinc-700
          [&_*]:max-w-full [&_*]:overflow-wrap-anywhere
          [&_p]:break-words [&_p]:word-break-break-word [&_p]:overflow-wrap-anywhere
          [&_div]:break-words [&_div]:overflow-wrap-anywhere
          [&_span]:break-words [&_span]:overflow-wrap-anywhere"
        style={{ wordWrap: 'break-word', overflowWrap: 'anywhere' }}
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </article>
  );
}
