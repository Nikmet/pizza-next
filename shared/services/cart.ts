import { axiosInstance } from "./instance";
import { CartDTO } from "./dto/cart.dto";

export const getCart = async (): Promise<CartDTO> => {
    const { data } = await axiosInstance.get<CartDTO>("/cart");
    return data;
};

export const updateItemQuantity = async (itemID: string, quantity: number): Promise<CartDTO> => {
    const { data } = await axiosInstance.patch<CartDTO>(`/cart/${itemID}`, { quantity });
    return data;
};
