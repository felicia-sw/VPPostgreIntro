import { PrismaClient } from "@prisma/client/extension";

const prisma = new PrismaClient();

async function main() {
    // 1. Create 3 Customers
    const c1 = await prisma.customer.create({
        data: { name: "Budi Santoso", phoneNumber: "081234567890" }
    });
    const c2 = await prisma.customer.create({
        data: { name: "Siti Aminah", phoneNumber: "089876543210" }
    });
    const c3 = await prisma.customer.create({
        data: { name: "John Doe", phoneNumber: "081122334455" }
    });

    console.log("Created 3 Customers");

    // 2. Create 3 Restaurants
    const r1 = await prisma.restaurant.create({
        data: { name: "Padang Sederhana", description: "Authentic Padang Cuisine", isOpen: true }
    });
    const r2 = await prisma.restaurant.create({
        data: { name: "Burger King", description: "Fast Food Burgers", isOpen: true }
    });
    const r3 = await prisma.restaurant.create({
        data: { name: "Sushi Tei", description: "Japanese Sushi", isOpen: false } // One closed for testing
    });

    console.log("Created 3 Restaurants");

    // 3. Create 5 Orders (Mixing customers and restaurants)
    // Order 1: Budi orders from Padang
    await prisma.order.create({
        data: { customerId: c1.id, restaurantId: r1.id, itemCount: 2, eta: 30 } // 2*10 + 10 = 30
    });
    // Order 2: Budi orders from Burger King
    await prisma.order.create({
        data: { customerId: c1.id, restaurantId: r2.id, itemCount: 1, eta: 20 }
    });
    // Order 3: Siti orders from Padang
    await prisma.order.create({
        data: { customerId: c2.id, restaurantId: r1.id, itemCount: 5, eta: 60 }
    });
    // Order 4: John orders from Sushi Tei (maybe pre-order?)
    await prisma.order.create({
        data: { customerId: c3.id, restaurantId: r3.id, itemCount: 3, eta: 40 }
    });
    // Order 5: Siti orders from Burger King
    await prisma.order.create({
        data: { customerId: c2.id, restaurantId: r2.id, itemCount: 10, eta: 110 }
    });

    console.log("Created 5 Orders");
}

main()
.then(async () => {
    await prisma.$disconnect();
})
.catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
})