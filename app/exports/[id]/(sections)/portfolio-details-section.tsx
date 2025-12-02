import { CheckCircle2, Globe2, Package, Award } from "lucide-react";

interface ExportPortfolio {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  imageAlt: string;
}

interface PortfolioDetailsSectionProps {
  portfolio: ExportPortfolio;
}

// Extract market information from description
function getMarketInfo(description: string) {
  const marketMap: Record<string, string> = {
    "European markets": "Europe",
    "North American distribution": "North America",
    "Asia-Pacific partners": "Asia-Pacific",
    "African trade networks": "Africa",
    "Middle Eastern markets": "Middle East",
    "South American regions": "South America",
  };

  for (const [key, value] of Object.entries(marketMap)) {
    if (description.toLowerCase().includes(key.toLowerCase())) {
      return value;
    }
  }
  return "Global";
}

export default function PortfolioDetailsSection({
  portfolio,
}: PortfolioDetailsSectionProps) {
  const market = getMarketInfo(portfolio.description);

  // Generate features based on portfolio type
  const getFeatures = (id: string) => {
    const featuresMap: Record<string, string[]> = {
      "industrial-machinery": [
        "Advanced manufacturing technology",
        "ISO 9001 certified production",
        "Customizable specifications",
        "Energy-efficient operations",
        "Comprehensive quality control",
      ],
      "packaged-consumer-goods": [
        "Premium packaging solutions",
        "Extended shelf life",
        "Sustainable materials",
        "Custom branding options",
        "Bulk distribution ready",
      ],
      "agricultural-products": [
        "Organic certified options",
        "Fresh harvest processing",
        "Cold chain logistics",
        "Export-grade quality",
        "Sustainable farming practices",
      ],
      "textiles-garments": [
        "Premium fabric quality",
        "Custom design services",
        "Ethical manufacturing",
        "Fast fashion solutions",
        "Bulk order capacity",
      ],
      "electronics-components": [
        "CE certified components",
        "Advanced technology",
        "Quality assurance",
        "Custom specifications",
        "Reliable supply chain",
      ],
      "building-materials": [
        "Durable construction grade",
        "Weather resistant",
        "Sustainable sourcing",
        "Bulk quantities available",
        "International standards",
      ],
    };

    return (
      featuresMap[id] || [
        "High quality standards",
        "International certification",
        "Reliable supply chain",
        "Custom solutions available",
      ]
    );
  };

  const features = getFeatures(portfolio.id);

  return (
    <section className="w-full py-8 sm:py-12 border-t border-primary/10 dark:border-primary/20">
      <div className="flex flex-col gap-8 sm:gap-10 max-w-4xl">
        {/* Market Information */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 pb-6 border-b border-primary/10 dark:border-primary/20">
          <div className="flex items-center gap-3 min-w-0">
            <div className="shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-primary/10 dark:bg-primary/20 flex items-center justify-center">
              <Globe2 className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
            </div>
            <div className="flex flex-col min-w-0">
              <span className="text-[#6c757d] dark:text-white/60 text-xs sm:text-sm font-medium uppercase tracking-wider">
                Target Market
              </span>
              <span className="text-[#181411] dark:text-white text-base sm:text-lg font-semibold truncate">
                {market}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-3 min-w-0">
            <div className="shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-primary/10 dark:bg-primary/20 flex items-center justify-center">
              <Package className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
            </div>
            <div className="flex flex-col min-w-0">
              <span className="text-[#6c757d] dark:text-white/60 text-xs sm:text-sm font-medium uppercase tracking-wider">
                Category
              </span>
              <span className="text-[#181411] dark:text-white text-base sm:text-lg font-semibold truncate">
                Export Ready
              </span>
            </div>
          </div>
        </div>

        {/* Key Features */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-3">
            <Award className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
            <h3 className="text-[#181411] dark:text-white text-lg sm:text-xl font-semibold">
              Key Features
            </h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            {features.map((feature, index) => (
              <div key={index} className="flex items-start gap-3 group">
                <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5 group-hover:scale-110 transition-transform duration-200" />
                <span className="text-[#424242] dark:text-white/80 text-sm sm:text-base leading-relaxed">
                  {feature}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
