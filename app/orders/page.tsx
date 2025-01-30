"use client"
import useSWR from "swr";
import Logo from "@/components/ui/Logo";
import Loader from "@/components/ui/Loader";
import { OrderWithProducts } from "@/src/types";
import LatestOrderItem from "@/components/order/LatestOrderItem";

export default function page() {

    const url = "/orders/api";
    const fetcher = (url: string) => fetch(url).then(res => res.json()).then(data => data);

    const { data, error, isLoading } = useSWR<OrderWithProducts[]>(url, fetcher, {
        refreshInterval: 60000,
        revalidateOnFocus: false
    })
    
    if(isLoading) return <Loader />

    if(data) return (
        <>
            <div className="overflow-y-scroll h-screen p-2">
                <div className="border-b pb-2 mx-32">
                    <h1 className="text-center mt-20 text-6xl font-black">Orders Ready</h1>

                    <Logo />
                </div>

                {data.length ? (
                    <div className="grid sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 max-w-5xl mx-auto mt-10 mb-10">
                        {data.map(order => (
                            <LatestOrderItem 
                                key={order.id} 
                                order={order} 
                            />
                        ))}
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center h-screen text-center space-y-6">
                        <h1 className="text-2xl font-bold text-red-700">No orders found</h1>
                        <p className="text-gray-600 opacity-80">
                            If you believe this is an error, please contact support.
                        </p>
                    </div>
                )}
            </div>
        </>
    )
}
