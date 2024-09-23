<script setup lang="ts">
import type {ProductType} from "~/src/types/ProductType";

const props = defineProps<{ product: ProductType }>();
</script>

<template>
  <div class="product-container-detail">
    <div class="product-container-detail__info">
      <span class="product-container-detail__code">{{ props.product.code || "Нет кода продукта" }}</span>
      <h3 class="product-container-detail__name">{{ props.product.name }}</h3>
    </div>
  </div>
</template>

<style scoped>
.product-container-detail {
  padding: 10px;
  display: flex;
  flex-direction: column;
}

.product-container-detail__info {
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
}

.product-container-detail__code {
  font-size: 10px;
  color: #9e9e9e;
}

.product-container-detail__name {
  font-size: 1.2rem;
  font-weight: 500;
  margin: 5px 0;
  padding-top: 8px;
}

@media (max-width: 600px) {
  .product-container-detail__name {
    font-size: 1.2rem;
  }
}
</style>