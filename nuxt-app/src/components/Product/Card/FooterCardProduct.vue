<script setup lang="ts">
import FavoriteIcon from "~/src/components/elements/Icons/FavoriteIcon.vue";
import BusketIcon from "~/src/components/elements/Icons/BusketIcon.vue";
import type {Product} from "~/src/types/product/Product";

const props = defineProps<{ product: Product }>();
</script>

<template>
  <div class="price-section">
    <span class="current-price">{{ props.product.price.current_price }} ₽</span>
    <span v-if="props.product.price.old_price" class="old-price">{{ props.product.price.old_price }} ₽</span>
  </div>

  <div class="buy-section">
    <BusketIcon></BusketIcon>
    <FavoriteIcon></FavoriteIcon>
  </div>
</template>

<style scoped>
.price-section {
  margin-top: 10px;
}

.current-price {
  font-weight: bold;
  font-size: 18px;
}

.old-price {
  text-decoration: line-through;
  color: #999999;
  margin-left: 10px;
}
</style>