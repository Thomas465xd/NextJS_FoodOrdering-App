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

export const searchSchema = z.object({
    search: z.string()
        .trim() 
        .min(1, {message: "Search cannot be empty"})
})

export const ProductSchema = z.object({
    name: z.string()
        .trim()
        .min(1, { message: 'Product name is empty'}),
    price: z.string()
        .trim()
        .transform((value) => parseFloat(value)) 
        .refine((value) => value > 0, { message: 'Invalid Price' })
        .or(z.number().min(1, {message: 'Product Price is required' })),
    categoryId: z.string()
        .trim()
        .transform((value) => parseInt(value)) 
        .refine((value) => value > 0, { message: 'Product Category is required' })
        .or(z.number().min(1, {message: 'Product Category is required' })),
    image: z.string().min(1, {message: "Product Image is required"})
})