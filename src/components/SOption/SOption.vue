<template>
  <div
    :class="[
      's-option-base',
      disabled ? 's-option-disabled' : 's-option-use',
      mouseEnter ? 's-option-hover-bg' : '',
      selected ? 's-option-selected' : ''
    ]"
    @mouseenter="handleOptionEnter"
    @mouseleave="handleOptionLeave"
    @click="handleOptionClick('12')"
  >
    <slot>
      <span >{{ currentLabel }}</span>
    </slot>
  </div>
</template>

<script>
import { defineComponent, watch, ref, inject, computed } from 'vue'
import './SOption.css'

export default defineComponent({
  name: 'SOption',
  props: {
    value: {
      type: [String, Number, Boolean],
      default: '',
      require: true
    },
    label: {
      type: [String, Number],
      default: ''
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  setup (props) {
    const currentLabel = ref(undefined)
    const mouseEnter = ref(false)
    const getSelectValue = inject('selectValue', undefined)

    const selected = computed(() => {
      if (getSelectValue.modelValue === props.value) {
        getSelectValue.selectChange(props.label, props.value)
      }
      return getSelectValue.modelValue === props.value
    })

    function handleOptionClick () {
      if (props.disabled) { return }
      getSelectValue.selectChange(props.label, props.value)
    }

    function handleOptionEnter () {
      if (props.disabled) { return }
      mouseEnter.value = true
    }

    function handleOptionLeave () {
      mouseEnter.value = false
    }

    watch(() => props.label, (val) => {
      if (val) {
        currentLabel.value = val
      } else {
        currentLabel.value = props.value
      }
    }, { immediate: true })

    return {
      currentLabel,
      mouseEnter,
      selected,
      handleOptionEnter,
      handleOptionLeave,
      handleOptionClick
    }
  }
})
</script>
