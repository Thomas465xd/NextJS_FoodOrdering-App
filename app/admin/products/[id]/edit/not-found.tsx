import Heading from "@/components/ui/Heading";
import Link from "next/link";

export default function NotFound() {
    return (
        <div className="flex flex-col items-center justify-center h-screen text-center space-y-6">
            <h1 className="text-2xl font-bold text-red-700">404</h1>
            <Heading>Product not found</Heading>

            <Link
                href={`/admin/products`}
                className="bg-amber-400 hover:bg-amber-500 transition-colors text-black text-xl px-10 py-3 font-bold cursor-pointer rounded"
            >
                Go to Products Panel
            </Link>

            <p className="text-gray-600 opacity-80">
                If you believe this is an error, please contact support.
            </p>
        </div>
    );
}
