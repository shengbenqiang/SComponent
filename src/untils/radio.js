/*
* 封装的 radio 公共方法，包括 props、相关处理方法
* 圣本强 2020.11.26 14:08
* */
// eslint-disable-next-line no-unused-vars
import { computed, ref, inject, SetupContext } from 'vue'

export const radioPropsBase = {
  label: {
    type: [String, Number, Boolean],
    default: ''
  }
}

export const radioProps = {
  ...radioPropsBase,
  modelValue: {
    type: [String, Number, Boolean]
  }
}

export const useRadio = (
  props: {
    modelValue: radioProps['modelValue'],
    label: radioProps['label']
  },
  emit: SetupContext['emit']
) => {
  const refRadio = ref()
  const radioGroup = inject('groupValue', undefined)
  const isGroup = computed(() => !!radioGroup)
  const modelValue = computed({
    get () {
      return isGroup.value ? radioGroup.modelValue : props.modelValue
    },
    set (val) {
      if (isGroup.value) {
        radioGroup.changeValue(val)
      } else {
        emit('update:modelValue', val)
      }
      refRadio.value.checked = (val === props.label)
    }
  })
  const size = computed(() => {
    return isGroup.value ? radioGroup.size : ''
  })
  const disabled = computed(() => {
    return isGroup.value ? radioGroup.disabled : ''
  })
  return {
    refRadio,
    modelValue,
    isGroup,
    radioGroup,
    size,
    disabled
  }
}
