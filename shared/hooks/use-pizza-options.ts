import { ProductItem } from "@prisma/client";
import { getAvailablePizzaSizes } from "../lib/get-available-pizza-sizes";
import { PizzaSize, PizzaType } from "../constants/pizza";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useSet } from "react-use";

interface ReturnProps {
    size: PizzaSize;
    type: PizzaType;
    selectedIngredients: Set<{ id: number; name: string }>;
    availablePizzaSizes: {
        name: string;
        value: string;
        disabled: boolean;
    }[];
    currentItemID: number | undefined;
    setSize: (size: PizzaSize) => void;
    setType: (type: PizzaType) => void;
    addIngredient: (key: { id: number; name: string }) => void;
}

export const usePizzaOptions = (items: ProductItem[]): ReturnProps => {
    const [size, setSize] = useState<PizzaSize>(20);
    const [type, setType] = useState<PizzaType>(1);
    const [selectedIngredients, { toggle: addIngredient }] = useSet(new Set<{ id: number; name: string }>());

    const availablePizzaSizes = getAvailablePizzaSizes(items, type);

    const currentItemID = items.find(item => item.size === size && item.pizzaType === type)?.id;

    useEffect(() => {
        const isAvailableSize = availablePizzaSizes.find(item => Number(item.value) === size && !item.disabled);
        const availableSize = availablePizzaSizes.find(item => item.disabled === false);

        if (!isAvailableSize && availableSize) {
            setSize(Number(availableSize.value) as PizzaSize);
        }
    }, [type]);

    return { availablePizzaSizes, size, setSize, type, setType, selectedIngredients, addIngredient, currentItemID };
};
