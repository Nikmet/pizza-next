import type { Metadata } from "next";
import "./globals.css";
import { Nunito } from "next/font/google";

const nunito = Nunito({
    subsets: ["cyrillic"],
    variable: "--font-nunito",
    weight: ["400", "500", "600", "700", "800", "900"]
});

export const metadata: Metadata = {
    title: "Pizza Next App | Главная"
};

export default function RootLayout({
    children
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={`${nunito.variable}`}>
                <main className="min-h-screen">{children}</main>
            </body>
        </html>
    );
}
