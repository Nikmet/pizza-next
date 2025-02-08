import { Container, Header } from "@/shared/components/shared";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Next Pizza | Оформление заказа"
};

export default function CheckoutLayout({
    children
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <main className="min-h-screen bg-[#f4f1ee]">
            <Header hasSearch={false} hasCart={false} />
            <Container>{children}</Container>
        </main>
    );
}
