"use client";

import {
    CheckoutDetailsItem,
    CheckoutItem,
    CheckoutSidebar,
    Container,
    Title,
    WhiteBlock
} from "@/shared/components/shared";
import { Button, Input, Textarea } from "@/shared/components/ui";
import { PizzaSize, PizzaType } from "@/shared/constants/pizza";
import { useCart } from "@/shared/hooks/use-cart";
import { getPizzaInfo } from "@/shared/lib/pizza-info";
import { ArrowRight, Package, Percent, Truck } from "lucide-react";

export default function CheckoutPage() {
    const { items, loading, removeCartItem, totalAmount, updateItemQuantity } = useCart();

    const onClickCountButton = (id: number, quantity: number, type: "plus" | "minus") => {
        updateItemQuantity(String(id), type == "plus" ? quantity + 1 : quantity - 1);
    };

    return (
        <Container className="mt-10">
            <Title text="Оформление заказа" size="lg" className="font-extrabold mb-8" />

            <div className="flex gap-10">
                {/* {Левая часть} */}
                <div className="flex flex-col gap-10 flex-1 mb-20">
                    <WhiteBlock title="1. Корзина">
                        <div className="flex flex-col gap-5">
                            {items.map(item => (
                                <CheckoutItem
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
                                    disabled={item.disabled}
                                    onClickCountButton={type => onClickCountButton(item.id, item.quantity, type)}
                                    onClickRemove={() => removeCartItem(String(item.id))}
                                />
                            ))}
                        </div>
                    </WhiteBlock>
                    <WhiteBlock title="2. Персональные данные">
                        <div className="grid grid-cols-2 gap-5">
                            <Input name="firstName" placeholder="Имя" className="text-base" />
                            <Input name="lastName" placeholder="Фамилия" className="text-base" />
                            <Input name="email" placeholder="E-mail" className="text-base" />
                            <Input name="phone" placeholder="Телефон" className="text-base" />
                        </div>
                    </WhiteBlock>
                    <WhiteBlock title="3. Адрес доставки">
                        <div className="flex flex-col gap-5">
                            <Input name="address" placeholder="Введите адрес..." className="text-base" />
                            <Textarea rows={5} className="text-base" placeholder="Комментарий к заказу" />
                        </div>
                    </WhiteBlock>
                </div>

                {/* {Правая часть} */}
                <div className="w-[450px]">
                    <CheckoutSidebar totalAmount={totalAmount} />
                </div>
            </div>
        </Container>
    );
}
