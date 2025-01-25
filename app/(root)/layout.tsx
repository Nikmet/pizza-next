import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import { Header } from "@/components/shared";

export const metadata: Metadata = {
    title: "Pizza Next App | Главная"
};

export default function RootLayout({
    children
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
            <Header />
            <main className="min-h-screen">{children}</main>
        </>
    );
}
