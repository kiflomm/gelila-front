import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { sectorsApi, type ProductWithSector } from "@/api/sectors";
import Image from "@/components/ui/image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export const dynamic = "force-dynamic";

async function getNewArrivals(): Promise<ProductWithSector[]> {
  // Use the public endpoint; admin dashboard is behind auth anyway
  return sectorsApi.getNewestProducts(50);
}

export default async function NewArrivalsDashboardPage() {
  const products = await getNewArrivals();

  return (
    <div className="flex flex-1 flex-col gap-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div className="space-y-1">
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight flex items-center gap-2">
            <Sparkles className="size-5 text-amber-500" />
            New Arrivals
          </h1>
          <p className="text-sm text-muted-foreground">
            Overview of all products currently featured in the homepage New Arrivals carousel.
          </p>
        </div>
        <Button asChild variant="outline" size="sm">
          <Link href="/dashboard/sectors/food-processing">
            Manage sectors
            <ArrowRight className="size-4 ml-2" />
          </Link>
        </Button>
      </div>

      {products.length === 0 ? (
        <div className="flex flex-1 items-center justify-center rounded-lg border bg-card py-16 text-center">
          <div>
            <Sparkles className="mx-auto mb-4 size-10 text-muted-foreground" />
            <h2 className="text-lg font-semibold mb-1">No New Arrivals yet</h2>
            <p className="text-sm text-muted-foreground mb-4">
              Mark products as &quot;Show in New Arrivals&quot; from their sector pages to feature them here.
            </p>
            <Button asChild>
              <Link href="/dashboard/sectors/food-processing">
                Go to sectors
                <ArrowRight className="size-4 ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {products.map((product) => (
            <Link
              key={product.id}
              href={`/dashboard/sectors/${product.sector.slug}`}
              className="group rounded-lg border bg-card overflow-hidden hover:shadow-md transition-shadow"
            >
              <div className="relative aspect-video w-full bg-muted overflow-hidden">
                {product.imageUrl ? (
                  <Image
                    src={
                      product.imageUrl.startsWith("http")
                        ? product.imageUrl
                        : `${process.env.NEXT_PUBLIC_API_URL?.replace("/api/v1", "") || ""}${product.imageUrl}`
                    }
                    alt={product.imageAlt || product.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    unoptimized
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center text-muted-foreground">
                    <Sparkles className="size-8" />
                  </div>
                )}
              </div>
              <div className="p-4 space-y-2">
                <div className="flex items-center justify-between gap-2">
                  <Badge variant="secondary" className="text-[10px] uppercase tracking-wide">
                    {product.sector.title}
                  </Badge>
                  <Badge variant="outline" className="text-[10px] uppercase tracking-wide">
                    New Arrival
                  </Badge>
                </div>
                <h3 className="font-semibold line-clamp-1">{product.name}</h3>
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {product.description}
                </p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

