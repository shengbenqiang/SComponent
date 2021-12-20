<template>
  <div
    :class="[
      's-select-div'
    ]"
    @mouseenter="handleSelectEnter"
    @mouseleave="handleSelectLeave"
  >
    <s-popper
      effect="light"
      :visible="showPopper"
      placement="bottom"
    >
      <template #content>
        <div
          v-show="!showWhich"
          :class="[
            's-select-popper-un-date'
          ]"
          @mouseenter.stop.prevent="handlePopperEnter"
        >
          暂无数据
        </div>
        <div
          v-show="showWhich"
          :id="showDomId"
          :class="[
            's-select-to-options'
          ]"
          @mouseenter.stop.prevent="handlePopperEnter"
        >
          <slot />
        </div>
      </template>
      <div
        :class="[
          's-select-div',
          multiple ? 's-select-multiple' : ''
        ]"
      >
        <div
          v-if="multiple"
          :class="[
            's-select-multiple-div'
          ]"
        ></div>
        <input
          ref="selectInput"
          v-model="selectValue"
          :class="[
            sizeSty,
            enterBorder ? focusBorder ? 's-select-input-focus-border' : 's-select-input-enter-border' : focusBorder ? 's-select-input-focus-border' : 's-select-input-common-border',
            focusBorder ? 's-select-input-focus-border' : '',
            's-select-input-sty',
            disabled ? 's-select-input-disabled' : 's-select-input-use'
          ]"
          :readonly="readVisible"
          :placeholder="placeholder"
          :disabled="disabled"
          @focus="handleSelectFocus"
          @blur="handleSelectBlur"
          @click="handleSelectClick"
        >
        <span
          v-show="showClear"
          :class="[
            's-select-input-icon',
            'fa s-select-clear-color',
            clearIcon,
            enterBorder ? 's-select-icon-enter' : 's-select-icon-common',
            focusBorder ? 's-select-icon-focus' : '',
            sizeSty,
            disabled ? 's-select-input-disabled' : 's-select-input-use'
          ]"
          @click="handleClearClick"
        ></span>
        <span
          v-show="!showClear"
          ref="selectSpan"
          :class="[
            's-select-input-icon',
            'fa s-select-fa-color',
            suffixIcon,
            enterBorder ? 's-select-icon-enter' : 's-select-icon-common',
            focusBorder ? 's-select-icon-focus' : '',
            sizeSty,
            disabled ? 's-select-input-disabled' : 's-select-input-use'
          ]"
          @click="handleIconClick"
        ></span>
      </div>
    </s-popper>
  </div>
</template>

<script>
import { reactive, provide, ref, computed, defineComponent, watch, onMounted, onUpdated, toRefs } from 'vue'
import './SSelect.css'
import SPopper from '@/components/SPopper/SPopper'
import { GenNonDuplicateID } from '@/untils/common'

export default defineComponent({
  name: 'SSelect',
  props: {
    size: {
      type: String,
      default: 'large'
    },
    placeholder: {
      type: String,
      default: 'Select'
    },
    modelValue: {
      type: [String, Number, Array],
      default: ''
    },
    disabled: {
      type: Boolean,
      default: false
    },
    clearable: {
      type: Boolean,
      default: false
    },
    // 是否支持多选 封装完 tag 标签后完善
    multiple: {
      type: Boolean,
      default: false
    },
    autocomplete: {
      type: String,
      default: 'off'
    },
    filterable: {
      type: Boolean,
      default: false
    },
    clearIcon: {
      type: String,
      default: 'fa-times'
    },
    suffixIcon: {
      type: String,
      default: 'fa-angle-down'
    }
  },
  components: {
    SPopper
  },
  setup (props, { emit }) {
    const selectInput = ref()
    const selectSpan = ref()
    const enterBorder = ref(false)
    const focusBorder = ref(false)
    const iconTransition = ref(false)
    const showPopper = ref(false)
    const showPopperDom = ref(null)
    const showDomId = GenNonDuplicateID()
    const showWhich = ref(undefined)
    const selectValue = ref(undefined)
    const showClear = ref(false)
    const readVisible = computed(() => {
      return !props.filterable
    })
    const sizeSty = computed(() => {
      return 's-select-input-' + props.size + '-size'
    })

    function handleSelectEnter () {
      if (props.disabled) { return }
      if (props.clearable && selectValue.value) {
        showClear.value = true
      }
      enterBorder.value = true
    }

    function handleSelectLeave () {
      if (props.clearable) {
        showClear.value = false
      }
      enterBorder.value = false
    }

    function handleSelectFocus (e) {
      if (props.disabled) {
        focusBorder.value = false
        return
      }
      focusBorder.value = true
      emit('focus', e)
    }

    function handleSelectBlur (e) {
      focusBorder.value = false
      iconTransition.value = false
      showPopper.value = false
      emit('blur', e)
    }

    function handleIconClick () {
      if (props.disabled) { return }
      focusBorder.value = !focusBorder.value
      iconTransition.value = !iconTransition.value
      showPopper.value = !showPopper.value
    }

    function handleSelectClick () {
      if (props.disabled) { return }
      iconTransition.value = !iconTransition.value
      showPopper.value = !showPopper.value
    }

    function selectChange (modelLabel, bindValue) {
      emit('update:modelValue', bindValue)
      emit('change', bindValue)
      selectValue.value = modelLabel
    }

    function isWhich () {
      showPopperDom.value.childNodes.forEach(itemNode => {
        if (itemNode.nodeType !== 8 && showPopperDom.value.childNodes.length > 2) {
          showWhich.value = true
          return showWhich.value
        } else {
          showWhich.value = false
        }
      })
    }

    function handleClearClick () {
      selectValue.value = ''
      showClear.value = false
      emit('clear')
    }

    function handlePopperEnter () {
      showClear.value = false
    }

    watch(iconTransition, (val) => {
      if (val) {
        selectSpan.value.setAttribute('data-top', 'top')
        selectSpan.value.setAttribute('data-bottom', '')
      } else {
        selectSpan.value.setAttribute('data-top', '')
        selectSpan.value.setAttribute('data-bottom', 'bottom')
      }
    })

    watch(showPopper, (val) => {
      showPopperDom.value = document.getElementById(showDomId)
      const realHeight = showPopperDom.value.getAttribute('real-height')
      if (val) {
        showPopperDom.value.style.height = realHeight
      } else {
        setTimeout(() => {
          showPopperDom.value.style.height = '0px'
        }, 100)
      }
      emit('visibleChange', val)
    })

    onMounted(() => {
      showPopperDom.value = document.getElementById(showDomId)
      showPopperDom.value.setAttribute('real-height', ((showPopperDom.value.childNodes.length - 2) * 35) + 'px')
      showPopperDom.value.style.height = '0px'
      isWhich()
    })

    onUpdated(() => {
      isWhich()
    })

    provide('selectValue', reactive({
      name: 'select',
      ...toRefs(props),
      selectInput: selectValue,
      selectChange
    }))

    return {
      sizeSty,
      selectInput,
      enterBorder,
      focusBorder,
      selectSpan,
      iconTransition,
      showPopper,
      showDomId,
      showWhich,
      selectValue,
      showClear,
      readVisible,
      handleSelectEnter,
      handleSelectLeave,
      handleSelectFocus,
      handleSelectBlur,
      handleIconClick,
      handleSelectClick,
      handleClearClick,
      handlePopperEnter
    }
  }
})
</script>
