import { z } from "zod";

export const signUpFormSchema = z.object({
  username: z
    .string({
      required_error: "The username is required",
      invalid_type_error: "Must be a string",
    })
    .trim()
    .min(2, { message: "Username cannot be shorter than 2 characters" })
    .max(20, { message: "Username cannot be longer than 20 characters" }),

  email: z
    .string({ required_error: "The e-mail is required" })
    .email({ message: "Invalid e-mail address" })
    .trim(),

  password: z
    .string({ required_error: "Psssword is required" })
    .trim()
    .min(4, { message: "Password cannot be shorter than 4 characters" })
    .max(20, { message: "Password cannot be longer than 20 characters" })
    .regex(/^[a-zA-Z0-9]+$/, {
      message: "The password can only contain letters and(or) numbers ",
    }),
});

export const signInFormSchema = z.object({
  email: z
    .string({ required_error: "The email is required" })
    .email({ message: "Invalid e-mail address" })
    .trim(),

  password: z
    .string()
    .trim()
    .min(1, { message: "The password is required" })
    .regex(/^[a-zA-Z0-9]+$/, {
      message: "The password can only contain letters and(or) numbers ",
    }),
});

export const searchFormSchema = z.object({
  searchQuery: z
    .string()
    .trim()
    .max(30, {
      message: "The query string cannot be longer than 30 characters",
    }),
});

export const listingSchema = z.object({
  region: z
    .string({
      required_error: "Region is required",
    })
    .toLowerCase()
    .includes("а", { message: "Required field" }),

  settlement: z
    .string({ required_error: "Description is required" })
    .trim()
    .nonempty({ message: "Required fileld" }),

  description: z
    .string({ required_error: "Description is required" })
    .nonempty({ message: "Required fileld" })
    .trim()
    .max(2000, { message: "Must be no longer 500 characters" }),

  street: z.string().trim(),
  houseNumber: z.string().trim(),

  type: z
    .string({ required_error: "Type is required" })
    .length(4, { message: "Select avaliable option" }),

  furnished: z.boolean().nullable(),
  petsAllowed: z.boolean().nullable(),
  parking: z.boolean().nullable(),
  gatedCommunity: z.boolean().nullable(),

  bedrooms: z
    .number({ invalid_type_error: "Number value required" })
    .nonnegative({ message: "Must be positive value or 0" })
    .int({ message: "Integer value required" })
    .lte(50, { message: "Maximun value is 50" }),

  price: z
    .number({ invalid_type_error: "Only numbers required" })
    .nonnegative({ message: "Must be positive value or 0" }),

  squareMeters: z
    .number({ invalid_type_error: "Number value required" })
    .positive({ message: "Positive value required" })
    .gte(1, { message: "Minimum value is 1" }),

  floor: z
    .number({ invalid_type_error: "Only numbers required" })
    .int({ message: "Integer value required" }),

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
