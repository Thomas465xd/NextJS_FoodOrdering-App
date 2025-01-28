import { prisma } from "@/src/lib/prisma"
import ImageUpload from "./ImageUpload"

async function getCategories() {
    return await prisma.category.findMany()
}

export default async function ProductForm() {

    const categories = await getCategories()

    return (
        <>
            <div className="space-y-2">
                <label
                    className="text-slate-800"
                    htmlFor="name"
                >Name:</label>
                <input
                    id="name"
                    type="text"
                    name="name"
                    className="block w-full p-3 bg-slate-100"
                    placeholder="Product Name"
                />
            </div>

            <div className="space-y-2">
                <label
                    className="text-slate-800"
                    htmlFor="price"
                >Price:</label>
                <input
                    id="price"
                    name="price"
                    className="block w-full p-3 bg-slate-100"
                    placeholder="Product Price"
                />
            </div>

            <div className="space-y-2">
                <label
                    className="text-slate-800"
                    htmlFor="categoryId"
                >Categorie:</label>
                <select
                    className="block w-full p-3 bg-slate-100"
                    id="categoryId"
                    name="categoryId"
                >
                    <option value="">-- Select --</option>

                    {categories.map(category => (
                        <option 
                            key={category.id}
                            value={category.id}
                            className=""
                        >
                            {category.name}
                        </option>
                    ))}

                </select>
            </div>

            <ImageUpload />
        </>
    )
}