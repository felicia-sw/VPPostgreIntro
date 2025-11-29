import {z, ZodType } from "zod";

export class RestaurantValidation {
    static readonly CREATE: ZodType = z.object({
        name: z
      .string({ message: "Restaurant name is required!" })
      .min(1, "Restaurant name cannot be empty!")
      .max(100, "Restaurant name is too long! Max 100 characters."),

    description: z
      .string({ message: "Description is required!" })
      .min(1, "Description cannot be empty!")
      .max(255, "Description is too long! Max 255 characters."),
        // set isOpen optional because by default can be set as open (described in the database schema)
        isOpen: z
      .boolean({ message: "isOpen must be true or false!" })
      .optional(),
    });
    static readonly UPDATE: ZodType = z.object({
        name: z
      .string()
      .min(1, "Restaurant name cannot be empty!")
      .max(100, "Restaurant name is too long! Max 100 characters.")
      .optional(),

    description: z
      .string()
      .min(1, "Description cannot be empty!")
      .max(255, "Description is too long! Max 255 characters.")
      .optional(),

    isOpen: z
      .boolean({ message: "isOpen must be true or false!" })
      .optional(),
    });
}