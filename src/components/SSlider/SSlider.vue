<template>
  <div
    :class="[
      's-slider-style-base'
    ]"
  >
    <div
      :class="[
        's-slider-line-base'
      ]"
    >
      <div
        :class="[
          's-slider-icon-div'
        ]"
      >
        <div
          :class="[
            's-slider-icon',
            iconStatus ? 's-slider-icon-enter' : 's-slider-icon-leave',
            iconMouseDown ? 's-slider-mouse-down' : 's-slider-mouse-up'
          ]"
          @mouseenter="handleSliderIconEnter"
          @mouseleave="handleSliderIconLeave"
          @mousedown="handleSliderIconDown"
          @mouseup="handleSliderIconUp"
        ></div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue'
import './SSlider.css'

export default defineComponent({
  name: 'SSlider',
  setup () {
    const sliderInput = ref()
    const iconStatus = ref(false)
    const iconMouseDown = ref(false)

    const handleSliderIconEnter = () => {
      iconStatus.value = true
    }

    const handleSliderIconLeave = () => {
      iconStatus.value = false
    }

    const handleSliderIconDown = () => {
      iconMouseDown.value = true
    }

    const handleSliderIconUp = () => {
      iconMouseDown.value = false
    }

    return {
      sliderInput,
      iconStatus,
      iconMouseDown,
      handleSliderIconEnter,
      handleSliderIconLeave,
      handleSliderIconDown,
      handleSliderIconUp
    }
  }
})
</script>
