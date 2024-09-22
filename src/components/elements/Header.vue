<script setup lang="ts">

import Breadcrumb from "~/src/components/elements/Breadcrumb.vue";
</script>

<template>
  <header>
    <Breadcrumb  :crumbs="[
      { label: 'Главная', url: '/', color: '#727783' },
      { label: 'Системы хранения', url: '/', color: '#727783' },
      { label: 'Комплекты стеллажных систем', color: '#333' }
    ]"
    />
  </header>
</template>

<style scoped>

</style>