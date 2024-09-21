import {defineStore} from "pinia";
import type {Product} from "~/src/types/Product";
import {request} from '~/src/request/request';


export const useProductCardStore = defineStore("productCardStore",
    {
        state: () => ({
            products: [] as Product[],
            sortOrder: "asc" as "asc" | "desc",
            materialId: 0 as number,
        }),
        getters: {
            orderByProducts(state: {
                products: Product[],
                sortOrder: "asc" | "desc",
                sortedProducts: Product[]
            }): Product[] {
                return state.products.toSorted((a, b) => {
                    let compareValue: number = 0;

                    if (state.sortOrder === "asc") {
                        compareValue = a.price.current_price - b.price.current_price;
                    } else {
                        compareValue = b.price.current_price - a.price.current_price;
                    }

                    return compareValue;
                });
            },
            sortedMaterialProducts(state: {
                products: Product[],
                materialId: number,
            }): Product[] {
                let sortedProducts: Product[] = this.orderByProducts;

                if (state.materialId === 0) {
                    return sortedProducts;
                }

                let filteredMaterialProducts: Product[] = sortedProducts.filter(product => product.material === state.materialId);
                console.log(state.materialId);

                return filteredMaterialProducts;
            },
            getSorterProducts() {
                return this.sortedMaterialProducts;
            }
        },
        actions: {
            fetchProducts(): Promise<void> {
                return request<Product[]>({
                    method: "GET",
                    url: "/data/items.json",
                })
                    .then((data: Product[]) => {
                        this.products = data;
                    })
                    .catch((error) => {
                        console.error(error);
                    });
            }
        }
    });