import { OrderWithProducts } from "@/src/types";

type LatestOrderItemProps = {
    order: OrderWithProducts;
};

export default function LatestOrderItem({ order }: LatestOrderItemProps) {
    return (
        <div className="bg-white shadow p-5 space-y-5 rounded-lg">
            <p className="text-2xl font-bold text-gray-900">Client: {order.name}</p>

            {/* Display Order Ready Time */}
            {order.orderReadyAt && (
                <p className="text-green-600 font-semibold text-lg">
                    Ready at: {new Date(order.orderReadyAt).toLocaleString()}
                </p>
            )}

            <ul
                className="divide-y divide-gray-200 border-t border-gray-200 text-sm font-medium text-gray-500"
                role="list"
            >
                {order.orderProducts.map((product) => (
                    <li 
                        key={product.productId} 
                        className="flex items-center gap-2 py-6 text-lg border-t border-gray-200 pt-4"
                    >
                        <span className="font-black">{product.quantity} x</span>
                        <span className="text-sm font-medium text-gray-900">{product.product.name}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
}
