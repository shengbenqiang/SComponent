<template>
  <div
    :class="[
      's-slider-icon-div',
      hovering ? 'hover' : '',
      dragging ? 'dragging' : ''
    ]"
    :style="locate"
  >
    <div
      class="s-slider-icon"
      :class="[
        hovering ? 's-slider-enter-button' : 's-slider-common-button'
      ]"
      @mouseenter="handleSliderIconEnter"
      @mouseleave="handleSliderIconLeave"
      @mousedown="handleSliderIconDown"
      @mouseup="handleSliderIconUp"
    ></div>
  </div>
</template>

<script>
import { defineComponent, reactive, toRefs, inject, ref, computed } from 'vue'
import './SSliderButton.css'
import { on, off } from '@/untils/common'

export default defineComponent({
  name: 'SSliderButton',
  props: {
    modelValue: {
      type: Number,
      default: 0
    },
    vertical: {
      type: Boolean,
      default: false
    }
  },
  setup (props) {
    const locate = ref(null)

    const sliderValue = inject('sliderValue', undefined)

    const {
      disabled,
      resetSize,
      sliderSize,
      mini,
      max
    } = sliderValue

    const initData = reactive({
      hovering: false,
      dragging: false,
      startX: 0,
      currentX: 0,
      startY: 0,
      currentY: 0,
      startPosition: 0,
      newPosition: 0
    })

    const { hovering, dragging } = toRefs(initData)

    const currentPosition = computed(() => {
      return `${((props.modelValue - mini.value) / (max.value - mini.value)) * 100}%`
    })

    const handleSliderIconEnter = () => {
      if (disabled.value) { return }
      hovering.value = true
    }

    const handleSliderIconLeave = () => {
      if (disabled.value) { return }
      hovering.value = false
    }

    const handleSliderIconDown = (event) => {
      if (disabled.value) { return }
      event.preventDefault()
      iconDragStart(event)
      on('mousemove', iconDragging)
      on('mouseup', iconDragEnd)
    }

    const handleSliderIconUp = () => {
      if (disabled.value) { return }
      dragging.value = !dragging.value
    }

    const setPosition = (percent) => {
      if (percent === null || isNaN(percent)) { return }
      if (props.vertical) {
        locate.value = { bottom: `${percent}%` }
      } else {
        locate.value = { left: `${percent}%` }
      }
    }

    const iconDragStart = (event) => {
      initData.dragging = true
      const { clientX, clientY } = getClientXY(event)
      if (props.vertical) {
        initData.startY = clientY
      } else {
        initData.startX = clientX
      }
      initData.startPosition = parseFloat(currentPosition.value)
      initData.newPosition = initData.startPosition
    }

    const getClientXY = (event) => {
      let clientX
      let clientY
      if (event.type.startsWith('touch')) {
        console.log(event)
      } else {
        clientY = event.clientY
        clientX = event.clientX
      }

      return { clientX, clientY }
    }

    const iconDragging = (event) => {
      if (initData.dragging) {
        resetSize()
        let diff
        const { clientX, clientY } = getClientXY(event)
        if (props.vertical) {
          initData.currentY = clientY
          diff = ((initData.startY - initData.currentY) / sliderSize.value) * 100
        } else {
          initData.currentX = clientX
          diff = ((initData.currentX - initData.startX) / sliderSize.valueOf()) * 100
        }
        initData.newPosition = initData.startPosition + diff
        setPosition(initData.newPosition)
      }
    }

    const iconDragEnd = () => {
      initData.dragging = false
      off('mousemove', iconDragging)
      off('mouseup', iconDragEnd)
    }

    return {
      hovering,
      dragging,
      locate,
      handleSliderIconEnter,
      handleSliderIconLeave,
      handleSliderIconDown,
      handleSliderIconUp,
      setPosition
    }
  }
})
</script>
