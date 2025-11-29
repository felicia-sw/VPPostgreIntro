// import { Restaurant } from "@prisma/client";
import { Restaurant } from "../../generated/prisma";

export interface CreateRestaurantRequest {
    name: string;
    description: string;
    isOpen?: boolean;
}

export interface RestaurantResponse extends CreateRestaurantRequest {
    id: number;
    isOpen: boolean;
}

export function toRestaurantResponse(restaurant: Restaurant): RestaurantResponse {
    return {
        id: restaurant.id,
        name: restaurant.name,
        description: restaurant.description,
        isOpen: restaurant.isOpen
    }
}

export function toRestaurantResponseList(restaurants: Restaurant[]): RestaurantResponse[] {
    return restaurants.map((restaurant) => toRestaurantResponse(restaurant));
}