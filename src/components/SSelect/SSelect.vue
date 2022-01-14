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
      strategy="fixed"
      placement="bottom"
    >
      <template #content>
        <div
          v-show="!showWhich"
          :class="[
            's-select-popper-un-date'
          ]"
          @mouseenter="handlePopperEnter"
        >
          暂无数据
        </div>
        <div
          v-show="showWhich"
          :id="showDomId"
          :class="[
            's-select-to-options'
          ]"
          @mouseenter="handlePopperEnter"
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
            's-select-multiple-div',
            sizeSty
          ]"
          @click.stop.prevent="handleMultipleClick"
          @mousedown="handleIconMouseDown"
        >
          <s-check-tag
            v-for="item in multipleData"
            :key="item"
            size="mini"
            type="info"
            effect="plain"
          >
            {{ item }}
          </s-check-tag>
        </div>
        <input
          ref="selectInput"
          v-model="selectValue"
          :class="[
            sizeSty,
            enterBorder ?
            focusBorder ? 's-select-input-focus-border' : 's-select-input-enter-border' :
            focusBorder ? 's-select-input-focus-border' : 's-select-input-common-border',
            's-select-input-sty',
            disabled ? 's-select-input-disabled' : 's-select-input-use',
          ]"
          :readonly="readVisible"
          :placeholder="multipleData.length > 0 ? '' : placeholder"
          :disabled="disabled"
          @focus="handleSelectFocus"
          @blur="handleSelectBlur"
          @click.stop.prevent="handleSelectClick"
        >
        <span
          v-show="showClear"
          :class="[
            's-select-input-icon',
            's-select-clear-color iconfont',
            clearIcon,
            enterBorder ? 's-select-icon-enter' : 's-select-icon-common',
            focusBorder ? 's-select-icon-focus' : '',
            sizeSty,
            disabled ? 's-select-input-disabled' : 's-select-input-use'
          ]"
          @click.stop.prevent="handleClearClick"
        ></span>
        <span
          v-show="!showClear"
          ref="selectSpan"
          :class="[
            's-select-input-icon',
            's-select-fa-color iconfont',
            suffixIcon,
            enterBorder ? 's-select-icon-enter' : 's-select-icon-common',
            focusBorder ? 's-select-icon-focus' : '',
            sizeSty,
            disabled ? 's-select-input-disabled' : 's-select-input-use',
            focusBorder ? 's-select-icon-focus' : '',
          ]"
          :style="{height: changeInputHeight ? changeInputHeight + 'px' : ''}"
          @click.stop.prevent="handleIconClick"
          @mousedown="handleIconMouseDown"
        ></span>
      </div>
    </s-popper>
  </div>
</template>

<script>
import { reactive, provide, ref, computed, defineComponent, watch, onMounted, onUpdated, toRefs, nextTick } from 'vue'
import './SSelect.css'
import '@/assets/icon/iconfont.css'
import SPopper from '@/components/SPopper/SPopper'
import SCheckTag from '@/components/SCheckTag/SCheckTag'
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
      default: 'icon-cuowu'
    },
    suffixIcon: {
      type: String,
      default: 'icon-arrow-down'
    }
  },
  components: {
    SPopper,
    SCheckTag
  },
  setup (props, { emit }) {
    const arrow = ref(null)
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
    const multipleData = reactive([])
    const changeInputHeight = ref(undefined)

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
      emit('blur', e)
      focusBorder.value = false
      iconTransition.value = false
      showPopper.value = false
    }

    function handleIconClick () {
      if (props.disabled) { return }
      if (focusBorder.value) {
        if (showPopper.value) {
          focusBorder.value = !focusBorder.value
          iconTransition.value = !iconTransition.value
          showPopper.value = !showPopper.value
          selectInput.value.blur()
        } else {
          focusBorder.value = true
          iconTransition.value = true
          showPopper.value = true
        }
      } else {
        focusBorder.value = true
        iconTransition.value = true
        showPopper.value = true
        selectInput.value.focus()
      }
    }

    const handleMultipleClick = () => {
      selectInput.value.focus()
      handleSelectClick()
    }

    function handleSelectClick () {
      if (props.disabled) { return }
      iconTransition.value = !iconTransition.value
      showPopper.value = !showPopper.value
    }

    function handleIconMouseDown () {
      event.preventDefault()
    }

    const selectChange = (modelLabel, bindValue) => {
      if (props.multiple) {
        if (multipleData.includes(bindValue)) {
          const tempIndex = multipleData.indexOf(bindValue)
          multipleData.splice(tempIndex, 1)
        } else {
          multipleData.push(bindValue)
        }
        emit('update:modelValue', multipleData)
        emit('change', multipleData)
      } else {
        emit('update:modelValue', bindValue)
        emit('change', bindValue)
        selectValue.value = modelLabel
        iconTransition.value = false
        showPopper.value = false
      }
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

    watch(multipleData, () => {
      const dom = document.getElementsByClassName('s-select-multiple-div')
      nextTick(() => {
        changeInputHeight.value = dom[0].offsetHeight
      })
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
      multipleData,
      selectChange
    }))

    return {
      arrow,
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
      multipleData,
      changeInputHeight,
      handleMultipleClick,
      handleSelectEnter,
      handleSelectLeave,
      handleSelectFocus,
      handleSelectBlur,
      handleIconClick,
      handleClearClick,
      handlePopperEnter,
      handleIconMouseDown,
      handleSelectClick
    }
  }
})
</script>
