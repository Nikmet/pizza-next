import { FormProvider, useForm } from "react-hook-form";
import { formLoginSchema, TFormLoginValues } from "./schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Title } from "../../../title";
import { FormInput } from "../../../form-components/form-input";
import { Loader2 } from "lucide-react";
import { Button } from "@/shared/components/ui";
import toast from "react-hot-toast";
import { signIn } from "next-auth/react";

export interface ILoginFormProps {
    onClose?: () => void;
}

export const LoginForm = ({ onClose }: ILoginFormProps): JSX.Element => {
    const form = useForm<TFormLoginValues>({
        resolver: zodResolver(formLoginSchema),
        defaultValues: {
            email: "",
            password: ""
        }
    });

    const onSubmit = async (data: TFormLoginValues) => {
        try {
            const resp = await signIn("credentials", {
                ...data,
                redirect: false
            });

            if (!resp?.ok) {
                throw new Error("Не удалось войти в аккаунт");
            }

            toast.success("Вы успешно вошли в аккаунт");

            onClose?.();
        } catch (e) {
            console.log(e);
            toast.error("Не удалось войти в аккаунт");
        }
    };

    return (
        <FormProvider {...form}>
            <form className="flex flex-col gap-5" onSubmit={form.handleSubmit(onSubmit)}>
                <div className="flex justify-between items-center">
                    <div className="mr-2">
                        <Title text="Вход в аккаунт" size="md" className="font-bold" />
                        <p className="text-gray-400">Введите свою почту, чтобы войти в свой аккаунт</p>
                    </div>
                </div>
                <FormInput name="email" label="E-Mail" required />
                <FormInput name="password" label="Пароль" type="password" required />

                <Button className="h-12 text-base" type="submit" loading={form.formState.isSubmitting}>
                    Войти
                </Button>
            </form>
        </FormProvider>
    );
};
