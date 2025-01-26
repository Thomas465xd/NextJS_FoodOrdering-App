"use client"

import Image from "next/image"
import { Category } from "@prisma/client"
import { useParams } from "next/navigation"
import Link from "next/link"

type CategoryIconProps = {
    category: Category
}

export default function CategoryIcon({category} : CategoryIconProps) {

    const params = useParams()
    //console.log(params)

    return (
        <div 
            className={`${category.slug === params.category && "bg-amber-400 hover:bg-amber-500 transition-colors"} flex items-center gap-4 w-full border-t border-gray-200 p-3 last-of-type:border-b`}
        >
            <div className="w-16 h-16 relative">
                <Image
                    fill
                    src={`/icon_${category.slug}.svg`} 
                    alt="Category Image" />
            </div>

            <Link href={`/order/${category.slug}`} className={`${category.slug === params.category && "hover:text-black"} text-xl font-bold hover:text-amber-500 transition-colors`}>
                {category.name}
            </Link>
        </div>
    )
}
