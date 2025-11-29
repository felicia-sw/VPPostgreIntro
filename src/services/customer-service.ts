import { Customer } from "../../generated/prisma";
import { prismaClient } from "../utils/database-util";
import { CreateCustomerRequest, CustomerResponse, toCustomerResponse, toCustomerResponseList } from "../models/customer-model";
import { CustomerValidation } from "../validations/customer-validation";
import { Validation } from "../validations/validation";
import { ResponseError } from "../error/response-error";

export class CustomerService {
    static async getAll(): Promise<CustomerResponse[]> {
        const customers = await prismaClient.customer.findMany();
        return toCustomerResponseList(customers);
    }

    static async get(id: number): Promise<CustomerResponse> {
        const customer = await this.checkCustomerMustExist(id);
        return toCustomerResponse(customer);
    }

    static async create(request: CreateCustomerRequest): Promise<string> {
        const validatedData = Validation.validate(CustomerValidation.CREATE, request);

        // FLOW: If validation passes, we save to DB.
        // await: "Pause here until the database is done saving"
        await prismaClient.customer.create({
            data: validatedData
        });

        return "Customer created successfully!";
    } 

    static async update(id: number, request: CreateCustomerRequest): Promise<string> {
        // 1. validate the new data (is name empty?)
        const validatedData = Validation.validate(CustomerValidation.UPDATE, request);

        // 2. check if the customer actually exists in DB before trying to update 
        await this.checkCustomerMustExist(id);

        // 3. Perform the Update 
        await prismaClient.customer.update({
            where: { id: id}, // update the row where ID matches
            data: validatedData // replace with new data 
        });

        return "Customer updated successfully!";
    }

    static async delete(id: number): Promise<string> {
        // 1. check existence
        await this.checkCustomerMustExist(id);

        // 2. perform delete
        await prismaClient.customer.delete({
            where: {id: id}
        });

        return "Customer deleted successfully!";
    }

    // helper function to reuse to check if ID exists. 

    static async checkCustomerMustExist(customerId: number): Promise<Customer> {
        const customer = await prismaClient.customer.findUnique({
            where: { id: customerId }
        });

        // flow: if DB returns 'null' (not found), we throw an error.
        //  this stops the code execution in the calling function (like update or delete)
        if(!customer) {
            throw new ResponseError(404, "Customer not found");
        }

        return customer;
    }

}