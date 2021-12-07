<template>
  <label
    :class="[
      size,
      's-checkbox-button-base',
      's-checkbox-right-color',
      isChecked ? 's-checkbox-checked-bg' : 's-checkbox-un-check-bg',
      propsDisabled ? isChecked ? 's-checkbox-disabled' : 's-checkbox-disabled-dis-checked' : ''
    ]"
    @mouseenter="handleCheckBtnEnter"
    @mouseleave="handleCheckBtnLeave"
  >
    <input
      :class="[
        's-input-check-button'
      ]"
      type="checkbox"
      @change.prevent.stop="handleCheckChange"
    >
    <span
      :class="[
        propsSize === 'large' || propsSize === 'medium' ? 's-checkbox-one-size' : 's-checkbox-two-size',
        isChecked ? 's-checkbox-checked-color' : 's-checkbox-un-checked-color',
        propsDisabled ? 's-checkbox-dis-color' : '',
        isEnter ? 's-checkbox-hover-color' : ''
      ]"
    >
      {{ label }}
    </span>
  </label>
</template>

<script>
import './SCheckButton.css'
import { defineComponent } from 'vue'
import { useCheckbox } from '@/untils/checkbox'

export default defineComponent({
  name: 'SCheckButton',
  props: {
    checked: {
      type: Boolean,
      default: false
    },
    trueLabel: {
      type: [String, Number],
      default: ''
    },
    falseLabel: {
      type: [String, Number],
      default: ''
    },
    disabled: {
      type: Boolean,
      default: false
    },
    label: {
      type: [String, Number],
      default: '',
      require: true
    }
  },
  setup (props) {
    const {
      size,
      propsSize,
      isChecked,
      handleCheckChange,
      handleCheckBtnEnter,
      handleCheckBtnLeave,
      isEnter,
      disabled
    } = useCheckbox(props)
    return {
      size,
      propsSize,
      isChecked,
      isEnter,
      propsDisabled: disabled,
      handleCheckChange,
      handleCheckBtnEnter,
      handleCheckBtnLeave
    }
  }
})
</script>
