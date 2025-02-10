import * as React from "react";

interface Props {
    orderId: number;
    totalAmount: number;
    paymentLink: string;
}

export const PayOrderTemplate: React.FC<Props> = ({ orderId, totalAmount, paymentLink }) => (
    <div>
        <h1>Заказ #{orderId}</h1>
        <p>
            Оплатите заказ на сумму {totalAmount} ₽. Перейдите <a href={paymentLink}>этой по ссылке</a> для оплаты.
        </p>
    </div>
);
