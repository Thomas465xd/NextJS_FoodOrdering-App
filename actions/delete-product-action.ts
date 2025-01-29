"use server";

import { prisma } from "@/src/lib/prisma";

export async function deleteProduct(productId: number) {
    try {
        await prisma.product.delete({
            where: { id: productId },
        });
        //console.log(`Product ${productId} deleted successfully`);
    } catch (error) {
        console.error("Error deleting product:", error);
        throw new Error("Failed to delete product");
    }
}
