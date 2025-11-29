import { Order } from "../../generated/prisma";

export interface CreateOrderRequest {
    customerId: number;
    restaurantId: number;
    itemCount: number;
}

export interface OrderResponse extends CreateOrderRequest {
    id: number;
    eta: number;
    orderTime: Date;
}

export function toOrderResponse(order: Order): OrderResponse {
    return {
        id: order.id,
        customerId: order.customerId,
        restaurantId: order.restaurantId,
        itemCount: order.itemCount,
        eta: order.eta,
        orderTime: order.orderTime
    }
}

export function toOrderResponseList(orders: Order[]): OrderResponse[] {
    return orders.map((order) => toOrderResponse(order));
}