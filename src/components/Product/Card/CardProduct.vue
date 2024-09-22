<script setup lang="ts">
import type {Product} from '~/src/types/Product';
import DetailCardProduct from '~/src/components/Product/Card/DetailCardProduct.vue';
import FooterCardProduct from "~/src/components/Product/Card/FooterCardProduct.vue";

const props = defineProps<{ products: Product[] }>();
</script>

<template>
  <div class="product-card-container">
    <div
        v-for="product in props.products"
        :key="product.id"
        :datatype="product.material"
        class="product-card-container__card"
    >
      <div
          class="product-card-container__badge"
          v-if="product.price.old_price && product.price.old_price > product.price.current_price"
      >
        Скидка
      </div>

      <div class="product-card-container__image-container">
        <img :src="product.image.url" :alt="product.name" class="product-card-container__image"/>
      </div>

      <DetailCardProduct :product="product"></DetailCardProduct>

      <FooterCardProduct :product="product"></FooterCardProduct>
    </div>
  </div>
</template>

<style scoped>
.product-card-container {
  display: grid;
  grid-template-columns: repeat(4, minmax(auto, 260px));
  gap: 35px;
}

.product-card-container__card {
  width: 336px;
  height: auto;
  border: 1px solid #cccccc;
  overflow: hidden;
  box-shadow: 0 2px 1px rgba(0, 0, 0, 0.1);
  background-color: #ffffff;
  font-family: "SF UI Text" !important;
}

.product-card-container__image-container {
  position: relative;
  width: 100%;
  padding-top: 100%;
  overflow: hidden;
}

.product-card-container__badge {
  background-color: #ff4747;
  color: white;
  font-size: 14px;
  font-weight: bold;
  padding: 4px 10px;
  max-width: 60px;
  text-align: center;
  margin-top: 8px;
}

.product-card-container__image {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  max-width: 200px;
  max-height: 200px;
}

@media (max-width: 1200px) {
  .product-card-container {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (max-width: 1030px) {
  .product-card-container {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 600px) {
  .product-card-container {
    grid-template-columns: 1fr;
  }
}
</style>
