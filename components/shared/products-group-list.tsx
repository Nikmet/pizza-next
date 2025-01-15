import { cn } from "@/lib/utils";
import { Title } from "./title";
import { ProductCard } from "./product-card";

export interface IProductsGroupListProps {
    className?: string;
    products: any[];
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
    return (
        <div className={className}>
            <Title text={title} size="lg" className="font-extrabold mb-5" />
            <div className={cn("grid grid-cols-3 gap-[80px]", listClassName)}>
                {products.map(product => (
                    <ProductCard
                        key={product.id}
                        id={product.id}
                        name={product.name}
                        price={product.items[0].price}
                        imgUrl={product.imgUrl}
                    />
                ))}
            </div>
        </div>
    );
};
