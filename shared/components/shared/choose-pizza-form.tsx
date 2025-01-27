import { PizzaImage } from "./pizza-image";
import { Title } from "./title";
import { Button } from "../ui";
import { cn } from "@/shared/lib/utils";

export interface IChoosePizzaFormProps {
    imageUrl: string;
    name: string;
    ingredients: any;
    items: any;
    onClickAdd: VoidFunction;
    className?: string;
}

export const ChoosePizzaForm = ({
    imageUrl,
    ingredients,
    items,
    name,
    onClickAdd,
    className
}: IChoosePizzaFormProps): JSX.Element => {
    const textDetails = "30см, традиционное тесто";
    const totalPrice = 350;

    return (
        <div className={cn("flex flex-1", className)}>
            <PizzaImage src={imageUrl} size={30} />
            <div className="w-[490px] bg-[#f7f6f5] p-7">
                <Title text={name} size="md" className="font-extrabold mb-1" />
                <p className="text-gray-400">{textDetails}</p>

                <Button className="h-[55px] px-10 text-base rounded-[18px] w-full mt-10">
                    Добавить в корзину за {totalPrice} ₽
                </Button>
            </div>
        </div>
    );
};
