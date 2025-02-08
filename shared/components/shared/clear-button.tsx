import { X } from "lucide-react";

export interface IClearButtonProps {
    onClick?: VoidFunction;
}

export const ClearButton = ({ onClick }: IClearButtonProps): JSX.Element => {
    return (
        <button
            onClick={onClick}
            className="absolute right-4 top-1/2 -translate-y-1/2 opacity-30 hover:opacity-100 transition cursor-pointer"
        >
            <X size={20} />
        </button>
    );
};
