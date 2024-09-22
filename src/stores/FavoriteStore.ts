import {ref} from "vue";

export const useFavoriteStore = defineStore("favoriteStore", (): object => {
    const favorites = ref<string[]>([]);

    const loadFavorites = (): void => {
        const storedFavorites: string | null = localStorage.getItem("favorites");
        favorites.value = JSON.parse(storedFavorites || "[]");
    };

    const toggleFavorite = (productId: string): void => {
        const index: number = favorites.value.indexOf(productId);
        if (index === -1) {
            favorites.value.push(productId);
        }
        else {
            favorites.value.splice(index, 1);
        }
        localStorage.setItem("favorites", JSON.stringify(favorites.value));
    };

    const inFavorite = (productId: string) => {
        return favorites.value.includes(productId);
    };

    return { favorites, loadFavorites, toggleFavorite, inFavorite: inFavorite };
})