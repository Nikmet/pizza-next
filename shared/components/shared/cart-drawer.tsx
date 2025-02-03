"use client";

import { Sheet, SheetContent, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "@/shared/components/ui/sheet";
import Link from "next/link";
import { ReactNode, useEffect } from "react";
import { Button } from "../ui";
import { ArrowRight } from "lucide-react";
import { CartDrawerItem } from "./cart-drawer-item";
import { getPizzaInfo } from "@/shared/lib/pizza-info";
import { useCartStore } from "@/shared/store/cart";
import { PizzaSize, PizzaType } from "@/shared/constants/pizza";

export interface ICartDrawerProps {
    className?: string;
    children?: ReactNode;
}

export const CartDrawer = ({ className, children }: ICartDrawerProps): JSX.Element => {
    const { fetchCartItems, items, totalAmount } = useCartStore();

    useEffect(() => {
        fetchCartItems();
    }, []);

    return (
        <Sheet>
            <SheetTrigger asChild>{children}</SheetTrigger>
            <SheetContent className="flex flex-col justify-between pb-0 bg-[#f4f1ee]">
                {/* sheet header */}
                <SheetHeader>
                    <SheetTitle>
                        В корзине <span className="font-bold">3 товара</span>
                    </SheetTitle>
                </SheetHeader>

                {/* sheet body */}
                <div className="-mx-6 mt-5 overflow-auto flex-1 scrollbar">
                    <div className="mb-2">
                        {items.map(item => (
                            <CartDrawerItem
                                key={item.id}
                                id={item.id}
                                imageUrl={item.imageUrl}
                                details={
                                    item.pizzaSize
                                        ? getPizzaInfo({
                                              size: item.pizzaSize as PizzaSize,
                                              type: item.pizzaType as PizzaType,
                                              selectedIngredients: new Set(item.ingredients)
                                          }).textDetails
                                        : ""
                                }
                                name={item.name}
                                price={item.price}
                                quantity={item.quantity}
                            />
                        ))}
                    </div>
                </div>

                {/* sheet footer */}
                <SheetFooter className="-mx-6 bg-white p-8">
                    <div className="w-full">
                        <div className="flex mb-4">
                            <span className="flex flex-1 text-lg text-neutral-500">
                                Итого
                                <div className="flex-1 border-b border-dashed border-b-neutral-200 relative -top-1 mx-2" />
                            </span>

                            <span className="font-bold text-lg">{totalAmount} ₽</span>
                        </div>

                        <Link href="/checkout">
                            <Button type="submit" className="w-full h-12 text-base">
                                Оформить заказ
                                <ArrowRight className="w-5 ml-2" />
                            </Button>
                        </Link>
                    </div>
                </SheetFooter>
            </SheetContent>
        </Sheet>
    );
};
