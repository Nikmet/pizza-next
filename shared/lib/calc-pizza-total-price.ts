import { Ingredient, ProductItem } from "@prisma/client";
import { PizzaSize, PizzaType } from "../constants/pizza";

/**
 * Функция для расчета общей стоимости пиццы
 *
 * @example calcPizzaTotalPrice(ingredients, items, size, type, selectedIngredients)
 *
 * @param ingredients - все доступные ингредиенты `Ingredient[]`
 * @param items - все доступные вариации пиццы `ProductItem[]`
 * @param size - выбранный размер пиццы `PizzaSize`
 * @param type - выбранный тип пиццы `PizzaType`
 * @param selectedIngredients - выбранные ингредиенты `Set<number>`
 *
 * @returns Общую стоимость пиццы `number`
 */

export const calcPizzaTotalPrice = (
    ingredients: Ingredient[],
    items: ProductItem[],
    size: PizzaSize,
    type: PizzaType,
    selectedIngredients: Set<number>
): number => {
    const pizzaPrice = items.find(item => item.size === size && item.pizzaType === type)?.price || 0;
    const ingredientsPrice = ingredients
        .filter(ingredient => selectedIngredients.has(ingredient.id))
        .reduce((acc, ingredient) => acc + ingredient.price, 0);

    return pizzaPrice + ingredientsPrice;
};
