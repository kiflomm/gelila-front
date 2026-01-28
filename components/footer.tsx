"use client";

import React from "react";
import Link from "next/link";
import Image from "@/components/ui/image";
import {
  Mail,
  Phone,
  MapPin,
  Facebook,
  Twitter,
  Linkedin,
  Instagram,
  Youtube,
  Github,
  Slack,
  MessageCircle,
  Send,
  Globe,
  Music,
  Twitch,
  Share2,
} from "lucide-react";
import footerData from "@/data/footer.json";
import navigationData from "@/data/navigation.json";
import { useSocialMedia } from "@/hooks/use-social-media";

// Icon mapping for social media
const iconMap: Record<string, any> = {
  Facebook,
  Twitter,
  Linkedin,
  Instagram,
  Youtube,
  Github,
  Slack,
  MessageCircle,
  Send,
  Globe,
  Music,
  Twitch,
  Tiktok: Music,
  Telegram: Send,
  WhatsApp: MessageCircle,
  Web: Globe,
};

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const { data: socialMediaLinks = [], isLoading } = useSocialMedia();

  const companyLinks = [
    { href: "/about", label: "About Us" },
    // { href: "/products", label: "Products" },
    { href: "/exports", label: "Exports" },
    { href: "/careers", label: "Careers" },
    { href: "/news", label: "Blog" },
  ];

  const subsidiaryLinks = navigationData.dropdowns.companies.sections[0].items;

  const legalLinks = [
    { href: "/privacy", label: "Privacy Policy" },
    { href: "/terms", label: "Terms of Service" },
    { href: "/cookies", label: "Cookie Policy" },
  ];

  const socialLinks = socialMediaLinks
    .filter((link) => link.isActive)
    .map((link) => ({
      href: link.href,
      label: link.label,
      icon: iconMap[link.icon] || iconMap[link.icon.replace(/\s+/g, '')] || Facebook, // Fallback to Facebook if icon not found
    }))
    .filter((link) => link.icon); // Filter out any links without valid icons

  return (
    <footer className="relative bg-linear-to-b from-gray-900 via-gray-800 to-gray-900 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 border-t border-gray-700/50 dark:border-gray-800/50">
      {/* Decorative gradient overlay */}
      <div className="absolute inset-0 bg-linear-to-r from-primary/5 via-transparent to-primary/5 pointer-events-none" />

      <div className="relative px-4 sm:px-6 lg:px-8 xl:px-16 py-4 sm:py-5 lg:py-6 max-w-[1280px] mx-auto">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5 lg:gap-6 mb-4">
          {/* Company Info & Logo */}
          <div className="flex flex-col gap-3 md:col-span-2 lg:col-span-1">
            <Link href="/" className="group">
              <div className="flex flex-col items-start gap-0 shrink-0 bg-white px-2 py-1 rounded">
                <Image
                  src="/logo-left.png"
                  alt="Gelila Manufacturing PLC"
                  width={100}
                  height={80}
                  className="h-6 sm:h-7 md:h-7 lg:h-8 w-auto shrink-0"
                />
                <Image
                  src="/logo-right.png"
                  alt="Gelila Manufacturing PLC"
                  width={100}
                  height={80}
                  className="hidden sm:block h-8 sm:h-10 md:h-10 lg:h-12 w-auto shrink-0"
                />
              </div>
            </Link>

            <div className="flex flex-col gap-2">
              <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Follow Us
              </span>
              {isLoading ? (
                <div className="flex items-center gap-3">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <div
                      key={i}
                      className="size-9 rounded-xl bg-gray-700/50 dark:bg-gray-800/50 animate-pulse"
                    />
                  ))}
                </div>
              ) : (
                <div className="flex items-center gap-3 flex-wrap">
                  {socialLinks.map((social, index) => {
                    const Icon = social.icon;
                    return (
                      <Link
                        key={`${social.href}-${index}`}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={social.label}
                        className="group relative size-9 flex items-center justify-center rounded-xl bg-gray-800/50 dark:bg-gray-900/50 backdrop-blur-sm text-gray-400 hover:text-white hover:bg-primary/20 border border-gray-700/50 dark:border-gray-800/50 hover:border-primary/50 transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-primary/20"
                      >
                        <Icon className="size-5 transition-transform duration-300 group-hover:scale-110" />
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
          </div>

          {/* Company Links */}
          <div className="flex flex-col gap-3">
            <h4 className="text-base font-bold text-white mb-1 relative inline-block">
              Company
              <span className="absolute -bottom-1 left-0 w-8 h-0.5 bg-linear-to-r from-primary to-primary/50 rounded-full" />
            </h4>
            <ul className="flex flex-col gap-2">
              {companyLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="group text-sm text-gray-400 hover:text-white transition-all duration-200 inline-flex items-center gap-2"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-gray-600 group-hover:bg-primary opacity-0 group-hover:opacity-100 transition-all duration-200" />
                    <span className="group-hover:translate-x-1 transition-transform duration-200">
                      {link.label}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Subsidiary Companies */}
          <div className="flex flex-col gap-3">
            <h4 className="text-base font-bold text-white mb-1 relative inline-block">
              Subsidiaries
              <span className="absolute -bottom-1 left-0 w-8 h-0.5 bg-linear-to-r from-primary to-primary/50 rounded-full" />
            </h4>
            <ul className="flex flex-col gap-2">
              {subsidiaryLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="group text-sm text-gray-400 hover:text-white transition-all duration-200 inline-flex items-center gap-2"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-gray-600 group-hover:bg-primary opacity-0 group-hover:opacity-100 transition-all duration-200" />
                    <span className="group-hover:translate-x-1 transition-transform duration-200">
                      {link.label}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Us */}
          <div className="flex flex-col gap-3">
            <h4 className="text-base font-bold text-white mb-1 relative inline-block">
              Contact Us
              <span className="absolute -bottom-1 left-0 w-8 h-0.5 bg-linear-to-r from-primary to-primary/50 rounded-full" />
            </h4>
            <div className="flex flex-col gap-2">
              <div className="group flex items-start gap-3 p-2 rounded-lg bg-gray-800/30 dark:bg-gray-900/30 hover:bg-gray-800/50 dark:hover:bg-gray-900/50 transition-all duration-200">
                <div className="mt-0.5 p-1.5 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors duration-200">
                  <MapPin className="size-4 text-primary shrink-0" />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-300 leading-relaxed">
                    {footerData.contact.address.line1}
                    <br />
                    {footerData.contact.address.line2}
                    {footerData.contact.address.line3 && (
                      <>
                        <br />
                        {footerData.contact.address.line3}
                      </>
                    )}
                  </p>
                </div>
              </div>

              <div className="group flex items-start gap-3 p-2 rounded-lg bg-gray-800/30 dark:bg-gray-900/30 hover:bg-gray-800/50 dark:hover:bg-gray-900/50 transition-all duration-200">
                <div className="mt-0.5 p-1.5 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors duration-200">
                  <Phone className="size-4 text-primary shrink-0" />
                </div>
                <div className="flex flex-col gap-2 flex-1">
                  {footerData.contact.phones.map((phone, index) => (
                    <Link
                      key={index}
                      href={phone.href}
                      className="text-sm text-gray-300 hover:text-primary transition-colors duration-200"
                    >
                      {phone.number}
                    </Link>
                  ))}
                </div>
              </div>

              <div className="group flex items-start gap-3 p-2 rounded-lg bg-gray-800/30 dark:bg-gray-900/30 hover:bg-gray-800/50 dark:hover:bg-gray-900/50 transition-all duration-200">
                <div className="mt-0.5 p-1.5 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors duration-200">
                  <Mail className="size-4 text-primary shrink-0" />
                </div>
                <Link
                  href={footerData.contact.email.href}
                  className="text-sm text-gray-300 hover:text-primary transition-colors duration-200 break-all flex-1"
                >
                  {footerData.contact.email.address}
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="relative my-4">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-700/50 dark:border-gray-800/50" />
          </div>
          <div className="relative flex justify-center">
            <div className="bg-gray-800 dark:bg-gray-900 px-4">
              <div className="w-12 h-0.5 bg-linear-to-r from-transparent via-primary to-transparent rounded-full" />
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-3">
          {/* Copyright */}
          <div className="text-center md:text-left">
            <p className="text-sm text-gray-400">
              © {currentYear} {footerData.company.name}. All Rights Reserved.
            </p>
            <p className="text-xs text-gray-500 mt-1">
              <Link
                href="https://memiplc.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary transition-colors duration-200"
              >
                Powered by MeMi Trading PLC
              </Link>
            </p>
          </div>

          {/* Legal Links */}
          <div className="flex flex-wrap justify-center md:justify-end items-center gap-x-5 gap-y-2">
            {legalLinks.map((link, index) => (
              <React.Fragment key={link.href}>
                <Link
                  href={link.href}
                  className="text-xs text-gray-400 hover:text-primary transition-colors duration-200 font-medium"
                >
                  {link.label}
                </Link>
                {index < legalLinks.length - 1 && (
                  <span className="text-gray-600 dark:text-gray-600 text-xs">
                    •
                  </span>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
