<script setup lang="ts">
import type {Product} from "~/src/types/Product";
import FavoriteButton from "~/src/components/elements/Buttons/FavoriteButton.vue";
import BasketButton from "~/src/components/elements/Buttons/BasketButton.vue";

const props = defineProps<{ product: Product }>();
</script>

<template>
  <div class="footer-card-section">
    <div class="price-section">
      <span class="current-price">{{ props.product.price.current_price }} ₽</span>
      <span v-if="props.product.price.old_price" class="old-price">{{ props.product.price.old_price }} ₽</span>
    </div>

    <div class="buy-section">
      <BasketButton :product-id="props.product.id"></BasketButton>

      <FavoriteButton :product-id="props.product.id"></FavoriteButton>
    </div>
  </div>
</template>

<style scoped>
.footer-card-section {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-end;
}

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