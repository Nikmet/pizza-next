export interface ICartDrawerItemProps {
    className?: string;
}

export const CartDrawerItem = ({ className }: ICartDrawerItemProps): JSX.Element => {
    return <div className={className}></div>;
};
