<script setup lang="ts">
import type {Product} from "~/src/types/product/Product";
import FooterCardProduct from "~/src/components/Product/Card/FooterCardProduct.vue";

const props = defineProps<{ product: Product }>();
</script>

<template>
  <div class="product-details">
    <div>
      <h3>{{ props.product.name }}</h3>
      <p v-if="props.product.code">Код: {{ props.product.code }}</p>
      <p v-else>Код отсутствует</p>
    </div>

    <FooterCardProduct :product="product"></FooterCardProduct>
  </div>
</template>

<style scoped>
.product-details {
  padding: 10px;
}
</style>