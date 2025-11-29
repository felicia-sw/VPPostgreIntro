// to handle input/ output for customers
import { NextFunction, Request, Response } from "express";
import { CreateCustomerRequest } from "../models/customer-model";
import { CustomerService } from "../services/customer-service";

export class CustomerController {
    static async getAllCustomers(req: Request, res: Response, next: NextFunction) {
        try {
            const response = await CustomerService.getAll(); // call the service

            res.status(200).json({
                data: response,
            });
        } catch (error) {
            next(error);
        }
    }

    static async getCustomer(req: Request, res: Response, next: NextFunction) {
        try {

            // to convert "5" (string) to 5 (number)
            const customerId = Number(req.params.customerId);
            const response = await CustomerService.get(customerId);

            res.status(200).json({
                data: response,
            });
        } catch (error) {
            next(error);
        }
    }

    static async createCustomer(req: Request, res: Response, next: NextFunction) {
        try {
            const request = req.body as CreateCustomerRequest; // ambil dari model
            const response = await CustomerService.create(request);
            
            res.status(200).json({
                data: response,
            });
        } catch (error) {
            next(error);
        }
    }

    static async updateCustomer(req: Request, res: Response, next: NextFunction) {
        try{
            const request = req.body as CreateCustomerRequest;
            const customerId = Number(req.params.customerId);
            const response = await CustomerService.update(customerId, request);

            res.status(200).json({
                data: response,
            });
        } catch (error) {
            next(error);
        }
    }

    static async deleteCustomer(req: Request, res: Response, next:NextFunction) {
        try{
            const customerId = Number(req.params.customerId);
            const response = await CustomerService.delete(customerId);

            res.status(200).json({
                data: response,
            });
        } catch (error){
            next(error);
        }
    }

}