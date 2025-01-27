import { z } from "zod";

export const OrderSchema = z.object({
    name: z.string()
        .min(1, "Name is required"),
    total: z.number()
        .min(1, "Errors in your order"),
    order: z.array(z.object({
        id: z.number(), 
        name: z.string(),
        price: z.number(),
        quantity: z.number(),
        subtotal: z.number(),
    }))
})

export const OrderIdSchema = z.object({
    orderId: z.string()
        .transform((value) => parseInt(value))
        .refine((value) => value > 0, { message: "Invalid order id" })
})