import { NextFunction, Request, Response } from "express";
import { CreateRestaurantRequest } from "../models/restaurant-model";
import { RestaurantService } from "../services/restaurant-service";

export class RestaurantController {

    static async getAllRestaurants(req: Request, res: Response, next: NextFunction) {
        try {
            // 1. Read the query parameter 'isOpen'
            // It comes as a string ("true"/"false"), so we convert it to boolean
            let isOpen: boolean | undefined = undefined;
            if (req.query.isOpen === 'true') {
                isOpen = true;
            } else if (req.query.isOpen === 'false') {
                isOpen = false;
            }

            // 2. Pass it to the service
            const response = await RestaurantService.getAll(isOpen);

            res.status(200).json({
                data: response,
            });
        } catch (error) {
            next(error);
        }
    }

    static async getRestaurant(req: Request, res: Response, next: NextFunction) {
        try {
            const restaurantId = Number(req.params.restaurantId);

            const response = await RestaurantService.get(restaurantId);

            res.status(200).json({
                data: response,
            });
        } catch (error) {
            next(error);
        }
    }

    static async createRestaurant(req: Request, res: Response, next: NextFunction) {
        try {
            const request = req.body as CreateRestaurantRequest;

            const response = await RestaurantService.create(request);

            res.status(200).json({
                data: response,
            });
        } catch (error) {
            next(error);
        }
    }

    static async updateRestaurant(req: Request, res: Response, next: NextFunction) {
        try {
            const request = req.body as CreateRestaurantRequest;
            const restaurantId = Number(req.params.restaurantId);

            const response = await RestaurantService.update(restaurantId, request);

            res.status(200).json({
                data: response,
            });
        } catch (error) {
            next(error);
        }
    }

    static async deleteRestaurant(req: Request, res: Response, next: NextFunction) {
        try {
            const restaurantId = Number(req.params.restaurantId);

            const response = await RestaurantService.delete(restaurantId);

            res.status(200).json({
                data: response,
            });
        } catch (error) {
            next(error);
        }
    }
}