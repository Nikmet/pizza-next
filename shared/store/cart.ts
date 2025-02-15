import { create } from "zustand";
import { api } from "../services/api-client";
import { CartStateItem, getCartDetails } from "../lib/get-cart-details";
import { devtools } from "zustand/middleware";
import { CreateCartItemValues } from "../services/dto/cart.dto";

export interface CartState {
    loading: boolean;
    error: boolean;
    totalAmount: number;
    items: CartStateItem[];
    totalCount: () => number;

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
        totalCount: () => get().items.reduce((acc, item) => acc + item.quantity, 0),

        // Функция для получения позиций корзины
        fetchCartItems: async () => {
            try {
                set({ loading: true, error: false });
                const data = await api.cart.getCart();

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

        // Добавление позиции в корзину
        addCartItem: async (values: CreateCartItemValues) => {
            try {
                set({ loading: true, error: false });
                const data = await api.cart.addCartItem(values);
                set(getCartDetails(data));
            } catch (e) {
                console.log(e);
                set({ error: true });
            } finally {
                set({ loading: false });
            }
        },

        // Удаление позиции из корзины
        removeCartItem: async (id: string) => {
            try {
                set(state => ({
                    loading: true,
                    error: false,
                    items: state.items.map(item => (item.id === Number(id) ? { ...item, disabled: true } : item))
                }));
                const data = await api.cart.removeCartItem(id);
                set(getCartDetails(data));
            } catch (e) {
                console.log(e);
                set({ error: true });
            } finally {
                set(state => ({
                    loading: true,
                    items: state.items.map(item => (item.id === Number(id) ? { ...item, disabled: false } : item))
                }));
            }
        }
    }))
);
