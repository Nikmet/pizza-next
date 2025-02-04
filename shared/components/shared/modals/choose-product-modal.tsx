"use client";

import { ProductWithRelations } from "@/@types/prisma";
import { useRouter } from "next/navigation";
import { Dialog } from "../../ui";
import { DialogContent, DialogTitle } from "../../ui/dialog";
import { cn } from "@/shared/lib/utils";
import { ChoosePizzaForm } from "../choose-pizza-form";
import { ChooseProductForm } from "../choose-product-form";
import { useCartStore } from "@/shared/store/cart";

export interface IChooseProductModalProps {
    product: ProductWithRelations;
    className?: string;
}

export const ChooseProductModal = ({ product, className }: IChooseProductModalProps): JSX.Element => {
    const router = useRouter();
    const firstItem = product.items[0];
    const isPizzaForm = Boolean(firstItem.pizzaType);
    const addCartItem = useCartStore(state => state.addCartItem);

    const onAddProduct = () => {
        console.log(firstItem.id);

        addCartItem({
            productItemId: firstItem.id
        });
    };

    const onAddPizza = (productItemId: number, ingredients: number[]) => {
        addCartItem({
            productItemId,
            ingredients
        });
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
                        onClickAddCart={(itemId, ingredients) => onAddPizza(itemId, ingredients)}
                    />
                ) : (
                    <ChooseProductForm imageUrl={product.imageUrl} name={product.name} onClickAdd={onAddProduct} totalPrice={firstItem.price} />
                )}
            </DialogContent>
        </Dialog>
    );
};
