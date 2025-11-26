import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <h1 className="text-4xl font-bold text-[#212529] dark:text-[#F8F9FA] mb-4">
          Job Not Found
        </h1>
        <p className="text-[#6C757D] dark:text-[#F8F9FA]/70 mb-8">
          The job position you're looking for doesn't exist or has been removed.
        </p>
        <Button asChild>
          <Link href="/careers#job-listings">Back to Job Listings</Link>
        </Button>
      </div>
    </div>
  );
}

