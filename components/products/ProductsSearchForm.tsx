"use client"

import { searchSchema } from "@/src/schema"
//import { redirect } from "next/navigation";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

export default function ProductsSearchForm() {
    const router = useRouter()

    const handleSearchForm = (formData: FormData) => {
        const data = {
            search: formData.get("search")
        }

        const result = searchSchema.safeParse(data);
        //console.log(result)

        if(!result.success) {
            result.error.issues.forEach(issue => {
                toast.error(issue.message);
            })

            return
        }
        router.push(`/admin/products/search?search=${result.data.search}`)
    }

    return (
        <form 
            action={handleSearchForm}
            className="flex items-center mt-10"
        >
            <input 
                type="text" 
                placeholder="Search for a product"
                className="p-2 placeholder:grey-400 w-full rounded-l border"
                name="search"
            />

            <input 
                type="submit" 
                className="p-2 text-white bg-indigo-600 hover:bg-indigo-700 transition-colors rounded-r"
                value={"Search"}
            />
        </form>
    )
}
