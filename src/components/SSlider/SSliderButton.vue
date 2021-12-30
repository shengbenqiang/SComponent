<template>
  <div
    ref="sliderButton"
    :class="[
      's-slider-button-con'
    ]"
    :style="newPosition"
  >
    <div :class="['s-slider-button-popper-con']">
      <div :class="['s-slider-button-popper-room']">
        <s-popper
          :content="currentPosition"
          :visible="showTooltip ? undefined : showTooltip"
          placement="top"
        >
          <div
            id="ball"
            :class="[
              's-slider-button-ball',
              disabled ? 's-slider-button-ball-dis' : 's-slider-button-ball-oth',
              isDrag ? 's-slider-button-ball-drag' : 's-slider-button-ball-un-drag'
            ]"
            @mousedown.stop.prevent="handleBallDown"
          ></div>
        </s-popper>
      </div>
    </div>
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
    const sliderButton = ref(null)
    const shiftX = ref(0)
    const newPosition = ref(null)
    const positionNum = ref(undefined)
    const sliderData = inject('sliderValue', undefined)
    const { mini, max, slider, sliderSize, formatTooltip } = sliderData

    const currentPosition = computed(() => {
      if (formatTooltip.value) {
        return `${Math.floor((((props.modelValue - mini.value) / (max.value - mini.value)) * 100) * 100) / 100}%`
      } else {
        return `${((props.modelValue - mini.value) / (max.value - mini.value)) * 100}%`
      }
    })

    const handleBallDown = (event) => {
      if (props.disabled) { return }
      event.preventDefault()
      isDrag.value = true
      shiftX.value = event.clientX - sliderButton.value.getBoundingClientRect().left
      on('mousemove', handleBallMove)
      on('mouseup', handleBallUp)
    }

    const handleBallMove = (event) => {
      let newLeft = event.clientX - shiftX.value - slider.value.getBoundingClientRect().left
      if (newLeft < 0) {
        newLeft = 0
      }
      if (newLeft > sliderSize.value) {
        newLeft = sliderSize.value
      }
      positionNum.value = (newLeft / sliderSize.value) * 100
      setPosition(positionNum.value)
    }

    const handleBallUp = () => {
      emit('ballMoveEnd')
      isDrag.value = false
      off('mousemove', handleBallMove)
      off('mouseup', handleBallUp)
    }

    const setPosition = (percent) => {
      if (props.vertical) {
        console.log('竖向')
      } else {
        newPosition.value = { left: `${percent}%` }
      }
      emit('update:modelValue', percent)
    }

    return {
      currentPosition,
      sliderButton,
      newPosition,
      isDrag,
      handleBallDown,
      setPosition
    }
  }
})
</script>
