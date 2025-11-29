import { prismaClient } from "../utils/database-util";
import { CreateOrderRequest, OrderResponse, toOrderResponse, toOrderResponseList } from "../models/order-model";
import { OrderValidation } from "../validations/order-validation";
import { Validation } from "../validations/validation";
import { ResponseError } from "../error/response-error";
// IMPORTING OTHER SERVICES: We need these to check if customers/restaurants exist!
import { CustomerService } from "./customer-service";
import { RestaurantService } from "./restaurant-service";

export class OrderService {

    // SYNTAX: Optional parameters (?). 
    // If you call getAll(1), then customerId is 1, restaurantId is undefined.
    // If you call getAll(), both are undefined.
    static async getAll(customerId?: number, restaurantId?: number): Promise<OrderResponse[]> {
        
        // FLOW: Find orders with filters
        const orders = await prismaClient.order.findMany({
            where: {
                // LOGIC: Prisma is smart. If 'customerId' is undefined, it ignores this filter.
                // If 'customerId' is 5, it adds "WHERE customerId = 5" to the SQL.
                customerId: customerId,
                restaurantId: restaurantId
            }
        });
        return toOrderResponseList(orders);
    }

    static async create(request: CreateOrderRequest): Promise<string> {
        // 1. Validate Input (Are IDs numbers? Is item count positive?)
        const validatedData = Validation.validate(OrderValidation.CREATE, request);

        // 2. LOGIC: Foreign Key Checks
        // We cannot create an order for a Customer that doesn't exist.
        // We call the helper method from CustomerService to verify existence.
        // If they don't exist, that method throws an error and STOPS us here.
        await CustomerService.checkCustomerMustExist(validatedData.customerId);

        // 3. LOGIC: Same check for Restaurant
        await RestaurantService.checkRestaurantMustExist(validatedData.restaurantId);

        // 4. BUSINESS LOGIC: Calculate ETA
        // "Takes 10 minutes per item ordered + 10 minutes for delivery"
        // Example: 2 items * 10 = 20 + 10 delivery = 30 minutes total.
        const calculatedEta = (validatedData.itemCount * 10) + 10;

        // 5. Save to DB
        await prismaClient.order.create({
            data: {
                customerId: validatedData.customerId,     // Link to Customer
                restaurantId: validatedData.restaurantId, // Link to Restaurant
                itemCount: validatedData.itemCount,       // Save count
                eta: calculatedEta                        // Save the math result
            }
        });

        return "Order created successfully!";
    }
}