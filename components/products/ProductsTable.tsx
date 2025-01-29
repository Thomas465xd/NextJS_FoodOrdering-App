"use client";

import { ProductsWithCategory } from "@/app/admin/products/page";
import { formatCurrency } from "@/src/utils";
import Link from "next/link";
import Swal from "sweetalert2";
import { useTransition } from "react";
import { deleteProduct } from "@/actions/delete-product-action";

type ProductTableProps = {
    products: ProductsWithCategory;
};

export default function ProductTable({ products }: ProductTableProps) {
    const [isPending, startTransition] = useTransition();

    const handleDelete = (productId: number) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!",
        }).then((result) => {
            if (result.isConfirmed) {
                startTransition(async () => {
                    try {
                        await deleteProduct(productId);
                        Swal.fire({
                            icon: "success",
                            title: "Deleted!",
                            text: "Product has been deleted.",
                            showConfirmButton: false,
                            timer: 1000,
                        });

                        // ✅ Refresh UI after deletion
                        setTimeout(() => {
                            window.location.reload();
                        }, 1000);
                    } catch (error) {
                        console.error("Error deleting product:", error);
                        Swal.fire("Error", "Failed to delete product.", "error");
                    }
                });
            }
        });
    };

    return (
        <div className="px-4 sm:px-6 lg:px-8 mt-20">
            <div className="mt-8 flow-root">
                <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8 bg-white p-5">
                        <table className="min-w-full divide-y divide-gray-300">
                            <thead>
                                <tr>
                                    <th className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0">
                                        Product
                                    </th>
                                    <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                        Price
                                    </th>
                                    <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                        Category
                                    </th>
                                    <th className="relative py-3.5 pl-3 pr-4 sm:pr-0">
                                        <span>Actions</span>
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {products.map((product) => (
                                    <tr key={product.id}>
                                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
                                            {product.name}
                                        </td>
                                        <td className="whitespace-nowrap px-3 py-4 text-sm text-left text-gray-500">
                                            {formatCurrency(product.price)}
                                        </td>
                                        <td className="whitespace-nowrap px-3 py-4 text-sm text-left text-gray-500">
                                            {product.category.name}
                                        </td>
                                        <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-center text-sm font-medium sm:pr-0">
                                            <Link
                                                href={`/admin/products/${product.id}/edit`}
                                                className="text-indigo-600 hover:text-indigo-800"
                                            >
                                                Edit <span className="sr-only">, {product.name}</span>
                                            </Link>

                                            <button
                                                onClick={() => handleDelete(product.id)}
                                                disabled={isPending} 
                                                className={`text-red-600 hover:text-red-800 ml-2 ${isPending ? "opacity-50 cursor-not-allowed" : ""}`}
                                            >
                                                Delete <span className="sr-only">, {product.name}</span>
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}
