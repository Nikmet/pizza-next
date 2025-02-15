"use client";

import { FC, useEffect, useState } from "react";
import { Container } from "./container";
import Image from "next/image";
import Link from "next/link";
import { SearchInput } from "./search-input";
import { cn } from "@/shared/lib/utils";
import { CartButton } from "./cart-button";
import { useSearchParams } from "next/navigation";
import toast from "react-hot-toast";
import { ProfileButton } from "./profile-button";
import { AuthModal } from "./modals/auth-modal/auth-modal";

interface Props {
    className?: string;
    hasSearch?: boolean;
    hasCart?: boolean;
}

export const Header: FC<Props> = ({ hasSearch = true, hasCart = true, className }) => {
    const searchParams = useSearchParams();
    const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

    useEffect(() => {
        if (searchParams.has("paid")) {
            setTimeout(() => {
                toast.success("Заказ успешно оплачен! Информация отправлена на почту");
            }, 500);
        }
    }, []);

    return (
        <header className={cn("border border-b", className)}>
            <Container className="flex items-center justify-between py-8">
                {/* Левая часть */}
                <Link href="/">
                    <div className="flex items-center gap-4">
                        <Image src="/logo.svg" alt="Logo" width={35} height={35} />
                        <div>
                            <h1 className="text-2xl uppercase font-black">Next Pizza</h1>
                            <p className="text-sm text-gray-400 leading-3">вкусней уже некуда</p>
                        </div>
                    </div>
                </Link>

                {/* Поиск */}
                {hasSearch && (
                    <div className="mx-10 flex-1">
                        <SearchInput />
                    </div>
                )}

                {/* Правая часть */}
                <div className="flex items-center gap-3">
                    <AuthModal open={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />

                    <ProfileButton
                        onClickSignIn={() => {
                            setIsAuthModalOpen(true);
                        }}
                    />

                    {hasCart && (
                        <div>
                            <CartButton />
                        </div>
                    )}
                </div>
            </Container>
        </header>
    );
};
