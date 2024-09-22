<script setup lang="ts">
import {onMounted} from 'vue';
import {useFavoriteStore} from "~/src/stores/FavoriteStore";

import FavoriteSVG from "~/src/components/elements/SVG/FavoriteSVG.vue";

const props = defineProps<{ productId: string }>();
const favoriteStore = useFavoriteStore();

onMounted(() => {
  favoriteStore.loadFavorites();
});
</script>

<template>
  <button @click="favoriteStore.toggleFavorite(props.productId)" aria-label="Добавить в избранное">
    <i>
      <FavoriteSVG :color="favoriteStore.inFavorite(props.productId) ? 'red' : 'black'"></FavoriteSVG>
    </i>
  </button>
</template>

<style scoped>
button {
  background: none;
  border: none;
  cursor: pointer;
}
</style>