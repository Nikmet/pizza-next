"use client";

import { ProductWithRelations } from "@/@types/prisma";
import { useRouter } from "next/navigation";
import { Dialog } from "../../ui";
import { DialogContent, DialogTitle } from "../../ui/dialog";
import { cn } from "@/shared/lib/utils";
import { ProductForm } from "../product-form";

export interface IChooseProductModalProps {
    product: ProductWithRelations;
    className?: string;
}

export const ChooseProductModal = ({ product, className }: IChooseProductModalProps): JSX.Element => {
    const router = useRouter();

    return (
        <Dialog open={Boolean(product)} onOpenChange={() => router.back()}>
            <DialogContent
                className={cn("p-0 w-[1060px] max-w-[1060px] min-h-[550px] bg-white overflow-hidden", className)}
                aria-describedby={undefined}
            >
                <DialogTitle className="hidden" />
                <ProductForm product={product} _onSubmit={router.back} />
            </DialogContent>
        </Dialog>
    );
};
