import { Ingredient, ProductItem } from "@prisma/client";
import { calcPizzaTotalPrice } from "./calc-pizza-total-price";
import { mapPizzaType, PizzaSize, pizzaSizes, PizzaType, pizzaTypes } from "../constants/pizza";
import { declOfNum } from "./declOfNum";

export interface IPizzaInfoFullProps {
    ingredients?: Ingredient[];
    items?: ProductItem[];
    size: PizzaSize;
    type: PizzaType;
    selectedIngredients: Set<{ id: number; name: string }>;
}

export interface IPizzaInfoProps {
    size: PizzaSize;
    type: PizzaType;
    selectedIngredients: Set<{ id: number; name: string }>;
}

interface IPizzaInfoReturns {
    totalPrice: number;
    textDetails: string;
}

export function getPizzaInfo({ selectedIngredients, size, type }: IPizzaInfoProps): IPizzaInfoReturns;
export function getPizzaInfo({
    ingredients,
    items,
    selectedIngredients,
    size,
    type
}: IPizzaInfoFullProps): IPizzaInfoReturns;
export function getPizzaInfo(props: IPizzaInfoProps | IPizzaInfoFullProps): IPizzaInfoReturns {
    let totalPrice = 0;

    if ("items" in props && "ingredients" in props) {
        totalPrice = calcPizzaTotalPrice(
            props.ingredients!,
            props.items!,
            props.size,
            props.type,
            props.selectedIngredients
        );
    }

    const details: string[] = [];

    if (props.size && props.type) {
        const typeName = mapPizzaType[props.type];
        details.push(`${typeName}, ${props.size} см`);
    }

    if (props.selectedIngredients) {
        const arrIngredients = [];
        arrIngredients.push(...props.selectedIngredients);
        details.push(...arrIngredients.map(ingredient => ingredient.name));
    }

    return {
        totalPrice,
        textDetails: details.join(", ")
    };
}
