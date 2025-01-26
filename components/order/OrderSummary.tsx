"use client";

import { useStore } from "@/src/store";
import ProductDetails from "./ProductDetails";
import { useMemo } from "react";
import { formatCurrency } from "@/src/utils";

export default function OrderSummary() {
    const order = useStore((state) => state.order);
    const total = useMemo(() => order.reduce((total, item) => total + (item.quantity * item.price), 0), [order]);

    return (
        <aside className="lg:h-screen lg:overflow-hidden lg:flex lg:flex-col md:w-72 lg:w-96 p-5 border-l-8">
            <h1 className="text-4xl text-center font-black border-b-2 pb-2">Order Summary</h1>

            {order.length === 0 ? (
                <div className="mt-5">
                    <p className="text-center">There are no items in your order</p>
                </div>
            ) : (
                <>
                    <div className="mt-5 flex-grow overflow-y-auto max-h-[calc(100vh-200px)]"> {/* Adjust max-height and overflow */} 
                        {order.map((item) => (
                            <ProductDetails 
                                key={item.id}
                                item={item}
                            />
                        ))}
                    </div>

                    <div className="mt-5 py-5 border-t text-center">
                        <h1 className="text-md font-bold text-gray-800">
                            Your Order Summary: {""}
                            <span className="font-bold text-3xl text-amber-500">{formatCurrency(total)}</span>
                        </h1>
                    </div>
                </>
            )}
        </aside>
    );
}
