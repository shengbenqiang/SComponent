<template>
  <div
    ref="sliderButton"
    :class="[
      's-slider-button-con'
    ]"
    :style="newPosition"
  >
    <s-popper :content="currentPosition" placement="top">
      <div
        :class="[
          's-slider-button-ball'
        ]"
        @mousedown="handleBallDown"
      ></div>
    </s-popper>
  </div>
</template>

<script>
import { defineComponent, ref, inject, computed, watch } from 'vue'
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
    }
  },
  setup (props, { emit }) {
    const dragging = ref(false)
    const sliderButton = ref(null)
    const shiftX = ref(0)
    const newPosition = ref(null)
    const positionNum = ref(undefined)
    const sliderData = inject('sliderValue', undefined)
    const { mini, max, slider, sliderSize } = sliderData

    const currentPosition = computed(() => {
      return `${((props.modelValue - mini.value) / (max.value - mini.value)) * 100}%`
    })

    const handleBallDown = (event) => {
      dragging.value = true
      event.preventDefault()
      shiftX.value = event.clientX - sliderButton.value.getBoundingClientRect().left
      on('mousemove', handleBallMove)
      on('mouseup', handleBallUp)
    }

    const handleBallMove = (event) => {
      let newLeft = event.clientX - shiftX.value - slider.value.getBoundingClientRect().left
      if (newLeft < 0) {
        newLeft = 0
      }
      const rightEdge = slider.value.offsetWidth - sliderButton.value.offsetWidth
      if (newLeft > rightEdge) {
        newLeft = rightEdge
      }
      positionNum.value = newLeft
      newPosition.value = { left: `${newLeft}px` }
    }

    const handleBallUp = () => {
      off('mousemove', handleBallMove)
      off('mouseup', handleBallUp)
    }

    watch(positionNum, (val) => {
      const percentNum = (val / sliderSize.value) * 100
      emit('update:modelValue', Math.round(percentNum))
    })

    return {
      dragging,
      currentPosition,
      sliderButton,
      newPosition,
      handleBallDown
    }
  }
})
</script>
