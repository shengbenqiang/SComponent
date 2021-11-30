import { computed, ref, getCurrentInstance } from 'vue'

export const useCheckbox = (props) => {
  const { emit } = getCurrentInstance()
  const isFocus = ref(false)
  const isChecked = ref(props.modelValue)
  function handleCheckFocus () {
    isFocus.value = true
  }
  function handleCheckBlur () {
    if (isChecked.value) return
    isFocus.value = false
  }
  function handleCheckChange () {
    if (props.disabled) return
    if (props.trueLabel || props.falseLabel) {
      handleValue()
    } else {
      eventSolve(!isChecked.value)
      isChecked.value = !isChecked.value
    }
  }
  function handleValue () {
    if (isChecked.value) {
      isChecked.value = false
      eventSolve(props.falseLabel)
    } else {
      isChecked.value = true
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
