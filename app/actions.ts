"use server";

import { prisma } from "@/prisma/prisma-client";
import { CheckoutFormValues } from "@/shared/components/shared";
import { PayOrderTemplate } from "@/shared/components/shared/email-templates/pay-order";
import { createPayment } from "@/shared/lib/create-payment";
import { getUserSession } from "@/shared/lib/get-user-session";
import { sendEmail } from "@/shared/lib/send-email";
import { OrderStatus, Prisma } from "@prisma/client";
import { hashSync } from "bcrypt";
import { cookies } from "next/headers";

export async function createOrder(data: CheckoutFormValues) {
    try {
        const cookieStore = cookies();
        const cartToken = cookieStore.get("cartToken")?.value;

        if (!cartToken) {
            throw new Error("Cart token not found");
        }

        const userCart = await prisma.cart.findFirst({
            where: {
                token: cartToken
            },
            include: {
                user: true,
                items: {
                    include: {
                        ingredients: true,
                        productItem: {
                            include: {
                                product: true
                            }
                        }
                    }
                }
            }
        });

        if (!userCart) {
            throw new Error("Cart not found");
        }

        if (userCart?.totalAmount == 0) {
            throw new Error("Cart is empty");
        }

        const order = await prisma.order.create({
            data: {
                userId: userCart.userId,
                token: cartToken,
                fullName: `${data.firstName} ${data.lastName}`,
                email: data.email,
                phone: data.phone,
                address: data.address,
                comment: data.comment,
                totalAmount: userCart.totalAmount,
                status: OrderStatus.PENDING,
                items: JSON.stringify(userCart.items)
            }
        });

        await prisma.cart.update({
            where: {
                id: userCart.id
            },
            data: {
                totalAmount: 0
            }
        });

        await prisma.cartItem.deleteMany({
            where: {
                cartId: userCart.id
            }
        });

        const paymentData = await createPayment({
            amount: userCart.totalAmount,
            description: `Оплата заказа №${order.id}`,
            orderId: order.id
        });

        if (!paymentData) {
            throw new Error("Payment data not found");
        }

        await prisma.order.update({
            where: {
                id: order.id
            },
            data: {
                paymentId: paymentData.id
            }
        });

        const paymentUrl = paymentData.confirmation.confirmation_url;

        await sendEmail(
            data.email,
            "Оплата заказа Next Pizza №" + order.id,
            PayOrderTemplate({
                orderId: order.id,
                totalAmount: order.totalAmount,
                paymentLink: paymentUrl
            })
        );

        return paymentUrl;
    } catch (e) {
        console.log(e);
    }
}

export async function updateUserInfo(data: Prisma.UserCreateInput) {
    try {
        const currentUser = await getUserSession();

        if (!currentUser) {
            throw new Error("User not found");
        }

        await prisma.user.update({
            where: {
                id: Number(currentUser.id)
            },
            data: {
                fullName: data.fullName,
                email: data.email,
                password: hashSync(data.password, 10)
            }
        });
    } catch (e) {
        console.log(e);
    }
}
