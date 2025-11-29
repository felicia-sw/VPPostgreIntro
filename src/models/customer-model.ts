// import { Customer } from "@prisma/client";
import { Customer } from "../../generated/prisma";

export interface CreateCustomerRequest {
    name: string;
    phoneNumber: string;
}

export interface CustomerResponse extends CreateCustomerRequest {
    id: number;
}

// customer: Customer -> takes the database row includes everything in database column
export function toCustomerResponse(customer: Customer): CustomerResponse {
    // CustomerResponse -. return only the clean data defined in the interface
    return {
        id: customer.id,
        name: customer.name,
        phoneNumber: customer.phoneNumber
    }

    // The Logic: It manually maps "Raw Data" $\rightarrow$ "Public Data".Scenario: If you later added a password column to your database, the Customer type would have it. But because you didn't add password to this return { ... } block, it will never be sent to the user. This is a security feature!
}

export function toCustomerResponseList(customers: Customer[]): CustomerResponse[]{
    return customers.map((customer) => toCustomerResponse(customer));
}

