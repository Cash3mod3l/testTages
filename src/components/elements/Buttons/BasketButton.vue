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
    <i :class="{'icon-in-basket': basketStore.inBasket(props.productId), 'icon-not-in-basket': !basketStore.inBasket(props.productId)}">
      <BacketSVG v-if="basketStore.inBasket(props.productId)"></BacketSVG>
      <AcceptSVG v-else></AcceptSVG>
    </i>
  </button>
</template>

<style scoped>
button {
  background: none;
  border: none;
  cursor: pointer;
}

i {
  display: inline-block;
  transition: transform 0.3s ease, opacity 0.3s ease;
}

.icon-in-basket {
  transform: rotate(360deg);
}

.icon-not-in-basket {
  transform: rotate(0deg);
}
</style>