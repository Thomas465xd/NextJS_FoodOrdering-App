import ProductsSearchForm from "@/components/products/ProductsSearchForm";
import ProductTable from "@/components/products/ProductsTable";
import Heading from "@/components/ui/Heading";
import { prisma } from "@/src/lib/prisma";

async function searchProducts(searchTerm: string) {
    const products = await prisma.product.findMany({
        where: {
            name: {
                contains: searchTerm,
                mode: 'insensitive'
            },
        },
        include: {
            category: true
        }
    })
    return products
}

export default async function SearchPage({searchParams} : {searchParams: {search: string}}) {

    const products = await searchProducts(searchParams.search);
    //console.log(products)

    const searchResults = await prisma.product.count({
        where: {
            name: {
                contains: searchParams.search, mode: 'insensitive'
            }
        }
    })

    return (
        <>
            <Heading>Search Results for: <span className="font-bold text-purple-800">"{searchParams.search}"</span></Heading>

            <p className="text-lg font-bold border-b pb-2">{searchResults} results found</p>

            <div className="flex flex-col justify-end gap-5">
                <ProductsSearchForm />
            </div>

            {products.length ? (
                <ProductTable 
                    products={products}
                />
            ) : (
                <p className="text-lg font-bold">No results found for "{searchParams.search}"</p>
            )}
        </>
    )
}