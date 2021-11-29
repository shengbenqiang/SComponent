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
    },
    size: {
      type: String,
      default: 'large'
    },
    disabled: {
      type: Boolean,
      default: false
    },
    textColor: {
      type: String,
      default: ''
    },
    fill: {
      type: String,
      default: ''
    }
  },
  setup (props, { emit }) {
    const changeValue = (val) => {
      emit('update:modelValue', val)
      // 暴露 change 事件
      emit('change', val)
    }
    provide('groupValue', reactive({
      ...toRefs(props),
      name: 'SRadioGroup',
      changeValue
    }))
    return {}
  }
})
</script>

<style>
@import "./SRadioGroup.css";
</style>
