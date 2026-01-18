import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { RequestQuoteDialog } from "@/components/request-quote-dialog";

interface Product {
  id: number;
  name: string;
}

interface ProductInfoSectionProps {
  product: {
    id: number;
    name: string;
    description: string;
    image: string;
    alt: string;
  };
  sectorId: string;
  sectorName: string;
  products?: Product[];
}

export default function ProductInfoSection({
  product,
  sectorId,
  sectorName,
  products = [],
}: ProductInfoSectionProps) {
  // Service-based sectors that should show "Contact Us" instead of "Request Quote"
  const serviceBasedSectors = ["bus-transport"];
  const isServiceBased = serviceBasedSectors.includes(sectorId);

  return (
    <div className="w-full">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
        {/* Product Image */}
        <div className="w-full">
          <div className="relative w-full aspect-square rounded-xl sm:rounded-2xl overflow-hidden bg-gray-100 dark:bg-gray-900 border border-primary/10 dark:border-primary/20">
            {product.image && (
              <Image
                src={product.image}
                alt={product.alt}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
                unoptimized={product.image.includes('localhost') || product.image.includes('api.gelilamanufacturingplc.com')}
              />
            )}
          </div>
        </div>

        {/* Product Information */}
        <div className="flex flex-col gap-6 sm:gap-8">
          <div className="flex flex-col gap-4">
            <div>
              <h2 className="text-[#181411] dark:text-white text-3xl sm:text-4xl md:text-5xl font-bold leading-tight tracking-tight mb-2">
                {product.name}
              </h2>
              <p className="text-[#6C757D] dark:text-white/60 text-base sm:text-lg font-normal leading-relaxed">
                {sectorName}
              </p>
            </div>
            <div className="pt-4 border-t border-primary/10 dark:border-primary/20">
              <p className="text-[#424242] dark:text-white/80 text-base sm:text-lg leading-relaxed">
                {product.description}
              </p>
            </div>
          </div>

          {/* Inquiry Section */}
          <div className="pt-4 border-t border-primary/10 dark:border-primary/20">
            <div className="flex flex-col gap-4">
              <h3 className="text-[#181411] dark:text-white text-xl sm:text-2xl font-semibold leading-tight">
                {isServiceBased
                  ? "Interested in this service?"
                  : "Interested in this product?"}
              </h3>
              <p className="text-[#6C757D] dark:text-white/70 text-sm sm:text-base leading-relaxed">
                {isServiceBased
                  ? "Contact us for route information, schedules, and service inquiries."
                  : "Contact us for pricing, availability, and custom specifications."}
              </p>
              <div className="flex flex-wrap gap-3 pt-2">
                {isServiceBased ? (
                  <Button
                    asChild
                    className="flex! min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 sm:h-12 sm:px-5 bg-primary! text-white text-sm font-bold leading-normal tracking-[0.015em] sm:text-base hover:opacity-90! transition-opacity hover:bg-primary!"
                  >
                    <Link href="/contact">
                      <span className="truncate">Contact Us</span>
                    </Link>
                  </Button>
                ) : (
                  <RequestQuoteDialog
                    products={products}
                    defaultProductId={product.id}
                    trigger={
                      <Button className="flex! min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 sm:h-12 sm:px-5 bg-primary! text-white text-sm font-bold leading-normal tracking-[0.015em] sm:text-base hover:opacity-90! transition-opacity hover:bg-primary!">
                        <span className="truncate">Request Quote</span>
                      </Button>
                    }
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
