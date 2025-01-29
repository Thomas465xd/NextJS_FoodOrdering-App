"use client"
import { useRouter } from "next/navigation";

export default function GoBackButton() {

    const router = useRouter();

    return (
        <div className="flex flex-row items-center justify-between gap-5 border-b pb-5">
            <button
                onClick={() => router.back()}
                className="bg-amber-400 text-xl text-center font-bold px-6 py-3 rounded shadow-md 
                        ring-1 ring-gray-300 hover:bg-amber-500 transition-all 
                        w-full max-w-xs lg:w-auto"
            >
                Go Back to Products
            </button>
        </div>
    )
}
