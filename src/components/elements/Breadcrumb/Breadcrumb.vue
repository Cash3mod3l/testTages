<script lang="ts">
import {defineComponent, PropType} from 'vue';

interface Crumb {
  label: string;
  url?: string;
  color?: string;
}

export default defineComponent({
  props: {
    crumbs: {
      type: Array as PropType<Crumb[]>,
      required: true,
      default: () => [],
    },
  },
});
</script>

<template>
  <nav aria-label="breadcrumb">
    <ul class="breadcrumb">
      <li v-for="(crumb, index) in crumbs" :key="index" class="breadcrumb-item">
        <a class="text"
            v-if="crumb.url"
            :href="crumb.url"
            :style="{ color: crumb.color }"
        >
          {{ crumb.label }}
        </a>
        <span v-else :style="{ color: crumb.color }">{{ crumb.label }}</span>
        <span v-if="index < crumbs.length - 1"> / </span>
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
}

.breadcrumb-item {
  margin-right: 5px;
}

.text {
  font-family: SF UI Text;
  font-weight: 400;
  font-size: 16px;
  line-height: 16px;
}
</style>