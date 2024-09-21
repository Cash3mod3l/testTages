<script setup lang="ts">
import Header from '~/src/components/elements/Header/Header.vue';
import Select from '~/src/components/elements/Select/Select.vue';
import CardProduct from '~/src/components/Product/Card/CardProduct.vue';
import {ref, onMounted, computed} from 'vue';
import {useMaterialProductStore} from "~/src/stores/MaterialProductStore";
import {useProductCardStore} from "~/src/stores/ProductCardStore";
import {storeToRefs} from "pinia";

const productStore = useProductCardStore();
const materialStore = useMaterialProductStore();

const optionsPriceSelect = ref([
  {value: 'asc', text: 'Цена по возрастанию'},
  {value: 'desc', text: 'Цена по убыванию'},
]);

const optionsMaterialsSelect = computed(() => {
  return materialStore.materials.map(material => ({
    value: material.id,
    text: material.name,
  }));
});


const onSortPriceProductChange = (newValue: string) => {
  productStore.sortOrder = newValue;
};

const onSortMaterialProductChange = (newValue: number) => {
  productStore.materialId = Number(newValue);
};

const { getSorterProducts } = storeToRefs(productStore);

onBeforeMount (() => {
  materialStore.fetchMaterials();
  productStore.fetchProducts();
})
</script>

<template>
  <div class="page">
    <Header></Header>

    <section class="page__title">
      <span class="page__title-text">Комплекты стеллажных систем</span>
    </section>

    <section class="filters">
      <div class="filters__group">
        <Select
            :label="'Сортировать по:'"
            :options="optionsPriceSelect"
            @change="onSortPriceProductChange"
        />

        <Select
            :label="'Материал'"
            :options="optionsMaterialsSelect"
            @change="onSortMaterialProductChange"
        />
      </div>
    </section>

    <section class="products">
      <CardProduct :products="getSorterProducts"></CardProduct>
    </section>
  </div>
</template>

<style scoped>
.page {
  display: block;
  margin-left: 300px;
  padding: 20px;
}

.page__title {
  padding: 20px 0;
}

.page__title-text {
  font-family: 'SF Pro Display', sans-serif;
  font-weight: 600;
  font-size: 2rem;
  line-height: 2.5rem;
}

.filters {
  margin-bottom: 20px;
  display: flex;
}

.filters__group {
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
}

.products {
  display: grid;
  gap: 45px;
}

@media (max-width: 1200px) {
  .products {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (max-width: 900px) {
  .products {
    grid-template-columns: repeat(2, 1fr);
  }

  .page {
    margin-left: 0;
  }
}

@media (max-width: 600px) {
  .products {
    grid-template-columns: repeat(1, 1fr);
  }

  .filters__group {
    gap: 10px;
    flex-direction: column;
    align-items: center;
  }

  .page__title-text {
    font-size: 1.5rem;
    line-height: 2rem;
  }

  .page {
    margin-left: 0;
  }
}
</style>
