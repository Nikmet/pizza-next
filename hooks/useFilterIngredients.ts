import { api } from "@/services/api-client";
import { Ingredient } from "@prisma/client";
import { useEffect, useState } from "react";
import { useSet } from "react-use";

interface ReturnProps {
    ingredients: Ingredient[];
    loading: boolean;
    selectedIngredients: Set<string>;
    onAddId: (id: string) => void;
}

export const useFilterIngredients = (): ReturnProps => {
    const [ingredients, setIngredients] = useState<Ingredient[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    const [selectedIngredients, { toggle }] = useSet(new Set<string>([]));

    useEffect(() => {
        setLoading(true);
        api.ingredients
            .getAll()
            .then(res => {
                setIngredients(res);
            })
            .catch(e => {
                console.log(e);
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    return { ingredients, loading, onAddId: toggle, selectedIngredients };
};
