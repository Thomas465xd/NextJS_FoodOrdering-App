import OrderCard from "@/components/order/OrderCard";
import Heading from "@/components/ui/Heading";
import { prisma } from "@/src/lib/prisma";

async function getPendingOrders() {
    const orders = await prisma.order.findMany({
        where: {
            status: false
        },
        include: {
            orderProducts: {
                include: {
                    product: true
                }
            }
        }
    })

    return orders
}

export default async function OrdersPage() {

    const orders = await getPendingOrders();
    //console.log(JSON.stringify(orders, null, 2))

    return (
        <>
            <Heading>
                Manage your <span className="text-purple-800 font-bold">Client Orders</span>
            </Heading>

            {orders.length ? (
                <div className="grid grid-cols-1 lg:grid-cols-2 wxl:grid-cols-3 gap-5 mt-5">
                    {orders.map(order => (
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
