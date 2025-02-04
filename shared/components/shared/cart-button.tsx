"use client";

import { ArrowRight, ShoppingCart } from "lucide-react";
import { Button } from "../ui";
import { cn } from "@/shared/lib/utils";
import { CartDrawer } from "./cart-drawer";
import { useCartStore } from "@/shared/store/cart";
import { useShallow } from "zustand/react/shallow";

export interface ICartButtonProps {
    className?: string;
}

export const CartButton = ({ className }: ICartButtonProps): JSX.Element => {
    const [cartCount, cartTotal, loading] = useCartStore(
        useShallow(state => [state.totalCount, state.totalAmount, state.loading])
    );

    return (
        <CartDrawer>
            <Button className={cn("group relative", { "w-[105px]": loading }, className)} loading={loading}>
                <b>{cartTotal} ₽</b>
                <span className="h-full w-[1px] bg-white/30 mx-3"></span>
                <div className="flex items-center gap-1 transition duration-300 group-hover:opacity-0">
                    <ShoppingCart size={16} className="relative" strokeWidth={2} />
                    <b>{cartCount()}</b>
                </div>
                <ArrowRight
                    size={20}
                    className="absolute right-5 transition duration-300 -translate-x-2 opacity-0 group-hover:opacity-100 group-hover:translate-x-0"
                />
            </Button>
        </CartDrawer>
    );
};
