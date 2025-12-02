import express from "express";
import { CustomerController } from "../controllers/customer-controller";
import { RestaurantController } from "../controllers/restaurant-controller";
import { OrderController } from "../controllers/order-controller";

export const publicRouter = express.Router(); // create router object to hold all the rules

// --- CUSTOMER ROUTES ---
publicRouter.get("/api/customers", CustomerController.getAllCustomers);
publicRouter.get("/api/customers/:customerId", CustomerController.getCustomer);
publicRouter.post("/api/customers", CustomerController.createCustomer);
publicRouter.put("/api/customers/:customerId", CustomerController.updateCustomer);
publicRouter.delete("/api/customers/:customerId", CustomerController.deleteCustomer);

// --- RESTAURANT ROUTES ---
publicRouter.get("/api/restaurants", RestaurantController.getAllRestaurants);
publicRouter.get("/api/restaurants/:restaurantId", RestaurantController.getRestaurant);
publicRouter.post("/api/restaurants", RestaurantController.createRestaurant);
publicRouter.put("/api/restaurants/:restaurantId", RestaurantController.updateRestaurant);
publicRouter.delete("/api/restaurants/:restaurantId", RestaurantController.deleteRestaurant);

// --- ORDER ROUTES ---
publicRouter.get("/api/orders", OrderController.getAllOrders); // Supports ?customerId=1 filtering
publicRouter.post("/api/orders", OrderController.createOrder);