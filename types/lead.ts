import { z } from "zod";

export type LeadStatus = "new" | "contacted" | "converted" | "spam";

export type SkinType = "dry" | "oily" | "combination" | "normal" | "sensitive";
export type SkinConcern = "acne" | "aging" | "pigmentation" | "dryness" | "dullness";

/** Shape of a lead row returned from Supabase */
export interface Lead {
  id: string;
  name: string;
  phone: string;
  email: string;
  skin_type: SkinType | null;
  skin_concern: SkinConcern | null;
  message: string | null;
  status: LeadStatus;
  created_at: string;
}

/** Zod schema – used for client-side AND server-side validation */
export const leadSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name is too long"),

  phone: z
    .string()
    .min(7, "Enter a valid phone number")
    .max(20, "Phone number is too long")
    .regex(/^[+\d\s\-().]+$/, "Enter a valid phone number"),

  email: z.string().email("Enter a valid email address"),

  skin_type: z.enum(["dry", "oily", "combination", "normal", "sensitive"], { 
    error: "Please select a valid skin type"
  }).optional().nullable(),
  
  skin_concern: z.enum(["acne", "aging", "pigmentation", "dryness", "dullness"], {
    error: "Please select a valid primary skin concern"
  }).optional().nullable(),

  message: z.string().max(500, "Message is too long").optional(),
});

export type LeadFormValues = z.infer<typeof leadSchema>;
