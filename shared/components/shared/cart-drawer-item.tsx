"use client";

import { cn } from "@/shared/lib/utils";
import * as CartItems from "./cart-item-details";
import { Trash2Icon } from "lucide-react";

export interface ICartDrawerItemProps extends CartItems.CartItemProps {
    onClickCountButton?: (type: "plus" | "minus") => void;
    onClickRemoveButton?: () => void;
    className?: string;
}

export const CartDrawerItem = ({
    details,
    imageUrl,
    name,
    price,
    quantity,
    disabled,
    className,
    onClickCountButton,
    onClickRemoveButton
}: ICartDrawerItemProps): JSX.Element => {
    return (
        <div className={cn("flex bg-white p-5 gap-6", { "opacity-50 pointer-events-none": disabled }, className)}>
            <CartItems.Image src={imageUrl} />

            <div className="flex-1">
                <CartItems.Info details={details} name={name} />
                <hr className="my-3" />

                <div className="flex items-center justify-between">
                    <CartItems.CountButton onClick={onClickCountButton} value={quantity} />
                    <div className="flex items-center gap-3">
                        <CartItems.Price value={price} />
                        <Trash2Icon
                            className="text-gray-400 cursor-pointer hover:text-gray-600"
                            size={16}
                            onClick={onClickRemoveButton}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};
