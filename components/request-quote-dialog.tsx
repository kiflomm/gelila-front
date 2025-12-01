"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

interface RequestQuoteDialogProps {
  trigger?: React.ReactNode;
  variant?: "default" | "outline";
  className?: string;
}

export function RequestQuoteDialog({
  trigger,
  variant = "default",
  className,
}: RequestQuoteDialogProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      alert("Thank you for your quote request! We'll get back to you soon.");
      (e.target as HTMLFormElement).reset();
      setIsOpen(false);
    }, 1000);
  };

  const defaultTrigger = (
    <Button
      className={`flex! min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-primary! text-white text-sm font-bold leading-normal tracking-[0.015em] hover:opacity-90! transition-opacity hover:bg-primary! ${
        className || ""
      }`}
    >
      <span className="truncate">Request a Quote</span>
    </Button>
  );

  const outlineTrigger = (
    <Button
      variant="outline"
      className={`flex! min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 sm:h-12 sm:px-5 bg-transparent! border border-white! text-white! text-sm font-bold leading-normal tracking-[0.015em] sm:text-base hover:bg-white/10! transition-colors ${
        className || ""
      }`}
    >
      <span className="truncate">Request a Quote</span>
    </Button>
  );

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {trigger || (variant === "outline" ? outlineTrigger : defaultTrigger)}
      </DialogTrigger>
      <DialogContent className="max-w-2xl md:max-w-3xl lg:max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-[#181411] dark:text-white">
            Request a Quote
          </DialogTitle>
          <DialogDescription className="text-[#6C757D] dark:text-gray-400">
            Fill out the form below and we'll get back to you with a customized
            quote for your needs.
          </DialogDescription>
        </DialogHeader>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4 sm:gap-6 mt-4"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            <div>
              <Label
                htmlFor="quote-name"
                className="block text-sm font-medium text-[#181411] dark:text-white mb-2"
              >
                Full Name *
              </Label>
              <Input
                id="quote-name"
                type="text"
                required
                className="w-full rounded-lg border-[#F8F9FA] dark:border-white/10 bg-[#F8F9FA] dark:bg-background-dark text-[#212529] dark:text-white placeholder:text-[#6C757D] focus:ring-primary focus:border-primary"
                placeholder="John Doe"
              />
            </div>
            <div>
              <Label
                htmlFor="quote-email"
                className="block text-sm font-medium text-[#181411] dark:text-white mb-2"
              >
                Email Address *
              </Label>
              <Input
                id="quote-email"
                type="email"
                required
                className="w-full rounded-lg border-[#F8F9FA] dark:border-white/10 bg-[#F8F9FA] dark:bg-background-dark text-[#212529] dark:text-white placeholder:text-[#6C757D] focus:ring-primary focus:border-primary"
                placeholder="john@example.com"
              />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            <div>
              <Label
                htmlFor="quote-phone"
                className="block text-sm font-medium text-[#181411] dark:text-white mb-2"
              >
                Phone Number
              </Label>
              <Input
                id="quote-phone"
                type="tel"
                className="w-full rounded-lg border-[#F8F9FA] dark:border-white/10 bg-[#F8F9FA] dark:bg-background-dark text-[#212529] dark:text-white placeholder:text-[#6C757D] focus:ring-primary focus:border-primary"
                placeholder="+251 111 223 344"
              />
            </div>
            <div>
              <Label
                htmlFor="quote-company"
                className="block text-sm font-medium text-[#181411] dark:text-white mb-2"
              >
                Company Name
              </Label>
              <Input
                id="quote-company"
                type="text"
                className="w-full rounded-lg border-[#F8F9FA] dark:border-white/10 bg-[#F8F9FA] dark:bg-background-dark text-[#212529] dark:text-white placeholder:text-[#6C757D] focus:ring-primary focus:border-primary"
                placeholder="Your Company"
              />
            </div>
          </div>
          <div>
            <Label
              htmlFor="quote-product"
              className="block text-sm font-medium text-[#181411] dark:text-white mb-2"
            >
              Product/Service Interest *
            </Label>
            <Input
              id="quote-product"
              type="text"
              required
              className="w-full rounded-lg border-[#F8F9FA] dark:border-white/10 bg-[#F8F9FA] dark:bg-background-dark text-[#212529] dark:text-white placeholder:text-[#6C757D] focus:ring-primary focus:border-primary"
              placeholder="What product or service are you interested in?"
            />
          </div>
          <div>
            <Label
              htmlFor="quote-quantity"
              className="block text-sm font-medium text-[#181411] dark:text-white mb-2"
            >
              Estimated Quantity
            </Label>
            <Input
              id="quote-quantity"
              type="text"
              className="w-full rounded-lg border-[#F8F9FA] dark:border-white/10 bg-[#F8F9FA] dark:bg-background-dark text-[#212529] dark:text-white placeholder:text-[#6C757D] focus:ring-primary focus:border-primary"
              placeholder="e.g., 100 units, 500 kg, etc."
            />
          </div>
          <div>
            <Label
              htmlFor="quote-message"
              className="block text-sm font-medium text-[#181411] dark:text-white mb-2"
            >
              Additional Details *
            </Label>
            <Textarea
              id="quote-message"
              rows={6}
              required
              className="w-full rounded-lg border-[#F8F9FA] dark:border-white/10 bg-[#F8F9FA] dark:bg-background-dark text-[#212529] dark:text-white placeholder:text-[#6C757D] focus:ring-primary focus:border-primary"
              placeholder="Tell us more about your requirements, timeline, or any specific needs..."
            />
          </div>
          <Button
            type="submit"
            disabled={isSubmitting}
            className="flex! w-full! cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 px-5 bg-primary! text-white text-base font-bold leading-normal tracking-[0.015em] hover:opacity-90! transition-opacity hover:bg-primary! disabled:opacity-50"
          >
            <span className="truncate">
              {isSubmitting ? "Submitting..." : "Submit Quote Request"}
            </span>
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
