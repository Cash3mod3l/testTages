<script setup lang="ts">
import {useBasketStore} from "~/src/stores/BasketStore";

import BacketSVG from "~/src/components/elements/SVG/BacketSVG.vue";
import AcceptSVG from "~/src/components/elements/SVG/AcceptSVG.vue";

const props = defineProps<{ productId: string }>();
const basketStore = useBasketStore();

onMounted(() => {
  basketStore.loadBaskets();
});
</script>

<template>
  <button @click="basketStore.toggleBasket(props.productId)">
    <BacketSVG v-if="basketStore.inBasket(props.productId)"></BacketSVG>
    <AcceptSVG v-else></AcceptSVG>
  </button>
</template>

<style scoped>
button {
  background: none;
  border: none;
  cursor: pointer;
}
</style>