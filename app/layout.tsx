import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const geistSans = localFont({
    src: "./fonts/GeistVF.woff",
    variable: "--font-geist-sans",
    weight: "100 900",
});
const geistMono = localFont({
    src: "./fonts/GeistMonoVF.woff",
    variable: "--font-geist-mono",
    weight: "100 900",
});

export const metadata: Metadata = {
    title: "Food Order App - Next.js, Prisma & App Router",
    description: "Order your favorite meals seamlessly with our modern food ordering app, built with Next.js, Prisma, and the App Router.",
    keywords: [
        "Food Order App",
        "Next.js",
        "Prisma",
        "App Router",
        "Online Food Ordering",
        "Restaurant App",
        "Fast Delivery",
        "React",
        "Tailwind CSS"
    ],
    metadataBase: new URL("https://yourdomain.com"), // 🔹 Set your production domain here
    authors: [{ name: "Thomas Schrödinger", url: "https://yourwebsite.com" }],
    creator: "Your Name",
    publisher: "Thomas Freelancer",
    robots: "index, follow",
    icons: {
        icon: "/logo.svg",
    },
    openGraph: {
        title: "Food Order App - Next.js, Prisma & App Router",
        description: "Order your favorite meals seamlessly with our modern food ordering app, built with Next.js, Prisma, and the App Router.",
        url: "https://yourwebsite.com",
        siteName: "Food Order App",
        type: "website",
        locale: "en_US",
        images: [
            {
                url: "/logo.svg",
                width: 1200,
                height: 630,
                alt: "Food Order App - Order meals online",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "Food Order App",
        description: "Order your favorite meals quickly and easily!",
        images: ["/logo.svg"], // Same as Open Graph image
    },
};


export default function RootLayout({children,}: Readonly<{children: React.ReactNode;}>) {
    return (
        <html lang="en">
        <body
            className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-100 overflow-y-hidden h-screen`}
        >
            {children}
        </body>
        </html>
    );
}
