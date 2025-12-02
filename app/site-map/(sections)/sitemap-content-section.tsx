import Link from "next/link";

export default function SitemapContentSection() {
  const mainPages = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About Us" },
    { href: "/sectors", label: "Sectors" },
    { href: "/exports", label: "Exports" },
    { href: "/careers", label: "Careers" },
    { href: "/news", label: "News" },
    { href: "/contact", label: "Contact" },
  ];

  const legalPages = [
    { href: "/privacy", label: "Privacy Policy" },
    { href: "/terms", label: "Terms of Service" },
    { href: "/cookies", label: "Cookie Policy" },
    { href: "/site-map", label: "Sitemap" },
  ];

  return (
    <div className="px-2 sm:px-4 md:px-6">
      <div className="space-y-12">
        {/* Main Pages */}
        <section>
          <h2 className="text-2xl font-bold mb-6 text-[#181411] dark:text-white">
            Main Pages
          </h2>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {mainPages.map((page) => (
              <li key={page.href}>
                <Link
                  href={page.href}
                  className="text-base text-[#212121] dark:text-gray-200 hover:text-primary dark:hover:text-primary transition-colors inline-block"
                >
                  {page.label}
                </Link>
              </li>
            ))}
          </ul>
        </section>

        {/* Legal Pages */}
        <section>
          <h2 className="text-2xl font-bold mb-6 text-[#181411] dark:text-white">
            Legal
          </h2>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {legalPages.map((page) => (
              <li key={page.href}>
                <Link
                  href={page.href}
                  className="text-base text-[#212121] dark:text-gray-200 hover:text-primary dark:hover:text-primary transition-colors inline-block"
                >
                  {page.label}
                </Link>
              </li>
            ))}
          </ul>
        </section>

        {/* Additional Information */}
        <section>
          <h2 className="text-2xl font-bold mb-6 text-[#181411] dark:text-white">
            Additional Information
          </h2>
          <div className="space-y-4 text-[#212121] dark:text-gray-200">
            <p className="text-base leading-relaxed">
              This sitemap provides an overview of all the main pages available
              on our website. If you cannot find what you're looking for, please
              use the search function or contact us directly.
            </p>
            <p className="text-base leading-relaxed">
              Note: Some pages may require authentication or may be accessible
              only to registered users. Dynamic content such as individual news
              articles and job listings are not listed here but can be accessed
              through their respective section pages.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
