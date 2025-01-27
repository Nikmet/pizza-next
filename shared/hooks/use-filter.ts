import { useSearchParams } from "next/navigation";
import { useRouter } from "next/router";
import { useSet } from "react-use";
import { useState } from "react";

interface PriceProps {
    priceFrom?: number;
    priceTo?: number;
}

interface QueryFilters extends PriceProps {
    pizzaTypes: string;
    sizes: string;
    ingredients: string;
}

export interface Filters {
    sizes: Set<string>;
    pizzaTypes: Set<string>;
    ingredients: Set<string>;
    prices: PriceProps;
}

interface ReturnProps extends Filters {
    updatePrice: (name: keyof PriceProps, value: number) => void;
    togglePizzaTypes: (key: string) => void;
    toggleSizes: (key: string) => void;
    toggleIngredients: (key: string) => void;
    clearSizes: () => void;
    clearTypes: () => void;
    setPrices: (prices: PriceProps) => void;
}

export const useFilters = (): ReturnProps => {
    const searchParams = useSearchParams() as unknown as Map<keyof QueryFilters, string>;

    const [ingredients, { toggle: toggleIngredients }] = useSet(
        new Set<string>(searchParams.get("ingredients")?.split(","))
    );

    const [sizes, { toggle: toggleSizes, clear: clearSizes }] = useSet(
        new Set<string>(searchParams.get("sizes")?.split(",") || [])
    );
    const [pizzaTypes, { toggle: togglePizzaTypes, clear: clearTypes }] = useSet(
        new Set<string>(searchParams.get("pizzaTypes")?.split(",") || [])
    );

    const [prices, setPrices] = useState<PriceProps>({
        priceFrom: Number(searchParams.get("priceFrom")) || undefined,
        priceTo: Number(searchParams.get("priceTo")) || undefined
    });

    const updatePrice = (name: keyof PriceProps, value: number) => {
        setPrices({
            ...prices,
            [name]: value
        });
    };

    return {
        prices,
        sizes,
        pizzaTypes,
        ingredients,
        setPrices,
        toggleIngredients,
        toggleSizes,
        togglePizzaTypes,
        clearSizes,
        clearTypes,
        updatePrice
    };
};
