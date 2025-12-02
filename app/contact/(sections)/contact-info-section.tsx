import Link from "next/link";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import contactInfoData from "@/data/contact-info.json";

// Icon mapping
const iconMap: Record<string, typeof MapPin> = {
  MapPin,
  Phone,
  Mail,
  Clock,
};

export default function ContactInfoSection() {
  return (
    <section className="py-4 sm:py-6">
      <div className="p-6 sm:p-8 bg-white dark:bg-black/20 border border-primary/10 rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300">
        <h2 className="text-[#181411] dark:text-white text-xl sm:text-2xl font-bold mb-6 sm:mb-8">
          {contactInfoData.title}
        </h2>
        <div className="flex flex-col gap-5 sm:gap-6">
          {contactInfoData.sections.map((section, index) => {
            const Icon = iconMap[section.icon] || MapPin;
            return (
              <div
                key={index}
                className="group flex items-start gap-4 transition-all duration-200"
              >
                <div className="flex items-center justify-center size-14 bg-primary rounded-full text-white shrink-0 shadow-md group-hover:shadow-lg group-hover:scale-110 transition-all duration-200">
                  <Icon className="size-6" />
                </div>
                <div className="flex-1 pt-1">
                  <h3 className="text-[#181411] dark:text-white font-semibold mb-1.5 text-base">
                    {section.title}
                  </h3>
                  {section.type === "address" &&
                    typeof section.content === "object" &&
                    "line1" in section.content &&
                    "line2" in section.content &&
                    "line3" in section.content && (
                      <p className="text-[#495057] dark:text-white/80 text-sm leading-relaxed">
                        {
                          (
                            section.content as {
                              line1: string;
                              line2: string;
                              line3: string;
                            }
                          ).line1
                        }
                        <br />
                        {
                          (
                            section.content as {
                              line1: string;
                              line2: string;
                              line3: string;
                            }
                          ).line2
                        }
                        <br />
                        {
                          (
                            section.content as {
                              line1: string;
                              line2: string;
                              line3: string;
                            }
                          ).line3
                        }
                      </p>
                    )}
                  {section.type === "phone" &&
                    Array.isArray(section.content) && (
                      <div className="flex flex-col gap-1">
                        {(
                          section.content as Array<{
                            number: string;
                            href: string;
                          }>
                        ).map((phone, phoneIndex) => (
                          <Link
                            key={phoneIndex}
                            href={phone.href}
                            className="text-[#495057] dark:text-white/80 text-sm hover:text-primary transition-colors duration-200 inline-block"
                          >
                            {phone.number}
                          </Link>
                        ))}
                      </div>
                    )}
                  {section.type === "email" &&
                    typeof section.content === "object" &&
                    "href" in section.content &&
                    "address" in section.content && (
                      <Link
                        href={
                          (section.content as { address: string; href: string })
                            .href
                        }
                        className="text-[#495057] dark:text-white/80 text-sm hover:text-primary transition-colors duration-200 inline-block break-all"
                      >
                        {
                          (section.content as { address: string; href: string })
                            .address
                        }
                      </Link>
                    )}
                  {section.type === "hours" &&
                    Array.isArray(section.content) && (
                      <div className="text-[#495057] dark:text-white/80 text-sm leading-relaxed space-y-0.5">
                        {(section.content as string[]).map(
                          (hour, hourIndex) => (
                            <p key={hourIndex}>{hour}</p>
                          )
                        )}
                      </div>
                    )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Additional Info */}
        <div className="mt-8 pt-6 border-t border-primary/10">
          <p className="text-[#495057] dark:text-white/80 text-sm leading-relaxed">
            {contactInfoData.additionalInfo}
          </p>
        </div>
      </div>
    </section>
  );
}
