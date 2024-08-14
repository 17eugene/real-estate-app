import { z } from "zod";

export const listingSchema = z.object({
  name: z
    .string({
      required_error: "Required field",
    })
    .nonempty({ message: "Required fileld" })
    .min(10, { message: "Must be minimum 10 characters long" })
    .max(50, { message: "Must be no longer 50 characters" }),

  description: z
    .string({ required_error: "Description is required" })
    .nonempty({ message: "Required fileld" })
    .min(30, { message: "Must be minimum 30 characters long" })
    .max(500, { message: "Must be no longer 500 characters" }),

  address: z
    .string({ required_error: "Address is required" })
    .nonempty({ message: "Required fileld" })
    .min(7, { message: "Must be minimum 7 characters long" })
    .max(60, { message: "Must be no longer 60 characters" }),

  type: z.string({ required_error: "Type is required" }),

  furnished: z.boolean(),
  "pets allowed": z.boolean(),
  offer: z.boolean(),

  bedrooms: z
    .number({ invalid_type_error: "At least 1 required" })
    .positive({ message: "Must be positive value" })
    .int({ message: "Value must be an integer" })
    .gte(1, { message: "At least 1 required" })
    .lte(50, { message: "Maximun value is 50" }),

  price: z
    .number({ invalid_type_error: "Can't be empty" })
    .positive({ message: "Must be positive value" }),

  files: z.any(),
});

export const minMaxPriceSchema = z.object({
  minimum: z
    .number({ invalid_type_error: "Must be a number" })
    .nonnegative({ message: "Must be positive value" }),
  maximum: z
    .number({ invalid_type_error: "Must be a number" })
    .nonnegative({ message: "Must be a positive value" }),
});
