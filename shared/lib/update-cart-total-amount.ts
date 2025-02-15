import { prisma } from "@/prisma/prisma-client";
import { calcPizzaTotalPrice } from "./calc-pizza-total-price";
import { calcCartItemPrice } from "./calc-cart-item-price";

export const UpdateCartTotalAmount = async (token: string) => {
    const userCart = await prisma.cart.findFirst({
        where: {
            token
        },
        include: {
            items: {
                orderBy: {
                    createdAt: "desc"
                },
                include: {
                    productItem: {
                        include: {
                            product: true
                        }
                    },
                    ingredients: true
                }
            }
        }
    });

    if (!userCart) {
        return;
    }

    const totalAmount = userCart.items.reduce((acc, item) => {
        return acc + calcCartItemPrice(item);
    }, 0);

    await prisma.cart.update({
        where: {
            id: userCart.id
        },
        data: {
            totalAmount
        }
    });

    return userCart;
};
