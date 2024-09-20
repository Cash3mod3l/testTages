<script setup lang="ts">
import Header from '~/src/components/elements/Header/Header.vue';
import Select from '~/src/components/elements/Select/Select.vue';
import CardProduct from '~/src/components/Product/Card/CardProduct.vue';
import { useProductCardStore } from '~/src/store/ProductCardStore';
import { ref, onMounted, computed } from 'vue';

const productStore = useProductCardStore();

const selectedValue = ref('asc');
const selectedValueMaterial = ref('');

const options = ref([
  { value: 'asc', text: 'Цена по возрастанию' },
  { value: 'desc', text: 'Цена по убыванию' },
]);

const materialOptions = ref([]);

const onSortChange = (newValue: 'asc' | 'desc') => {
  productStore.setSortOrder(newValue);
};

const onOptionChange = (newValue: string | number) => {
  console.log('Выбран материал:', newValue);
};

onMounted(() => {
  productStore.getProducts();
});

const sortedProducts = computed(() => productStore.sortedProducts);
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
            :options="options"
            v-model="selectedValue"
            @change="onSortChange"
        />

        <Select
            :label="'Материал'"
            :options="materialOptions"
            v-model="selectedValueMaterial"
            @change="onOptionChange"
        />
      </div>
    </section>

    <section>
      <CardProduct :products="sortedProducts"></CardProduct>
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
