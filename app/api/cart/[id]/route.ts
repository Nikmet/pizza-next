import { prisma } from "@/prisma/prisma-client";
import { UpdateCartTotalAmount } from "@/shared/lib/update-cart-total-amount";
import { error } from "console";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
    try {
        const { id } = params;
        const data = (await req.json()) as { quantity: number };
        const token = req.cookies.get("cartToken")?.value;

        if (!token) {
            return NextResponse.json({ errorMsg: "Cart token not found" });
        }

        const cartItem = await prisma.cartItem.findFirst({
            where: {
                id: Number(id)
            }
        });

        if (!cartItem) {
            return NextResponse.json({ errorMsg: "Cart item not found" });
        }

        await prisma.cartItem.update({
            where: {
                id: Number(id)
            },
            data: {
                quantity: data.quantity
            }
        });

        const updatedUserCart = await UpdateCartTotalAmount(token);
        return NextResponse.json(updatedUserCart);
    } catch (e) {
        console.warn("[CART_PATCH] server error", e);
        return NextResponse.json({ message: "Не удалось обновить корзину" }, { status: 500 });
    }
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
    try {
        const { id } = params;
        const token = req.cookies.get("cartToken")?.value;

        if (!token) {
            return NextResponse.json({ errorMsg: "Cart token not found" });
        }

        const cartItem = await prisma.cartItem.findFirst({
            where: {
                id: Number(id)
            }
        });

        if (!cartItem) {
            return NextResponse.json({ errorMsg: "Cart item not found" });
        }

        await prisma.cartItem.delete({
            where: {
                id: Number(id)
            }
        });

        const updatedUserCart = await UpdateCartTotalAmount(token);
        return NextResponse.json(updatedUserCart);
    } catch (e) {
        console.warn("[CART_DELETE] server error", e);
        return NextResponse.json({ message: "Не удалось удалить позицию корзины" }, { status: 500 });
    }
}
