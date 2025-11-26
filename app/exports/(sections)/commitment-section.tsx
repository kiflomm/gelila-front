import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Globe, ShieldCheck, Truck, Handshake } from "lucide-react";

export default function CommitmentSection() {
  return (
    <section className="py-12 px-4">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        <div className="flex flex-col gap-4">
          <h2 className="text-[#181411] dark:text-white text-2xl sm:text-3xl font-bold leading-tight tracking-[-0.015em]">
            Our Commitment to Global Excellence
          </h2>
          <p className="text-[#6c757d] dark:text-gray-400 text-base font-normal leading-relaxed">
            At Gelila Manufacturing PLC, our export division is built on a
            foundation of reliability, quality, and seamless logistics. We
            provide comprehensive support to our international partners,
            ensuring that every product meets rigorous standards and reaches its
            destination efficiently.
          </p>
        </div>
        <div className="flex flex-col gap-3">
          <Accordion
            type="single"
            collapsible
            defaultValue="item-1"
            className="space-y-3"
          >
            <AccordionItem
              value="item-1"
              className="rounded-lg border border-[#e6e0db] dark:border-gray-700 bg-white dark:bg-background-dark/50 p-[15px] border-b-0"
            >
              <AccordionTrigger className="py-2 hover:no-underline [&>svg]:text-[#181411] dark:[&>svg]:text-gray-300">
                <div className="flex items-center gap-4">
                  <Globe className="text-primary text-2xl shrink-0" />
                  <p className="text-[#181411] dark:text-white text-base font-medium leading-normal">
                    Export-Readiness
                  </p>
                </div>
              </AccordionTrigger>
              <AccordionContent className="pt-2 pl-10">
                <p className="text-[#6c757d] dark:text-gray-400 text-sm font-normal leading-normal">
                  We ensure all products meet international standards with
                  robust production capacity, superior packaging, and
                  market-specific readiness for seamless global distribution.
                </p>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem
              value="item-2"
              className="rounded-lg border border-[#e6e0db] dark:border-gray-700 bg-white dark:bg-background-dark/50 p-[15px] border-b-0"
            >
              <AccordionTrigger className="py-2 hover:no-underline [&>svg]:text-[#181411] dark:[&>svg]:text-gray-300">
                <div className="flex items-center gap-4">
                  <ShieldCheck className="text-primary text-2xl shrink-0" />
                  <p className="text-[#181411] dark:text-white text-base font-medium leading-normal">
                    Quality Control & Compliance
                  </p>
                </div>
              </AccordionTrigger>
              <AccordionContent className="pt-2 pl-10">
                <p className="text-[#6c757d] dark:text-gray-400 text-sm font-normal leading-normal">
                  Our facilities are ISO certified, and we adhere to stringent
                  internal quality assurance protocols to meet and exceed
                  international compliance requirements.
                </p>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem
              value="item-3"
              className="rounded-lg border border-[#e6e0db] dark:border-gray-700 bg-white dark:bg-background-dark/50 p-[15px] border-b-0"
            >
              <AccordionTrigger className="py-2 hover:no-underline [&>svg]:text-[#181411] dark:[&>svg]:text-gray-300">
                <div className="flex items-center gap-4">
                  <Truck className="text-primary text-2xl shrink-0" />
                  <p className="text-[#181411] dark:text-white text-base font-medium leading-normal">
                    Logistics & Shipping
                  </p>
                </div>
              </AccordionTrigger>
              <AccordionContent className="pt-2 pl-10">
                <p className="text-[#6c757d] dark:text-gray-400 text-sm font-normal leading-normal">
                  We work with trusted freight partners to offer reliable
                  shipping timelines, flexible incoterms, and real-time tracking
                  for all our international shipments.
                </p>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem
              value="item-4"
              className="rounded-lg border border-[#e6e0db] dark:border-gray-700 bg-white dark:bg-background-dark/50 p-[15px] border-b-0"
            >
              <AccordionTrigger className="py-2 hover:no-underline [&>svg]:text-[#181411] dark:[&>svg]:text-gray-300">
                <div className="flex items-center gap-4">
                  <Handshake className="text-primary text-2xl shrink-0" />
                  <p className="text-[#181411] dark:text-white text-base font-medium leading-normal">
                    Partner Requirements
                  </p>
                </div>
              </AccordionTrigger>
              <AccordionContent className="pt-2 pl-10">
                <p className="text-[#6c757d] dark:text-gray-400 text-sm font-normal leading-normal">
                  We seek dedicated distributors and importers. Our guidelines
                  ensure mutual growth and a commitment to upholding quality and
                  brand integrity in every market.
                </p>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    </section>
  );
}
