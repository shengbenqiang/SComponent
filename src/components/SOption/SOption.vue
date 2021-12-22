<template>
  <div
    v-if="!isFilter"
    :class="[
      's-option-base',
      disabled || optionDisabled ? 's-option-disabled' : 's-option-use',
      mouseEnter ? 's-option-hover-bg' : '',
      selected ? 's-option-selected' : ''
    ]"
    @mouseenter="handleOptionEnter"
    @mouseleave="handleOptionLeave"
    @click.stop.prevent="handleOptionClick"
  >
    <slot>
      <span >{{ currentLabel }}</span>
    </slot>
  </div>
  <div
    v-if="isFilter && filterShow"
    :class="[
      's-option-base',
      disabled || optionDisabled ? 's-option-disabled' : 's-option-use',
      mouseEnter ? 's-option-hover-bg' : '',
      selected ? 's-option-selected' : ''
    ]"
    @mouseenter="handleOptionEnter"
    @mouseleave="handleOptionLeave"
    @click="handleOptionClick"
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
    const getOptionGroupValue = inject('optionGroupValue', undefined)
    const isOption = computed(() => getOptionGroupValue && getOptionGroupValue.name === 'optionGroup')
    const filterShow = ref(false)
    const isFilter = getSelectValue.filterable
    // eslint-disable-next-line vue/return-in-computed-property
    const optionDisabled = computed(() => {
      if (isOption.value) {
        return getOptionGroupValue.disabled
      }
    })

    const selected = computed(() => {
      return getSelectValue.modelValue === props.value
    })

    function handleDefault () {
      if (getSelectValue.modelValue === props.value) {
        getSelectValue.selectChange(props.label, props.value)
      }
    }

    function handleOptionClick () {
      if (props.disabled || optionDisabled.value) { return }
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

    watch(() => getSelectValue.selectInput, (val) => {
      if (!getSelectValue.filterable) { return }
      if (val) {
        filterShow.value = props.label.indexOf(val.toString()) !== -1
      } else if (!val) {
        filterShow.value = true
      }
    }, { immediate: true })

    handleDefault()

    return {
      currentLabel,
      mouseEnter,
      selected,
      optionDisabled,
      isFilter,
      filterShow,
      handleOptionEnter,
      handleOptionLeave,
      handleOptionClick
    }
  }
})
</script>
