<template>
  <label
    :class="[
      's-checkbox-label-base',
      disabled ? 's-checkbox-dis-cursor' : 's-checkbox-use-cursor',
      border ? 's-checkbox-show-border s-checkbox-border' : '',
      isChecked ? 's-checkbox-sel-border' : '',
      size
    ]"
  >
    <span
      :class="[
        's-checkbox-con'
      ]"
    >
      <span
        :class="[
          's-checkbox-my-sty',
          isFocus ? 's-checkbox-focus' : '',
          isChecked ? 's-checkbox-check fa fa-check' : '',
          disabled ? 's-check-dis-bg' : ''
        ]"
      ></span>
      <input
        :class="[
          's-checkbox-input-base'
        ]"
        :disabled="disabled"
        type="checkbox"
        @focus.prevent.stop="handleCheckFocus"
        @blur.prevent.stop="handleCheckBlur"
        @change.prevent.stop="handleCheckChange"
      >
    </span>
    <span
      v-if="label"
      :class="[
        's-check-label',
        isChecked ? 's-check-sel-color' : 's-check-no-sel-color',
        disabled ? 's-check-label-dis' : ''
      ]"
    >
      {{ label }}
    </span>
  </label>
</template>

<script>
import { defineComponent } from 'vue'
import { useCheckbox } from '@/untils/checkbox'
import './SCheckbox.css'

export default defineComponent({
  name: 'SCheckbox',
  props: {
    modelValue: {
      type: [String, Number, Boolean],
      default: false
    },
    size: {
      type: String,
      default: 'large'
    },
    checked: {
      type: Boolean,
      default: false
    },
    border: {
      type: Boolean,
      default: false
    },
    disabled: {
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
    label: {
      type: String,
      default: ''
    }
  },
  setup (props) {
    return useCheckbox(props)
  }
})
</script>
