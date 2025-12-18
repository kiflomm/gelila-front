import HeroSection from "./(sections)/hero-section";
import CommitmentSection from "./(sections)/commitment-section";
import FilterableImportsSection from "./(sections)/filterable-imports-section";

async function getPageConfig() {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || '';
  try {
    const response = await fetch(`${apiUrl}/imports/page/config`, {
      cache: 'no-store',
    });
    if (!response.ok) {
      return null;
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching page config:', error);
    return null;
  }
}

async function getAllImports() {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || '';
  try {
    const response = await fetch(`${apiUrl}/imports`, {
      cache: 'no-store',
    });
    if (!response.ok) {
      return [];
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching imports:', error);
    return [];
  }
}

export default async function ImportsPage() {
  const [pageConfig, imports] = await Promise.all([
    getPageConfig(),
    getAllImports(),
  ]);

  // Helper function to construct full image URL
  const getImageUrl = (imageUrl: string | null | undefined): string => {
    if (!imageUrl) return "";
    if (imageUrl.startsWith('http://') || imageUrl.startsWith('https://')) {
      return imageUrl;
    }
    const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL || '';
    const baseUrl = apiBaseUrl.replace('/api/v1', '').replace(/\/$/, '');
    const cleanImageUrl = imageUrl.startsWith('/') ? imageUrl : `/${imageUrl}`;
    return `${baseUrl}${cleanImageUrl}`;
  };

  // Transform API data
  const transformedPageConfig = pageConfig ? {
    heroTitle: pageConfig.heroTitle,
    heroSubtitle: pageConfig.heroSubtitle,
    heroImage: {
      src: getImageUrl(pageConfig.heroImageUrl) || "https://images.unsplash.com/photo-1565793298595-6a879b1d9492?q=80&w=2070&auto=format&fit=crop",
      alt: pageConfig.heroImageAlt || pageConfig.heroTitle,
    },
    commitmentTitle: pageConfig.commitmentTitle,
    commitmentDescription: pageConfig.commitmentDescription,
    commitments: pageConfig.commitments || [],
  } : null;

  const transformedImports = imports.map((importItem: any) => ({
    id: importItem.slug,
    title: importItem.title,
    heroDescription: importItem.heroDescription,
    description: importItem.description,
    sourceRegion: importItem.sourceRegion,
    status: importItem.status,
    imageUrl: getImageUrl(importItem.imageUrl),
    imageAlt: importItem.imageAlt || importItem.title,
    products: (importItem.products || []).map((product: any) => ({
      id: product.id,
      name: product.name,
      description: product.description,
      image: getImageUrl(product.imageUrl),
      alt: product.imageAlt || product.name,
    })),
  }));

  return (
    <>
      <HeroSection pageConfig={transformedPageConfig} />
      <div className="px-2 sm:px-4 md:px-6 lg:px-10 xl:px-20 py-6 sm:py-8 md:py-10 lg:py-12 xl:py-16 flex flex-1 justify-center">
        <div className="layout-content-container flex flex-col w-full max-w-7xl">
          <CommitmentSection pageConfig={transformedPageConfig} />
          <FilterableImportsSection imports={transformedImports} />
        </div>
      </div>
    </>
  );
}
