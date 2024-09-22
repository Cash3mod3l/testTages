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
  <div class="select-wrapper">
    <label class="select-wrapper__label" for="dynamic-select">{{ props.label }}</label>
    <select
        class="select-wrapper__select"
        id="dynamic-select"
        :value="props.modelValue"
        @change="handleChange"
    >
      <option
          class="select-wrapper__option"
          v-for="option in props.options"
          :key="option.value"
          :value="option.value"
      >
        {{ option.text }}
      </option>
    </select>

    <span class="select-wrapper__icon">
      <i>
        <svg width="18" height="11" viewBox="0 0 18 11" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd"
                clip-rule="evenodd"
                d="M16.2929 0.292908L17.7071 1.70712L9.00001 10.4142L0.292908 1.70712L1.70712 0.292908L9.00001 7.5858L16.2929 0.292908Z"
                fill="black"
          />
        </svg>
      </i>
    </span>
  </div>
</template>

<style scoped>
.select-wrapper {
  position: relative;
  display: inline-block;
  max-width: 280px;
  width: 100%;
}

.select-wrapper__label {
  display: block;
  margin-bottom: 10px;
  font-family: "SF Pro Display", sans-serif;
  font-size: 14px;
  font-weight: 400;
  line-height: 21px;
  letter-spacing: 0.03em;
  color: #000000;
}

.select-wrapper__select {
  appearance: none;
  width: 100%;
  height: 40px;
  padding: 8px 10px;
  border: 1px solid rgba(242, 242, 242, 1);
  background-color: #f5f5f5;
  font-family: "SF Pro Display", sans-serif;
  font-size: 14px;
  font-weight: 400;
  line-height: 21px;
  letter-spacing: 0.03em;
  text-align: left;
  outline: none;
  cursor: pointer;
}

.select-wrapper__icon {
  position: absolute;
  right: 10px;
  top: 75%;
  transform: translateY(-50%);
  pointer-events: none;
  font-size: 12px;
}

.select-wrapper__option {
  font-size: 14px;
}
</style>