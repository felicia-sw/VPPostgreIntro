import { z, ZodType } from "zod";
// pivot
export class OrderValidation {
    static readonly CREATE: ZodType = z.object( {
        // calls ID as it is the pivot table; referencing identity
        customerId: z
      .number({ message: "Customer ID must be a number!" }) // Covers required + invalid type
      .int("Customer ID must be an integer!")
      .positive("Customer ID must be positive number!"),

    restaurantId: z
      .number({ message: "Restaurant ID must be a number!" })
      .int("Restaurant ID must be an integer!")
      .positive("Restaurant ID must be positive number!"),

    itemCount: z
      .number({ message: "Item count must be a number!" })
      .int("Item count must be an integer!")
      .positive("Item count must be at least 1!"),
    });
}