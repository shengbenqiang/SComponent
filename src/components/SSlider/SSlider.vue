<template>
  <div
    :class="[
      's-slider-style-base'
    ]"
  >
    <div
      ref="slider"
      :class="[
        's-slider-line-base'
      ]"
      @click.stop.prevent="handleSliderLineClick"
    >
      <div :class="['s-slider-have-line']" :style="lineSty"></div>
      <s-slider-button
        ref="firstButton"
        :vertical="vertical"
        :model-value="firstValue"
      />
      <s-slider-button
        v-if="range"
        ref="secondButton"
      />
    </div>
  </div>
</template>

<script>
import { defineComponent, ref, reactive, provide, onMounted, toRefs, nextTick } from 'vue'
import './SSlider.css'
import SSliderButton from './SSliderButton.vue'

export default defineComponent({
  name: 'SSlider',
  props: {
    vertical: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    mini: {
      type: Number,
      default: 0
    },
    max: {
      type: Number,
      default: 100
    },
    range: {
      type: Boolean,
      default: false
    },
    modelValue: {
      type: Number,
      default: 0
    }
  },
  components: {
    SSliderButton
  },
  setup (props) {
    const slider = ref()
    const firstButton = ref(null)
    const lineSty = ref(null)

    const initData = reactive({
      sliderSize: 1,
      firstValue: 0
    })

    const resetSize = () => {
      if (slider.value) {
        initData.sliderSize = slider.value[`client${props.vertical ? 'Height' : 'Width'}`]
      }
    }

    const setPosition = (percent) => {
      if (!props.range) {
        lineSty.value = { width: `${percent}%` }
        firstButton.value.setPosition(percent)
      }
    }

    const handleSliderLineClick = (event) => {
      if (props.disabled) { return }
      resetSize()
      if (props.vertical) {
        const sliderOffsetBottom = slider.value.getBoundingClientRect().bottom
        setPosition(((sliderOffsetBottom - event.clientY) / initData.sliderSize) * 100)
      } else {
        const sliderOffsetLeft = slider.value.getBoundingClientRect().left
        setPosition(((event.clientX - sliderOffsetLeft) / initData.sliderSize) * 100)
      }
    }

    onMounted(async () => {
      window.addEventListener('resize', resetSize)
      await nextTick()
      resetSize()
    })

    const { firstValue, sliderSize } = toRefs(initData)

    provide('sliderValue', {
      name: 'slider',
      ...toRefs(props),
      resetSize,
      sliderSize
    })

    return {
      slider,
      firstButton,
      firstValue,
      lineSty,
      handleSliderLineClick
    }
  }
})
</script>
