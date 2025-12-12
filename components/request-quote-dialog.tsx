"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { ordersApi } from "@/api/orders";
import { Controller } from "react-hook-form";

const quoteRequestSchema = z.object({
  fullName: z
    .string()
    .min(1, "Full name is required")
    .min(2, "Full name must be at least 2 characters")
    .max(100, "Full name must be less than 100 characters"),
  email: z
    .string()
    .min(1, "Email is required")
    .email("Please provide a valid email address"),
  phone: z
    .string()
    .optional()
    .or(z.literal("")),
  companyName: z
    .string()
    .optional()
    .or(z.literal(""))
    .refine((val) => !val || val.length <= 100, {
      message: "Company name must be less than 100 characters",
    }),
  productServiceInterest: z
    .string()
    .min(1, "Product/Service interest is required")
    .min(3, "Product/Service interest must be at least 3 characters")
    .max(200, "Product/Service interest must be less than 200 characters"),
  estimatedQuantity: z
    .string()
    .optional()
    .or(z.literal(""))
    .refine((val) => !val || val.length <= 100, {
      message: "Estimated quantity must be less than 100 characters",
    }),
  additionalDetails: z
    .string()
    .min(1, "Additional details are required")
    .min(10, "Additional details must be at least 10 characters")
    .max(5000, "Additional details must be less than 5000 characters"),
});

type QuoteRequestFormData = z.infer<typeof quoteRequestSchema>;

interface Product {
  id: number;
  name: string;
}

interface RequestQuoteDialogProps {
  trigger?: React.ReactNode;
  variant?: "default" | "outline";
  className?: string;
  products?: Product[];
  defaultProductId?: number;
}

export function RequestQuoteDialog({
  trigger,
  variant = "default",
  className,
  products = [],
  defaultProductId,
}: RequestQuoteDialogProps) {
  const [isOpen, setIsOpen] = useState(false);
  const defaultProduct = defaultProductId 
    ? products.find(p => p.id === defaultProductId)
    : products[0];
  
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<QuoteRequestFormData>({
    resolver: zodResolver(quoteRequestSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      companyName: "",
      productServiceInterest: defaultProduct?.name || "",
      estimatedQuantity: "",
      additionalDetails: "",
    },
  });

  const onSubmit = async (data: QuoteRequestFormData) => {
    try {
      await ordersApi.submitQuoteRequest({
        fullName: data.fullName,
        email: data.email,
        phone: data.phone || undefined,
        companyName: data.companyName || undefined,
        productServiceInterest: data.productServiceInterest,
        estimatedQuantity: data.estimatedQuantity || undefined,
        additionalDetails: data.additionalDetails,
      });

      toast.success("Quote request submitted!", {
        description: "Thank you for your quote request! We'll get back to you soon.",
      });

      // Reset form and close dialog
      reset();
      setIsOpen(false);
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Failed to submit quote request. Please try again.";
      toast.error("Submission failed", {
        description: errorMessage,
      });
    }
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
          onSubmit={handleSubmit(onSubmit)}
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
                {...register("fullName")}
                className="w-full rounded-lg border-[#F8F9FA] dark:border-white/10 bg-[#F8F9FA] dark:bg-background-dark text-[#212529] dark:text-white placeholder:text-[#6C757D] focus:ring-primary focus:border-primary"
                placeholder="John Doe"
              />
              {errors.fullName && (
                <p className="mt-1 text-xs text-red-500">{errors.fullName.message}</p>
              )}
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
                {...register("email")}
                className="w-full rounded-lg border-[#F8F9FA] dark:border-white/10 bg-[#F8F9FA] dark:bg-background-dark text-[#212529] dark:text-white placeholder:text-[#6C757D] focus:ring-primary focus:border-primary"
                placeholder="john@example.com"
              />
              {errors.email && (
                <p className="mt-1 text-xs text-red-500">{errors.email.message}</p>
              )}
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
                {...register("phone")}
                className="w-full rounded-lg border-[#F8F9FA] dark:border-white/10 bg-[#F8F9FA] dark:bg-background-dark text-[#212529] dark:text-white placeholder:text-[#6C757D] focus:ring-primary focus:border-primary"
                placeholder="+251 111 223 344"
              />
              {errors.phone && (
                <p className="mt-1 text-xs text-red-500">{errors.phone.message}</p>
              )}
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
                {...register("companyName")}
                className="w-full rounded-lg border-[#F8F9FA] dark:border-white/10 bg-[#F8F9FA] dark:bg-background-dark text-[#212529] dark:text-white placeholder:text-[#6C757D] focus:ring-primary focus:border-primary"
                placeholder="Your Company"
              />
              {errors.companyName && (
                <p className="mt-1 text-xs text-red-500">{errors.companyName.message}</p>
              )}
            </div>
          </div>
          <div>
            <Label
              htmlFor="quote-product"
              className="block text-sm font-medium text-[#181411] dark:text-white mb-2"
            >
              Product/Service Interest *
            </Label>
            {products.length > 0 ? (
              <Controller
                name="productServiceInterest"
                control={control}
                render={({ field }) => (
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger
                      id="quote-product"
                      className="w-full rounded-lg border-[#F8F9FA] dark:border-white/10 bg-[#F8F9FA] dark:bg-background-dark text-[#212529] dark:text-white focus:ring-primary focus:border-primary"
                    >
                      <SelectValue placeholder="Select a product or service" />
                    </SelectTrigger>
                    <SelectContent>
                      {products.map((product) => (
                        <SelectItem key={product.id} value={product.name}>
                          {product.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
            ) : (
              <Input
                id="quote-product"
                type="text"
                {...register("productServiceInterest")}
                className="w-full rounded-lg border-[#F8F9FA] dark:border-white/10 bg-[#F8F9FA] dark:bg-background-dark text-[#212529] dark:text-white placeholder:text-[#6C757D] focus:ring-primary focus:border-primary"
                placeholder="What product or service are you interested in?"
              />
            )}
            {errors.productServiceInterest && (
              <p className="mt-1 text-xs text-red-500">{errors.productServiceInterest.message}</p>
            )}
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
              {...register("estimatedQuantity")}
              className="w-full rounded-lg border-[#F8F9FA] dark:border-white/10 bg-[#F8F9FA] dark:bg-background-dark text-[#212529] dark:text-white placeholder:text-[#6C757D] focus:ring-primary focus:border-primary"
              placeholder="e.g., 100 units, 500 kg, etc."
            />
            {errors.estimatedQuantity && (
              <p className="mt-1 text-xs text-red-500">{errors.estimatedQuantity.message}</p>
            )}
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
              {...register("additionalDetails")}
              className="w-full rounded-lg border-[#F8F9FA] dark:border-white/10 bg-[#F8F9FA] dark:bg-background-dark text-[#212529] dark:text-white placeholder:text-[#6C757D] focus:ring-primary focus:border-primary"
              placeholder="Tell us more about your requirements, timeline, or any specific needs..."
            />
            {errors.additionalDetails && (
              <p className="mt-1 text-xs text-red-500">{errors.additionalDetails.message}</p>
            )}
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
