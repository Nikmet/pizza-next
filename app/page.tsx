import { Container, Filters, ProductCard, ProductsGroupList, Title, TopBar } from "@/components/shared";

export default function Home() {
    return (
        <>
            <Container className="mt-10">
                <Title text="Все пиццы" size="lg" className="font-extrabold" />
            </Container>
            <TopBar />

            <Container className="pb-14 mt-10">
                <div className="flex gap-[60px]">
                    {/* Фильтрация */}
                    <div className="w-[250px]">
                        <Filters />
                    </div>

                    {/* Список товаров */}
                    <div className="flex-1">
                        <div className="flex flex-col gap-16">
                            <ProductsGroupList
                                title="Пиццы"
                                products={[
                                    {
                                        id: 1,
                                        name: "Пицца 1",
                                        imgUrl: "https://media.dodostatic.net/image/r:292x292/11ef12b2f6afd043932efbbaf24f90df.avif",
                                        items: [
                                            {
                                                price: 100
                                            }
                                        ]
                                    },
                                    {
                                        id: 2,
                                        name: "Пицца 2",
                                        imgUrl: "https://media.dodostatic.net/image/r:292x292/11ef12b2f6afd043932efbbaf24f90df.avif",
                                        items: [
                                            {
                                                price: 200
                                            }
                                        ]
                                    },
                                    {
                                        id: 2,
                                        name: "Пицца 2",
                                        imgUrl: "https://media.dodostatic.net/image/r:292x292/11ef12b2f6afd043932efbbaf24f90df.avif",
                                        items: [
                                            {
                                                price: 200
                                            }
                                        ]
                                    },
                                    {
                                        id: 2,
                                        name: "Пицца 2",
                                        imgUrl: "https://media.dodostatic.net/image/r:292x292/11ef12b2f6afd043932efbbaf24f90df.avif",
                                        items: [
                                            {
                                                price: 200
                                            }
                                        ]
                                    },
                                    {
                                        id: 2,
                                        name: "Пицца 2",
                                        imgUrl: "https://media.dodostatic.net/image/r:292x292/11ef12b2f6afd043932efbbaf24f90df.avif",
                                        items: [
                                            {
                                                price: 200
                                            }
                                        ]
                                    }
                                ]}
                                categoryId={0}
                            />
                            <ProductsGroupList
                                title="Комбо"
                                categoryId={1}
                                products={[
                                    {
                                        id: 1,
                                        name: "Пицца 1",
                                        imgUrl: "https://media.dodostatic.net/image/r:292x292/11ef12b2f6afd043932efbbaf24f90df.avif",
                                        items: [
                                            {
                                                price: 100
                                            }
                                        ]
                                    },
                                    {
                                        id: 2,
                                        name: "Пицца 2",
                                        imgUrl: "https://media.dodostatic.net/image/r:292x292/11ef12b2f6afd043932efbbaf24f90df.avif",
                                        items: [
                                            {
                                                price: 200
                                            }
                                        ]
                                    },
                                    {
                                        id: 2,
                                        name: "Пицца 2",
                                        imgUrl: "https://media.dodostatic.net/image/r:292x292/11ef12b2f6afd043932efbbaf24f90df.avif",
                                        items: [
                                            {
                                                price: 200
                                            }
                                        ]
                                    },
                                    {
                                        id: 2,
                                        name: "Пицца 2",
                                        imgUrl: "https://media.dodostatic.net/image/r:292x292/11ef12b2f6afd043932efbbaf24f90df.avif",
                                        items: [
                                            {
                                                price: 200
                                            }
                                        ]
                                    },
                                    {
                                        id: 2,
                                        name: "Пицца 2",
                                        imgUrl: "https://media.dodostatic.net/image/r:292x292/11ef12b2f6afd043932efbbaf24f90df.avif",
                                        items: [
                                            {
                                                price: 200
                                            }
                                        ]
                                    }
                                ]}
                            />
                        </div>
                    </div>
                </div>
            </Container>
        </>
    );
}
