import { ArrowRight, Package, Percent, Truck } from "lucide-react";
import { CheckoutDetailsItem } from "./checkout-details-item";
import { WhiteBlock } from "./white-block";
import { Button, Skeleton } from "../ui";
import { cn } from "@/shared/lib/utils";

export interface ICheckoutSidebarProps {
    className?: string;
    totalAmount: number;
    loading?: boolean;
}

const TAX = 20;
const DELIVERY_PRICE = 200;

export const CheckoutSidebar = ({ totalAmount, loading, className }: ICheckoutSidebarProps): JSX.Element => {
    const taxPrice = (totalAmount * TAX) / 100;

    return (
        <WhiteBlock className={cn("p-6 sticky top-4", className)}>
            <div className="flex flex-col gap-1">
                <span className="text-xl">Итого:</span>
                {loading ? (
                    <Skeleton className="w-48 h-11" />
                ) : (
                    <span className="h-11 text-3xl font-extrabold">{String(totalAmount + DELIVERY_PRICE)} ₽</span>
                )}
            </div>

            <CheckoutDetailsItem
                title="Стоимость без налога:"
                total={loading ? <Skeleton className="w-10 h-6 rounded-[6px]" /> : String(totalAmount - taxPrice) + " ₽"}
                icon={<Package className=" text-gray-300" size={18} />}
            />
            <CheckoutDetailsItem
                title="Налог:"
                total={loading ? <Skeleton className="w-10 h-6 rounded-[6px]" /> : String(taxPrice) + " ₽"}
                icon={<Percent className=" text-gray-300" size={18} />}
            />
            <CheckoutDetailsItem
                title="Доставка:"
                total={loading ? <Skeleton className="w-10 h-6 rounded-[6px]" /> : String(DELIVERY_PRICE) + " ₽"}
                icon={<Truck className=" text-gray-300" size={18} />}
            />

            <Button type="submit" className="w-full h-14 rounded-2xl mt-6 text-base font-bold" disabled={loading}>
                Перейти к оплате
                <ArrowRight className="w-5 ml-2" />
            </Button>
        </WhiteBlock>
    );
};
