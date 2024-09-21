import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useBasketStore = defineStore("basketStore", () => {
    const baskets = ref<string[]>([]);

    const loadBaskets = () => {
        const storedBaskets = localStorage.getItem('baskets');
        baskets.value = JSON.parse(storedBaskets || '[]');
    };

    const toggleBasket = (productId: string): void => {
        const index: number = baskets.value.indexOf(productId);
        if (index === -1) {
            baskets.value.push(productId);
        } else {
            baskets.value.splice(index, 1);
        }
        localStorage.setItem('baskets', JSON.stringify(baskets.value));
    };

    const isBasket = (productId: string) => {
        return baskets.value.includes(productId);
    };

    return { baskets, loadBaskets, toggleBasket, isBasket };
});
