<template>
  <div
    :class="[
      's-slider-room'
    ]"
  >
    <div
      ref="slider"
      :class="[
      's-slider-base-line',
      showInput ? 's-slider-input-width' : 's-slider-default-width'
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
      <div
        v-if="showStops"
        :class="[
        's-slider-show-stops-div'
      ]"
      >
        <div
          :class="[
          's-slider-stop'
        ]"
          v-for="itemStop in stopsArr"
          :key="itemStop"
          :style="{ left: itemStop }"
        ></div>
      </div>
    </div>
    <div
      v-if="showInput"
      :class="[
        's-slider-input-room'
      ]"
    >
      <s-input-number
        :size="inputSize"
        :max="max"
        :min="mini"
        :step="step"
        v-model="inputNum"
      />
    </div>
  </div>
</template>

<script>
import { defineComponent, ref, provide, toRefs, watch, onMounted, nextTick } from 'vue'
import './SSlider.css'
import SSliderButton from './SSliderButton'
import SInputNumber from '@/components/SInputNumber/SInputNumber'
import { IntegerForensics, toIntNum } from '@/untils/common'

export default defineComponent({
  name: 'SSlider',
  components: {
    SSliderButton,
    SInputNumber
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
    },
    showStops: {
      type: Boolean,
      default: false
    },
    showInput: {
      type: Boolean,
      default: false
    },
    inputSize: {
      type: String,
      default: 'medium'
    }
  },
  setup (props, { emit }) {
    const firstBallBrag = ref(false)
    const firstButton = ref(null)
    const firstValue = ref(props.modelValue)
    const slider = ref(null)
    const selectLine = ref(null)
    const sliderSize = ref(undefined)
    const stopsArr = ref([])
    const inputNum = ref(undefined)

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
          const stepLength = Math.round(sliderSize.value / props.step)
          const takePercent = Math.round((event.clientX - sliderOffsetLeft) / props.step)
          let percentNum
          if (props.step === 1) {
            percentNum = Math.round((takePercent / stepLength) * 100)
          } else {
            percentNum = IntegerForensics(Math.round((takePercent / stepLength) * 100))
          }
          if (percentNum > props.max) {
            percentNum = props.max
          } else if (percentNum < props.mini) {
            percentNum = props.mini
          }
          console.log(percentNum)
          firstButton.value.setPosition(percentNum)
        }
      }
    }

    const handleBallMoveEnd = () => {
      firstBallBrag.value = true
    }

    const handleStops = () => {
      if (props.showStops) {
        // 段数
        const share = (props.max - props.mini) / props.step
        // 每段多长
        const shareLength = sliderSize.value / share
        for (let i = 1; i <= share; i++) {
          stopsArr.value.push(`${Number(((i * shareLength) / sliderSize.value).toFixed(2)) * 100}%`)
        }
      }
    }

    provide('sliderValue', {
      name: 'slider',
      ...toRefs(props),
      slider,
      sliderSize
    })

    watch(firstValue, (val) => {
      selectLine.value = { width: `${val}%` }
      // console.log(Number(val.toFixed(0)))
      inputNum.value = toIntNum(val)
      emit('update:modelValue', val)
    })

    watch(inputNum, (val) => {
      firstValue.value = val
      firstButton.value.setPosition(val)
    })

    onMounted(async () => {
      window.addEventListener('resize', resetSize)
      await nextTick()
      resetSize()
      firstButton.value.setPosition(props.modelValue)
      selectLine.value = { width: `${props.modelValue}%` }
      handleStops()
      inputNum.value = props.modelValue
    })

    return {
      firstButton,
      firstValue,
      slider,
      selectLine,
      stopsArr,
      inputNum,
      updateFirst,
      lineClick,
      handleBallMoveEnd
    }
  }
})
</script>
