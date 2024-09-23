<script setup lang="ts">
import type { ProductType } from '~/src/types/ProductType';
import DetailCardProduct from '~/src/components/Product/Card/DetailCardProduct.vue';
import FooterCardProduct from "~/src/components/Product/Card/FooterCardProduct.vue";

const props = defineProps<{ products: ProductType[] }>();
</script>

<template>
  <div class="product-card-container">
    <div
        v-for="product in props.products"
        :key="product.id"
        :datatype="product.material"
        class="product-card-container__card"
    >
      <div class="product-card-container__image-container">
        <img :src="product.image.url" :alt="product.name" class="product-card-container__image"/>
      </div>

      <DetailCardProduct :product="product"></DetailCardProduct>

      <FooterCardProduct :product="product"></FooterCardProduct>

      <div
          v-if="product.price.old_price && product.price.old_price > product.price.current_price"
          class="product-card-container__badge-wrapper"
      ></div>
    </div>
  </div>
</template>


<style scoped>
.product-card-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(336px, max-content));
  gap: 50px;
}

.product-card-container__card {
  position: relative;
  width: 336px;
  height: auto;
  border: 1px solid #cccccc;
  overflow: hidden;
  background-color: rgba(255, 255, 255, 1);
  font-family: "SF UI Text", sans-serif !important;
}

.product-card-container__image-container {
  position: relative;
  width: 100%;
  padding-top: 68%;
  overflow: hidden;
}

.product-card-container__image {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  max-width: 200px;
  max-height: 200px;
}

.product-card-container__badge-wrapper::after {
  content: "Скидка";
  background-color: #ff4747;
  color: white;
  font-size: 14px;
  font-weight: 500;
  padding: 4px 10px;
  position: absolute;
  top: 10px;
  max-width: 60px;
  text-align: center;
}

@media (max-width: 920px) {
  .product-card-container {
    justify-content: center;
  }
}

@media (max-width: 350px) {
  .product-card-container {
    justify-content: center;
  }
}
</style>
