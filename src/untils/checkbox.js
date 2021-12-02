import { computed, ref, getCurrentInstance, inject } from 'vue'
import { isObj, isArr } from '@/untils/common'

export const useCheckbox = (props) => {
  const { emit } = getCurrentInstance()
  const isFocus = ref(false)
  const checkGroupValue = inject('checkGroupValue', undefined)
  const isCheckGroup = computed(() => checkGroupValue && checkGroupValue.name === 'checkGroup')
  // eslint-disable-next-line vue/return-in-computed-property
  const isChecked = computed(() => {
    if (isCheckGroup.value) {
      const tempValue = checkGroupValue.modelValue
      const { value } = tempValue
      if (isObj(value)) {
        return null
      } else if (isArr(value)) {
        return value.includes(props.label)
      }
    } else {
      if (props.trueLabel || props.falseLabel) {
        return props.modelValue === props.trueLabel
      } else {
        return props.modelValue
      }
    }
  })
  function handleCheckFocus () {
    isFocus.value = true
  }
  function handleCheckBlur () {
    if (isChecked.value) return
    isFocus.value = false
  }
  function handleCheckChange () {
    if (props.disabled) return
    if (isCheckGroup.value) {
      const tempValue = checkGroupValue.modelValue
      const { value } = tempValue
      if (isArr(value)) {
        if (value.includes(props.label)) {
          const tempValue = value.filter(item => item !== props.label)
          checkGroupValue.eventSolve(tempValue)
        } else {
          value.push(props.label)
          checkGroupValue.eventSolve(value)
        }
      }
    } else {
      if (props.trueLabel || props.falseLabel) {
        handleValue()
      } else {
        eventSolve(!isChecked.value)
      }
    }
  }
  function handleValue () {
    if (isChecked.value) {
      eventSolve(props.falseLabel)
    } else {
      eventSolve(props.trueLabel)
    }
  }
  function eventSolve (val) {
    emit('update:modelValue', val)
    emit('change', val)
  }
  const size = computed(() => {
    return 's-checkbox-' + props.size + '-size'
  })
  const disabled = computed(() => {
    return props.disabled
  })
  const border = computed(() => {
    return props.border
  })

  return {
    isFocus,
    size,
    disabled,
    isChecked,
    border,
    handleCheckFocus,
    handleCheckBlur,
    handleCheckChange
  }
}
