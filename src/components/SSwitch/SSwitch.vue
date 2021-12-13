<template>
  <div
    :class="[
      's-switch-con-base'
    ]"
  >
    <span
      v-if="inActiveText && !inlinePrompt"
      :class="[
        's-switch-wai-left',
        checked ? '' : 's-switch-text-color'
      ]"
    >
      {{ inActiveText }}
    </span>
    <span
      v-if="inActiveIcon && !inlinePrompt"
      :class="[
        's-switch-wai-left',
        'fa',
        inActiveIcon,
        checked ? '' : 's-switch-text-color'
      ]"
    ></span>
    <div
      :class="[
      's-switch-base-sty',
      disabled ? 's-switch-dis-cursor' : 's-switch-use-cursor'
    ]"
      :style="
      checked ? `background-color: ${activeColor}` : `background-color: ${inActiveColor}`
    "
      @click.prevent="switchValue"
    >
      <div v-if="disabled" :class="['s-switch-disabled']"></div>
      <i :class="[
        'fa fa-circle',
        's-switch-circle',
        checked ? 's-switch-circle-tran-left' : 's-switch-circle-tran-right'
      ]"></i>
      <span
        v-if="inActiveText && activeText && inlinePrompt && checked"
        :class="[
          's-switch-inner-text',
          's-switch-left-text'
        ]"
      >
        {{ activeText }}
      </span>
      <span
        v-if="inActiveIcon && inlinePrompt && checked"
        :class="[
          's-switch-inner-text',
          's-switch-left-icon',
          'fa',
          inActiveIcon
        ]"
      ></span>
      <input
        ref="switchRef"
        type="checkbox"
          :class="[
          's-switch-input-base'
        ]"
        :disabled="disabled"
        :true-value="activeValue"
        :false-value="inActiveValue"
      >
      <span
        v-if="inActiveText && activeText && inlinePrompt && !checked"
        :class="[
          's-switch-inner-text',
          's-switch-right-text'
        ]"
      >
        {{ inActiveText }}
      </span>
      <span
        v-if="activeIcon && inlinePrompt && !checked"
        :class="[
          's-switch-inner-text',
          's-switch--right-icon',
          'fa',
          activeIcon
        ]"
      ></span>
    </div>
    <span
      v-if="activeText && !inlinePrompt"
      :class="[
        's-switch-wai-right',
        checked ? 's-switch-text-color' : ''
      ]"
    >
      {{ activeText }}
    </span>
    <span
      v-if="activeIcon && !inlinePrompt"
      :class="[
        's-switch-wai-right',
        'fa',
        activeIcon,
        checked ? 's-switch-text-color' : ''
      ]"
    ></span>
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue'
import './SSwitch.css'

export default defineComponent({
  name: 'SSwitch',
  props: {
    activeValue: {
      type: [String, Number, Boolean],
      default: ''
    },
    inActiveValue: {
      type: [String, Number, Boolean],
      default: ''
    },
    disabled: {
      type: Boolean,
      default: false
    },
    modelValue: {
      type: [String, Number, Boolean],
      default: false
    },
    activeColor: {
      type: String,
      default: '#409EFF'
    },
    inActiveColor: {
      type: String,
      default: '#DCDFE6'
    },
    activeText: {
      type: String,
      default: ''
    },
    inActiveText: {
      type: String,
      default: ''
    },
    // 该属性为自定义 外部情况下 选中和未选中情况的颜色
    onTextColor: {
      type: String,
      default: ''
    },
    // 该属性为自定义 外部情况下 选中和未选中情况的颜色
    offTextColor: {
      type: String,
      default: ''
    },
    inlinePrompt: {
      type: Boolean,
      default: false
    },
    inActiveIcon: {
      type: String,
      default: ''
    },
    activeIcon: {
      type: String,
      default: ''
    }
  },
  setup (props, { emit }) {
    const switchRef = ref(null)
    const checked = ref(props.modelValue)
    function switchValue () {
      if (props.disabled) return
      if (props.activeValue || props.inActiveValue) {
        haveValue()
      } else {
        eventSolve(!checked.value)
        checked.value = !checked.value
      }
    }

    function haveValue () {
      if (checked.value) {
        checked.value = false
        eventSolve(props.inActiveValue)
      } else {
        checked.value = true
        eventSolve(props.activeValue)
      }
    }

    function eventSolve (val) {
      emit('update:modelValue', val)
      emit('change', val)
    }

    return {
      switchRef,
      checked,
      switchValue
    }
  }
})
</script>
