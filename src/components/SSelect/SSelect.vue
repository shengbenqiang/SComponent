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
          :id="showDomId"
          :class="[
            's-select-to-options'
          ]"
        >
<!--          <div v-if="showWhich < 2">-->
<!--            暂无数据-->
<!--          </div>-->
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
import { ref, computed, defineComponent, watch, onMounted } from 'vue'
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
      Unfold()
    }

    function handleSelectClick () {
      iconTransition.value = !iconTransition.value
      showPopper.value = !showPopper.value
      Unfold()
    }

    function Unfold () {
      showPopperDom.value = document.getElementById(showDomId)
      const realHeight = showPopperDom.value.getAttribute('real-height')
      if (showPopper.value) {
        showPopperDom.value.style.height = realHeight
      } else {
        showPopperDom.value.style.height = '0px'
      }
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

    onMounted(() => {
      showPopperDom.value = document.getElementById(showDomId)
      showPopperDom.value.setAttribute('real-height', '150px')
      showPopperDom.value.style.height = '0px'
    })

    return {
      sizeSty,
      selectInput,
      enterBorder,
      focusBorder,
      selectSpan,
      iconTransition,
      showPopper,
      showDomId,
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
