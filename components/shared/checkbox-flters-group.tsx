"use client";

import { ChangeEvent, FC, useState } from "react";
import { FilterCheckbox, FilterCheckboxProps } from "./filter-checkbox";
import { Input } from "../ui";

type Item = FilterCheckboxProps;

interface Props {
    title: string;
    items: Item[];
    defaultItems: Item[];
    limit?: number;
    searchInputPlaceholder?: string;
    onChange?: (values: string[]) => void;
    defaultValue?: string[];
    className?: string;
}

export const CheckboxFiltersGroup: FC<Props> = ({
    title,
    items,
    defaultItems,
    limit = 5,
    searchInputPlaceholder = "Поиск...",
    onChange,
    defaultValue,
    className
}) => {
    const [showAll, setShowAll] = useState<boolean>(false);
    const [searchValue, setSearchValue] = useState<string>("");

    const list = showAll
        ? items.filter(item => item.text.toLocaleLowerCase().includes(searchValue))
        : defaultItems.slice(0, limit);

    const onChangeSearchInput = (e: ChangeEvent<HTMLInputElement>) => {
        setSearchValue(e.target.value);
    };

    return (
        <div className={className}>
            <p className="mb-3 font-bold">{title}</p>
            {showAll && (
                <div className="mb-5">
                    <Input
                        onChange={onChangeSearchInput}
                        placeholder={searchInputPlaceholder}
                        className="bg-gray-50 border-none"
                    />
                </div>
            )}
            <div className="flex flex-col gap-4 max-h-96 pr-2 overflow-auto scrollbar">
                {list.map((item, index) => (
                    <FilterCheckbox
                        onCheckedChange={ids => console.log(ids)}
                        checked={false}
                        key={index}
                        value={item.value}
                        text={item.text}
                        endAdornment={item.endAdornment}
                    />
                ))}
            </div>

            {items.length > limit && (
                <div className={showAll ? "mt-4" : ""}>
                    <button onClick={() => setShowAll(!showAll)} className="text-primary mt-3">
                        {showAll ? "Скрыть" : "+ Показать все"}
                    </button>
                </div>
            )}
        </div>
    );
};
