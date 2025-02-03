import { Sheet, SheetContent, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "@/shared/components/ui/sheet";
import Link from "next/link";
import { ReactNode } from "react";
import { Button } from "../ui";
import { ArrowRight } from "lucide-react";
import { CartDrawerItem } from "./cart-drawer-item";
import { getPizzaInfo } from "@/shared/lib/pizza-info";

export interface ICartDrawerProps {
    className?: string;
    children?: ReactNode;
}

export const CartDrawer = ({ className, children }: ICartDrawerProps): JSX.Element => {
    return (
        <Sheet>
            <SheetTrigger asChild>{children}</SheetTrigger>
            <SheetContent className="flex flex-col justify-between pb-0 bg-[#f4f1ee]">
                {/* sheet header */}
                <SheetHeader>
                    <SheetTitle>
                        В корзине <span className="font-bold">3 товара</span>
                    </SheetTitle>
                </SheetHeader>

                {/* sheet body */}
                <div className="-mx-6 mt-5 overflow-auto flex-1 scrollbar">
                    <div className="mb-2">
                        <CartDrawerItem
                            id={1}
                            imageUrl="https://media.dodostatic.net/image/r:584x584/11EE7D61706D472F9A5D71EB94149304.webp"
                            details={
                                getPizzaInfo({
                                    size: 30,
                                    type: 1,
                                    selectedIngredients: new Set()
                                }).textDetails
                            }
                            name={"Чоризо Фреш"}
                            price={300}
                            quantity={2}
                        />
                    </div>
                </div>

                {/* sheet footer */}
                <SheetFooter className="-mx-6 bg-white p-8">
                    <div className="w-full">
                        <div className="flex mb-4">
                            <span className="flex flex-1 text-lg text-neutral-500">
                                Итого
                                <div className="flex-1 border-b border-dashed border-b-neutral-200 relative -top-1 mx-2" />
                            </span>

                            <span className="font-bold text-lg">{0} ₽</span>
                        </div>

                        <Link href="/checkout">
                            <Button type="submit" className="w-full h-12 text-base">
                                Оформить заказ
                                <ArrowRight className="w-5 ml-2" />
                            </Button>
                        </Link>
                    </div>
                </SheetFooter>
            </SheetContent>
        </Sheet>
    );
};
