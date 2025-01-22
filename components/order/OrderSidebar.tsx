import { PrismaClient } from "@prisma/client"

const prismaClient = new PrismaClient()

async function getCategories() {
    const categories = await prismaClient.category.findMany()
    console.log(categories)
}

export default async function OrderSidebar() {

    await getCategories();

    return (
        <aside className="md:w-72 md:h-screen bg-white">

        </aside>
    )
}

