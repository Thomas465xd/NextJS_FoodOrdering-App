import ToastNotification from "@/components/ui/ToastNotification";
import AdminSidebar from "@/components/admin/AdminSidebar";

export default async function AdminLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
            <div className="md:flex min-h-screen">
                {/* Sidebar with Fixed Position on Small Screens */}
                <aside className="md:w-72 bg-white md:sticky md:top-0 md:h-screen">
                    <AdminSidebar />
                </aside>

                {/* Main Content */}
                <main className="flex-1 h-screen overflow-y-scroll bg-gray-100 p-5 pb-96 md:pb-5">
                    {children}
                </main>
            </div>

            <ToastNotification />
        </>
    );
}
