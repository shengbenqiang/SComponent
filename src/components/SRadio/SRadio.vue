<template>
  <label
    :class="[
      's-radio-label-base',
      disabled ? 's-radio-label-dis' : 's-radio-label-use',
      border ? border && modelValues === label ? disabled ? 's-radio-un-select-border' : 's-radio-select-border' : 's-radio-un-select-border' : '',
      labelSize
    ]"
  >
    <span
      :class="[
        's-radio-span-con',
        radioSpan,
        modelValues === label ? disabled ? 's-radio-span-dis-checked' : 's-radio-span-checked' : '',
        radioBorder && modelValues !== label ? 's-radio-hover-border' : '',
        disabled ? 's-radio-label-dis' : 's-radio-label-use'
      ]"
      @mouseenter="handleRadioEnter"
      @mouseleave="handleRadioLeave"
    >
      <input
        ref="refRadio"
        :class="[
        's-radio-base-sty',
        radioSize
      ]"
        v-model="modelValues"
        :value="label"
        :name="name"
        :disabled="disabled"
        type="radio"
        @change.stop="handleRadioChange"
      >
    </span>
    <span
      :class="[
        's-radio-text-base',
        's-radio-text-base-color',
        modelValues === label ? 's-radio-text-select' : '',
        disabled ? 's-radio-text-dis' : '',
        radioTextSize
      ]"
    >
      <slot />
    </span>
  </label>
</template>

<script>
import { computed, defineComponent, ref, inject } from 'vue'
import './SRadio.css'

export default defineComponent({
  name: 'SRadio',
  props: {
    size: {
      type: String,
      default: 'large'
    },
    modelValue: {
      type: [String, Number, Boolean],
      default: ''
    },
    label: {
      type: [String, Number, Boolean],
      default: ''
    },
    name: {
      type: String,
      default: ''
    },
    disabled: {
      type: Boolean,
      default: false
    },
    border: {
      type: Boolean,
      default: false
    }
  },
  setup (props, { emit }) {
    const refRadio = ref()
    const radioBorder = ref(false)
    const radioGroupValue = inject('groupValue', undefined)
    const isGroup = computed(() => !!radioGroupValue)
    const modelValues = computed({
      get () {
        return isGroup.value ? radioGroupValue.modelValue : props.modelValue
      },
      set (val) {
        if (isGroup.value) {
          radioGroupValue.changeValue(val)
        } else {
          emit('update:modelValue', val)
        }
        refRadio.value.checked = (val === props.label)
      }
    })
    const radioSize = computed(() => {
      return 's-radio-' + props.size + '-size'
    })
    const radioTextSize = computed(() => {
      return 's-radio-' + props.size + '-text-size'
    })
    const labelSize = computed(() => {
      return 's-label-' + props.size + ''
    })
    const radioSpan = computed(() => {
      return 's-radio-span-' + props.size + '-size'
    })

    function handleRadioChange () {
      emit('change', modelValues.value)
    }
    function handleRadioEnter () {
      radioBorder.value = true
    }
    function handleRadioLeave () {
      radioBorder.value = false
    }

    return {
      radioSize,
      radioTextSize,
      modelValues,
      refRadio,
      labelSize,
      radioBorder,
      radioSpan,
      handleRadioChange,
      handleRadioEnter,
      handleRadioLeave
    }
  }
})
</script>
