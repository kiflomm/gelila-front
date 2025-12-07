import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Globe, ShieldCheck, Truck, Handshake } from "lucide-react";
import commitmentData from "@/data/imports-commitment.json";

// Icon mapping for commitments
const iconMap: Record<string, typeof Globe> = {
  Globe,
  ShieldCheck,
  Truck,
  Handshake,
};

export default function CommitmentSection() {
  return (
    <section className="py-12 px-4">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        <div className="flex flex-col gap-4">
          <h2 className="text-[#181411] dark:text-white text-2xl sm:text-3xl font-bold leading-tight tracking-[-0.015em]">
            {commitmentData.title}
          </h2>
          <p className="text-[#6c757d] dark:text-gray-400 text-base font-normal leading-relaxed">
            {commitmentData.description}
          </p>
        </div>
        <div className="flex flex-col gap-3">
          <Accordion
            type="single"
            collapsible
            defaultValue={commitmentData.commitments[0].id}
            className="space-y-3"
          >
            {commitmentData.commitments.map((commitment) => {
              const Icon = iconMap[commitment.icon] || Globe;
              return (
                <AccordionItem
                  key={commitment.id}
                  value={commitment.id}
                  className="rounded-lg border border-[#e6e0db] dark:border-gray-700 bg-white dark:bg-background-dark/50 p-[15px] border-b-0"
                >
                  <AccordionTrigger className="py-2 hover:no-underline [&>svg]:text-[#181411] dark:[&>svg]:text-gray-300">
                    <div className="flex items-center gap-4">
                      <Icon className="text-primary text-2xl shrink-0" />
                      <p className="text-[#181411] dark:text-white text-base font-medium leading-normal">
                        {commitment.title}
                      </p>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="pt-2 pl-10">
                    <p className="text-[#6c757d] dark:text-gray-400 text-sm font-normal leading-normal">
                      {commitment.description}
                    </p>
                  </AccordionContent>
                </AccordionItem>
              );
            })}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
