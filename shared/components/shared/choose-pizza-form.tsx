"use client";

import { PizzaImage } from "./pizza-image";
import { Title } from "./title";
import { Button } from "../ui";
import { cn } from "@/shared/lib/utils";
import { GroupVariants } from "./group-variants";
import { PizzaSize, PizzaType, pizzaTypes } from "@/shared/constants/pizza";
import { Ingredient, ProductItem } from "@prisma/client";
import { IngredientCard } from "./ingredient-card";
import { usePizzaOptions } from "@/shared/hooks/use-pizza-options";
import { getPizzaInfo } from "@/shared/lib/pizza-info";

export interface IChoosePizzaFormProps {
    imageUrl: string;
    name: string;
    ingredients: Ingredient[];
    items: ProductItem[];
    onClickAddCart: (itemId: number, ingredients: number[]) => void;
    className?: string;
}

export const ChoosePizzaForm = ({
    imageUrl,
    ingredients,
    items,
    name,
    onClickAddCart,
    className
}: IChoosePizzaFormProps): JSX.Element => {
    const { availablePizzaSizes, setSize, setType, size, type, addIngredient, selectedIngredients, currentItemID } =
        usePizzaOptions(items);

    const { textDetails, totalPrice } = getPizzaInfo({
        selectedIngredients,
        size,
        type,
        ingredients,
        items
    });

    const handleClickAdd = () => {
        onClickAddCart(currentItemID, Array.from(selectedIngredients));
        console.log({
            size,
            type,
            ingredients: Array.from(selectedIngredients),
            totalPrice
        });
    };

    return (
        <div className={cn("flex flex-1", className)}>
            <PizzaImage src={imageUrl} size={size} />
            <div className="w-[490px] bg-[#f7f6f5] p-7">
                <Title text={name} size="md" className="font-extrabold mb-1" />
                <p className="text-gray-400">{textDetails}</p>

                <div className="flex flex-col gap-3 mt-5">
                    <GroupVariants
                        items={availablePizzaSizes}
                        selectedValue={String(size)}
                        onClick={value => setSize(Number(value) as PizzaSize)}
                    />
                    <GroupVariants
                        items={pizzaTypes}
                        selectedValue={String(type)}
                        onClick={value => setType(Number(value) as PizzaType)}
                    />
                </div>

                <div className="bg-gray-50 p-5 rounded-md h-[350px] overflow-auto scrollbar mt-3">
                    <div className="grid grid-cols-3 gap-3">
                        {ingredients.map(ingredient => (
                            <IngredientCard
                                key={ingredient.id}
                                {...ingredient}
                                active={selectedIngredients.has(ingredient.id)}
                                onClick={() => addIngredient(ingredient.id)}
                            />
                        ))}
                    </div>
                </div>

                <Button className="h-[55px] px-10 text-base rounded-[18px] w-full mt-10" onClick={handleClickAdd}>
                    Добавить в корзину за {totalPrice} ₽
                </Button>
            </div>
        </div>
    );
};
