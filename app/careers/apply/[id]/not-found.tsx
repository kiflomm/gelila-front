import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 sm:px-6 lg:px-10 xl:px-20 py-16 sm:py-20 lg:py-24">
      <div className="text-center max-w-2xl mx-auto w-full">
        {/* Decorative Circle */}
        <div className="relative mb-8">
          <div className="mx-auto w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 rounded-full bg-primary/10 dark:bg-primary/20 mb-6 relative flex items-center justify-center">
            <div className="absolute inset-0 rounded-full bg-primary/20 animate-ping opacity-75" />
            <div className="text-4xl sm:text-5xl md:text-6xl font-black text-primary/30 dark:text-primary/40">
              404
            </div>
          </div>
        </div>

        {/* Main Heading */}
        <h1 className="text-5xl sm:text-6xl md:text-7xl font-black text-[#212529] dark:text-[#F8F9FA] mb-4 tracking-tight">
          Job Not Found
        </h1>

        {/* Subtitle */}
        <p className="text-lg sm:text-xl text-[#6C757D] dark:text-[#F8F9FA]/70 mb-4 max-w-xl mx-auto leading-relaxed">
          The job position you're looking for doesn't exist or has been removed.
        </p>
        
        <p className="text-base text-[#6C757D] dark:text-[#F8F9FA]/60 mb-10 max-w-lg mx-auto">
          Don't worry, we have many other exciting opportunities waiting for you!
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button
            asChild
            className="flex! min-w-[200px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 px-6 bg-primary! text-white text-base font-bold leading-normal tracking-[0.015em] hover:opacity-90! transition-opacity hover:bg-primary! shadow-lg hover:shadow-xl"
          >
            <Link href="/careers#job-listings">
              View All Jobs
            </Link>
          </Button>
          
          <Button
            asChild
            variant="outline"
            className="flex! min-w-[200px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 px-6 border-2 hover:bg-muted/50 transition-all"
          >
            <Link href="/careers">
              Back to Careers
            </Link>
          </Button>
        </div>

        {/* Additional Info */}
        <div className="mt-12 pt-8 border-t border-border/50">
          <p className="text-sm text-muted-foreground">
            Need help? <Link href="/contact" className="text-primary hover:underline font-medium">Contact us</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

