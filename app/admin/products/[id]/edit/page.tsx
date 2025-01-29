import EditProductForm from "@/components/products/EditProductForm"
import ProductForm from "@/components/products/ProductForm"
import GoBackButton from "@/components/ui/GoBackButton"
import Heading from "@/components/ui/Heading"
import { prisma } from "@/src/lib/prisma"
import Link from "next/link"
import { notFound } from "next/navigation"

async function getProductById(id: number) {
    const product = await prisma.product.findUnique({
        where: {
            id
        }
    })

    return product
}

export default async function editProductsPage({params} : { params: { id: string}}) {

    const product = await getProductById(+params.id)
    //console.log(product)

    if(!product) {
        notFound()
    }

    return (
        <>
            <Heading>Edit Product: <span className="text-indigo-800">{product.name}</span></Heading>

            <GoBackButton />


            <div className="flex flex-col items-center justify-center px-4">
                <div className="w-full max-w-2xl lg:max-w-3xl mx-auto">

                    <div className="w-full mt-5">
                        <EditProductForm>
                            <ProductForm 
                                product={product}
                            />
                        </EditProductForm>
                    </div>
                </div>
            </div>
        </>
    )
}
