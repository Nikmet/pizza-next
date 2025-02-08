import { CheckoutDetailsItem, Container, Title, WhiteBlock } from "@/shared/components/shared";
import { Button, Input, Textarea } from "@/shared/components/ui";
import { ArrowRight, Package, Percent, Truck } from "lucide-react";

export default function CheckoutPage() {
    return (
        <Container className="mt-10">
            <Title text="Оформление заказа" size="lg" className="font-extrabold mb-8" />

            <div className="flex gap-10">
                {/* {Левая часть} */}
                <div className="flex flex-col gap-10 flex-1 mb-20">
                    <WhiteBlock title="1. Корзина"></WhiteBlock>
                    <WhiteBlock title="2. Персональные данные">
                        <div className="grid grid-cols-2 gap-5">
                            <Input name="firstName" placeholder="Имя" className="text-base" />
                            <Input name="lastName" placeholder="Фамилия" className="text-base" />
                            <Input name="email" placeholder="E-mail" className="text-base" />
                            <Input name="phone" placeholder="Телефон" className="text-base" />
                        </div>
                    </WhiteBlock>
                    <WhiteBlock title="3. Адрес доставки">
                        <div className="flex flex-col gap-5">
                            <Input name="address" placeholder="Введите адрес..." className="text-base" />
                            <Textarea rows={5} className="text-base" placeholder="Комментарий к заказу" />
                        </div>
                    </WhiteBlock>
                </div>

                {/* {Правая часть} */}
                <div className="w-[450px]">
                    <WhiteBlock className="p-6 sticky top-4">
                        <div className="flex flex-col gap-1">
                            <span className="text-xl">Итого:</span>
                            <span className="text-3xl font-extrabold">1200 ₽</span>
                        </div>

                        <CheckoutDetailsItem
                            title="Стоимость без налога:"
                            total="1000"
                            icon={<Package className=" text-gray-300" size={18} />}
                        />
                        <CheckoutDetailsItem
                            title="Налог:"
                            total="80"
                            icon={<Percent className=" text-gray-300" size={18} />}
                        />
                        <CheckoutDetailsItem
                            title="Доставка:"
                            total="120"
                            icon={<Truck className=" text-gray-300" size={18} />}
                        />

                        <Button type="submit" className="w-full h-14 rounded-2xl mt-6 text-base font-bold">
                            Перейти к оплате
                            <ArrowRight className="w-5 ml-2" />
                        </Button>
                    </WhiteBlock>
                </div>
            </div>
        </Container>
    );
}
