import { useEffect } from "react";
import { Filters } from "./use-filter";
import qs from "qs";
import { useRouter } from "next/navigation";

export const useQueryFilters = (filters: Filters) => {
    const router = useRouter();

    useEffect(() => {
        const params = {
            ...filters.prices,
            sizes: Array.from(filters.sizes),
            pizzaTypes: Array.from(filters.pizzaTypes),
            ingredients: Array.from(filters.ingredients)
        };

        const query = qs.stringify(params, { arrayFormat: "comma" });

        router.push(`?${query}`, {
            scroll: false
        });
    }, [filters.prices, filters.pizzaTypes, filters.sizes, filters.ingredients, router]);
};
