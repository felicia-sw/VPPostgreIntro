// this is to ensure that when a user tries to create or update a "Customer" they send the correct data 

import { z, ZodType } from "zod";
// zod is used to build schemas 

export class CustomerValidation { 
// export = so that can be imported from controller or service later
// class = make the class to group all validation rules for customers in one place
    static readonly CREATE: ZodType = z.object({
        // so that can just call CustomerValidation.CREATE directly 
        // readonly ensures that no other part of the code can change this rule; kayak permanence
        // z.object = incoming input data must be json object {}
        name: z
      .string({ message: "Name is required!" }) // Changed from required_error
      .min(1, "Name cannot be empty!")
      .max(100, "Name is too long! Max 100 characters."),
    
    phoneNumber: z
      .string({ message: "Phone number is required!" }) // Changed from required_error
      .min(1, "Phone number cannot be empty!")
      .max(20, "Phone number is too long!"),
    });

    static readonly UPDATE: ZodType = z.object({
        name: z
      .string()
      .min(1, "Name cannot be empty!")
      .max(100, "Name is too long!")
      .optional(),
    
    phoneNumber: z
      .string()
      .min(1, "Phone number cannot be empty!")
      .max(20, "Phone number is too long!")
      .optional(),
    })
}