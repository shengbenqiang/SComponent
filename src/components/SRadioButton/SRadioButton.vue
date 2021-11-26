<template>
  <div
    :class="[
      's-radio-button-base',
      setDisabled ?
      modelValues === label ? 's-radio-button-select-dis-bg s-radio-button-dis-select-sty' : 's-radio-button-disable s-radio-button-un-select-border' :
      modelValues === label ? 's-radio-button-select-bg s-radio-button-select-border' : 's-radio-button-un-select-border',
      radioBtnSize
    ]"
    @mouseleave="handleRadioBtnLeave"
    @mouseenter="handleRadioBtnEnter"
    @click.stop.prevent="handleChange"
  >
    <input
      ref="refRadio"
      :class="[
        's-radio-button-input-base'
      ]"
      v-model="modelValues"
      :value="label"
      :disabled="setDisabled"
      type="radio"
    >
    <span
      :class="[
        's-radio-button-label-base',
        radioSize === 'large' || radioSize === 'medium' ? 's-radio-button-big-size' : 's-radio-button-small-size',
        setDisabled ?
        modelValues === label ?
        's-radio-button-dis-select-color' :
        's-radio-button-disable-textColor' :
        isEnter && modelValues !== label ?
        's-radio-hover-color' :
        modelValues === label ?
        's-radio-button-select-color' :
        's-radio-button-textColor'
      ]"
    >
      {{label}}
    </span>
  </div>
</template>

<script>
import { computed, defineComponent, inject, ref } from 'vue'

export default defineComponent({
  name: 'SRadioButton',
  props: {
    label: {
      type: [String, Number, Boolean],
      default: ''
    },
    modelValue: {
      type: [String, Number, Boolean],
      default: ''
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
    const refRadio = ref()
    const isEnter = ref(false)
    const groupValue = inject('groupValue', undefined)
    const isGroup = computed(() => !!groupValue)
    const modelValues = computed({
      get () {
        return isGroup.value ? groupValue.modelValue : props.modelValue
      },
      set (val) {
        if (isGroup.value) {
          groupValue.changeValue(val)
        } else {
          emit('update:modelValue', val)
        }
        refRadio.value.checked = (val === props.label)
      }
    })
    const setDisabled = computed({
      get () {
        return isGroup.value ? groupValue.disabled ? groupValue.disabled : props.disabled : false
      }
    })
    const radioBtnSize = computed(() => {
      return isGroup.value ? 's-radio-button-' + groupValue.size + '-size' : ''
    })
    const radioSize = computed(() => {
      return isGroup.value ? groupValue.size : ''
    })

    function handleRadioBtnLeave () {
      isEnter.value = false
    }

    function handleRadioBtnEnter () {
      isEnter.value = true
    }

    function handleChange () {
      if (setDisabled.value) return
      modelValues.value = props.label
    }

    return {
      radioBtnSize,
      radioSize,
      isEnter,
      modelValues,
      refRadio,
      setDisabled,
      handleRadioBtnLeave,
      handleRadioBtnEnter,
      handleChange
    }
  }
})
</script>

<style>
@import "./SRadioButton.css";
</style>
