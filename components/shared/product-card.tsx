import Link from "next/link";
import { Title } from "./title";
import { Button } from "../ui";
import { Plus } from "lucide-react";

export interface IProductCardProps {
    id: number;
    name: string;
    price: number;
    imgUrl: string;
    className?: string;
}

export const ProductCard = ({ className, id, name, price, imgUrl }: IProductCardProps): JSX.Element => {
    return (
        <div className={className}>
            <Link href={`/product/${id}`}>
                <div className="flex justify-center p-6 bg-secondary rounded-lg h-[260px]">
                    <img className="w-[215px] h-[215px]" src={imgUrl} alt={name} />
                </div>
                <Title text={name} size="sm" className="mt-3 mb-1 font-bold" />
                <p className="text-sm text-gray-400">
                    Цыпленок, моцарелла, томатный соус, томаты, соус барбекю, соус чили, красный лук
                </p>
                <div className="flex justify-between items-center mt-4">
                    <span className="text-[20px]">
                        от <b>{price} ₽</b>
                    </span>
                    <Button variant={"secondary"} className="text-base font-bold">
                        <Plus size={20} className="mr-1" />
                        Добавить
                    </Button>
                </div>
            </Link>
        </div>
    );
};
