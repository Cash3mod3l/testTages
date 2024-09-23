import {defineStore} from "pinia";
import type {ProductType} from "~/src/types/ProductType";
import {request} from '~/src/requests/request';

type ParamsProcessingProducts = {
    products: ProductType[],
    sortOrder: "asc" | "desc",
    materialId: number
}

let state: ParamsProcessingProducts = {
    products: [],
    sortOrder: "asc",
    materialId: 0
};

export const useProductCardStore = defineStore("productCardStore",
    {
        state: () => (state),
        getters: {
            orderByProducts(state: ParamsProcessingProducts): ProductType[] {
                return state.products.toSorted((productOne: ProductType, productTwo: ProductType) => {
                    let compareValue: number = 0;

                    if (state.sortOrder === "asc") {
                        compareValue = productOne.price.current_price - productTwo.price.current_price;
                    } else {
                        compareValue = productTwo.price.current_price - productOne.price.current_price;
                    }

                    return compareValue;
                });
            },
            sortedMaterialProducts(state: ParamsProcessingProducts): ProductType[] {
                let sortedProducts: ProductType[] = this.orderByProducts;

                if (state.materialId === 0) {
                    return sortedProducts;
                }

                let filteredMaterialProducts: ProductType[] = sortedProducts.filter(product => product.material === state.materialId);
                console.log(state.materialId);

                return filteredMaterialProducts;
            },
            getSorterProducts() {
                return this.sortedMaterialProducts;
            }
        },
        actions: {
            fetchProducts(): Promise<void> {
                return request<ProductType[]>({
                    method: "GET",
                    url: "/data/items.json",
                })
                    .then((data: ProductType[]): void => {
                        this.products = data;
                    })
                    .catch((error): void => {
                        console.error(error);
                    });
            }
        }
    });