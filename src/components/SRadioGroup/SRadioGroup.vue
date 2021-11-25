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
import { defineComponent, provide, reactive, toRefs } from 'vue'

export default defineComponent({
  name: 'SRadioGroup',
  props: {
    modelValue: {
      type: [String, Number, Boolean],
      default: ''
    }
  },
  setup (props) {
    provide('groupValue', reactive({
      ...toRefs(props),
      name: 'SRadioGroup'
    }))
    return {}
  }
})
</script>

<style>
@import "./SRadioGroup.css";
</style>
