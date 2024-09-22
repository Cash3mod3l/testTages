<script lang="ts">
import {defineComponent, PropType} from 'vue';

type Crumb = {
  label: string;
  url?: string;
  color?: string;
}

export default defineComponent({
  props: {
    crumbs: {
      type: Array as PropType<Crumb[]>,
      required: true,
    },
  },
});
</script>

<template>
  <nav aria-label="breadcrumb">
    <ul class="breadcrumb">
      <li
          v-for="(crumb, index) in crumbs"
          :key="index"
          class="breadcrumb__item"
      >
        <a
            v-if="crumb.url"
            :href="crumb.url"
            :style="{ color: crumb.color }"
            class="breadcrumb__link"
        >
          {{ crumb.label }}
        </a>
        <span
            v-else
            :style="{ color: crumb.color }"
            class="breadcrumb__text"
        >
          {{ crumb.label }}
        </span>
        <span v-if="index < crumbs.length - 1" class="breadcrumb__separator">/</span>
      </li>
    </ul>
  </nav>
</template>

<style scoped>
.breadcrumb {
  list-style: none;
  display: flex;
  align-items: center;
  padding: 0;
  margin: 0;
}

.breadcrumb__item {
  margin-right: 5px;
  display: flex;
  align-items: center;
}

.breadcrumb__link {
  font-family: 'SF UI Text', sans-serif;
  font-weight: 400;
  font-size: 16px;
  line-height: 16px;
  text-decoration: none;
}

.breadcrumb__text {
  font-family: 'SF UI Text', sans-serif;
  font-weight: 400;
  font-size: 16px;
  line-height: 16px;
}

.breadcrumb__separator {
  margin-left: 5px;
}
</style>