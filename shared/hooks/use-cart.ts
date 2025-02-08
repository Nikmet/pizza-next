import { useShallow } from "zustand/react/shallow";
import { useCartStore } from "../store/cart";
import { useEffect } from "react";
import { CartStateItem } from "../lib/get-cart-details";
import { CreateCartItemValues } from "../services/dto/cart.dto";

type ReturnProps = {
    totalAmount: number;
    items: CartStateItem[];
    updateItemQuantity: (id: string, quantity: number) => void;
    removeCartItem: (id: string) => void;
    loading: boolean;
    addCartItem: (values: CreateCartItemValues) => void;
};

export const useCart = (): ReturnProps => {
    const cartState = useCartStore(useShallow(state => state));

    useEffect(() => {
        cartState.fetchCartItems();
    }, []);

    return cartState;
};
