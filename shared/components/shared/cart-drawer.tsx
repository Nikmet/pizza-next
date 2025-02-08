"use client";

import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger
} from "@/shared/components/ui/sheet";
import Link from "next/link";
import { memo, ReactNode, useEffect } from "react";
import { Button } from "../ui";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { CartDrawerItem } from "./cart-drawer-item";
import { getPizzaInfo } from "@/shared/lib/pizza-info";
import { useCartStore } from "@/shared/store/cart";
import { PizzaSize, PizzaType } from "@/shared/constants/pizza";
import { useShallow } from "zustand/react/shallow";
import { cn } from "@/shared/lib/utils";
import Image from "next/image";
import { Title } from "./title";
import { useCart } from "@/shared/hooks/use-cart";

export interface ICartDrawerProps {
    children?: ReactNode;
}

export const CartDrawer = memo(function CartDrawer({ children }: ICartDrawerProps): JSX.Element {
    const { items, loading, removeCartItem, totalAmount, updateItemQuantity } = useCart();

    const onClickCountButton = (id: number, quantity: number, type: "plus" | "minus") => {
        updateItemQuantity(String(id), type == "plus" ? quantity + 1 : quantity - 1);
    };

    return (
        <Sheet>
            <SheetTrigger asChild>{children}</SheetTrigger>
            <SheetContent className={cn("flex flex-col justify-between pb-0 bg-[#f4f1ee]")}>
                {!totalAmount && (
                    <div className="flex flex-col items-center justify-center w-72 my-auto mx-auto">
                        <Image src="/empty-cart.png" alt="empty cart" width={150} height={150} />
                        <Title text="Корзина пустая" size="sm" className="text-center font-bold my-2" />
                        <p className="text-center text-neutral-500 mb-5">
                            Добавьте хотя бы одну пиццу, чтобы завершить заказ
                        </p>
                        <SheetClose>
                            <Button className="h-12 text-base" size={"lg"}>
                                <ArrowLeft className="mr-2" size={20} />
                                <span>Вернуться к выбору</span>
                            </Button>
                        </SheetClose>
                    </div>
                )}

                {totalAmount > 0 && (
                    <>
                        {/* sheet header */}
                        <SheetHeader>
                            <SheetTitle>
                                В корзине <span className="font-bold">{items.length} товара</span>
                            </SheetTitle>
                        </SheetHeader>

                        {/* sheet body */}
                        <div className="-mx-6 mt-5 overflow-auto flex-1 scrollbar">
                            {items.map(item => (
                                <div className="mb-2" key={item.id}>
                                    <CartDrawerItem
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
                                        disabled={item.disabled}
                                        onClickCountButton={type => onClickCountButton(item.id, item.quantity, type)}
                                        onClickRemoveButton={() => removeCartItem(String(item.id))}
                                    />
                                </div>
                            ))}
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
                                    <Button type="submit" className="w-full h-12 text-base" loading={loading}>
                                        Оформить заказ
                                        <ArrowRight className="w-5 ml-2" />
                                    </Button>
                                </Link>
                            </div>
                        </SheetFooter>
                    </>
                )}
            </SheetContent>
        </Sheet>
    );
});
