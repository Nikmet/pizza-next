"use client";

import { Title } from "./title";
import { ProductCard } from "./product-card";
import { useIntersection } from "react-use";
import { useEffect, useRef } from "react";
import { Product, ProductItem } from "@prisma/client";
import { useCategoryStore } from "@/shared/store/category";
import { cn } from "@/shared/lib/utils";

interface ProductWithItems extends Product {
    items: ProductItem[];
}

export interface IProductsGroupListProps {
    className?: string;
    products: ProductWithItems[];
    title: string;
    listClassName?: string;
    categoryId: number;
}

export const ProductsGroupList = ({
    className,
    categoryId,
    products,
    title,
    listClassName
}: IProductsGroupListProps): JSX.Element => {
    const intersectionRef = useRef(null);
    const setActiveCategoryId = useCategoryStore(state => state.setActiveId);

    const intersection = useIntersection(intersectionRef, {
        threshold: 0.4
    });

    useEffect(() => {
        if (intersection?.isIntersecting) {
            setActiveCategoryId(categoryId);
        }
    }, [intersection, title, categoryId, setActiveCategoryId]);

    return (
        <div className={className} id={title} ref={intersectionRef}>
            <Title text={title} size="lg" className="font-extrabold mb-5" />
            <div className={cn("grid grid-cols-3 gap-[80px]", listClassName)}>
                {products.map(product => (
                    <ProductCard
                        key={product.id}
                        id={product.id}
                        name={product.name}
                        price={product.items[0].price}
                        imgUrl={product.imageUrl}
                    />
                ))}
            </div>
        </div>
    );
};
