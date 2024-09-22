<script lang="ts" setup>
import {ref, watch} from "vue";
import {defineProps, defineEmits} from "vue";
import ArrowSVG from "~/src/components/elements/SVG/ArrowSVG.vue";

type OptionProperty = {
  value: string | number;
  text: string;
};

type SelectProperty = {
  options: OptionProperty[];
  label: string;
};

const props = defineProps<SelectProperty>();

const inDropdownOpen = ref(false);

const selectedValue = ref<string | number>(props.options.length > 0 ? props.options[0].value : "");

const emit = defineEmits<{
  (e: "update:modelValue", value: string | number): void;
  (e: "change", value: string | number): void;
}>();

function selectOption(value: string | number): void {
  selectedValue.value = value;
  emit("change", value);
  emit("update:modelValue", value);
  inDropdownOpen.value = false;
}

function toggleDropdown(): void {
  inDropdownOpen.value = !inDropdownOpen.value;
}

watch(
    () => props.options,
    (newOptions) => {
      if (selectedValue.value === "" && newOptions.length > 0) {
        selectedValue.value = "";
      }
    }
);
</script>

<template>
  <div class="select-wrapper">
    <label class="select-wrapper__label" for="dynamic-select">{{ props.label }}</label>
    <div class="select-wrapper__custom-select" @click="toggleDropdown">
      <div class="select-wrapper__selected">
        {{
          selectedValue === "" ? "" : props.options.find((option) => option.value === selectedValue)?.text
        }}
      </div>
      <span class="select-wrapper__icon">
        <ArrowSVG/>
      </span>
    </div>
    <ul v-if="inDropdownOpen" class="select-wrapper__dropdown">
      <div
          v-for="option in props.options"
          :key="option?.value"
          class="select-wrapper__option"
          @click="selectOption(option?.value)"
      >
        {{ option?.text }}
      </div>
    </ul>
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
  font-size: 14px;
  font-weight: 400;
  line-height: 21px;
  letter-spacing: 0.03em;
  color: #727783;
}

.select-wrapper__custom-select {
  position: relative;
  background-color: #f5f5f5;
  border: 1px solid rgba(242, 242, 242, 1);
  height: 40px;
  padding: 0 10px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.select-wrapper__selected {
  font-size: 14px;
  font-weight: 400;
  line-height: 21px;
}

.select-wrapper__icon {
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  pointer-events: none;
}

.select-wrapper__dropdown {
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  background-color: #ffffff;
  border: 1px solid #e0e0e0;
  z-index: 10;
  margin: 0;
  padding: 0;
}

.select-wrapper__option {
  padding: 8px 10px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 400;
  line-height: 21px;
  transition: background-color 0.2s;
}

.select-wrapper__option:hover {
  background-color: rgba(0, 0, 0, 0.1);
}
</style>