import Link from "next/link";
import { MapPin, Phone, Mail, Clock } from "lucide-react";

export default function ContactInfoSection() {
  return (
    <section className="py-6">
      <div className="p-8 bg-white dark:bg-black/20 border border-primary/20 rounded-xl">
        <h2 className="text-[#181411] dark:text-white text-2xl font-bold mb-6">
          Contact Information
        </h2>
        <div className="flex flex-col gap-6">
          {/* Address */}
          <div className="flex items-start gap-4">
            <div className="flex items-center justify-center size-12 bg-primary/20 rounded-full text-primary shrink-0">
              <MapPin className="size-6" />
            </div>
            <div>
              <h3 className="text-[#181411] dark:text-white font-semibold mb-1">
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
          <div className="flex items-start gap-4">
            <div className="flex items-center justify-center size-12 bg-primary/20 rounded-full text-primary shrink-0">
              <Phone className="size-6" />
            </div>
            <div>
              <h3 className="text-[#181411] dark:text-white font-semibold mb-1">
                Phone
              </h3>
              <Link
                href="tel:+251111223344"
                className="text-[#495057] dark:text-white/80 text-sm hover:text-primary transition-colors"
              >
                +251 111 223 344
              </Link>
            </div>
          </div>

          {/* Email */}
          <div className="flex items-start gap-4">
            <div className="flex items-center justify-center size-12 bg-primary/20 rounded-full text-primary shrink-0">
              <Mail className="size-6" />
            </div>
            <div>
              <h3 className="text-[#181411] dark:text-white font-semibold mb-1">
                Email
              </h3>
              <Link
                href="mailto:info@gelilaplc.com"
                className="text-[#495057] dark:text-white/80 text-sm hover:text-primary transition-colors"
              >
                info@gelilaplc.com
              </Link>
            </div>
          </div>

          {/* Business Hours */}
          <div className="flex items-start gap-4">
            <div className="flex items-center justify-center size-12 bg-primary/20 rounded-full text-primary shrink-0">
              <Clock className="size-6" />
            </div>
            <div>
              <h3 className="text-[#181411] dark:text-white font-semibold mb-1">
                Business Hours
              </h3>
              <div className="text-[#495057] dark:text-white/80 text-sm leading-relaxed">
                <p>Monday - Friday: 8:00 AM - 5:00 PM</p>
                <p>Saturday: 9:00 AM - 1:00 PM</p>
                <p>Sunday: Closed</p>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Info */}
        <div className="mt-8 pt-8 border-t border-primary/20">
          <p className="text-[#495057] dark:text-white/80 text-sm leading-relaxed">
            For urgent matters or after-hours inquiries, please email us and we'll
            respond as soon as possible.
          </p>
        </div>
      </div>
    </section>
  );
}

