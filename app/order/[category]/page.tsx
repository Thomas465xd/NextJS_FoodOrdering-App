import ProductCard from "@/components/products/ProductCard";
import { prisma } from "@/src/lib/prisma"

async function getProducts(category: string) {
    const products = await prisma.product.findMany({
        where: {
            category: {
                slug: category
            }
        }
    })

    return products
}

export default async function OrderPage({params} : { params: { category: string}}) {

    const products = await getProducts(params.category);

    //console.log(products)
    return (
        <>
            <h1 className="text-2xl my-5">
                Choose and add products to <span className="text-indigo-800 font-bold">your order</span>
            </h1>

            <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-4 items-start overflow-y-auto h-screen mb-10">
                {products.map((product) => (
                    <ProductCard
                        key={product.id}
                        product={product}
                    />
                ))}
            </div>
        </>
    )
}
