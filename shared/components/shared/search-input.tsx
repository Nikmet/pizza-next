"use client";

import { cn } from "@/shared/lib/utils";
import { api } from "@/shared/services/api-client";
import { Product } from "@prisma/client";
import { Search } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useClickAway, useDebounce } from "react-use";

export interface ISearchInputProps {
    className?: string;
}

export const SearchInput = ({ className }: ISearchInputProps): JSX.Element => {
    const [searchQuery, setSearchQuery] = useState<string>("");
    const [focused, setFocused] = useState<boolean>(false);
    const [products, setProducts] = useState<Product[]>([]);
    const ref = useRef<HTMLInputElement>(null);

    useDebounce(
        async () => {
            try {
                const res = await api.products.search(searchQuery);
                setProducts(res);
            } catch (e) {
                console.log(e);
            }
        },
        250,
        [searchQuery]
    );

    useClickAway(ref, () => {
        setFocused(false);
    });

    const onClickItem = () => {
        setFocused(false);
        setSearchQuery("");
        setProducts([]);
    };

    return (
        <div className="relative">
            {focused && <div className="fixed top-0 left-0 bottom-0 right-0 bg-black/50 z-30"></div>}
            <div ref={ref} className={cn("flex rounded-2xl flex-1 justify-between relative h-11 z-30", className)}>
                <Search className="absolute top-1/2 translate-y-[-50%] left-3 h-5 text-gray-400" />
                <input
                    className="rounded-2xl outline-none w-full bg-gray-100 pl-11"
                    type="text"
                    placeholder="Найти пиццу..."
                    onFocus={() => setFocused(true)}
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                />
            </div>
            <div
                className={cn(
                    "absolute w-full bg-white rounded-xl py-2 top-14 shadow-md transition-all duration-200 invisible opacity-0 z-30",
                    focused && "visible opacity-100 top-12"
                )}
            >
                {products.length > 0 ? (
                    <>
                        {products.map(product => (
                            <Link
                                key={product.id}
                                className="flex items-center gap-3 w-full px-3 py-2 hover:bg-primary/10"
                                href={`/product/${product.id}`}
                                onClick={onClickItem}
                            >
                                <img className="rounded-sm h-8 w-8" src={product.imageUrl} alt={product.name} />
                                <span>{product.name}</span>
                            </Link>
                        ))}
                    </>
                ) : (
                    <span className="text-gray-400 px-3 py-2">Ничего не найдено</span>
                )}
            </div>
        </div>
    );
};