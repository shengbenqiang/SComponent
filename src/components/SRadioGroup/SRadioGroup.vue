<template>
  <div
    :class="[
      's-radio-group-base'
    ]"
  >
    <slot />
  </div>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'SRadioGroup',
  props: {
    modelValue: {
      type: [String, Number, Boolean],
      default: ''
    }
  }
})
</script>

<style>
@import "./SRadioGroup.css";
</style>
