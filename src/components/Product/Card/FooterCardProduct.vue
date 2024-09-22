<script setup lang="ts">
import type {Product} from "~/src/types/Product";
import FavoriteButton from "~/src/components/elements/Buttons/FavoriteButton.vue";
import BasketButton from "~/src/components/elements/Buttons/BasketButton.vue";

const props = defineProps<{ product: Product }>();
</script>

<template>
  <div class="card-footer">
    <div class="card-footer__price">
      <span class="card-footer__price-old" v-if="props.product.price.old_price">{{ props.product.price.old_price }} ₽</span>
      <span class="card-footer__price-current">{{ props.product.price.current_price }} ₽</span>
    </div>

    <div class="card-footer__actions">
      <BasketButton :product-id="props.product.id" class="card-footer__action-icon"></BasketButton>
      <FavoriteButton :product-id="props.product.id" class="card-footer__action-icon"></FavoriteButton>
    </div>
  </div>
</template>

<style scoped>
.card-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  background-color: #fff;
}

.card-footer__price {
  display: flex;
  flex-direction: row;
  align-items: baseline;
}

.card-footer__price-current {
  font-weight: bold;
  font-size: 18px;
  color: #000;
  white-space: nowrap;
}

.card-footer__price-old {
  font-weight: bold;
  text-decoration: line-through;
  color: #999;
  margin-right: 10px;
  font-size: 18px;
  white-space: nowrap;
}

.card-footer__actions {
  display: flex;
  flex-direction: row;
  gap: 10px;
}

.card-footer__action-icon {
  width: 24px;
  height: 24px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 20px;
}

@media screen and (max-width: 768px) {
  .card-footer {
    flex-direction: column;
    align-items: flex-start;
  }

  .card-footer__price {
    max-width: 100%;
  }

  .card-footer__actions {
    margin-top: 10px;
    justify-content: flex-start;
  }
}
</style>