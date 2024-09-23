<script setup lang="ts">
import type {Product} from "~/src/types/Product";
import FooterCardProduct from "~/src/components/Product/Card/FooterCardProduct.vue";

const props = defineProps<{ product: Product }>();
</script>

<template>
  <div class="product-container-detail">
    <div class="product-container-detail__info">
      <span class="product-container-detail__code">{{ props.product.code || "Код отсутствует" }}</span>
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
  font-family: "SF UI Text", sans-serif;
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