import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 px-4 py-16 text-center">
      <h1 className="text-4xl font-bold text-[#212529] dark:text-white">
        Company Not Found
      </h1>
      <p className="text-[#6C757D] dark:text-[#F8F9FA]/70 text-lg">
        The company profile you&apos;re looking for doesn&apos;t exist.
      </p>
      <Button asChild className="mt-4">
        <Link href="/">Go back home</Link>
      </Button>
    </div>
  );
}
