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
        >
          暂无数据
        </div>
        <div
          v-show="showWhich"
          :id="showDomId"
          :class="[
            's-select-to-options'
          ]"
        >

          <slot />
        </div>
      </template>
      <div
        :class="[
          's-select-div'
        ]"
      >
        <input
          ref="selectInput"
          v-model="selectValue"
          :class="[
            sizeSty,
            enterBorder ? focusBorder ? 's-select-input-focus-border' : 's-select-input-enter-border' : focusBorder ? 's-select-input-focus-border' : 's-select-input-common-border',
            focusBorder ? 's-select-input-focus-border' : '',
            's-select-input-sty'
          ]"
          :readonly="true"
          :placeholder="placeholder"
          @focus="handleSelectFocus"
          @blur="handleSelectBlur"
          @click="handleSelectClick"
        >
        <span
          ref="selectSpan"
          :class="[
            's-select-input-icon',
            'fa s-select-fa-color fa-angle-down',
            enterBorder ? 's-select-icon-enter' : 's-select-icon-common',
            focusBorder ? 's-select-icon-focus' : '',
            sizeSty
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
      type: [String, Number],
      default: ''
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
    const sizeSty = computed(() => {
      return 's-select-input-' + props.size + '-size'
    })

    function handleSelectEnter () {
      enterBorder.value = true
    }

    function handleSelectLeave () {
      enterBorder.value = false
    }

    function handleSelectFocus (e) {
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
      focusBorder.value = !focusBorder.value
      iconTransition.value = !iconTransition.value
      showPopper.value = !showPopper.value
    }

    function handleSelectClick () {
      iconTransition.value = !iconTransition.value
      showPopper.value = !showPopper.value
    }

    function selectChange (modelLabel) {
      selectValue.value = modelLabel
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
        showPopperDom.value.style.height = '0px'
      }
    })

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

    onMounted(() => {
      showPopperDom.value = document.getElementById(showDomId)
      showPopperDom.value.setAttribute('real-height', ((showPopperDom.value.childNodes.length - 2) * 30) + 'px')
      showPopperDom.value.style.height = '0px'
      isWhich()
    })

    onUpdated(() => {
      isWhich()
    })

    provide('selectValue', reactive({
      name: 'select',
      ...toRefs(props),
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
      handleSelectEnter,
      handleSelectLeave,
      handleSelectFocus,
      handleSelectBlur,
      handleIconClick,
      handleSelectClick
    }
  }
})
</script>
