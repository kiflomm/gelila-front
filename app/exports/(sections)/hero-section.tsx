import Image from "next/image";
import { Button } from "@/components/ui/button";

export default function HeroSection() {
  return (
    <section className="@container">
      <div className="@[480px]:p-4">
        <div className="relative flex min-h-[480px] flex-col gap-6 @[480px]:gap-8 @[480px]:rounded-xl items-start justify-end px-4 pb-10 @[480px]:px-10 overflow-hidden">
          <Image
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBc4xkf-9LRitn4tn4A9BHTYICAwTwdZnPBoUe3n_5z2Zqg4r3b_P53Qxk0POCGT42YlbbPUtbOo1j80uBp5YgPA2mI6-vtXSHk1kYxT4kEKMVjUxrj7HVpY00ojzab7KcIODwAITtMjgFZdyEvgvDvuk3EzzWgkQDDz55JjgxSC5twFqapjwpPktJIFJ7EteY4bdWU-ybHOfzzcduB0HJTycNe4mBz9IeZqmrxappqoolhwZ4U3LH3eNudVgIlN88MJn_6nrwgSti8"
            alt="Global manufacturing and export operations"
            fill
            className="object-cover @[480px]:rounded-xl"
            priority
          />
          <div className="absolute inset-0 bg-linear-to-b from-black/10 to-black/60 @[480px]:rounded-xl" />
          <div className="relative z-10 flex flex-col gap-2 text-left">
            <h1 className="text-white text-4xl font-black leading-tight tracking-[-0.033em] @[480px]:text-5xl @[480px]:font-black @[480px]:leading-tight @[480px]:tracking-[-0.033em]">
              Global Reach, Guaranteed Quality.
            </h1>
            <h2 className="text-white text-sm font-normal leading-normal @[480px]:text-base @[480px]:font-normal @[480px]:leading-normal max-w-2xl">
              Your trusted partner in manufacturing and exporting premium goods
              worldwide. We are committed to excellence, from production to
              delivery.
            </h2>
          </div>
          <Button className="relative z-10 flex! min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 @[480px]:h-12 @[480px]:px-5 bg-primary! text-white text-sm font-bold leading-normal tracking-[0.015em] @[480px]:text-base @[480px]:font-bold @[480px]:leading-normal @[480px]:tracking-[0.015em] hover:opacity-90! transition-opacity hover:bg-primary!">
            <span className="truncate">Explore Our Export Capabilities</span>
          </Button>
        </div>
      </div>
    </section>
  );
}
