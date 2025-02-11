import { CartItemDTO } from "@/shared/services/dto/cart.dto";

export interface IOrderSuccessProps {
    orderId: number;
    items: CartItemDTO[];
}

export const OrderSuccessTemplate = ({ orderId, items }: IOrderSuccessProps): JSX.Element => {
    return (
        <div>
            <h1>Спасибо за покупку!</h1>
            <p>Ваш заказ #{orderId} успешно оплачен и будет доставлен в ближайшее время.</p>

            <hr />

            <p>Детали заказа:</p>
            <ul>
                {items.map(item => (
                    <li key={item.id}>
                        {item.productItem.product.name} за {item.productItem.price} руб в количестве {item.quantity} шт.
                    </li>
                ))}
            </ul>
        </div>
    );
};
