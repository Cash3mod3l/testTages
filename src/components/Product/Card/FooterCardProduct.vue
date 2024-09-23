<script setup lang="ts">
import type {ProductType} from "~/src/types/ProductType";
import FavoriteButton from "~/src/components/elements/Buttons/FavoriteButton.vue";
import BasketButton from "~/src/components/elements/Buttons/BasketButton.vue";

const props = defineProps<{ product: ProductType }>();
</script>

<template>
  <div class="product-card-container-footer">
    <div class="product-card-container-footer__price">
      <span class="product-card-container-footer__price-old" v-if="props.product.price.old_price">{{ props.product.price.old_price }} ₽</span>
      <span class="product-card-container-footer__price-current">{{ props.product.price.current_price }} ₽</span>
    </div>

    <div class="product-card-container-footer__actions">
      <BasketButton :product-id="props.product.id" class="product-card-container-footer__action-icon"></BasketButton>
      <FavoriteButton :product-id="props.product.id" class="product-card-container-footer__action-icon"></FavoriteButton>
    </div>
  </div>
</template>

<style scoped>
.product-card-container-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  background-color: #fff;
  margin-top: -25px;
}

.product-card-container-footer__price {
  display: flex;
  flex-direction: row;
  align-items: baseline;
}

.product-card-container-footer__price-current {
  font-weight: 400;
  font-size: 18px;
  color: #000;
  white-space: nowrap;
}

.product-card-container-footer__price-old {
  font-weight: 400;
  text-decoration: line-through;
  color: #999;
  margin-right: 10px;
  font-size: 18px;
  white-space: nowrap;
}

.product-card-container-footer__actions {
  display: flex;
  flex-direction: row;
  padding-top: 6px;
}

.product-card-container-footer__action-icon {
  display: flex;
  justify-content: center;
  margin-left: 20px;
}

@media screen and (max-width: 768px) {
  .product-card-container-footer {
    flex-direction: column;
    align-items: flex-start;
  }

  .product-card-container-footer__price {
    max-width: 100%;
  }

  .product-card-container-footer__actions {
    margin-top: 10px;
    justify-content: flex-start;
  }

  .product-card-container-footer__action-icon {
    margin-left: 0;
  }
}
</style>