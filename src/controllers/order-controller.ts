import { NextFunction, Request, Response } from "express";
import { CreateOrderRequest } from "../models/order-model";
import { OrderService } from "../services/order-service";

export class OrderController {
    // POST
    static async createOrder(req: Request, res: Response, next: NextFunction) {
        try {
            // type assertion
            // telling ts that the  body looks like CreateOrderRequest
            // autocomplete for 'request.customerID
            const request = req.body as CreateOrderRequest;

            // the waiter hands the order to the service
            // await: pause here until the service finishes calculating eta and saving to database
            const response = await OrderService.create(request);

            res.status(200).json({
                data: response,
            });
    } catch (error) {
        next(error);
    }
}
    static async getAllOrders(req: Request, res: Response, next: NextFunction) {
        try {
            // 1. check if 'req.query.customerId' exists
            // 2. IF YES: convert it to a number
            // 3. if NO: set it to 'undefined'
            const customerId = req.query.customerId ? Number(req.query.customerId) : undefined;

            const restaurantId = req.query.restaurantId ? Number(req.query.restaurantId) : undefined;

            // pass all variables to the service
            //  if they are undefined, the service knows to ignore them and return everything
            //  if they are numbers, the service filters the results
            const response = await OrderService.getAll(customerId, restaurantId);

            res.status(200).json({
                data: response,
            });
        } catch(error) {
            next(error);
        }
    }
}

