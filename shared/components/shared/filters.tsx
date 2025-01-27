"use client";

import { FC } from "react";
import { Title } from "./title";
import { Button, Input } from "../ui";
import { RangeSlider } from "./range-slider";
import { CheckboxFiltersGroup } from "./checkbox-filters-group";
import { useFilters, useIngredients, useQueryFilters } from "@/shared/hooks";

interface Props {
    className?: string;
}

export const Filters: FC<Props> = ({ className }) => {
    const { ingredients, loading } = useIngredients();
    const filters = useFilters();

    useQueryFilters(filters);

    const items = ingredients.map(i => ({
        value: String(i.id),
        text: i.name
    }));

    const resetFilters = () => {
        filters.setPrices({});
        filters.clearSizes();
        filters.clearTypes();
        filters.ingredients.clear();
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
                onClickCheckbox={filters.togglePizzaTypes}
                selected={filters.pizzaTypes}
                items={[
                    { text: "Тонкое", value: "1" },
                    { text: "Традиционное", value: "2" }
                ]}
            />

            <CheckboxFiltersGroup
                title="Размеры"
                name="sizes"
                className="mb-5"
                onClickCheckbox={filters.toggleSizes}
                selected={filters.sizes}
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
                        value={String(filters.prices.priceFrom)}
                        onChange={e => {
                            if (Number(e.target.value) <= 1000) {
                                filters.updatePrice("priceFrom", Number(e.target.value));
                            } else {
                                filters.updatePrice("priceFrom", 1000);
                            }
                        }}
                    />
                    <Input
                        type="number"
                        placeholder="1000"
                        min={100}
                        max={1000}
                        value={String(filters.prices.priceTo)}
                        onChange={e => {
                            if (Number(e.target.value) <= 1000) {
                                filters.updatePrice("priceTo", Number(e.target.value));
                            } else {
                                filters.updatePrice("priceTo", 1000);
                            }
                        }}
                    />
                </div>
                <RangeSlider
                    min={0}
                    max={1000}
                    step={10}
                    value={[filters.prices.priceFrom || 0, filters.prices.priceTo || 1000]}
                    onValueChange={([priceFrom, priceTo]) => filters.setPrices({ priceFrom, priceTo })}
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
                onClickCheckbox={filters.toggleIngredients}
                selected={filters.ingredients}
            />
        </div>
    );
};
