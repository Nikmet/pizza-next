"use client";

import { cn } from "@/shared/lib/utils";

export type Variant = {
    name: string;
    value: string;
    disabled?: boolean;
};

export interface IGroupVariantsProps {
    items: readonly Variant[];
    onClick?: (value: Variant["value"]) => void;
    selectedValue?: Variant["value"];
    className?: string;
}

export const GroupVariants = ({ items, onClick, selectedValue, className }: IGroupVariantsProps): JSX.Element => {
    return (
        <div className={cn(className, "flex justify-between bg-[#F3F3F7] rounded-3xl p-1 select-none")}>
            {items.map(({ name, value, disabled }) => (
                <button
                    key={name}
                    className={cn(
                        "flex items-center justify-center cursor-pointer h-[30px] px-5 flex-1 rounded-3xl transition-all duration-400 text-sm",
                        {
                            "bg-white shadow": value == selectedValue,
                            "text-gray-500 opacity-50 pointer-events-none": disabled
                        }
                    )}
                    onClick={() => onClick?.(value)}
                    disabled={disabled}
                >
                    {name}
                </button>
            ))}
        </div>
    );
};
