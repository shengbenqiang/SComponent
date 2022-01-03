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
import { on, off, toIntNum, IntegerForensics } from '@/untils/common'

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
    // const positionNum = ref(undefined)
    const sliderData = inject('sliderValue', undefined)
    const { mini, max, slider, sliderSize, formatTooltip, step } = sliderData

    const currentPosition = computed(() => {
      if (formatTooltip.value) {
        return `${Math.floor((((props.modelValue - mini.value) / (max.value - mini.value)) * 100) * 100) / 100}`
      } else {
        return `${Math.round((props.modelValue / 100) * max.value)}`
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
      let percentNum
      const newLeft = event.clientX - shiftX.value - (slider.value.getBoundingClientRect().left / 2)
      if (newLeft < 0) {
        return setPosition(0)
      }
      if (newLeft > sliderSize.value) {
        // newLeft = sliderSize.value
        return setPosition(100)
      }
      const stepTake = toIntNum((max.value - mini.value) / sliderSize.value, 2)
      percentNum = toIntNum(newLeft * stepTake / (max.value - mini.value), 2) * 100
      if (step.value !== 1) {
        const tempNum = Math.round(toIntNum(newLeft * stepTake / (max.value - mini.value), 2) * (max.value - mini.value))
        if (!Number.isInteger(tempNum / step.value)) {
          const relate = IntegerForensics(tempNum, step.value)
          percentNum = Math.round(toIntNum(relate / (max.value - mini.value), 2) * 100)
        }
      }
      if (Number.isInteger((Math.round((percentNum / 100) * max.value)) / step.value)) {
        setPosition(percentNum)
      }
    }

    const handleBallUp = () => {
      emit('ballMoveEnd')
      isDrag.value = false
      off('mousemove', handleBallMove)
      off('mouseup', handleBallUp)
    }

    const setPosition = (percent) => {
      console.log(2)
      if (props.vertical) {
        console.log('竖向')
      } else {
        if (percent >= 100) {
          newPosition.value = { left: '100%' }
        } else if (percent <= 0) {
          newPosition.value = { left: '0%' }
        } else {
          newPosition.value = { left: `${percent}%` }
        }
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
