import { create } from "zustand";
import { api } from "../services/api-client";
import { CartStateItem, getCartDetails } from "../lib/get-cart-details";
import { devtools } from "zustand/middleware";

export interface CartState {
    loading: boolean;
    error: boolean;
    totalAmount: number;
    items: CartStateItem[];

    fetchCartItems: () => Promise<void>;
    updateItemQuantity: (id: string, quantity: number) => Promise<void>;
    addCartItem: (values: any) => Promise<void>;
    removeCartItem: (id: string) => Promise<void>;
}

export const useCartStore = create<CartState>()(
    devtools((set, get) => ({
        loading: false,
        error: false,
        totalAmount: 0,
        items: [],

        // Функция для получения позиций корзины
        fetchCartItems: async () => {
            try {
                set({ loading: true, error: false });
                const data = await api.cart.getCart();
                console.log(data);

                set(getCartDetails(data));
            } catch (e) {
                console.log(e);
                set({ error: true });
            } finally {
                set({ loading: false });
            }
        },

        // Обновление количество позиции в корзине
        updateItemQuantity: async (id: string, quantity: number) => {
            try {
                set({ loading: true, error: false });
                const data = await api.cart.updateItemQuantity(id, quantity);
                set(getCartDetails(data));
            } catch (e) {
                console.log(e);
                set({ error: true });
            } finally {
                set({ loading: false });
            }
        },
        addCartItem: async (values: any) => {},
        removeCartItem: async (id: string) => {
            try {
                set({ loading: true, error: false });
                const data = await api.cart.removeCartItem(id);
                set(getCartDetails(data));
            } catch (e) {
                console.log(e);
                set({ error: true });
            } finally {
                set({ loading: false });
            }
        }
    }))
);
