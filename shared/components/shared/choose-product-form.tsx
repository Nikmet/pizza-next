import { Title } from "./title";
import { Button } from "../ui";
import { cn } from "@/shared/lib/utils";

export interface IChooseProductFormProps {
    imageUrl: string;
    name: string;
    onClickAdd: VoidFunction;
    className?: string;
    totalPrice: number;
    loading?: boolean;
}

export const ChooseProductForm = ({
    imageUrl,
    name,
    onClickAdd,
    className,
    loading,
    totalPrice
}: IChooseProductFormProps): JSX.Element => {
    return (
        <div className={cn("flex flex-1 h-full", className)}>
            <div className="flex items-center justify-center flex-1 relative w-full">
                <img
                    src={imageUrl}
                    alt={name}
                    className="relative left-2 top-2 transition-all z-10 duration-300 w-[350px] h-[350px]"
                />
            </div>
            <div className="w-[490px] h-full bg-[#f7f6f5] p-7">
                <Title text={name} size="md" className="font-extrabold mb-1" />

                <Button
                    className="h-[55px] px-10 text-base rounded-[18px] w-full mt-10"
                    onClick={onClickAdd}
                    loading={loading}
                >
                    Добавить в корзину за {totalPrice} ₽
                </Button>
            </div>
        </div>
    );
};
