import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] gap-6 text-center">
      <h1 className="text-zinc-900 dark:text-zinc-100 text-4xl md:text-5xl font-black">
        404
      </h1>
      <h2 className="text-zinc-700 dark:text-zinc-300 text-2xl font-bold">
        Article Not Found
      </h2>
      <p className="text-zinc-600 dark:text-zinc-400 text-base max-w-md">
        The news article you're looking for doesn't exist or has been removed.
      </p>
      <Link
        href="/news"
        className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors text-sm font-bold mt-4"
      >
        <ArrowLeft className="size-4" />
        Back to News
      </Link>
    </div>
  );
}
