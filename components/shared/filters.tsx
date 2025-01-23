"use client";

import { FC, useEffect, useState } from "react";
import { Title } from "./title";
import { FilterCheckbox } from "./filter-checkbox";
import { Button, Input } from "../ui";
import { RangeSlider } from "./range-slider";
import { CheckboxFiltersGroup } from "./checkbox-filters-group";
import { useFilterIngredients } from "@/hooks/useFilterIngredients";
import { useSet } from "react-use";

interface Props {
    className?: string;
}

interface PriceProps {
    priceFrom: number;
    priceTo: number;
}

export const Filters: FC<Props> = ({ className }) => {
    const { ingredients, loading, onAddId, selectedIngredients } = useFilterIngredients();
    const [sizes, { toggle: toggleSizes, clear: clearSizes }] = useSet(new Set<string>([]));
    const [pizzaTypes, { toggle: togglePizzaTypes, clear: clearTypes }] = useSet(new Set<string>([]));

    const [prices, setPrice] = useState<PriceProps>({ priceFrom: 0, priceTo: 1000 });

    useEffect(() => {
        console.log({ prices, pizzaTypes, sizes, selectedIngredients });
    }, [prices, pizzaTypes, sizes, selectedIngredients]);

    const items = ingredients.map(i => ({
        value: String(i.id),
        text: i.name
    }));

    const updatePrice = (name: keyof PriceProps, value: number) => {
        setPrice({
            ...prices,
            [name]: value
        });
    };

    const resetFilters = () => {
        setPrice({ priceFrom: 0, priceTo: 1000 });
        clearSizes();
        clearTypes();
        selectedIngredients.clear();
    };

    return (
        <div className={className}>
            <Title text="Фильтрация" size="sm" className="mb-3 font-bold" />

            <Button className="mb-5 text-[13px]" size={"sm"} variant="outline" onClick={resetFilters}>
                Сбросить фильтры
            </Button>

            {/* Верхние чекбоксы */}
            <CheckboxFiltersGroup
                title="Тип теста"
                name="pizzaTypes"
                className="mb-5"
                onClickCheckbox={togglePizzaTypes}
                selected={pizzaTypes}
                items={[
                    { text: "Тонкое", value: "1" },
                    { text: "Традиционное", value: "2" }
                ]}
            />

            <CheckboxFiltersGroup
                title="Размеры"
                name="sizes"
                className="mb-5"
                onClickCheckbox={toggleSizes}
                selected={sizes}
                items={[
                    { text: "20 см", value: "20" },
                    { text: "30 см", value: "30" },
                    { text: "40 см", value: "40" }
                ]}
            />

            {/* Фильтр цен */}
            <div className="mt-5 border-y border-y-neutral-100 py-6 pb-7">
                <p className="font-bold mb-3">Цена от и до:</p>
                <div className="flex gap-3 mb-5">
                    <Input
                        type="number"
                        placeholder="0"
                        min={0}
                        max={1000}
                        value={String(prices.priceFrom)}
                        onChange={e => {
                            if (Number(e.target.value) <= 1000) {
                                updatePrice("priceFrom", Number(e.target.value));
                            } else {
                                updatePrice("priceFrom", 1000);
                            }
                        }}
                    />
                    <Input
                        type="number"
                        placeholder="1000"
                        min={100}
                        max={1000}
                        value={String(prices.priceTo)}
                        onChange={e => {
                            if (Number(e.target.value) <= 1000) {
                                updatePrice("priceTo", Number(e.target.value));
                            } else {
                                updatePrice("priceTo", 1000);
                            }
                        }}
                    />
                </div>
                <RangeSlider
                    min={0}
                    max={1000}
                    step={10}
                    value={[prices.priceFrom, prices.priceTo]}
                    onValueChange={([priceFrom, priceTo]) => setPrice({ priceFrom, priceTo })}
                />
            </div>

            <CheckboxFiltersGroup
                title="Ингредиенты"
                name="ingredients"
                className="mt-5"
                limit={6}
                defaultItems={items.slice(0, 6)}
                items={items}
                loading={loading}
                onClickCheckbox={onAddId}
                selected={selectedIngredients}
            />
        </div>
    );
};
