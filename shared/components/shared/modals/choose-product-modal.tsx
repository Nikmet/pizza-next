"use client";

import { ProductWithRelations } from "@/@types/prisma";
import { useRouter } from "next/navigation";
import { Dialog } from "../../ui";
import { DialogContent, DialogTitle } from "../../ui/dialog";
import { cn } from "@/shared/lib/utils";
import { ChoosePizzaForm } from "../choose-pizza-form";
import { ChooseProductForm } from "../choose-product-form";

export interface IChooseProductModalProps {
    product: ProductWithRelations;
    className?: string;
}

export const ChooseProductModal = ({ product, className }: IChooseProductModalProps): JSX.Element => {
    const router = useRouter();
    const isPizzaForm = Boolean(product.items[0].pizzaType);

    return (
        <Dialog open={Boolean(product)} onOpenChange={() => router.back()}>
            <DialogContent
                className={cn("p-0 w-[1060px] max-w-[1060px] min-h-[550px] bg-white overflow-hidden", className)}
                aria-describedby={undefined}
            >
                <DialogTitle className="hidden" />
                {isPizzaForm ? (
                    <ChoosePizzaForm
                        imageUrl={product.imageUrl}
                        name={product.name}
                        ingredients={product.ingredients}
                        items={product.items}
                        onClickAddCart={() => {}}
                    />
                ) : (
                    <ChooseProductForm imageUrl={product.imageUrl} name={product.name} onClickAdd={() => {}} />
                )}
            </DialogContent>
        </Dialog>
    );
};
