import { getPizzaInfo } from "@/shared/lib/pizza-info";
import { CheckoutItem } from "../checkout-item";
import { WhiteBlock } from "../white-block";
import { PizzaSize, PizzaType } from "@/shared/constants/pizza";
import { State } from "react-use/lib/useMouse";
import { CartStateItem } from "@/shared/lib/get-cart-details";
import { CheckoutItemSkeleton } from "../checkout-item-skeleton";

export interface ICheckoutCartProps {
    className?: string;
    items: CartStateItem[];
    onClickCountButton: (id: number, quantity: number, type: "plus" | "minus") => void;
    removeCartItem: (id: string) => void;
    loading?: boolean;
}

export const CheckoutCart = ({
    items,
    onClickCountButton,
    removeCartItem,
    loading,
    className
}: ICheckoutCartProps): JSX.Element => {
    return (
        <WhiteBlock title="1. Корзина" className={className}>
            <div className="flex flex-col gap-5">
                {loading
                    ? items.map(item => <CheckoutItemSkeleton key={item.id} />)
                    : items.map(item => (
                          <CheckoutItem
                              key={item.id}
                              id={item.id}
                              imageUrl={item.imageUrl}
                              details={
                                  item.pizzaSize
                                      ? getPizzaInfo({
                                            size: item.pizzaSize as PizzaSize,
                                            type: item.pizzaType as PizzaType,
                                            selectedIngredients: new Set(item.ingredients)
                                        }).textDetails
                                      : ""
                              }
                              name={item.name}
                              price={item.price}
                              quantity={item.quantity}
                              disabled={item.disabled}
                              onClickCountButton={type => onClickCountButton(item.id, item.quantity, type)}
                              onClickRemove={() => removeCartItem(String(item.id))}
                          />
                      ))}
            </div>
        </WhiteBlock>
    );
};
