import { computed, ref, getCurrentInstance, inject } from 'vue'
import { isArr } from '@/untils/common'

export const useCheckbox = (props) => {
  const { emit } = getCurrentInstance()
  const isFocus = ref(false)
  const isEnter = ref(false)
  const checkGroupValue = inject('checkGroupValue', undefined)
  const isCheckGroup = computed(() => checkGroupValue && checkGroupValue.name === 'checkGroup')
  // eslint-disable-next-line vue/return-in-computed-property
  const isChecked = computed(() => {
    if (isCheckGroup.value) {
      const tempValue = checkGroupValue.modelValue
      const { value } = tempValue
      if (isArr(value)) {
        if (props.trueLabel || props.falseLabel) {
          return value.includes(props.trueLabel)
        } else {
          return value.includes(props.label)
        }
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
    if (isChecked.value) { return }
    isFocus.value = false
  }
  function handleCheckChange () {
    if (disabled.value) { return }
    if (isCheckGroup.value) {
      const tempValue = checkGroupValue.modelValue
      const { value } = tempValue
      isEnter.value = false
      if (isArr(value)) {
        if (props.trueLabel || props.falseLabel) {
          if (value.includes(props.trueLabel)) {
            const tempValue = value.filter(item => item !== props.trueLabel)
            tempValue.push(props.falseLabel)
            checkGroupValue.eventSolve(tempValue)
          } else {
            const tempValue = value.filter(item => item !== props.falseLabel)
            tempValue.push(props.trueLabel)
            checkGroupValue.eventSolve(tempValue)
          }
        } else {
          if (value.includes(props.label)) {
            const tempValue = value.filter(item => item !== props.label)
            checkGroupValue.eventSolve(tempValue)
          } else {
            value.push(props.label)
            checkGroupValue.eventSolve(value)
          }
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
  function handleLimit (arr) {
    if (checkGroupValue.min.value || checkGroupValue.max.value) {
      if (arr.length === checkGroupValue.max.value) {
        if (!arr.includes(props.label)) {
          return true
        }
      } else if (arr.length === checkGroupValue.min.value) {
        if (arr.includes(props.label)) {
          return true
        }
      }
    } else {
      if (checkGroupValue.disabled.value) {
        return checkGroupValue.disabled.value
      } else {
        return props.disabled
      }
    }
  }
  function handleCheckBtnEnter () {
    if (isChecked.value || disabled.value) { return }
    isEnter.value = true
  }
  function handleCheckBtnLeave () {
    isEnter.value = false
  }
  const size = computed(() => {
    if (isCheckGroup.value) {
      return 's-checkbox-' + checkGroupValue.size.value + '-size'
    } else {
      return 's-checkbox-' + props.size + '-size'
    }
  })
  const disabled = computed(() => {
    return isCheckGroup.value ? handleLimit(checkGroupValue.modelValue.value) : props.disabled
  })
  const border = computed(() => {
    return props.border
  })

  return {
    propsSize: isCheckGroup.value ? checkGroupValue.size : props.size,
    isFocus,
    size,
    disabled,
    isChecked,
    border,
    isEnter,
    handleCheckFocus,
    handleCheckBlur,
    handleCheckChange,
    handleCheckBtnEnter,
    handleCheckBtnLeave
  }
}
