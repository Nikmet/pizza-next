import { Controller, useFormContext } from "react-hook-form";
import { AddressInput } from "../address-input";
import { FormTextarea } from "../form-components/form-textarea";
import { WhiteBlock } from "../white-block";
import { ErrorText } from "../error-text";

export interface ICheckoutAddressFormProps {
    className?: string;
}

export const CheckoutAddressForm = ({ className }: ICheckoutAddressFormProps): JSX.Element => {
    const { control } = useFormContext();

    return (
        <WhiteBlock title="3. Адрес доставки" className={className}>
            <div className="flex flex-col gap-5">
                <Controller
                    control={control}
                    name="address"
                    render={({ field, fieldState }) => (
                        <>
                            <AddressInput onChange={field.onChange} />
                            {fieldState.error && <ErrorText text={String(fieldState.error.message)} />}
                        </>
                    )}
                />
                <FormTextarea name="comment" rows={5} className="text-base" placeholder="Комментарий к заказу" />
            </div>
        </WhiteBlock>
    );
};
