import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 text-center">
      <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-[#181411] dark:text-white mb-4">
        404
      </h1>
      <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#181411] dark:text-white mb-4">
        Product Not Found
      </h2>
      <p className="text-[#6C757D] dark:text-white/70 text-base sm:text-lg mb-8 max-w-md">
        The product you're looking for doesn't exist or has been moved.
      </p>
      <Button
        asChild
        className="flex! min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 sm:h-12 sm:px-5 bg-primary! text-white text-sm font-bold leading-normal tracking-[0.015em] sm:text-base hover:opacity-90! transition-opacity hover:bg-primary!"
      >
        <Link href="/sectors">
          <span className="truncate">Back to Sectors</span>
        </Link>
      </Button>
    </div>
  );
}

