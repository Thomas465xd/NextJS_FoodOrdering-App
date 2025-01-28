import Link from "next/link";

type ProductsPaginationProps = {
    page: number
    totalPages: number
}

export default function ProductsPagination({ page, totalPages }: ProductsPaginationProps) {
    const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

    return (
        <nav className="flex justify-center items-center gap-2 py-10">
            {page > 1 && (
                <Link
                    key={page}
                    href={`/admin/products?page=${page - 1}`}
                    className="flex items-center justify-center w-10 h-10 bg-white text-gray-900 text-lg font-bold rounded-md shadow-md ring-1 ring-gray-300 hover:bg-gray-100 transition-all"
                >
                    &laquo;
                </Link>
            )}

            {pages.map(currentPage => (
                <Link
                    key={currentPage}
                    href={`/admin/products?page=${currentPage}`}
                    className={`flex items-center justify-center w-10 h-10 px-4 py-2 text-sm font-bold rounded-md shadow-md ring-1 ring-gray-300 transition-all ${
                        page === currentPage 
                        ? "bg-purple-700 text-white ring-purple-700"
                        : "bg-white text-gray-900 hover:bg-gray-100"
                    }`}
                >
                    {currentPage}
                </Link>
            ))}

            {page < totalPages && (
                <Link
                    href={`/admin/products?page=${page + 1}`}
                    className="flex items-center justify-center w-10 h-10 bg-white text-gray-900 text-lg font-bold rounded-md shadow-md ring-1 ring-gray-300 hover:bg-gray-100 transition-all"
                >
                    &raquo;
                </Link>
            )}
        </nav>
    );
}
