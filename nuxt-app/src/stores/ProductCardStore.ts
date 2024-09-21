import {defineStore} from "pinia";
import type {Product} from "~/src/types/Product";
import { request } from '~/src/request/request';


export const useProductCardStore = defineStore("productCardStore", {
    state: () => ({
        products: [] as Product[],
        sortOrder: "asc" as "asc" | "desc",
    }),
    getters: {
        sortedProducts(state): Product[] {
            return () => { state.products = [...state.products].sort((product1: Product, product2: Product) => {
                if (state.sortOrder === "asc") {
                    return product1.price.current_price - product2.price.current_price;
                } else {
                    return product2.price.current_price - product1.price.current_price;
                }
            })};
        },
        sortedMaterialProducts(state): Product[] {
            return [...state.products].sort((product1: Product, product2: Product): number => {
                if (state.sortOrder === "asc") {
                    return product1.material - product2.material;
                } else {
                    return product2.material - product1.material;
                }
            })
        }
    },
    actions: {
        getProducts(): Promise<void> {
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