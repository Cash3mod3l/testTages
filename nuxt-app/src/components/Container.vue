<script setup lang="ts">
import Header from '~/src/components/elements/Header/Header.vue';
import Select from '~/src/components/elements/Select/Select.vue';
import CardProduct from '~/src/components/Product/Card/CardProduct.vue';
import {ref, onMounted, computed} from 'vue';
import {useMaterialProductStore} from "~/src/stores/MaterialProductStore";
import {useProductCardStore} from "~/src/stores/ProductCardStore";
import {useSortMaterialProduct} from "~/src/stores/SortMaterialProduct";
import {storeToRefs} from "pinia";

const selectedValue = ref('');
const sortMaterialProduct = useSortMaterialProduct();
const productStore = useProductCardStore();

const optionsPriceSelect = ref([
  {value: 'asc', text: 'Цена по возрастанию'},
  {value: 'desc', text: 'Цена по убыванию'},
]);

const onSortChange = (newValue: string | number) => {
  productStore.sortOrder = newValue;
  /*productStore.sortedProducts();*/
};

const onOptionChange = (newValue: string | number) => {
  productStore.sortOrder = newValue;
  productStore.sortedMaterialProducts()
};

const materialStore = useMaterialProductStore();
const selectedValueMaterial = ref("");

const optionsMaterialsSelect = computed(() => {
  console.log('materials для options:', materialStore.materials);
  return materialStore.materials.map(material => ({
    value: material.id,
    text: material.name,
  }));
});


let {products} = storeToRefs(productStore)


onMounted(() => {
  materialStore.getMaterials();
  productStore.getProducts();
});
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
            v-model="selectedValue"
            @change="onSortChange"
        />

        <Select
            :label="'Материал'"
            :options="optionsMaterialsSelect"
            v-model="selectedValueMaterial"
            @change="onOptionChange"
        />
      </div>
    </section>

    <section>
      <CardProduct :products="products"></CardProduct>
    </section>
  </div>
</template>

<style scoped>
.container {
  display: block;
  margin-left: 100px;
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
