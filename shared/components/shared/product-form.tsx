"use client";

import toast from "react-hot-toast";
import { ChoosePizzaForm } from "./choose-pizza-form";
import { ChooseProductForm } from "./choose-product-form";
import { useCartStore } from "@/shared/store/cart";
import { useShallow } from "zustand/react/shallow";
import { ProductWithRelations } from "@/@types/prisma";

export interface IProductFormProps {
    className?: string;
    product: ProductWithRelations;
    _onSubmit?: VoidFunction;
}

export const ProductForm = ({ product, className, _onSubmit }: IProductFormProps): JSX.Element => {
    const [addCartItem, loading] = useCartStore(useShallow(state => [state.addCartItem, state.loading]));

    const firstItem = product.items[0];
    const isPizzaForm = Boolean(firstItem.pizzaType);

    const onSubmit = async (itemId?: number, ingredients?: number[]) => {
        const productItemId = itemId ?? firstItem.id;

        try {
            await addCartItem({
                productItemId,
                ingredients
            });
            toast.success(`${product.name} успешно добавлен в корзину`);
            _onSubmit?.();
        } catch (e) {
            toast.error("Не удалось добавить продукт в корзину");
            console.error(e);
        }
    };
    return (
        <div className={className}>
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
        </div>
    );
};
