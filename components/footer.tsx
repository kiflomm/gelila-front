import Link from "next/link";
import Image from "next/image";
import {
  Mail,
  Phone,
  MapPin,
  Facebook,
  Twitter,
  Linkedin,
  Instagram,
  Youtube,
} from "lucide-react";
import footerData from "@/data/footer.json";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const companyLinks = [
    { href: "/about", label: "About Us" },
    { href: "/products", label: "Products" },
    { href: "/exports", label: "Exports" },
    { href: "/careers", label: "Careers" },
    { href: "/blog", label: "Blog" },
  ];

  const legalLinks = [
    { href: "/privacy", label: "Privacy Policy" },
    { href: "/terms", label: "Terms of Service" },
    { href: "/cookies", label: "Cookie Policy" },
    { href: "/sitemap", label: "Sitemap" },
  ];

  const socialLinks = [
    { href: "https://facebook.com", label: "Facebook", icon: Facebook },
    { href: "https://twitter.com", label: "Twitter", icon: Twitter },
    { href: "https://linkedin.com", label: "LinkedIn", icon: Linkedin },
    { href: "https://instagram.com", label: "Instagram", icon: Instagram },
    { href: "https://youtube.com", label: "YouTube", icon: Youtube },
  ];

  return (
    <footer className="bg-gray-800 dark:bg-gray-900 border-t border-gray-700 dark:border-gray-800">
      <div className="px-4 sm:px-10 lg:px-20 xl:px-40 py-16 max-w-[1280px] mx-auto">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12 mb-12">
          {/* Company Info */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3 mb-2">
              <Image
                src="/logo.png"
                alt="Gelila Manufacturing PLC"
                width={120}
                height={40}
                className="h-10 w-auto"
              />
              <h3 className="text-lg font-bold text-white">
                {footerData.company.name}
              </h3>
            </div>
            <p className="text-sm text-gray-300 leading-relaxed">
              {footerData.company.description}
            </p>

            {/* Contact Info */}
            <div className="flex flex-col gap-3 mt-2">
              <div className="flex items-start gap-3">
                <MapPin className="size-4 text-primary mt-1 shrink-0" />
                <p className="text-sm text-gray-300">
                  {footerData.contact.address.line1}
                  <br />
                  {footerData.contact.address.line2}
                  <br />
                  {footerData.contact.address.line3}
                </p>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="size-4 text-primary shrink-0" />
                <div className="flex flex-col gap-1">
                  {footerData.contact.phones.map((phone, index) => (
                    <Link
                      key={index}
                      href={phone.href}
                      className="text-sm text-gray-300 hover:text-primary transition-colors"
                    >
                      {phone.number}
                    </Link>
                  ))}
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="size-4 text-primary shrink-0" />
                <Link
                  href={footerData.contact.email.href}
                  className="text-sm text-gray-300 hover:text-primary transition-colors break-all"
                >
                  {footerData.contact.email.address}
                </Link>
              </div>
            </div>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="font-semibold text-white mb-4 text-base">Company</h4>
            <ul className="flex flex-col gap-3">
              {companyLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-300 hover:text-primary transition-colors inline-block"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h4 className="font-semibold text-white mb-4 text-base">Legal</h4>
            <ul className="flex flex-col gap-3">
              {legalLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-300 hover:text-primary transition-colors inline-block"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-700 dark:border-gray-800 mb-8"></div>

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-center md:text-left">
            <p className="text-sm text-gray-300">
              © {currentYear} {footerData.company.name}. All Rights Reserved.
            </p>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-4">
            {socialLinks.map((social) => {
              const Icon = social.icon;
              return (
                <Link
                  key={social.href}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="size-10 flex items-center justify-center rounded-lg bg-gray-700 dark:bg-gray-800 text-gray-300 hover:text-primary hover:bg-gray-600 dark:hover:bg-gray-700 transition-all duration-200"
                >
                  <Icon className="size-5" />
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </footer>
  );
}
