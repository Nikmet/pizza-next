import { Ingredient } from "@prisma/client";
import { useEffect, useState } from "react";
import { api } from "../services/api-client";

export const useIngredients = () => {
    const [ingredients, setIngredients] = useState<Ingredient[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

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

    return { ingredients, loading };
};
