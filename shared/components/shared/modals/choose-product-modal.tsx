"use client";

import { ProductWithRelations } from "@/@types/prisma";
import { useRouter } from "next/navigation";
import { Dialog } from "../../ui";
import { DialogContent, DialogTitle } from "../../ui/dialog";
import { cn } from "@/shared/lib/utils";
import { ChoosePizzaForm } from "../choose-pizza-form";
import { ChooseProductForm } from "../choose-product-form";
import { useCartStore } from "@/shared/store/cart";
import toast from "react-hot-toast";
import { useShallow } from "zustand/react/shallow";

export interface IChooseProductModalProps {
    product: ProductWithRelations;
    className?: string;
}

export const ChooseProductModal = ({ product, className }: IChooseProductModalProps): JSX.Element => {
    const router = useRouter();
    const firstItem = product.items[0];
    const isPizzaForm = Boolean(firstItem.pizzaType);
    const [addCartItem, loading] = useCartStore(useShallow(state => [state.addCartItem, state.loading]));

    const onSubmit = async (itemId?: number, ingredients?: number[]) => {
        const productItemId = itemId ?? firstItem.id;

        try {
            await addCartItem({
                productItemId,
                ingredients
            });
            toast.success(`${product.name} успешно добавлен в корзину`);
            router.back();
        } catch (e) {
            toast.error("Не удалось добавить продукт в корзину");
            console.error(e);
        }
    };

    return (
        <Dialog open={Boolean(product)} onOpenChange={() => router.back()}>
            <DialogContent
                className={cn("p-0 w-[1060px] max-w-[1060px] min-h-[550px] bg-white overflow-hidden", className)}
                aria-describedby={undefined}
            >
                <DialogTitle className="hidden" />
                {isPizzaForm ? (
                    <ChoosePizzaForm
                        imageUrl={product.imageUrl}
                        name={product.name}
                        ingredients={product.ingredients}
                        items={product.items}
                        onClickAddCart={(itemId, ingredients) => onSubmit(itemId, ingredients)}
                        loading={loading}
                    />
                ) : (
                    <ChooseProductForm
                        imageUrl={product.imageUrl}
                        name={product.name}
                        onClickAdd={() => onSubmit()}
                        totalPrice={firstItem.price}
                        loading={loading}
                    />
                )}
            </DialogContent>
        </Dialog>
    );
};
