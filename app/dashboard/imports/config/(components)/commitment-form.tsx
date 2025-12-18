"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import * as z from "zod";
import { type ImportCommitment, type CreateCommitmentData, type UpdateCommitmentData } from "@/api/imports";

const commitmentSchema = z.object({
  icon: z.string().min(2, "Icon must be at least 2 characters").max(50, "Icon must be less than 50 characters"),
  title: z.string().min(3, "Title must be at least 3 characters").max(200, "Title must be less than 200 characters"),
  description: z.string().min(10, "Description must be at least 10 characters").max(1000, "Description must be less than 1000 characters"),
  orderIndex: z.number().min(0).optional(),
});

type CommitmentFormData = z.infer<typeof commitmentSchema>;

interface BaseCommitmentFormProps {
  onCancel?: () => void;
  isSubmitting?: boolean;
}

interface CreateCommitmentFormProps extends BaseCommitmentFormProps {
  commitment?: undefined;
  onSubmit: (data: CreateCommitmentData) => Promise<void>;
}

interface EditCommitmentFormProps extends BaseCommitmentFormProps {
  commitment: ImportCommitment;
  onSubmit: (data: UpdateCommitmentData) => Promise<void>;
}

type CommitmentFormProps = CreateCommitmentFormProps | EditCommitmentFormProps;

export function CommitmentForm(props: CommitmentFormProps) {
  const { commitment, onCancel, isSubmitting = false } = props;
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<CommitmentFormData>({
    resolver: zodResolver(commitmentSchema),
    defaultValues: commitment
      ? {
          icon: commitment.icon,
          title: commitment.title,
          description: commitment.description,
          orderIndex: commitment.orderIndex,
        }
      : {
          orderIndex: 0,
        },
  });

  const onSubmitForm = async (data: CommitmentFormData) => {
    if (commitment) {
      await (props as EditCommitmentFormProps).onSubmit(data as UpdateCommitmentData);
      return;
    }

    await (props as CreateCommitmentFormProps).onSubmit(data as CreateCommitmentData);
  };

  return (
    <form onSubmit={handleSubmit(onSubmitForm)} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="icon">
          Icon Name <span className="text-destructive">*</span>
        </Label>
        <Input
          id="icon"
          {...register("icon")}
          placeholder="e.g., Globe, ShieldCheck, Truck, Handshake"
        />
        <p className="text-sm text-muted-foreground">
          Use icon names from lucide-react (e.g., Globe, ShieldCheck, Truck, Handshake)
        </p>
        {errors.icon && (
          <p className="text-sm text-destructive">{errors.icon.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="title">
          Title <span className="text-destructive">*</span>
        </Label>
        <Input
          id="title"
          {...register("title")}
          placeholder="e.g., Import-Readiness"
        />
        {errors.title && (
          <p className="text-sm text-destructive">{errors.title.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">
          Description <span className="text-destructive">*</span>
        </Label>
        <Textarea
          id="description"
          {...register("description")}
          placeholder="Describe the commitment..."
          rows={4}
        />
        {errors.description && (
          <p className="text-sm text-destructive">{errors.description.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="orderIndex">Order Index</Label>
        <Input
          id="orderIndex"
          type="number"
          {...register("orderIndex", { valueAsNumber: true })}
          placeholder="0"
          min={0}
        />
        {errors.orderIndex && (
          <p className="text-sm text-destructive">{errors.orderIndex.message}</p>
        )}
      </div>

      <div className="flex justify-end gap-2 pt-4">
        {onCancel && (
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
        )}
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Saving..." : commitment ? "Update Commitment" : "Create Commitment"}
        </Button>
      </div>
    </form>
  );
}

