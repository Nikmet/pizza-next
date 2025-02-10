import { cn } from "@/shared/lib/utils";

export interface ICheckoutDetailsItemProps {
    className?: string;
    title: string;
    total: React.ReactNode;
    icon?: React.ReactNode;
}

export const CheckoutDetailsItem = ({ title, total, icon, className }: ICheckoutDetailsItemProps): JSX.Element => {
    return (
        <div className={cn("flex my-4", className)}>
            <span className="flex flex-1 text-lg text-black">
                <div className="flex items-center mr-2">{icon}</div>
                {title}
                <div className="flex-1 border-b border-dashed border-b-neutral-200 relative -top-1 mx-2"></div>
            </span>
            <span className="font-bold text-lg max-w-20">{total}</span>
        </div>
    );
};
