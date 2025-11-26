import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function HeroSection() {
  return (
    <section className="py-16 md:py-24 bg-white dark:bg-[#212529]/30">
      <div className="px-4 sm:px-10 lg:px-20">
        <div className="@container">
          <div className="flex flex-col gap-8 @[864px]:flex-row @[864px]:items-center max-w-7xl mx-auto">
            <div className="flex flex-col gap-6 text-center @[864px]:text-left @[864px]:w-1/2">
              <div className="flex flex-col gap-2">
                <h1 className="text-[#212529] dark:text-[#F8F9FA] text-4xl font-black leading-tight tracking-[-0.033em] @[480px]:text-5xl">
                  Build Your Future with Gelila Manufacturing.
                </h1>
                <h2 className="text-[#6C757D] dark:text-[#F8F9FA]/70 text-base font-normal leading-normal @[480px]:text-lg">
                  Join a team of innovators dedicated to excellence and shaping
                  the future of industry. Discover your potential and grow with
                  us.
                </h2>
              </div>
              <div className="flex justify-center @[864px]:justify-start">
                <Button
                  asChild
                  className="flex! min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 px-5 bg-primary! text-white text-base font-bold leading-normal tracking-[0.015em] hover:opacity-90! transition-opacity hover:bg-primary!"
                >
                  <Link href="#job-listings">
                    <span className="truncate">Explore Open Positions</span>
                  </Link>
                </Button>
              </div>
            </div>
            <div className="w-full @[864px]:w-1/2">
              <div className="relative w-full aspect-video bg-center bg-no-repeat bg-cover rounded-xl overflow-hidden">
                <Image
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuALrnMLhPMHqI-qexStUiCnn132Hz55eJKLmhZcZWQ-IBJbJr9PwNsLjWoBOZIDQcmr7_rfFOsSoPXSP1oVxVqNbkCW2uBV1jUiVzeE1WqnJavkE5cZ2LM7awx0a-kU_dUvKQOYiC_aWuy_qJn7_alrp5-mvh-7QuCOfFTvQetD4qWx7qFQia3DZxwvjl_rTxBx7BXXuRAbqypx1xntbqRU4vsT-fDj0yobozlm6nZvw1GAkZBQS_A2GJv7oGK6wVTGPCuQsZrstN3k"
                  alt="Team of engineers collaborating in a modern factory setting"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

