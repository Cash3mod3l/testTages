<script lang="ts" setup>
import {defineProps, defineEmits} from "vue";

interface Option {
  value: string | number;
  text: string;
}

const props = defineProps<{
  options: Option[];
  label: string;
}>();

const emit = defineEmits<{
  (e: "update:modelValue", value: string | number): void;
  (e: "change", value: string | number): void;
}>();

function handleChange(event: Event): void {
  const target = event.target as HTMLSelectElement;
  const value = target.value;
  emit("change", value);
}
</script>

<template>
  <div class="display-grid">
    <label class="margin-bottom-10 margin-left-10" for="dynamic-select">{{ props.label }}</label>
    <select
        class="select"
        :value="props.modelValue"
        @change="handleChange"
    >
      <option
          class="text-label"
          v-for="option in props.options"
          :key="option.value"
          :value="option.value"
      >
        {{ option.text }}
      </option>
    </select>
  </div>
</template>

<style scoped>
.text-label {
  font-family: SF Pro Display;
  font-size: 14px;
  font-weight: 400;
  line-height: 21px;
  letter-spacing: 0.03em;
  text-align: left;
}

.select {
  max-width: 280px;
  height: 40px;
  padding: 10px;
  width: 20em;
}

.display-grid {
  display: grid;
}

.margin-bottom-10 {
  margin-bottom: 10px;
}

.margin-left-10 {
  margin-left: 10px;
}
</style>