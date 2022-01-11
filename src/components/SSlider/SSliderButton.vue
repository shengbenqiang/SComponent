<template>
  <div
    ref="sliderButton"
    class="s-slider-button-con"
    :class="{
      isDrag: 's-slider-button-ball-drag',

    }"
    :style="wrapperStyle"
    @mousedown="handleBallDown"
    @mouseenter="handleBallEnter"
    @mouseleave="handleBallLeave"
  >
    <s-popper
      :visible="showTooltip ? undefined : showTooltip"
      placement="top"
    >
      <template #content>
        <span class="s-slider-button-span">{{ formatValue }}</span>
      </template>
      <div
        id="ball"
        :class="[
          's-slider-button-ball',
          disabled ? 's-slider-button-ball-dis' : 's-slider-button-ball-oth',
          isDrag ? 's-slider-button-ball-drag' : 's-slider-button-ball-un-drag'
        ]"
      ></div>
    </s-popper>
  </div>
</template>

<script>
import { defineComponent, ref, inject, computed } from 'vue'
import './SSliderButton.css'
import SPopper from '@/components/SPopper/SPopper'
import { on, off } from '@/untils/common'

export default defineComponent({
  name: 'SSliderButton',
  components: {
    SPopper
  },
  props: {
    modelValue: {
      type: Number,
      default: 0
    },
    vertical: {
      type: Boolean,
      default: false
    },
    showTooltip: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  setup (props, { emit }) {
    const isDrag = ref(false)
    const hover = ref(false)
    // 拖拽相关数据
    const startX = ref(undefined)
    const startY = ref(undefined)
    const sliderButton = ref(null)
    const newPosition = ref(undefined)
    const startPosition = ref(undefined)
    const currentY = ref(undefined)
    const currentX = ref(undefined)
    // 拖拽相关数据
    const sliderData = inject('sliderValue', undefined)
    const { mini, max, resetSize, sliderSize, step, precision } = sliderData

    const currentPosition = computed(() => {
      return `${
        ((props.modelValue - mini.value) / (max.value - mini.value)) * 100
      }%`
    })

    const wrapperStyle = computed(() => {
      return (
        props.vertical
          ? { bottom: currentPosition.value }
          : { left: currentPosition.value }
      )
    })

    const formatValue = computed(() => {
      return props.modelValue
    })

    const handleBallEnter = () => {
      hover.value = true
    }

    const handleBallLeave = () => {
      hover.value = false
    }

    const handleBallDown = (event) => {
      if (props.disabled) { return }
      event.preventDefault()
      onDragStart(event)
      on('mousemove', handleBallMove)
      on('mouseup', handleBallUp)
    }

    const onDragStart = (event) => {
      isDrag.value = true
      hover.value = false
      const { clientX, clientY } = getClientXY(event)
      if (props.vertical) {
        startY.value = clientY
      } else {
        startX.value = clientX
      }
      startPosition.value = parseFloat(currentPosition.value)
      newPosition.value = startPosition.value
    }

    const handleBallMove = (event) => {
      if (isDrag.value) {
        resetSize()
        let diff
        const { clientX, clientY } = getClientXY(event)
        if (props.vertical) {
          currentY.value = clientY
          diff = ((startPosition.value - currentY.value) / sliderSize.value) * 100
        } else {
          currentX.value = clientX
          diff = ((currentX.value - startPosition.value) / sliderSize.value) * 100
        }
        newPosition.value = startPosition.value + diff
        setPosition(newPosition.value)
      }
    }

    const handleBallUp = () => {
      emit('ballMoveEnd')
      isDrag.value = false
      hover.value = true
      off('mousemove', handleBallMove)
      off('mouseup', handleBallUp)
    }

    const setPosition = (percent) => {
      if (percent === null || isNaN(percent)) { return }
      if (percent < 0) {
        newPosition.value = 0
      } else if (percent > 100) {
        newPosition.value = 100
      }
      const lengthPerStep = 100 / ((max.value - mini.value) / step.value)
      const steps = Math.round(percent / lengthPerStep)
      let value = steps * lengthPerStep * (max.value - mini.value) * 0.01 + mini.value
      value = parseFloat(value.toFixed(precision.value))
      emit('update:modelValue', value)
    }

    const getClientXY = (event) => {
      const clientX = event.clientX
      const clientY = event.clientY

      return {
        clientX,
        clientY
      }
    }

    return {
      isDrag,
      hover,
      formatValue,
      newPosition,
      sliderButton,
      wrapperStyle,
      currentPosition,
      setPosition,
      handleBallDown,
      handleBallEnter,
      handleBallLeave
    }
  }
})
</script>
