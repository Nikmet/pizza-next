"use client";

import { cn } from "@/lib/utils";
import { useCategoryStore } from "@/store/category";
import { FC, useRef } from "react";

interface Props {
    className?: string;
}

const cats = [
    { id: 0, name: "Пиццы" },
    { id: 1, name: "Комбо" },
    { id: 2, name: "Закуски" },
    { id: 3, name: "Десерты" },
    { id: 4, name: "Напитки" },
    { id: 5, name: "Коктейли" },
    { id: 6, name: "Кофе" }
];
export const Categories: FC<Props> = ({ className }) => {
    const categoryActiveId = useCategoryStore(state => state.activeId);
    const scrollRef = useRef<(HTMLAnchorElement | null)>();

    return (
        <div className={cn("inline-flex gap-1 bg-gray-50 p-1 rounded-2xl", className)}>
            {cats.map(({ name, id }, index) => (
                <a
                    className={cn(
                        "flex items-center font-bold h-11 rounded-2xl px-5",
                        categoryActiveId === id && "bg-white shadow-md shadow-gray-200 text-primary"
                    )}
                    key={index}
                    href={`#${name}`}
                >
                    <button>{name}</button>
                </a>
            ))}
        </div>
    );
};
