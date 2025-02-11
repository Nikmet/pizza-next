import { PaymentCallbackData } from "@/@types/yookassa";
import { prisma } from "@/prisma/prisma-client";
import { OrderSuccessTemplate } from "@/shared/components/shared/email-templates/order-success";
import { sendEmail } from "@/shared/lib/send-email";
import { CartItemDTO } from "@/shared/services/dto/cart.dto";
import { OrderStatus } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    try {
        const body = (await request.json()) as PaymentCallbackData;

        const order = await prisma.order.findFirst({
            where: {
                id: Number(body.object.metadata.order_id)
            }
        });

        if (!order) {
            console.log("Order not found");
            return new NextResponse("Order not found");
        }

        const isSucceeded = body.object.status === "succeeded";
        console.log(body.object.status);

        console.log(isSucceeded);

        await prisma.order.update({
            where: {
                id: order.id
            },
            data: {
                status: isSucceeded ? OrderStatus.SUCCEEDED : OrderStatus.CANCELED
            }
        });

        const items = JSON.parse(order.items as string) as unknown as CartItemDTO[];

        if (isSucceeded) {
            await sendEmail(
                order.email,
                "Next Pizza | Ваш заказ №" + order.id + " успешно оплачен",
                OrderSuccessTemplate({
                    orderId: order.id,
                    items
                })
            );
        } else {
            console.log("Order canceled");
        }
    } catch (e) {
        console.log(e);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
