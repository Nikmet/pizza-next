import { InputHTMLAttributes, use } from "react";
import { Input } from "../../ui";
import { ErrorText } from "../error-text";
import { RequiredSymbol } from "../required-symbol";
import { ClearButton } from "../clear-button";
import { useFormContext } from "react-hook-form";

export interface IFormInputProps extends InputHTMLAttributes<HTMLInputElement> {
    name: string;
    label?: string;
    required?: boolean;
    className?: string;
}

export const FormInput = ({ name, label, required, className, ...props }: IFormInputProps): JSX.Element => {
    const {
        register,
        formState: { errors },
        watch,
        setValue
    } = useFormContext();

    const value = watch(name);
    const errorText = errors[name];


    const handleClearInput = () => {
        setValue(name, "", { shouldValidate: true });
    };

    return (
        <div className={className}>
            {label && (
                <p className="font-medium mb-2">
                    {label} {required && <RequiredSymbol />}
                </p>
            )}

            <div className="relative">
                <Input className="h-12 text-md" {...register(name)} {...props} />
                {value && <ClearButton onClick={handleClearInput} />}
            </div>

            {errorText && <ErrorText text={String(errorText.message)} className="mt-2" />}
        </div>
    );
};
