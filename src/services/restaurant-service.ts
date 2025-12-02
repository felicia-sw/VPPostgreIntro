import { Restaurant } from "../../generated/prisma";
import { prismaClient } from "../utils/database-util";
import { CreateRestaurantRequest, RestaurantResponse, toRestaurantResponse, toRestaurantResponseList } from "../models/restaurant-model";
import { RestaurantValidation } from "../validations/restaurant-validation";
import { Validation } from "../validations/validation";
import { ResponseError } from "../error/response-error";

export class RestaurantService {
    static async getAll(isOpen?: boolean): Promise<RestaurantResponse[]> {
        //  fetch all rows from restaurant table
        const restaurants = await prismaClient.restaurant.findMany({
            where: {
                isOpen: isOpen
            }
        });
        return toRestaurantResponseList(restaurants);
    }

    static async get(id: number): Promise<RestaurantResponse> {
        // reuse helper to check existence
        const restaurant = await this.checkRestaurantMustExist(id);
        return toRestaurantResponse(restaurant);
    }

    static async create(request: CreateRestaurantRequest): Promise<string> {
        // 1. validate (check name length, check isOpen boolean)
        const validatedData = Validation.validate(RestaurantValidation.CREATE, request);
        // 2. create in db
        await prismaClient.restaurant.create({
            data: validatedData
        });

        return "Restaurant created successfully";
    }

    static async update(id: number, request: CreateRestaurantRequest): Promise<string> {
        // 1. validate inputs
        const validatedData = Validation.validate(RestaurantValidation.UPDATE, request);
        // 2. check if the ID exists (to prevent crashing if id is wrong)
        await this.checkRestaurantMustExist(id);

        await prismaClient.restaurant.update({
            where: { id: id},
            data: validatedData
        });

        return "Restaurant updated successfully";
    }

    static async delete(id: number): Promise<string> {
        // 1. check existence
        await this.checkRestaurantMustExist(id);

        // delete row
        await prismaClient.restaurant.delete({
            where: { id: id}
        });

        return "Restaurant deleted successfully";
    }

    static async checkRestaurantMustExist(restaurantId: number): Promise<Restaurant> {
        const restaurant = await prismaClient.restaurant.findUnique( {
            where: { id: restaurantId }
        });
        if (!restaurant) {
            throw new ResponseError(404, "Restaurant not found");
        }

        return restaurant;
    }
}