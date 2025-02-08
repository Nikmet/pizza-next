"use client";

import { FormInput } from "../form-components/form-input";
import { WhiteBlock } from "../white-block";

export interface ICheckoutPersonalInfoProps {
    className?: string;
}

export const CheckoutPersonalInfo = ({ className }: ICheckoutPersonalInfoProps): JSX.Element => {
    return (
        <WhiteBlock title="2. Персональные данные" className={className}>
            <div className="grid grid-cols-2 gap-5">
                <FormInput name="firstName" placeholder="Имя" className="text-base" />
                <FormInput name="lastName" placeholder="Фамилия" className="text-base" />
                <FormInput name="email" placeholder="E-mail" className="text-base" />
                {/* //TODO: Сделать маску */}
                <FormInput name="phone" placeholder="Номер телефона" className="text-base" />
            </div>
        </WhiteBlock>
    );
};
