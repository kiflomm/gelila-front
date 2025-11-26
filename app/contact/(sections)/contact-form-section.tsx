"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

export default function ContactFormSection() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      alert("Thank you for your message! We'll get back to you soon.");
      (e.target as HTMLFormElement).reset();
    }, 1000);
  };

  return (
    <section className="py-6">
      <div className="p-8 bg-white dark:bg-black/20 border border-primary/20 rounded-xl">
        <h2 className="text-[#181411] dark:text-white text-2xl font-bold mb-6">
          Send Us a Message
        </h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label
                htmlFor="name"
                className="block text-sm font-medium text-[#181411] dark:text-white mb-2"
              >
                Full Name *
              </Label>
              <Input
                id="name"
                type="text"
                required
                className="w-full rounded-lg border-[#F8F9FA] dark:border-white/10 bg-[#F8F9FA] dark:bg-background-dark text-[#212529] dark:text-white placeholder:text-[#6C757D] focus:ring-primary focus:border-primary"
                placeholder="John Doe"
              />
            </div>
            <div>
              <Label
                htmlFor="email"
                className="block text-sm font-medium text-[#181411] dark:text-white mb-2"
              >
                Email Address *
              </Label>
              <Input
                id="email"
                type="email"
                required
                className="w-full rounded-lg border-[#F8F9FA] dark:border-white/10 bg-[#F8F9FA] dark:bg-background-dark text-[#212529] dark:text-white placeholder:text-[#6C757D] focus:ring-primary focus:border-primary"
                placeholder="john@example.com"
              />
            </div>
          </div>
          <div>
            <Label
              htmlFor="phone"
              className="block text-sm font-medium text-[#181411] dark:text-white mb-2"
            >
              Phone Number
            </Label>
            <Input
              id="phone"
              type="tel"
              className="w-full rounded-lg border-[#F8F9FA] dark:border-white/10 bg-[#F8F9FA] dark:bg-background-dark text-[#212529] dark:text-white placeholder:text-[#6C757D] focus:ring-primary focus:border-primary"
              placeholder="+251 111 223 344"
            />
          </div>
          <div>
            <Label
              htmlFor="subject"
              className="block text-sm font-medium text-[#181411] dark:text-white mb-2"
            >
              Subject *
            </Label>
            <Input
              id="subject"
              type="text"
              required
              className="w-full rounded-lg border-[#F8F9FA] dark:border-white/10 bg-[#F8F9FA] dark:bg-background-dark text-[#212529] dark:text-white placeholder:text-[#6C757D] focus:ring-primary focus:border-primary"
              placeholder="How can we help?"
            />
          </div>
          <div>
            <Label
              htmlFor="message"
              className="block text-sm font-medium text-[#181411] dark:text-white mb-2"
            >
              Message *
            </Label>
            <Textarea
              id="message"
              rows={6}
              required
              className="w-full rounded-lg border-[#F8F9FA] dark:border-white/10 bg-[#F8F9FA] dark:bg-background-dark text-[#212529] dark:text-white placeholder:text-[#6C757D] focus:ring-primary focus:border-primary"
              placeholder="Tell us more about your inquiry..."
            />
          </div>
          <Button
            type="submit"
            disabled={isSubmitting}
            className="flex! w-full! cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 px-5 bg-primary! text-white text-base font-bold leading-normal tracking-[0.015em] hover:opacity-90! transition-opacity hover:bg-primary! disabled:opacity-50"
          >
            <span className="truncate">
              {isSubmitting ? "Sending..." : "Send Message"}
            </span>
          </Button>
        </form>
      </div>
    </section>
  );
}

