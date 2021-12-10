<template>
<!--  <div>-->
<!--    <s-popper-->
<!--      effect="light"-->
<!--    >-->
<!--      <template #content>-->
<!--        这是给options溜的空间-->
<!--      </template>-->
<!--      -->
<!--    </s-popper>-->
<!--  </div>-->
  <div
    :class="[
      's-select-div'
    ]"
    @mouseenter="handleSelectEnter"
    @mouseleave="handleSelectLeave"
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
</template>

<script>
import { ref, computed, defineComponent, watch } from 'vue'
import './SSelect.css'
// import SPopper from '@/components/SPopper/SPopper'

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
  // components: {
  //   SPopper
  // },
  setup (props, { emit }) {
    const selectInput = ref()
    const selectSpan = ref()
    const enterBorder = ref(false)
    const focusBorder = ref(false)
    const iconTransition = ref(false)
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
      emit('blur', e)
    }

    function handleIconClick () {
      focusBorder.value = !focusBorder.value
      iconTransition.value = !iconTransition.value
    }

    function handleSelectClick () {
      iconTransition.value = !iconTransition.value
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

    return {
      sizeSty,
      selectInput,
      enterBorder,
      focusBorder,
      selectSpan,
      iconTransition,
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
