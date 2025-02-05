import { CartDTO } from "../services/dto/cart.dto";
import { calcCartItemPrice } from "./calc-cart-item-price";

export type CartStateItem = {
    id: number;
    quantity: number;
    name: string;
    imageUrl: string;
    price: number;
    disabled: boolean;
    pizzaSize?: number | null;
    pizzaType?: number | null;
    ingredients?: Array<{ id: number; name: string }>;
};

interface ReturnProps {
    items: CartStateItem[];
    totalAmount: number;
}

export const getCartDetails = (data: CartDTO): ReturnProps => {
    const items: CartStateItem[] = data.items.map(item => {
        return {
            id: item.id,
            quantity: item.quantity,
            name: item.productItem.product.name,
            imageUrl: item.productItem.product.imageUrl,
            price: calcCartItemPrice(item),
            pizzaSize: item.productItem.size,
            pizzaType: item.productItem.pizzaType,
            disabled: false,
            ingredients: item.ingredients.map(ingredient => {
                return {
                    id: ingredient.id,
                    name: ingredient.name
                };
            })
        };
    });

    const totalAmount = items.reduce((acc, item) => acc + item.price, 0);

    return { items, totalAmount };
};
