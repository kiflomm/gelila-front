import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import productsData from "@/data/products.json";
import HeroSection from "./(sections)/hero-section";
import ProductInfoSection from "./(sections)/product-info-section";

interface ProductPageProps {
  params: Promise<{
    id: string;
    productId: string;
  }>;
}

export async function generateStaticParams() {
  const params: Array<{ id: string; productId: string }> = [];

  productsData.sectors.forEach((sector) => {
    sector.products.forEach((product) => {
      params.push({
        id: sector.id,
        productId: product.id.toString(),
      });
    });
  });

  return params;
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { id, productId } = await params;
  const sector = productsData.sectors.find((s) => s.id === id);

  if (!sector) {
    notFound();
  }

  const product = sector.products.find((p) => p.id.toString() === productId);

  if (!product) {
    notFound();
  }

  return (
    <>
      <HeroSection product={product} sectorName={sector.name} />
      <div className="px-4 sm:px-10 lg:px-20 py-10 lg:py-16 flex flex-1 justify-center">
        <div className="layout-content-container flex flex-col w-full max-w-7xl">
          <Link
            href={`/sectors/${id}`}
            className="inline-flex items-center gap-2 text-[#6C757D] dark:text-white/70 hover:text-primary transition-colors text-sm font-medium w-fit mb-6 group/back"
          >
            <ArrowLeft className="size-4 transition-transform group-hover/back:-translate-x-1" />
            Back to {sector.name}
          </Link>
          <ProductInfoSection
            product={product}
            sectorId={id}
            sectorName={sector.name}
          />
        </div>
      </div>
    </>
  );
}
