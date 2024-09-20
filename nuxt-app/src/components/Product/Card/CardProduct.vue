<script setup lang="ts">
import type {Product} from '~/src/types/product/Product';
import DetailCardProduct from '~/src/components/Product/Card/DetailCardProduct.vue';

const props = defineProps<{ products: Product[] }>();
</script>

<template>
  <div class="product-grid">
    <div
        v-for="product in props.products"
        :key="product.id"
        :datatype="product.material"
        class="block-card"
    >
      <div
          class="badge"
          v-if="product.price.old_price && product.price.old_price > product.price.current_price"
      >
        Скидка
      </div>

      <div class="image-container">
        <img :src="product.image.url" :alt="product.name" class="product-image"/>
      </div>

      <DetailCardProduct :product="product"></DetailCardProduct>
    </div>
  </div>
</template>

<style scoped>
.product-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}

.block-card {
  width: 336px;
  height: auto;
  border: 1px solid #cccccc;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.image-container {
  width: 100%;
  height: 60%;
  overflow: hidden;
}

.product-image {
  width: 100%;
  max-height: 260px;
  height: 125%;
}
</style>
