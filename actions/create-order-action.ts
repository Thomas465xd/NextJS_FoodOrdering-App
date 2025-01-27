"use server"

import { products } from "@/prisma/data/products";
import { prisma } from "@/src/lib/prisma";
import { OrderSchema } from "@/src/schema";

export async function createOrder(data: unknown) {
    //console.log("creating order");
    const result = OrderSchema.safeParse(data);

    //console.log(result)
    if(!result.success) {
        return {
            errors: result.error.issues
        }
    }

    try {
        await prisma.order.create({
            data: {
                name: result.data.name,
                total: result.data.total,
                orderProducts: {
                    create: result.data.order.map(product => ({
                        productId: product.id, 
                        quantity: product.quantity
                    }))
                }
            }
        })
    } catch (error) {
        console.log(error);
    }
}