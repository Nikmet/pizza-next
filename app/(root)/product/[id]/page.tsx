import { Container, GroupVariants, PizzaImage, Title } from "@/shared/components/shared";
import { prisma } from "@/prisma/prisma-client";
import { notFound } from "next/navigation";

export default async function ProductPage({ params: { id } }: { params: { id: string } }) {
    const product = await prisma.product.findUnique({
        where: { id: Number(id) },
        include: {
            items: true
        }
    });

    if (!product) {
        return notFound();
    }

    return (
        <Container className="flex flex-col my-10">
            <div className="flex flex-1">
                <PizzaImage src={product.imageUrl} className="" size={40} />
                <div className="w-[400px] bg-[#fcfcfc] p-7">
                    <Title text={product.name} size="md" className="font-extrabold mb-1" />
                    <p className="text-gray-400">Lorem ipsum dolor sit amet consectetur adipisicing elit!</p>
                    <GroupVariants
                        selectedValue="20"
                        items={[
                            {
                                name: "Маленькая",
                                value: "20"
                            },
                            {
                                name: "Средняя",
                                value: "30"
                            },
                            {
                                name: "Большая",
                                value: "40"
                            }
                        ]}
                    />
                </div>
            </div>
        </Container>
    );
}
