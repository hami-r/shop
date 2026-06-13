import { z } from "zod";

export const phoneSchema = z
  .string()
  .min(8, "Enter a UAE phone number")
  .regex(/^(\+971|971|0)?[0-9\s-]{8,14}$/, "Use a valid UAE phone number");

export const checkoutSchema = z.object({
  customer_name: z.string().min(2, "Full name is required"),
  customer_phone: phoneSchema,
  customer_email: z.string().email("Valid email is required"),
  address: z.string().min(6, "Delivery address is required"),
  city: z.string().min(2).default("Sharjah"),
  notes: z.string().optional()
});

export const contactSchema = z.object({
  name: z.string().min(2),
  email: z.string().email().optional().or(z.literal("")),
  phone: phoneSchema.optional().or(z.literal("")),
  message: z.string().min(10)
});

export const productSchema = z.object({
  name: z.string().min(2),
  slug: z.string().min(2),
  description: z.string().optional(),
  price: z.coerce.number().nonnegative(),
  compare_price: z.coerce.number().nonnegative().optional().nullable(),
  category: z.string().optional(),
  stock: z.coerce.number().int().nonnegative(),
  is_active: z.coerce.boolean().default(true),
  images: z.array(z.string()).default([])
});

export const categorySchema = z.object({
  name: z.string().trim().min(2, "Category name is required").max(60, "Category name is too long")
});
