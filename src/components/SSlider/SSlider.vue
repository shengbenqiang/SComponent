<template>
  <div
    ref="slider"
    :class="[
      's-slider-base-line'
    ]"
    @click="lineClick"
  >
    <div
      :class="[
        's-slider-select-line',
        disabled ? 's-slider-select-dis' : 's-slider-select-use'
      ]"
      :style="selectLine"
    ></div>
    <s-slider-button
      ref="firstButton"
      :model-value="firstValue"
      :vertical="vertical"
      :show-tooltip="showTooltip"
      :disabled="disabled"
      @update:model-value="updateFirst"
      @ballMoveEnd="handleBallMoveEnd"
    />
  </div>
</template>

<script>
import { defineComponent, ref, provide, toRefs, watch, onMounted, nextTick } from 'vue'
import './SSlider.css'
import SSliderButton from './SSliderButton'

export default defineComponent({
  name: 'SSlider',
  components: {
    SSliderButton
  },
  props: {
    modelValue: {
      type: Number,
      default: 0
    },
    mini: {
      type: Number,
      default: 0
    },
    max: {
      type: Number,
      default: 100
    },
    vertical: {
      type: Boolean,
      default: false
    },
    showTooltip: {
      type: Boolean,
      default: true
    },
    formatTooltip: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    step: {
      type: Number,
      default: 1
    }
  },
  setup (props, { emit }) {
    const firstBallBrag = ref(false)
    const firstButton = ref(null)
    const firstValue = ref(props.modelValue)
    const slider = ref(null)
    const selectLine = ref(null)
    const sliderSize = ref(undefined)

    const resetSize = () => {
      if (slider.value) {
        sliderSize.value = slider.value[`client${props.vertical ? 'Height' : 'Width'}`]
      }
    }

    const updateFirst = (val) => {
      if (props.formatTooltip) {
        firstValue.value = Math.floor(val * 100) / 100
      } else {
        firstValue.value = val
      }
    }

    const lineClick = (event) => {
      if (firstBallBrag.value) {
        firstBallBrag.value = false
        return
      }
      if (props.disabled) { return }
      if (props.vertical) {
        const sliderOffsetBottom = slider.value.value.getBoundingClientRect().bottom
        console.log(sliderOffsetBottom)
      } else {
        const sliderOffsetLeft = slider.value.getBoundingClientRect().left
        if (props.formatTooltip) {
          firstButton.value.setPosition(Math.floor((((event.clientX - sliderOffsetLeft) / sliderSize.value) * 100) * 100) / 100)
        } else {
          firstButton.value.setPosition(Math.round(((event.clientX - sliderOffsetLeft) / sliderSize.value) * 100))
        }
      }
    }

    const handleBallMoveEnd = () => {
      firstBallBrag.value = true
    }

    provide('sliderValue', {
      name: 'slider',
      ...toRefs(props),
      slider,
      sliderSize
    })

    watch(firstValue, (val) => {
      selectLine.value = { width: `${val}%` }
      emit('update:modelValue', val)
    })

    onMounted(async () => {
      window.addEventListener('resize', resetSize)
      await nextTick()
      resetSize()
      firstButton.value.setPosition(props.modelValue)
      selectLine.value = { width: `${props.modelValue}%` }
    })

    return {
      firstButton,
      firstValue,
      slider,
      selectLine,
      updateFirst,
      lineClick,
      handleBallMoveEnd
    }
  }
})
</script>
