<template>
  <div
    ref="sliderButton"
    class="s-slider-icon"
    :class="[
      hovering ? 's-slider-enter-button' : 's-slider-common-button',
      // hovering ? dragging ? '' : 'hover' : '',
      dragging ? 'dragging' : 'hover'
    ]"
    :style="locate"
    @mouseenter="handleSliderIconEnter"
    @mouseleave="handleSliderIconLeave"
    @mousedown="handleSliderIconDown"
    @mouseup="handleSliderIconUp"
  ></div>
</template>

<script>
import { defineComponent, reactive, inject, ref, computed } from 'vue'
import './SSliderButton.css'
import { on, off } from '@/untils/common'
// import SPopper from '@/components/SPopper/SPopper'

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
  components: {
    // SPopper
  },
  setup (props, { emit }) {
    const locate = ref(null)
    const sliderButton = ref(null)
    const hovering = ref(false)
    const dragging = ref(false)
    const startX = ref(0)
    const currentX = ref(0)
    const startPosition = ref(0)
    const newPosition = ref(0)

    const {
      resetSize,
      disabled,
      sliderSize,
      mini,
      max
    } = inject('sliderValue', undefined)

    const initData = reactive({
      startY: 0,
      currentY: 0
    })

    const currentPosition = computed(() => {
      return `${parseInt(((props.modelValue - mini.value) / (max.value - mini.value)) * 100)}%`
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
      dragging.value = true
      iconDragStart(event)
      on('mousemove', iconDragging)
      on('mouseup', iconDragEnd)
    }

    const handleSliderIconUp = () => {
      if (disabled.value) { return }
      dragging.value = false
    }

    const setPosition = async (percent) => {
      if (percent === null || isNaN(percent) || percent < mini.value || percent > max.value) { return }
      if (props.vertical) {
        locate.value = { bottom: `${percent}%` }
      } else {
        locate.value = { left: `${percent}%` }
      }
      emitEvent(percent)
    }

    const iconDragStart = (event) => {
      const { clientX, clientY } = getClientXY(event)
      if (props.vertical) {
        // 暂时不进行处理的逻辑
        initData.startY = clientY
      } else {
        startX.value = clientX
      }
      startPosition.value = parseFloat(currentPosition.value)
      newPosition.value = startPosition.value
    }

    const iconDragging = (event) => {
      if (dragging.value) {
        resetSize()
        let diff
        const { clientX, clientY, shiftX } = getClientXY(event)
        if (props.vertical) {
          // 暂时不进行处理的逻辑
          initData.currentY = clientY
          diff = ((initData.startY - initData.currentY) / sliderSize.value) * 100
        } else {
          // 处理位置的核心currentX.value - startX.value
          currentX.value = clientX
          diff = ((currentX.value - startX.value) / sliderSize.value) * 100 - shiftX
        }
        newPosition.value = startPosition.value + diff
        setPosition(newPosition.value)
      }
    }

    const iconDragEnd = () => {
      // dragging.value = false
      off('mousemove', iconDragging)
      off('mouseup', iconDragEnd)
      emitEvent(newPosition.value)
    }

    const getClientXY = (event) => {
      let clientX
      let clientY
      const shiftX = ((event.clientX - sliderButton.value.getBoundingClientRect().left) / sliderSize.value) * 100
      const shiftY = event.clientY - sliderButton.value.getBoundingClientRect().top
      if (event.type.startsWith('touch')) {
        console.log(event)
      } else {
        clientY = event.clientY
        clientX = event.clientX
      }

      return { clientX, clientY, shiftX, shiftY }
    }

    const emitEvent = (position) => {
      emit('update:modelValue', position)
    }

    return {
      hovering,
      dragging,
      locate,
      currentPosition,
      sliderButton,
      handleSliderIconEnter,
      handleSliderIconLeave,
      handleSliderIconDown,
      handleSliderIconUp,
      setPosition
    }
  }
})
</script>
