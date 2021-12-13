<template>
  <div
    :class="[
      's-checkbox-group-base'
    ]"
  >
    <slot />
  </div>
</template>

<script>
import { computed, defineComponent, provide, toRefs } from 'vue'
import './SCheckboxGroup.css'

export default defineComponent({
  name: 'SCheckboxGroup',
  props: {
    size: {
      type: String,
      default: 'large'
    },
    disabled: {
      type: Boolean,
      default: false
    },
    min: {
      type: Number,
      default: null
    },
    max: {
      type: Number,
      default: null
    },
    textColor: {
      type: String,
      default: ''
    },
    fill: {
      type: String,
      default: ''
    },
    modelValue: {
      type: [Object, Array, Boolean],
      default: undefined
    }
  },
  setup (props, { emit }) {
    const modelValues = computed({
      get () {
        return props.modelValue
      },
      set (val) {
        eventSolve(val)
      }
    })
    const eventSolve = (value) => {
      emit('update:modelValue', value)
      emit('change', value)
    }
    provide('checkGroupValue', {
      name: 'checkGroup',
      modelValues,
      ...toRefs(props),
      eventSolve
    })
  }
})
</script>
