"use client";

import React from "react";
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
import companiesData from "@/data/companies/companies.json";
import { useSocialMedia } from "@/hooks/use-social-media";

// Icon mapping for social media
const iconMap: Record<string, typeof Facebook> = {
  Facebook,
  Twitter,
  Linkedin,
  Instagram,
  Youtube,
};

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const { data: socialMediaLinks = [], isLoading } = useSocialMedia();

  const companyLinks = [
    { href: "/about", label: "About Us" },
    { href: "/products", label: "Products" },
    { href: "/exports", label: "Exports" },
    { href: "/careers", label: "Careers" },
    { href: "/news", label: "Blog" },
  ];

  const subsidiaryLinks = companiesData.companies.map((company) => ({
    href: `/companies/${company.slug}`,
    label: company.name,
  }));

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
      icon: iconMap[link.icon],
    }));

  return (
    <footer className="bg-gray-800 dark:bg-gray-900 border-t border-gray-700 dark:border-gray-800">
      <div className="px-4 sm:px-4 lg:px-8 xl:px-16 py-16 max-w-[1280px] mx-auto">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 md:gap-8 lg:gap-3 xl:gap-4 mb-12">
          {/* Company Info */}
          <div className="flex flex-col gap-4 md:col-span-2 lg:col-span-2 lg:mr-16 xl:mr-20">
            <div className="flex items-start gap-3 mb-2">
              <div className="flex flex-col items-start gap-0 shrink-0 bg-white px-2 py-1 rounded">
                <Image
                  src="/logo-left.png"
                  alt="Gelila Manufacturing PLC"
                  width={100}
                  height={80}
                  className="h-8 sm:h-10 md:h-10 lg:h-12 w-auto shrink-0"
                />
                <Image
                  src="/logo-right.png"
                  alt="Gelila Manufacturing PLC"
                  width={100}
                  height={80}
                  className="hidden sm:block h-8 sm:h-10 md:h-10 lg:h-12 w-auto shrink-0"
                />
              </div>
            </div>
            {/* Social Media Buttons */}
            {isLoading ? (
              <div className="flex items-center gap-4">
                {Array.from({ length: 5 }).map((_, i) => (
                  <div
                    key={i}
                    className="size-10 rounded-lg bg-gray-700 dark:bg-gray-800 animate-pulse"
                  />
                ))}
              </div>
            ) : (
              <div className="flex items-center gap-4">
                {socialLinks.map((social, index) => {
                  const Icon = social.icon;
                  return (
                    <Link
                      key={`${social.href}-${index}`}
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
            )}
          </div>

          {/* Company Links */}
          <div className="lg:ml-4 xl:ml-6">
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

          {/* Subsidiary Companies */}
          <div className="lg:-ml-2 xl:-ml-2">
            <h4 className="font-semibold text-white mb-4 text-base">
              Subsidiaries
            </h4>
            <ul className="flex flex-col gap-3">
              {subsidiaryLinks.map((link) => (
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

          {/* Contact Us */}
          <div>
            <h4 className="font-semibold text-white mb-4 text-base">Contact Us</h4>
            <div className="flex flex-col gap-3">
              <div className="flex items-start gap-3">
                <MapPin className="size-4 text-primary mt-1 shrink-0" />
                <p className="text-sm text-gray-300">
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
        </div>

        {/* Divider */}
        <div className="border-t border-gray-700 dark:border-gray-800 mb-8"></div>

        {/* Bottom Section */}
        <div className="flex flex-col items-center gap-6">
          <div className="flex flex-col items-center">
            {/* Copyright */}
            <div className="text-center">
              <p className="text-sm text-gray-300">
                © {currentYear} {footerData.company.name}. All Rights Reserved.{" "}
                <Link
                  href="https://memitrading.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-primary transition-colors"
                >
                  Powered by MeMi Trading PLC
                </Link>
              </p>
            </div>

            {/* Legal Links */}
            <div className="flex flex-wrap justify-center items-center gap-x-4 md:gap-x-6 gap-y-2">
              {legalLinks.map((link, index) => (
                <React.Fragment key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-300 hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                  {index < legalLinks.length - 1 && (
                    <span className="text-gray-600 dark:text-gray-500">
                      |
                    </span>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
