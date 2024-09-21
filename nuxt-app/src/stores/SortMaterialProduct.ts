import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { useProductCardStore } from '~/src/stores/ProductCardStore';

export const useSortMaterialProduct = defineStore('sortMaterialProduct', () => {
    const productStore = useProductCardStore();
    const selectedMaterial = ref<string>('');

    const filteredProducts = computed(() => {
        if (!selectedMaterial.value) {
            return productStore.products;
        }
        return productStore.products.filter(product => product.material === selectedMaterial.value);
    });

    const setSelectedMaterial = (material: string) => {
        selectedMaterial.value = material;
    };

    return {
        filteredProducts,
        setSelectedMaterial
    };
});