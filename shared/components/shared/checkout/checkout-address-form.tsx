import { Input, Textarea } from "../../ui";
import { WhiteBlock } from "../white-block";

export interface ICheckoutAddressFormProps {
    className?: string;
}

export const CheckoutAddressForm = ({ className }: ICheckoutAddressFormProps): JSX.Element => {
    return (
        <WhiteBlock title="3. Адрес доставки" className={className}>
            <div className="flex flex-col gap-5">
                <Input name="address" placeholder="Введите адрес..." className="text-base" />
                <Textarea rows={5} className="text-base" placeholder="Комментарий к заказу" />
            </div>
        </WhiteBlock>
    );
};
