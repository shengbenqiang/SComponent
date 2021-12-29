<template>
  <div
    ref="slider"
    :class="[
      's-slider-base-line'
    ]"
  >
    <s-slider-button
      ref="firstButton"
      :model-value="firstValue"
      @update:model-value="updateFirst"
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
    }
  },
  setup (props) {
    const firstButton = ref(null)
    const firstValue = ref(props.modelValue)
    const slider = ref(null)
    const sliderSize = ref(undefined)

    const resetSize = () => {
      if (slider.value) {
        sliderSize.value = slider.value[`client${props.vertical ? 'Height' : 'Width'}`]
      }
    }

    const updateFirst = (val) => {
      firstValue.value = val
    }

    provide('sliderValue', {
      name: 'slider',
      ...toRefs(props),
      slider,
      sliderSize
    })

    watch(() => props.modelValue, (val) => {
      firstValue.value = val
    })

    onMounted(async () => {
      window.addEventListener('resize', resetSize)
      await nextTick()
      resetSize()
    })

    return {
      firstButton,
      firstValue,
      slider,
      updateFirst
    }
  }
})
</script>
