<script setup lang="ts">
import Header from "~/src/components/elements/Header/Header.vue";
import Select from "~/src/components/elements/Select/Select.vue";
import {request} from '~/src/request/request';
import CardProduct from "~/src/components/Product/Card/CardProduct.vue";

const selectedValue = ref('');
const selectedValueMaterial = ref('')

const options = ref([
  {value: 1, text: 'Цена по возрастанию'},
  {value: 2, text: 'Цена по убыванию'},
]);

const onOptionChangeTest = (newValue: string | number) => {
  console.log('Selected value changed:', newValue);
};

const materialOptions = ref([]);

const onOptionChange = (newValue: string | number) => {
  console.log('Selected value changed:', newValue);
};

function getMaterial() {
  const config = {
    method: 'GET',
    url: `/data/materials.json`,
  };

  request(config).then((data) => {
    materialOptions.value = data.map((item: { id: string; name: string }) => ({
      value: item.id,
      text: item.name,
    }));
  }).catch((error) => {
    console.error('Ошибка при получении материалов:', error);
  });
}

onMounted(() => {
  getMaterial();
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
        <Select :label="'Сортировать по:'"
                :options="options"
                v-model="selectedValue"
                @change="onOptionChangeTest"
        />

        <Select :label="'Материал'"
                :options="materialOptions"
                v-model="selectedValueMaterial"
                @change="onOptionChange"
        />
      </div>
    </section>

    <section>
      <CardProduct></CardProduct>
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