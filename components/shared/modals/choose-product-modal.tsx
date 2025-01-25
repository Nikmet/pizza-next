"use client";

import { Dialog } from "@/components/ui";
import { Title } from "../title";
import { Product } from "@prisma/client";
import { cn } from "@/lib/utils";
import { DialogContent } from "@/components/ui/dialog";
import { useRouter } from "next/navigation";

export interface IChooseProductModalProps {
    product: Product;
    className?: string;
}

export const ChooseProductModal = ({ product, className }: IChooseProductModalProps): JSX.Element => {
    const router = useRouter();

    return (
        <Dialog open={Boolean(product)} onOpenChange={() => router.back()}>
            <DialogContent
                className={cn("p-0 w-[1060px] max-w-[1060px] min-h-[500px] bg-white overflow-hidden", className)}
            >
                <Title text={product.name} size="md" className="font-extrabold mb-1" />
            </DialogContent>
        </Dialog>
    );
};
