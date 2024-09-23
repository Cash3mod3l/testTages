<script setup lang="ts">
import Header from '~/src/components/elements/Header.vue';
import Select from '~/src/components/elements/Select.vue';
import CardProduct from '~/src/components/Product/Card/CardProduct.vue';
import {ref, computed} from 'vue';
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

const {getSorterProducts} = storeToRefs(productStore);

onBeforeMount(() => {
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
.page {
  width: 78.5%;
  margin: 0 auto;
  padding: 40px 0;
}

.page__section-title {
  padding: 35px 0;
}

.page__section-title-text {
  width: 83%;
  margin: 0 auto;
  font-weight: 600;
  font-size: 2rem;
  line-height: 2.5rem;
  font-family: "SF Pro Display", sans-serif;
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

@media (max-width: 920px) {
  header {
    padding: 0 6%;
  }

  .page {
    width: 95vw !important;
  }

  .page__section-title {
    padding: 15px 6%;
  }

  .page__section-filters {
    padding: 15px 6%;
  }
}


@media (max-width: 350px) {
  .page {
    width: 100vw !important;
    margin: 0 auto;
  }
}
</style>