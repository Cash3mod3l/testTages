<script setup lang="ts">
import type {Product} from '~/src/types/Product';
import DetailCardProduct from '~/src/components/Product/Card/DetailCardProduct.vue';
import FooterCardProduct from "~/src/components/Product/Card/FooterCardProduct.vue";

const props = defineProps<{ products: Product[] }>();
</script>

<template>
  <div class="product-grid">
    <div
        v-for="product in props.products"
        :key="product.id"
        :datatype="product.material"
        class="product-grid__card"
    >
      <div
          class="product-grid__badge"
          v-if="product.price.old_price && product.price.old_price > product.price.current_price"
      >
        Скидка
      </div>

      <div class="product-grid__image-container">
        <img :src="product.image.url" :alt="product.name" class="product-grid__image"/>
      </div>

      <DetailCardProduct :product="product"></DetailCardProduct>

      <FooterCardProduct :product="product"></FooterCardProduct>
    </div>
  </div>
</template>

<style scoped>
.product-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(auto, 260px));
  gap: 35px;
}

.product-grid__card {
  width: 250px;
  height: auto;
  border: 1px solid #cccccc;
  overflow: hidden;
  box-shadow: 0 2px 1px rgba(0, 0, 0, 0.1);
  background-color: #ffffff;
}

.product-grid__image-container {
  position: relative;
  width: 100%;
  padding-top: 100%;
  overflow: hidden;
}

.product-grid__badge {
  background-color: #ff4747;
  color: white;
  font-size: 14px;
  font-weight: bold;
  padding: 4px 10px;
  max-width: 60px;
  text-align: center;
  margin-top: 8px;
}

.product-grid__image {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  max-width: 200px;
  max-height: 200px;
}

@media (max-width: 1200px) {
  .product-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (max-width: 1030px) {
  .product-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 600px) {
  .product-grid {
    grid-template-columns: 1fr;
  }
}
</style>
