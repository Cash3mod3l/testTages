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
  <div class="container">
    <Header></Header>

    <section class="title-padding-top-bottom-10">
      <span class="text">Комплекты стеллажных систем</span>
    </section>

    <section>
      <div class="inline-flex-spacing-35">
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

    <section>
      <CardProduct :products="getSorterProducts"></CardProduct>
    </section>
  </div>
</template>

<style scoped>
.container {
  display: block;
  margin-left: 150px;
  padding-top: 10px;
}

.text {
  font-family: SF Pro Display;
  font-weight: 600;
  font-size: 36px;
  line-height: 48px;
}

.title-padding-top-bottom-10 {
  padding: 10px 0 10px 0;
}

.inline-flex-spacing-35 {
  display: inline-flex;
  gap: 35px;
}
</style>
