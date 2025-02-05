import { prisma } from "@/prisma/prisma-client";

export interface GetSearchParams {
    query?: string;
    sortBy?: string;
    pizzaSizes?: string;
    pizzaTypes?: string;
    ingredients?: string;
    priceFrom?: string;
    priceTo?: string;
}

const DEFAULT_MIN_PRICE = 0;
const DEFAULT_MAX_PRICE = 1000;

export const findPizzas = async (params: GetSearchParams) => {
    const sizes = params.pizzaSizes?.split(",").map(Number);
    const types = params.pizzaTypes?.split(",").map(Number);
    const ingredients = params.ingredients?.split(",").map(Number);

    const priceFrom = Number(params.priceFrom) || DEFAULT_MIN_PRICE;
    const priceTo = Number(params.priceTo) || DEFAULT_MAX_PRICE;

    const categories = await prisma.category.findMany({
        include: {
            products: {
                orderBy: {
                    id: "desc"
                },
                where: {
                    ingredients: ingredients
                        ? {
                              some: {
                                  id: {
                                      in: ingredients
                                  }
                              }
                          }
                        : undefined,
                    items: {
                        some: {
                            size: {
                                in: sizes
                            },
                            pizzaType: {
                                in: types
                            },
                            price: {
                                gte: priceFrom,
                                lte: priceTo
                            }
                        }
                    }
                },
                include: {
                    ingredients: true,
                    items: {
                        where: {
                            price: {
                                gte: priceFrom,
                                lte: priceTo
                            }
                        },
                        orderBy: {
                            price: "asc"
                        }
                    }
                }
            }
        }
    });

    return categories;
};
