"use client";

import { PizzaImage } from "./pizza-image";
import { Title } from "./title";
import { Button } from "../ui";
import { cn } from "@/shared/lib/utils";
import { GroupVariants } from "./group-variants";
import { PizzaSize, pizzaSizes, PizzaType, pizzaTypes } from "@/shared/constants/pizza";
import { useState } from "react";
import { Ingredient, ProductItem } from "@prisma/client";

export interface IChoosePizzaFormProps {
    imageUrl: string;
    name: string;
    ingredients: Ingredient[];
    items: ProductItem[];
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
    const [size, setSize] = useState<PizzaSize>(20);
    const [type, setType] = useState<PizzaType>(1);

    const textDetails = "30см, традиционное тесто";
    const totalPrice = 350;

    return (
        <div className={cn("flex flex-1", className)}>
            <PizzaImage src={imageUrl} size={size} />
            <div className="w-[490px] bg-[#f7f6f5] p-7">
                <Title text={name} size="md" className="font-extrabold mb-1" />
                <p className="text-gray-400">{textDetails}</p>

                <div className="flex flex-col gap-3 mt-5">
                    <GroupVariants
                        items={pizzaSizes}
                        selectedValue={String(size)}
                        onClick={value => setSize(Number(value) as PizzaSize)}
                    />
                    <GroupVariants
                        items={pizzaTypes}
                        selectedValue={String(type)}
                        onClick={value => setType(Number(value) as PizzaType)}
                    />
                </div>

                <Button className="h-[55px] px-10 text-base rounded-[18px] w-full mt-10">
                    Добавить в корзину за {totalPrice} ₽
                </Button>
            </div>
        </div>
    );
};
