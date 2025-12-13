import HeroSection from "./(sections)/hero-section";
import CommitmentSection from "./(sections)/commitment-section";
// import ExportPortfolioSection from "./(sections)/export-portfolio-section";

async function getAllExports() {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || '';
  try {
    const response = await fetch(`${apiUrl}/exports`, {
      cache: 'no-store',
    });
    if (!response.ok) {
      return [];
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching exports:', error);
    return [];
  }
}

export default async function ExportsPage() {
  const exports = await getAllExports();

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
  const transformedExports = exports.map((exportItem: any) => ({
    id: exportItem.slug,
    title: exportItem.title,
    heroDescription: exportItem.heroDescription,
    description: exportItem.description,
    destinationRegion: exportItem.destinationRegion,
    status: exportItem.status,
    imageUrl: getImageUrl(exportItem.imageUrl),
    imageAlt: exportItem.imageAlt || exportItem.title,
    products: (exportItem.products || []).map((product: any) => ({
      id: product.id,
      name: product.name,
      description: product.description,
      image: getImageUrl(product.imageUrl),
      alt: product.imageAlt || product.name,
    })),
  }));

  return (
    <>
      <HeroSection />
      <div className="px-4 sm:px-10 lg:px-20 py-10 lg:py-16 flex flex-1 justify-center">
        <div className="layout-content-container flex flex-col w-full max-w-7xl">
          <CommitmentSection />
          {/* <ExportPortfolioSection exports={transformedExports} /> */}
        </div>
      </div>
    </>
  );
}
