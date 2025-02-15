import { signIn, useSession } from "next-auth/react";
import { Button } from "../ui";
import { CircleUser, User } from "lucide-react";
import Link from "next/link";

export interface IProfileButtonProps {
    onClickSignIn: () => void;
    className?: string;
}

export const ProfileButton = ({ onClickSignIn, className }: IProfileButtonProps): JSX.Element => {
    const { data: session } = useSession();

    return (
        <div className={className}>
            {!session ? (
                <Button variant="outline" className="flex items-center gap-1" onClick={() => onClickSignIn()}>
                    <User size={16} />
                    Войти
                </Button>
            ) : (
                <Link href="/profile">
                    <Button variant="secondary" className="flex items-center gap-2 rounded-full">
                        <CircleUser size={18} />
                        Профиль
                    </Button>
                </Link>
            )}
        </div>
    );
};
