import {defineStore} from "pinia";
import type {Product} from "~/src/types/Product";
import {request} from "~/src/request/request";

function getPrice(product: Product): number {
    return product.price.current_price || product.price.old_price;
}

export const useFilterProductCardStore = defineStore("filterProductCardStore",
    {
        state: (): object => ({
            products: [] as Product[],
            sortOrder: "asc" as "asc" | "desc",
        }),
        getters: {
            sortedProducts(state): Product[] {
                return [...state.products].sort((priceCurrent: number, priceOld: number): number => {
                    const currentPrice: number = getPrice(priceCurrent);
                    const oldPrice: number = getPrice(priceOld);
                    if (state.sortOrder === "asc") {
                        return currentPrice - oldPrice;
                    } else {
                        return oldPrice - currentPrice;
                    }
                });
            },
        },
        actions: {
            setSortOrder(order: "asc" | "desc"): void {
                this.sortOrder = order;
            },
            getProducts(): Promise<Product[]> {
                request<Product[]>({
                    method: "GET",
                    url: "/data/items.json",
                })
                    .then((data: Product[]) => {
                        this.products = data;
                    })
                    .catch((error) => {
                        console.error("Ошибка при получении продуктов:", error);
                    });
            },
        },
    });
