import "./globals.css";
import { Nunito } from "next/font/google";

const nunito = Nunito({
    subsets: ["cyrillic"],
    variable: "--font-nunito",
    weight: ["400", "500", "600", "700", "800", "900"]
});

export default function MainLayout({
    children
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <head>
                <link data-rh="true" href="/logo.svg" rel="icon" />
            </head>
            <body className={`${nunito.variable}`}>{children}</body>
        </html>
    );
}
