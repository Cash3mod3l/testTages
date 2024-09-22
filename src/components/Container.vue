<script setup lang="ts">
import Header from '~/src/components/elements/Header.vue';
import Select from '~/src/components/elements/Select.vue';
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

    <section class="page__section-title">
      <span class="page__section-title-text">Комплекты стеллажных систем</span>
    </section>

    <section class="page__section-filters">
      <div class="page__filters-group">
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

    <section class="page__products">
      <CardProduct :products="getSorterProducts"></CardProduct>
    </section>
  </div>
</template>

<style scoped>
@font-face {
  font-family: "SF UI Text";
  src: url("/fonts/SF-UI-Text-Regular.otf");
}

body {
  font-family: 'SF Pro Display' !important;
}

.page {
  width: 75%;
  margin: 0 auto;
  padding: 20px;
}

.page__section-title {
  padding: 35px 0;
}

.page__section-title-text {
  font-weight: 600;
  font-size: 2rem;
  line-height: 2.5rem;
}

.page__section-filters {
  margin-bottom: 40px;
}

.page__filters-group {
  display: flex;
  gap: 30px;
  flex-wrap: wrap;
}

.page__products {
  display: grid;
  gap: 45px;
}

@media (max-width: 900px) {
  .page__products {
    margin-left: 0;
  }
}

@media (max-width: 600px) {
  .page {
    width: auto;
  }

  .page__filters-group {
    gap: 10px;
    flex-direction: column;
    align-items: center;
  }

  .page__section-title-text {
    font-size: 1.5rem;
    line-height: 2rem;
  }

  .page__products {
    display: flex;
    justify-content: center;
  }
}
</style>