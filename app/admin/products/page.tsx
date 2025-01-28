import ProductsPagination from "@/components/products/ProductsPagination";
import ProductsSearchForm from "@/components/products/ProductsSearchForm";
import ProductTable from "@/components/products/ProductsTable";
import Heading from "@/components/ui/Heading";
import { prisma } from "@/src/lib/prisma";
import Link from "next/link";
import { redirect } from "next/navigation";

async function productCount() {
    return await prisma.product.count() // returns a number
}

async function getProducts(page: number, pageSize: number) {

    const skip = (page - 1) * pageSize

    const products = await prisma.product.findMany({
        take: pageSize,
        skip: skip,
        include: {
            category: true
        }
    });

    return products
}

export type ProductsWithCategory = Awaited<ReturnType<typeof getProducts>>

export default async function ProductsPage({searchParams} : {searchParams: {page: string}}) {

    const page = +searchParams.page || 1
    const pageSize = 10

    if(page < 1) {
        redirect(`/admin/products`)
    }

    const productsData = getProducts(page, pageSize);
    const totalProductsData = productCount();

    const [ products, totalProducts] = await Promise.all([productsData, totalProductsData])
    //console.log(totalProducts)

    const totalPages = Math.ceil(totalProducts / pageSize);

    if(page > totalPages) {
        redirect(`/admin/products?page=${totalPages}`)
    }

    return (
        <>
            <Heading>Manage Your Products</Heading>

            <div className="flex flex-col lg:flex-row items-center justify-between gap-5 border-b pb-5">
                <Link
                    href={`/admin/products/new`}
                    className="bg-amber-400 text-xl text-center font-bold px-6 py-3 rounded shadow-md 
                            ring-1 ring-gray-300 hover:bg-amber-500 transition-all 
                            w-full max-w-xs lg:w-auto"
                >
                    Create Product
                </Link>

                <ProductsSearchForm />
            </div>

            <ProductTable
                products={products}
            />

            <ProductsPagination
                page={page}
                totalPages={totalPages}
            />
        </>
    )
}
