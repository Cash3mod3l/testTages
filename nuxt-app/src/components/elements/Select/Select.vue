<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  props: {
    options: {
      type: Array as () => { value: string | number; text: string }[],
      required: true
    },
    label: {
      type: String,
      required: true
    },
    modelValue: {
      type: String as () => string | number,
      required: true
    }
  },
  computed: {
    selectedValue: {
      get(): string | number {
        return this.modelValue;
      },
      set(value: string | number) {
        this.$emit('update:modelValue', value);
      }
    }
  },
  methods: {
    handleChange(): void {
      this.$emit('change', this.selectedValue);
    }
  }
});
</script>

<template>
  <div class="display-grid">
    <label class="margin-bottom-10 margin-left-10" for="dynamic-select">{{ label }}</label>
    <select class="select" v-model="selectedValue" @change="handleChange" id="dynamic-select">
      <option class="text-label" v-for="option in options" :key="option.value" :value="option.value">
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