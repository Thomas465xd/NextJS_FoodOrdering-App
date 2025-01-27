import { create } from "zustand";
import { OrderItem } from "./types";
import { Product } from "@prisma/client";

interface Store { 
    order: OrderItem[]
    addToOrder: (product: Product) => void
    increaseQuantity: (id: Product["id"]) => void
    decreaseQuantity: (id: Product["id"]) => void
    deleteItem: (id: Product["id"]) => void
    clearOrder: () => void
}

export const useStore = create<Store>((set, get) => ({
    order: [],
    addToOrder: (product) => {

        const {categoryId, image, ...data} = product
        let  items : OrderItem[] = []

        if(get().order.find( item => item.id === data.id)) {
            items = get().order.map( item => item.id === product.id ? {
                ...item, 
                quantity: item.quantity + 1, 
                subtotal: item.price * (item.quantity + 1)
            } : item)
        } else {
            items = [...get().order, {
                ...data, 
                quantity: 1, 
                subtotal: 1 * product.price
            }]
        }
        
        set(() => ({
            order: items
        }))
    }, 
    increaseQuantity: (id) => {
        set((state) => ({
            order: state.order.map( item => item.id === id ? {
                ...item, 
                quantity: item.quantity + 1, 
                subtotal: item.price * (item.quantity + 1)
            }: item)
        }))
    }, 
    decreaseQuantity: (id) => {
        set((state) => ({
            order: state.order.map( item => item.id === id ?{
                ...item, 
                quantity: item.quantity - 1, 
                subtotal: item.price * (item.quantity - 1)
            }: item)
        }))
    }, 
    deleteItem: (id) => {
        set((state) => ({
            order: state.order.filter( item => item.id !== id)
        }))
    },
    clearOrder: () => {
        set(() => ({
            order: []
        }))
    }
}));