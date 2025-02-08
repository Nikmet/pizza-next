"use client";

import { AddressSuggestions } from "react-dadata";
import "react-dadata/dist/react-dadata.css";

export interface IAdressInputProps {
    onChange?: (value?: string) => void;
}

export const AddressInput = ({ onChange }: IAdressInputProps): JSX.Element => {
    return (
        <AddressSuggestions
            token="64246ba40ce7f359a639f56c06aa0b54906e5d13"
            onChange={data => onChange?.(data?.value)}
        />
    );
};
