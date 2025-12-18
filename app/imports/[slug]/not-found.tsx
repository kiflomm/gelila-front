import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] gap-6 px-4">
      <h1 className="text-4xl font-bold text-[#181411] dark:text-white">
        Import Not Found
      </h1>
      <p className="text-[#6c757d] dark:text-gray-400 text-center max-w-md">
        The import you're looking for doesn't exist or has been removed.
      </p>
      <Button asChild>
        <Link href="/imports">Back to Imports</Link>
      </Button>
    </div>
  );
}

