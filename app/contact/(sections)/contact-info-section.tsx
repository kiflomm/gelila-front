import Link from "next/link";
import { MapPin, Phone, Mail, Clock } from "lucide-react";

export default function ContactInfoSection() {
  return (
    <section className="py-4 sm:py-6">
      <div className="p-6 sm:p-8 bg-white dark:bg-black/20 border border-primary/10 rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300">
        <h2 className="text-[#181411] dark:text-white text-xl sm:text-2xl font-bold mb-6 sm:mb-8">
          Contact Information
        </h2>
        <div className="flex flex-col gap-5 sm:gap-6">
          {/* Address */}
          <div className="group flex items-start gap-4 transition-all duration-200">
            <div className="flex items-center justify-center size-14 bg-primary rounded-full text-white shrink-0 shadow-md group-hover:shadow-lg group-hover:scale-110 transition-all duration-200">
              <MapPin className="size-6" />
            </div>
            <div className="flex-1 pt-1">
              <h3 className="text-[#181411] dark:text-white font-semibold mb-1.5 text-base">
                Address
              </h3>
              <p className="text-[#495057] dark:text-white/80 text-sm leading-relaxed">
                123 Industrial Park
                <br />
                Addis Ababa, Ethiopia
              </p>
            </div>
          </div>

          {/* Phone */}
          <div className="group flex items-start gap-4 transition-all duration-200">
            <div className="flex items-center justify-center size-14 bg-primary rounded-full text-white shrink-0 shadow-md group-hover:shadow-lg group-hover:scale-110 transition-all duration-200">
              <Phone className="size-6" />
            </div>
            <div className="flex-1 pt-1">
              <h3 className="text-[#181411] dark:text-white font-semibold mb-1.5 text-base">
                Phone
              </h3>
              <Link
                href="tel:+251111223344"
                className="text-[#495057] dark:text-white/80 text-sm hover:text-primary transition-colors duration-200 inline-block"
              >
                +251 111 223 344
              </Link>
            </div>
          </div>

          {/* Email */}
          <div className="group flex items-start gap-4 transition-all duration-200">
            <div className="flex items-center justify-center size-14 bg-primary rounded-full text-white shrink-0 shadow-md group-hover:shadow-lg group-hover:scale-110 transition-all duration-200">
              <Mail className="size-6" />
            </div>
            <div className="flex-1 pt-1">
              <h3 className="text-[#181411] dark:text-white font-semibold mb-1.5 text-base">
                Email
              </h3>
              <Link
                href="mailto:info@gelilaplc.com"
                className="text-[#495057] dark:text-white/80 text-sm hover:text-primary transition-colors duration-200 inline-block break-all"
              >
                info@gelilaplc.com
              </Link>
            </div>
          </div>

          {/* Business Hours */}
          <div className="group flex items-start gap-4 transition-all duration-200">
            <div className="flex items-center justify-center size-14 bg-primary rounded-full text-white shrink-0 shadow-md group-hover:shadow-lg group-hover:scale-110 transition-all duration-200">
              <Clock className="size-6" />
            </div>
            <div className="flex-1 pt-1">
              <h3 className="text-[#181411] dark:text-white font-semibold mb-1.5 text-base">
                Business Hours
              </h3>
              <div className="text-[#495057] dark:text-white/80 text-sm leading-relaxed space-y-0.5">
                <p>Monday - Friday: 8:00 AM - 5:00 PM</p>
                <p>Saturday: 9:00 AM - 1:00 PM</p>
                <p>Sunday: Closed</p>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Info */}
        <div className="mt-8 pt-6 border-t border-primary/10">
          <p className="text-[#495057] dark:text-white/80 text-sm leading-relaxed">
            For urgent matters or after-hours inquiries, please email us and
            we'll respond as soon as possible.
          </p>
        </div>
      </div>
    </section>
  );
}
