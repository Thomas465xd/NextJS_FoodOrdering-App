"use client";

import { useStore } from "@/src/store";
import ProductDetails from "./ProductDetails";
import { useMemo, useState } from "react";
import { formatCurrency } from "@/src/utils";
import { createOrder } from "@/actions/create-order-action";
import { OrderSchema } from "@/src/schema";
import { toast } from "react-toastify";

export default function OrderSummary() {
    const order = useStore((state) => state.order);
    const clearOrder = useStore((state) => state.clearOrder);

    const [loading, setLoading] = useState(false);;
    const total = useMemo(() => order.reduce((total, item) => total + (item.quantity * item.price), 0), [order]);

    const handleCreateOrder = async (formData: FormData) => {

        try {
            setLoading(true);

            //console.log(formData.get("name"));
            const data = {
                name: formData.get("name"),
                total,
                order
            }
    
            const result = OrderSchema.safeParse(data);
            //console.log(result)
    
            if(!result.success) {
                result.error.issues.forEach((issue) => {
                    toast.error(issue.message);
                })
    
                return
            }
    
            const response = await createOrder(data);
            if(response?.errors) {
                response.errors.forEach((error) => {
                    toast.error(error.message);
                })
    
                return
            }
    
            toast.success("Order created successfully");
            clearOrder();
        } catch (error) {
            console.error("Error creating order:", error);
        } finally {
            setLoading(false);
        }
        
    }

    return (
        <aside className="lg:h-screen lg:overflow-hidden lg:flex lg:flex-col md:w-72 lg:w-96 p-5 border-l-8">
            <h1 className="text-4xl text-center font-black border-b-2 pb-2">Order Summary</h1>

            {order.length === 0 ? (
                <div className="mt-5">
                    <p className="text-center">There are no items in your order</p>
                </div>
            ) : (
                <>
                    <div className="mt-5 flex-grow overflow-y-auto md:max-h-[calc(100vh-400px)] md:mt-2 lg:mt-5 lg:max-h-[calc(100vh-200px)]"> {/* Adjust max-height and overflow */} 
                        {order.map((item) => (
                            <ProductDetails 
                                key={item.id}
                                item={item}
                            />
                        ))}
                    </div>

                    <div className="">
                        <div className="mt-5 py-5 border-t text-center">
                            <h1 className="text-md font-bold text-gray-800">
                                Your Order Summary: {""}
                                <span className="font-bold text-3xl text-amber-500">{formatCurrency(total)}</span>
                            </h1>
                        </div>

                        <form 
                            className="w-full space-y-5"
                            onSubmit={(e) => {
                                e.preventDefault(); // Prevent default form submission
                                const formData = new FormData(e.currentTarget);
                                handleCreateOrder(formData);
                            }}
                        >
                            <input 
                                type="text"
                                name="name"
                                placeholder="Your Name"
                                className="bg-white border border-gray-100 p-2 w-full rounded"
                            />

                            <input 
                                type="submit"
                                value={loading ? "Processing..." : "Confirm Order"}
                                disabled={loading}
                                className="disabled:opacity-50 py-2 rounded uppercase text-white hover:text-amber-400 transition-colors bg-black w-full text-center cursor-pointer font-bold disabled:cursor-not-allowed"
                            />
                        </form>
                    </div>
                </>
            )}
        </aside>
    );
}
