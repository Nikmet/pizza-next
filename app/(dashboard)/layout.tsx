export const metadata = {
    title: "Pizza Next App | Дашборд"
};

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="ru">
            <body>{children}</body>
        </html>
    );
}
