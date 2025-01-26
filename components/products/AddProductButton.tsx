"use client"

import { Product } from "@prisma/client"
import { useStore } from "@/src/store"
import { constants } from "buffer"

type AddProductButtonProps = {
    product: Product
}

export default function AddProductButton({product} : AddProductButtonProps) {

    const addToOrder = useStore((state) => state.addToOrder)
    
    const consoleLog = () => console.log("asfda")

    return (
        <button
            type="button"
            className="bg-indigo-600 hover:bg-indigo-800 text-white w-full mt-5 p-3 uppercase font-bold text-sm cursor-pointer rounded"
            onClick={() => addToOrder(product)}
        >
            Add to Order
        </button>
    )
}
