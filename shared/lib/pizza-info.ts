import { Ingredient, ProductItem } from "@prisma/client";
import { calcPizzaTotalPrice } from "./calc-pizza-total-price";
import { mapPizzaType, PizzaSize, PizzaType } from "../constants/pizza";
import { declOfNum } from "./declOfNum";

export interface IPizzaInfoProps {
    ingredients: Ingredient[];
    items: ProductItem[];
    size: PizzaSize;
    type: PizzaType;
    selectedIngredients: Set<number>;
}

interface IPizzaInfoReturns {
    totalPrice: number;
    textDetails: string;
}

export const getPizzaInfo = ({
    ingredients,
    items,
    selectedIngredients,
    size,
    type
}: IPizzaInfoProps): IPizzaInfoReturns => {
    const totalPrice = calcPizzaTotalPrice(ingredients, items, size, type, selectedIngredients);

    const textDetails = `${size}см, ${mapPizzaType[type]} тесто  ${
        selectedIngredients.size != 0
            ? "+ " +
              selectedIngredients.size +
              " " +
              declOfNum(selectedIngredients.size, ["ингредиент", "ингредиента", "ингредиентов"])
            : ""
    } `;

    return {
        totalPrice,
        textDetails
    };
};
