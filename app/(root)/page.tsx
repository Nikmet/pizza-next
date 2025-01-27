import { prisma } from "@/prisma/prisma-client";
import { Container, Filters, ProductsGroupList, Title, TopBar } from "@/shared/components/shared";

export default async function Home() {
    const categories = await prisma.category.findMany({
        include: {
            products: {
                include: {
                    ingredients: true,
                    items: true
                }
            }
        }
    });

    return (
        <>
            <Container className="mt-10">
                <Title text="Все пиццы" size="lg" className="font-extrabold" />
            </Container>
            <TopBar categories={categories} />

            <Container className="pb-14 mt-10">
                <div className="flex gap-[60px]">
                    {/* Фильтрация */}
                    <div className="w-[250px]">
                        <Filters />
                    </div>

                    {/* Список товаров */}
                    <div className="flex-1">
                        <div className="flex flex-col gap-16">
                            {categories.map(
                                category =>
                                    category.products.length > 0 && (
                                        <ProductsGroupList
                                            key={category.id}
                                            title={category.name}
                                            products={category.products}
                                            categoryId={category.id}
                                        />
                                    )
                            )}
                        </div>
                    </div>
                </div>
            </Container>
        </>
    );
}
