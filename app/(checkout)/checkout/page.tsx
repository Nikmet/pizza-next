"use client";

import { FormProvider, useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCart } from "@/shared/hooks/use-cart";

import {
    CheckoutAddressForm,
    CheckoutCart,
    checkoutFormSchema,
    CheckoutFormValues,
    CheckoutPersonalInfo,
    CheckoutSidebar,
    Container,
    Title
} from "@/shared/components/shared";

export default function CheckoutPage() {
    const { items, removeCartItem, totalAmount, updateItemQuantity, loading } = useCart();

    const form = useForm<CheckoutFormValues>({
        resolver: zodResolver(checkoutFormSchema),
        defaultValues: {
            email: "",
            firstName: "",
            lastName: "",
            phone: "",
            address: "",
            comment: ""
        }
    });

    const onSubmit: SubmitHandler<CheckoutFormValues> = (data: CheckoutFormValues) => {
        console.log(data);
    };

    const onClickCountButton = (id: number, quantity: number, type: "plus" | "minus") => {
        updateItemQuantity(String(id), type == "plus" ? quantity + 1 : quantity - 1);
    };
    return (
        <Container className="mt-10">
            <Title text="Оформление заказа" size="lg" className="font-extrabold mb-8" />

            <FormProvider {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <div className="flex gap-10">
                        {/* {Левая часть} */}
                        <div className="flex flex-col gap-10 flex-1 mb-20">
                            <CheckoutCart
                                loading={loading}
                                items={items}
                                onClickCountButton={onClickCountButton}
                                removeCartItem={removeCartItem}
                            />
                            <CheckoutPersonalInfo />
                            <CheckoutAddressForm />
                        </div>

                        {/* {Правая часть} */}
                        <div className="w-[450px]">
                            <CheckoutSidebar totalAmount={totalAmount} loading={loading} />
                        </div>
                    </div>
                </form>
            </FormProvider>
        </Container>
    );
}
