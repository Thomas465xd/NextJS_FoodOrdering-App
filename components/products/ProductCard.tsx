import { formatCurrency } from "@/src/utils"
import { Product } from "@prisma/client"
import Image from "next/image"
import AddProductButton from "./AddProductButton"

type ProductCardProps = {
    product: Product
}

export default function ProductCard({product} : ProductCardProps) {
    return (
        <div className="border bg-white rounded-lg last:mb-32 shadow-lg">
            
            <Image
                width={0} // Set width to auto
                height={0} // Set height to auto
                sizes="100vw" // Responsive size
                src={`/products/${product.image}.jpg`}
                alt={`Food Image for ${product.name}`}
                className="w-full h-auto rounded-t-lg object-cover"
            />

            <div className="p-5">
                <h3 className="text-xl font-bold">{product.name}</h3>
                <p className="mt-5 font-black text-4xl text-amber-500">
                    {formatCurrency(product.price)}
                </p>

                <AddProductButton
                    product={product}
                />
            </div>
        </div>
    )
}
