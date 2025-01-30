"use client"
import useSWR from "swr";
import OrderCard from "@/components/order/OrderCard";
import Heading from "@/components/ui/Heading";
import { OrderWithProducts } from "@/src/types";
import Loader from "@/components/ui/Loader";
/*
import { prisma } from "@/src/lib/prisma";
import { revalidatePath } from "next/cache";
*/

/*
async function getPendingOrders() {

}
*/

export default function OrdersPage() {

    const url = "/admin/orders/api";
    const fetcher = (url: string) => fetch(url).then(res => res.json()).then(data => data);

    const { data, error, isLoading } = useSWR<OrderWithProducts[]>(url, fetcher, {
        refreshInterval: 60000,
        revalidateOnFocus: false
    })
    
    if(isLoading) return <Loader />

    /* Manual revalidation
    const orders = await getPendingOrders();
    //console.log(JSON.stringify(orders, null, 2))

    const refreshOrders = async () => {
        "use server"
        revalidatePath("/admin/orders")
    }
    */

    if(data) return (
        <>
            <Heading>
                Manage your <span className="text-purple-800 font-bold">Client Orders</span>
            </Heading>

            {/*}
            <form 
                action={refreshOrders}
                className="border-b pb-5"
            >

                <input 
                    type="submit" 
                    value={"Update Orders"} 
                    className="bg-amber-400 text-xl text-center font-bold px-6 py-3 rounded shadow-md 
                            ring-1 ring-gray-300 hover:bg-amber-500 transition-all 
                            w-full max-w-xs lg:w-auto"
                />
            </form>
            {*/}

            {data.length ? (
                <div className="grid grid-cols-1 lg:grid-cols-2 wxl:grid-cols-3 gap-5 mt-5">
                    {data.map(order => (
                        <OrderCard
                            key={order.id} 
                            order={order}
                        />
                    ))}
                </div>
            ) : <p className=""></p> }
        </>
    )
}
