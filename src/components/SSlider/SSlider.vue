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
        @ballMoveEnd="handleBallMoveEnd"
      />
      <s-slider-button
        v-if="range"
        ref="secondButton"
        :model-value="secondValue"
        :vertical="vertical"
        :show-tooltip="showTooltip"
        :disabled="disabled"
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
import { defineComponent, ref, provide, toRefs, watch, onMounted, nextTick, computed } from 'vue'
import './SSlider.css'
import SSliderButton from './SSliderButton'
import SInputNumber from '@/components/SInputNumber/SInputNumber'
import { isArr } from '@/untils/common'

export default defineComponent({
  name: 'SSlider',
  components: {
    SSliderButton,
    SInputNumber
  },
  props: {
    modelValue: {
      type: [Number, Array],
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
    },
    range: {
      type: Boolean,
      default: false
    }
  },
  setup (props, { emit }) {
    const firstBallBrag = ref(false)
    const firstButton = ref(null)
    const firstValue = ref(isArr(props.modelValue) ? props.modelValue[0] : props.modelValue)
    const slider = ref(null)
    const selectLine = ref(null)
    const sliderSize = ref(undefined)
    const stopsArr = ref([])
    const inputNum = ref(undefined)
    const secondButton = ref(null)
    const secondValue = ref(isArr(props.modelValue) ? props.modelValue[1] : props.modelValue)

    const precision = computed(() => {
      const precisions = [props.mini, props.max, props.step].map(item => {
        const decimal = `${item}`.split('.')[1]
        return decimal ? decimal.length : 0
      })
      return Math.max.apply(null, precisions)
    })

    const resetSize = () => {
      if (slider.value) {
        sliderSize.value = slider.value[`client${props.vertical ? 'Height' : 'Width'}`]
      }
    }
    // @update:model-value="updateFirst"
    // const updateFirst = (val) => {
    //   firstValue.value = val
    // }

    const lineClick = (event) => {
      console.log('单点击事件')
    }

    const handleBallMoveEnd = () => {
      firstBallBrag.value = true
    }

    const handleStops = () => {
      if (props.showStops) {
        // 段数
        const share = props.max / props.step
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
      sliderSize,
      precision,
      resetSize
    })

    watch(firstValue, (val) => {
      selectLine.value = { width: `${val}%` }
      if (props.formatTooltip) {
        inputNum.value = Math.floor((val / 100) * props.max)
      } else {
        inputNum.value = Math.round((val / 100) * props.max)
      }
      emit('update:modelValue', val)
    })

    watch(inputNum, (val) => {
      if (!props.formatTooltip) {
        firstValue.value = Math.round((val / props.max) * 100)
        firstButton.value.setPosition(Math.round((val / props.max) * 100))
      }
    })

    onMounted(async () => {
      window.addEventListener('resize', resetSize)
      await nextTick()
      resetSize()
      handleStops()
      if (isArr(props.modelValue)) {
        console.log()
        firstButton.value.setPosition((props.modelValue[0] / props.max) * 100)
        secondButton.value.setPosition((props.modelValue[1] / props.max) * 100)
      } else {
        inputNum.value = props.modelValue
        firstButton.value.setPosition(props.modelValue)
        selectLine.value = { width: `${props.modelValue}%` }
      }
    })

    return {
      slider,
      stopsArr,
      inputNum,
      precision,
      selectLine,
      firstValue,
      firstButton,
      secondValue,
      secondButton,
      // updateFirst,
      lineClick,
      handleBallMoveEnd
    }
  }
})
</script>
